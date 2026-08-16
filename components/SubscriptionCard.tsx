"use client";

import Link from "next/link";
import { useSubscription } from "@/lib/hooks/useSubscription";
import { useProfile } from "@/lib/hooks/useProfile";
import { formatDate } from "@/lib/utils";
import { getDateLocale } from "@/lib/i18n/date-locale";
import CancelSubscriptionButton from "./CancelSubscriptionButton";
import UpgradeToAnnualButton from "./UpgradeToAnnualButton";
import ManageBillingButton from "./ManageBillingButton";
import { useLocale } from "@/lib/i18n/use-locale";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export default function SubscriptionCard({ dict }: { dict: Dictionary }) {
  const { data: profileData } = useProfile();
  const { data: subscription, loading, mutate } = useSubscription();
  const locale = useLocale();
  const dateLocale = getDateLocale(locale);
  const b = dict.billing.subscription;
  const a = dict.billing.actions;

  const profile = profileData?.profile;
  const plan = profile?.plan ?? "free";

  if (plan !== "pro") {
    return (
      <div className="panel p-6">
        <h2 className="subhead">{b.title}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-mute">{b.freePlan}</p>
        <div className="mt-5">
          <Link href={`/${locale}/pricing`} className="btn btn-primary">
            {b.viewPlans}
          </Link>
        </div>
      </div>
    );
  }

  const isAnnual = subscription?.interval === "year" || profile?.interval === "year";
  const currentPeriodEnd = subscription?.current_period_end ?? profile?.current_period_end;
  const cancelAtPeriodEnd = subscription?.cancel_at_period_end ?? profile?.cancel_at_period_end ?? false;

  return (
    <div className="panel p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="subhead">{b.proTitle}</h2>
          <p className="mt-1.5 text-sm text-mute">{isAnnual ? b.billedAnnually : b.billedMonthly}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.1em] ${
            cancelAtPeriodEnd
              ? "bg-amber-500/10 text-amber-400"
              : "bg-emerald-500/10 text-emerald-400"
          }`}
        >
          {cancelAtPeriodEnd ? b.statusCancelsSoon : b.statusActive}
        </span>
      </div>

      <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-line-soft bg-line-soft sm:grid-cols-2">
        <div className="bg-black/30 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-mute-dim">
            {b.currentPeriodEnds}
          </p>
          <p className="mt-1.5 text-sm font-medium">
            {currentPeriodEnd ? formatDate(currentPeriodEnd, dateLocale) : "—"}
          </p>
        </div>
        <div className="bg-black/30 p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-mute-dim">
            {b.billingInterval}
          </p>
          <p className="mt-1.5 text-sm font-medium">
            {isAnnual ? b.intervalYearly : b.intervalMonthly}
          </p>
        </div>
      </div>

      {cancelAtPeriodEnd && (
        <p className="alert alert-warning mt-5">{b.cancelWarning}</p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        {!isAnnual && !cancelAtPeriodEnd && (
          <UpgradeToAnnualButton
            label={a.upgradeToAnnual}
            loadingLabel={a.upgrading}
            errorMessage={a.upgradeError}
            onUpgrade={() => mutate()}
          />
        )}
        {!cancelAtPeriodEnd && (
          <CancelSubscriptionButton
            label={a.cancelSubscription}
            loadingLabel={a.cancelling}
            confirmMessage={a.cancelConfirm}
            confirmTitle={a.cancelConfirmTitle}
            cancelLabel={a.cancelKeep}
            errorMessage={a.cancelError}
            onCancelled={() => mutate()}
          />
        )}
        <ManageBillingButton label={a.manageBilling} loadingLabel={a.manageBillingLoading} />
      </div>

      {loading && <p className="mt-5 text-xs text-mute-dim">{b.syncing}</p>}
    </div>
  );
}
