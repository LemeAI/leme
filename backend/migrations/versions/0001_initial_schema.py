"""Initial schema: html_pages, profiles, share_links, contributions.

Mirrors the schema originally created by the repository's `schema.sql`
against a Supabase-managed Postgres database, back when Supabase Auth
(`auth.users`) was still the identity provider. Projects that already ran
`schema.sql` by hand should run `alembic stamp 0001_initial_schema` instead
of `alembic upgrade` through this revision, since the objects already exist.

Revision ID: 0001_initial_schema
Revises:
Create Date: 2026-08-13

"""
from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "0001_initial_schema"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.execute(sa.text('create extension if not exists "pgcrypto"'))

    op.execute(
        sa.text(
            """
            create table public.html_pages (
              id           uuid primary key default gen_random_uuid(),
              user_id      uuid references auth.users (id) on delete set null,
              title        text not null,
              description  text,
              file_path    text not null,
              views_count  integer not null default 0,
              created_at   timestamptz not null default now(),
              expires_at   timestamptz,
              anon_id      text,
              expires_at_before_pro timestamptz
            )
            """
        )
    )

    op.execute(
        sa.text(
            """
            create table public.profiles (
              id                     uuid primary key references auth.users (id) on delete cascade,
              plan                   text not null default 'free' check (plan in ('free', 'pro')),
              created_at             timestamptz not null default now(),
              stripe_customer_id     text,
              stripe_subscription_id text,
              stripe_price_id        text,
              current_period_end     timestamptz
            )
            """
        )
    )
    op.execute(
        sa.text(
            "create unique index idx_profiles_stripe_customer_id on public.profiles (stripe_customer_id) "
            "where stripe_customer_id is not null"
        )
    )

    op.execute(
        sa.text(
            """
            create or replace function public.handle_new_user()
            returns trigger
            language plpgsql
            security definer
            set search_path = public
            as $$
            begin
              insert into public.profiles (id) values (new.id)
              on conflict (id) do nothing;
              return new;
            end;
            $$
            """
        )
    )
    op.execute(
        sa.text(
            "create trigger on_auth_user_created after insert on auth.users "
            "for each row execute function public.handle_new_user()"
        )
    )

    op.execute(
        sa.text(
            """
            create table public.share_links (
              id          uuid primary key default gen_random_uuid(),
              page_id     uuid not null references public.html_pages (id) on delete cascade,
              token       text not null unique,
              created_by  uuid references auth.users (id) on delete set null,
              expires_at  timestamptz,
              created_at  timestamptz not null default now()
            )
            """
        )
    )

    op.execute(
        sa.text(
            """
            create table public.contributions (
              id            uuid primary key default gen_random_uuid(),
              page_id       uuid not null references public.html_pages (id) on delete cascade,
              user_id       uuid references auth.users (id) on delete set null,
              author_name   text not null default 'Anonymous',
              content       text not null,
              type          text not null default 'comment'
                            check (type in ('comment', 'suggestion', 'fork')),
              fork_page_id  uuid references public.html_pages (id) on delete set null,
              created_at    timestamptz not null default now()
            )
            """
        )
    )

    op.execute(sa.text("create index idx_html_pages_user_id on public.html_pages (user_id)"))
    op.execute(sa.text("create index idx_html_pages_anon_id on public.html_pages (anon_id)"))
    op.execute(sa.text("create index idx_html_pages_expires_at on public.html_pages (expires_at)"))
    op.execute(sa.text("create index idx_share_links_page_id on public.share_links (page_id)"))
    op.execute(sa.text("create index idx_share_links_token on public.share_links (token)"))
    op.execute(sa.text("create index idx_contributions_page_id on public.contributions (page_id)"))

    op.execute(
        sa.text(
            """
            create or replace function public.increment_views(page_id uuid)
            returns void
            language plpgsql
            security definer
            set search_path = public
            as $$
            begin
              update public.html_pages
              set views_count = views_count + 1
              where id = page_id;
            end;
            $$
            """
        )
    )

    op.execute(
        sa.text(
            """
            create or replace function public.apply_pro_upgrade(target_user_id uuid)
            returns void
            language plpgsql
            security definer
            set search_path = public
            as $$
            begin
              update public.html_pages
              set expires_at_before_pro = expires_at,
                  expires_at = null
              where user_id = target_user_id
                and expires_at is not null
                and expires_at_before_pro is null;
            end;
            $$
            """
        )
    )

    op.execute(
        sa.text(
            """
            create or replace function public.apply_pro_downgrade(target_user_id uuid, fallback_days integer)
            returns void
            language plpgsql
            security definer
            set search_path = public
            as $$
            begin
              update public.html_pages
              set expires_at = expires_at_before_pro,
                  expires_at_before_pro = null
              where user_id = target_user_id
                and expires_at_before_pro is not null;

              update public.html_pages
              set expires_at = now() + (fallback_days || ' days')::interval
              where user_id = target_user_id
                and expires_at_before_pro is null
                and expires_at is null;
            end;
            $$
            """
        )
    )

    for table in ("html_pages", "share_links", "contributions", "profiles"):
        op.execute(sa.text(f"alter table public.{table} enable row level security"))

    op.execute(sa.text("create policy html_pages_select_public on public.html_pages for select using (true)"))
    op.execute(
        sa.text(
            "create policy html_pages_insert_any on public.html_pages for insert "
            "with check (user_id is null or user_id = auth.uid())"
        )
    )
    op.execute(
        sa.text(
            "create policy html_pages_update_owner on public.html_pages for update "
            "using (auth.uid() = user_id) with check (auth.uid() = user_id)"
        )
    )
    op.execute(
        sa.text(
            "create policy html_pages_delete_owner on public.html_pages for delete using (auth.uid() = user_id)"
        )
    )

    op.execute(sa.text("create policy share_links_select_public on public.share_links for select using (true)"))
    op.execute(
        sa.text(
            "create policy share_links_insert_any on public.share_links for insert "
            "with check (created_by is null or created_by = auth.uid())"
        )
    )

    op.execute(
        sa.text("create policy contributions_select_public on public.contributions for select using (true)")
    )
    op.execute(
        sa.text(
            "create policy contributions_insert_any on public.contributions for insert "
            "with check (user_id is null or user_id = auth.uid())"
        )
    )

    op.execute(sa.text("create policy profiles_select_own on public.profiles for select using (auth.uid() = id)"))

    op.execute(
        sa.text(
            """
            insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
            values ('html-files', 'html-files', true, 2097152, array['text/html', 'application/octet-stream'])
            on conflict (id) do update
            set public = true,
                file_size_limit = 2097152,
                allowed_mime_types = array['text/html', 'application/octet-stream']
            """
        )
    )
    op.execute(
        sa.text("create policy html_files_select_public on storage.objects for select using (bucket_id = 'html-files')")
    )
    op.execute(
        sa.text("create policy html_files_insert_any on storage.objects for insert with check (bucket_id = 'html-files')")
    )
    op.execute(
        sa.text("create policy html_files_update_any on storage.objects for update using (bucket_id = 'html-files')")
    )
    op.execute(
        sa.text("create policy html_files_delete_any on storage.objects for delete using (bucket_id = 'html-files')")
    )


def downgrade() -> None:
    for policy, table in (
        ("html_files_delete_any", "storage.objects"),
        ("html_files_update_any", "storage.objects"),
        ("html_files_insert_any", "storage.objects"),
        ("html_files_select_public", "storage.objects"),
    ):
        op.execute(sa.text(f"drop policy if exists {policy} on {table}"))
    op.execute(sa.text("delete from storage.buckets where id = 'html-files'"))

    op.execute(sa.text("drop table if exists public.contributions cascade"))
    op.execute(sa.text("drop table if exists public.share_links cascade"))
    op.execute(sa.text("drop trigger if exists on_auth_user_created on auth.users"))
    op.execute(sa.text("drop function if exists public.handle_new_user()"))
    op.execute(sa.text("drop table if exists public.profiles cascade"))
    op.execute(sa.text("drop table if exists public.html_pages cascade"))
    op.execute(sa.text("drop function if exists public.increment_views(uuid)"))
    op.execute(sa.text("drop function if exists public.apply_pro_upgrade(uuid)"))
    op.execute(sa.text("drop function if exists public.apply_pro_downgrade(uuid, integer)"))
