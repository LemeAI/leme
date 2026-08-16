"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { formatExpiration } from "@/lib/i18n/format-expiration";
import { formatTemplate } from "@/lib/i18n/format-template";
import { getPlanLimits, isExpired } from "@/lib/plans";
import { useAuth } from "@/lib/auth";
import { useMyPages } from "@/lib/hooks/useMyPages";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import ShareButton from "@/components/ShareButton";

type MineContentProps = {
  locale: Locale;
  dateLocale: string;
  dict: Dictionary;
};

export default function MineContent({ locale, dateLocale, dict }: MineContentProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { pages, loading: pagesLoading } = useMyPages();
  const limits = getPlanLimits("anonymous");
  const m = dict.mine;

  useEffect(() => {
    if (!authLoading && user) {
      router.replace(`/${locale}/dashboard`);
    }
  }, [authLoading, user, router, locale]);

  if (authLoading || user) {
    return null;
  }

  const activePagesCount = pages.filter((page) => !isExpired(page.expires_at)).length;

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="title-page">{m.title}</h1>
        <Link href={`/${locale}/new`} className="btn btn-primary py-2.5 text-sm">
          {m.newUpload}
        </Link>
      </div>

      <div className="panel mt-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <span className="chip">{m.noAccount}</span>
          <span className="text-mute">
            {formatTemplate(m.activePagesInBrowser, {
              active: activePagesCount,
              max: limits.maxActivePages ?? 1,
            })}
          </span>
        </div>
        <Link href={`/${locale}/login`} className="btn btn-ghost w-fit py-2 text-xs">
          {m.createAccountForSpace}
        </Link>
      </div>

      {pagesLoading ? null : pages.length === 0 ? (
        <p className="mt-10 text-[15px] text-mute">
          {m.emptyState}{" "}
          <Link
            href={`/${locale}/`}
            className="font-medium text-brand-500 transition-colors hover:text-brand-400"
          >
            {m.emptyStateLink}
          </Link>
          .
        </p>
      ) : (
        <>
          <p className="mt-8 text-xs leading-relaxed text-mute-dim">
            {m.browserListWarning}{" "}
            <Link
              href={`/${locale}/login`}
              className="text-brand-500 transition-colors hover:text-brand-400"
            >
              {m.createAccountLink}
            </Link>{" "}
            {m.dontLoseUploads}
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft">
            {pages.map((page) => {
              const expirationLabel = formatExpiration(dict, page.expires_at);
              const expired = isExpired(page.expires_at);

              return (
                <li
                  key={page.id}
                  className="flex flex-col gap-4 bg-surface p-5 transition-colors hover:bg-surface-2 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/${locale}/p/${page.id}`}
                      className="font-medium tracking-[-0.01em] transition-colors hover:text-brand-500"
                    >
                      {page.title}
                    </Link>
                    {page.description && (
                      <p className="mt-1 truncate text-sm text-mute">{page.description}</p>
                    )}
                    <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-mute-dim">
                      <span>
                        {formatTemplate(m.views, { count: page.views_count })} ·{" "}
                        {formatTemplate(m.uploadedOn, {
                          date: formatDate(page.created_at, dateLocale),
                        })}
                      </span>
                      {expirationLabel && (
                        <span
                          className={`rounded-full px-2 py-0.5 font-medium ${
                            expired
                              ? "bg-red-500/10 text-red-400"
                              : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {expirationLabel}
                        </span>
                      )}
                    </p>
                  </div>

                  <ShareButton pageId={page.id} dict={dict} />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
