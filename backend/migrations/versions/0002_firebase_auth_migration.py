"""Replace Supabase Auth with Firebase Auth as the identity provider.

Converts `user_id`/`created_by`/`id` owner columns from `uuid` (a foreign
key into `auth.users`) to plain `text` holding a Firebase UID, drops the
Supabase-Auth-specific signup trigger, disables the `auth.uid()`-based RLS
policies (dead once the backend connects directly instead of through
PostgREST), updates the `apply_pro_*` functions to the new `text` id type,
and creates the least-privilege `leme_backend` role used by the FastAPI
service going forward.

Existing rows are preserved unchanged: users must be imported into Firebase
with `uid` set to their existing `auth.users.id` (see
`backend/scripts/migrate_users_to_firebase.py`) before this migration runs,
so every `user_id`/`created_by`/`id` value keeps pointing at the same owner.

Requires `LEME_BACKEND_DB_PASSWORD` in the environment — the password for
the `leme_backend` role this migration creates.

Revision ID: 0002_firebase_auth_migration
Revises: 0001_initial_schema
Create Date: 2026-08-13

"""

from __future__ import annotations

import os
from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

revision: str = "0002_firebase_auth_migration"
down_revision: str | None = "0001_initial_schema"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

_OWNER_COLUMNS = (
    ("html_pages", "user_id"),
    ("share_links", "created_by"),
    ("contributions", "user_id"),
)


def upgrade() -> None:
    # Checked before any DDL runs: the transaction would roll this back
    # anyway, but failing up front keeps the error obvious.
    password = os.environ.get("LEME_BACKEND_DB_PASSWORD")
    if not password:
        raise RuntimeError(
            "LEME_BACKEND_DB_PASSWORD is not set. Choose a strong password for the "
            "leme_backend role, export it, and re-run the migration. This is the "
            "password the backend uses in SUPABASE_DB_URL."
        )
    escaped_password = password.replace("'", "''")

    for table, column in _OWNER_COLUMNS:
        op.execute(
            sa.text(
                f"alter table public.{table} drop constraint if exists {table}_{column}_fkey"
            )
        )
        op.execute(
            sa.text(
                f"alter table public.{table} alter column {column} type text using {column}::text"
            )
        )

    op.execute(
        sa.text(
            "alter table public.profiles drop constraint if exists profiles_id_fkey"
        )
    )
    op.execute(
        sa.text("alter table public.profiles alter column id type text using id::text")
    )

    op.execute(sa.text("drop trigger if exists on_auth_user_created on auth.users"))
    op.execute(sa.text("drop function if exists public.handle_new_user()"))

    for table in ("html_pages", "share_links", "contributions", "profiles"):
        op.execute(sa.text(f"alter table public.{table} disable row level security"))

    op.execute(sa.text("drop function if exists public.apply_pro_upgrade(uuid)"))
    op.execute(sa.text("""
            create or replace function public.apply_pro_upgrade(target_user_id text)
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
            """))

    op.execute(
        sa.text("drop function if exists public.apply_pro_downgrade(uuid, integer)")
    )
    op.execute(sa.text("""
            create or replace function public.apply_pro_downgrade(target_user_id text, fallback_days integer)
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
            """))

    op.execute(sa.text(f"""
            do $$
            begin
              if not exists (select 1 from pg_roles where rolname = 'leme_backend') then
                create role leme_backend with login password '{escaped_password}';
              end if;
            end
            $$
            """))
    op.execute(sa.text("grant usage on schema public to leme_backend"))
    op.execute(
        sa.text(
            "grant select, insert, update, delete on "
            "public.html_pages, public.profiles, public.share_links, public.contributions "
            "to leme_backend"
        )
    )
    op.execute(
        sa.text(
            "grant execute on function public.increment_views(uuid) to leme_backend"
        )
    )
    op.execute(
        sa.text(
            "grant execute on function public.apply_pro_upgrade(text) to leme_backend"
        )
    )
    op.execute(
        sa.text(
            "grant execute on function public.apply_pro_downgrade(text, integer) to leme_backend"
        )
    )


def downgrade() -> None:
    op.execute(
        sa.text(
            "revoke all on public.html_pages, public.profiles, public.share_links, "
            "public.contributions from leme_backend"
        )
    )
    op.execute(sa.text("revoke usage on schema public from leme_backend"))

    op.execute(sa.text("drop function if exists public.apply_pro_upgrade(text)"))
    op.execute(
        sa.text("drop function if exists public.apply_pro_downgrade(text, integer)")
    )
    op.execute(sa.text("""
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
            """))
    op.execute(sa.text("""
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
            """))

    for table in ("html_pages", "share_links", "contributions", "profiles"):
        op.execute(sa.text(f"alter table public.{table} enable row level security"))

    op.execute(
        sa.text(
            "create trigger on_auth_user_created after insert on auth.users "
            "for each row execute function public.handle_new_user()"
        )
    )
    op.execute(sa.text("""
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
            """))

    op.execute(
        sa.text("alter table public.profiles alter column id type uuid using id::uuid")
    )
    op.execute(
        sa.text(
            "alter table public.profiles add constraint profiles_id_fkey "
            "foreign key (id) references auth.users (id) on delete cascade"
        )
    )

    for table, column in _OWNER_COLUMNS:
        op.execute(
            sa.text(
                f"alter table public.{table} alter column {column} type uuid using {column}::uuid"
            )
        )
        op.execute(
            sa.text(
                f"alter table public.{table} add constraint {table}_{column}_fkey "
                f"foreign key ({column}) references auth.users (id) on delete set null"
            )
        )
