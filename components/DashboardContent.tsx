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
import { useProfile } from "@/lib/hooks/useProfile";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import ShareButton from "@/components/ShareButton";
import ManageBillingButton from "@/components/ManageBillingButton";

function getPlanStatusLabel(
  profile: import("@/lib/types").Profile | undefined,
  d: Dictionary["dashboard"]
): string {
  if (!profile || profile.plan !== "pro") return "";
  if (profile.cancel_at_period_end) return d.cancelsAtPeriodEnd;
  if (profile.interval === "year") return d.yearly;
  if (profile.interval === "month") return d.monthly;
  return "";
}

type DashboardContentProps = {
  locale: Locale;
  dateLocale: string;
  dict: Dictionary;
};

export default function DashboardContent({ locale, dateLocale, dict }: DashboardContentProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { pages, loading: pagesLoading } = useMyPages();
  const { data: profileData } = useProfile();
  const d = dict.dashboard;

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace(`/${locale}/login`);
    }
  }, [authLoading, user, router, locale]);

  if (authLoading || !user) {
    return null;
  }

  const plan = profileData?.profile.plan ?? "free";
  const limits = getPlanLimits(plan);
  const activePagesCount = pages.filter((page) => !isExpired(page.expires_at)).length;
  const atLimit = limits.maxActivePages !== null && activePagesCount >= limits.maxActivePages;

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 sm:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="title-page">{d.title}</h1>
        <Link href={`/${locale}/new`} className="btn btn-primary py-2.5 text-sm">
          {d.newUpload}
        </Link>
      </div>

      <div className="panel mt-8 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <span className="chip">{limits.label}</span>
          <span className="text-mute">
            {limits.maxActivePages === null
              ? formatTemplate(d.activePagesUnlimited, { active: activePagesCount })
              : formatTemplate(d.activePages, { active: activePagesCount, max: limits.maxActivePages })}
          </span>
          {plan === "pro" && profileData?.profile.current_period_end && (
            <span className="text-xs text-mute-dim">
              {formatTemplate(d.renewsOn, {
                date: formatDate(profileData.profile.current_period_end, dateLocale),
              })}
              {getPlanStatusLabel(profileData.profile, d)}
            </span>
          )}
        </div>
        {plan === "free" ? (
          <Link
            href={`/${locale}/pricing`}
            className={`btn w-fit py-2 text-xs ${atLimit ? "btn-primary" : "btn-ghost"}`}
          >
            {atLimit ? d.limitReachedUpgrade : d.viewProPlan}
          </Link>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/${locale}/billing`} className="btn btn-ghost w-fit py-2 text-xs">
              {d.billingSettings}
            </Link>
            <ManageBillingButton label={dict.billing.actions.manageBilling} loadingLabel={dict.billing.actions.manageBillingLoading} />
          </div>
        )}
      </div>

      {pagesLoading ? null : pages.length === 0 ? (
        <p className="mt-10 text-[15px] text-mute">
          {d.emptyState}{" "}
          <Link
            href={`/${locale}/`}
            className="font-medium text-brand-500 transition-colors hover:text-brand-400"
          >
            {d.emptyStateLink}
          </Link>
          .
        </p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line-soft bg-line-soft">
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
                      {formatTemplate(d.views, { count: page.views_count })} ·{" "}
                      {formatTemplate(d.uploadedOn, {
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
      )}
    </div>
  );
}
