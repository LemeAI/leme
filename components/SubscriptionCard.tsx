"use client";

import Link from "next/link";
import { useSubscription } from "@/lib/hooks/useSubscription";
import { useProfile } from "@/lib/hooks/useProfile";
import { formatDate } from "@/lib/utils";
import CancelSubscriptionButton from "./CancelSubscriptionButton";
import UpgradeToAnnualButton from "./UpgradeToAnnualButton";
import ManageBillingButton from "./ManageBillingButton";

export default function SubscriptionCard() {
  const { data: profileData } = useProfile();
  const { data: subscription, loading, mutate } = useSubscription();

  const profile = profileData?.profile;
  const plan = profile?.plan ?? "free";

  if (plan !== "pro") {
    return (
      <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
        <h2 className="text-lg font-bold text-ink-900">Subscription</h2>
        <p className="mt-1 text-sm text-ink-500">
          You are on the Free plan. Upgrade to Pro to keep pages live forever and remove the watermark.
        </p>
        <div className="mt-4">
          <Link
            href="/pricing"
            className="inline-block rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
          >
            View plans
          </Link>
        </div>
      </div>
    );
  }

  const isAnnual = subscription?.interval === "year" || profile?.interval === "year";
  const currentPeriodEnd = subscription?.current_period_end ?? profile?.current_period_end;
  const cancelAtPeriodEnd = subscription?.cancel_at_period_end ?? profile?.cancel_at_period_end ?? false;

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-ink-900">Pro plan</h2>
          <p className="mt-1 text-sm text-ink-500">
            Billed {isAnnual ? "annually" : "monthly"}
          </p>
        </div>
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
            cancelAtPeriodEnd
              ? "bg-amber-100 text-amber-700"
              : "bg-emerald-100 text-emerald-700"
          }`}
        >
          {cancelAtPeriodEnd ? "Cancels soon" : "Active"}
        </span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-ink-100 bg-ink-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Current period ends</p>
          <p className="mt-1 text-sm font-semibold text-ink-900">
            {currentPeriodEnd ? formatDate(currentPeriodEnd) : "—"}
          </p>
        </div>
        <div className="rounded-xl border border-ink-100 bg-ink-50 p-3">
          <p className="text-xs font-medium uppercase tracking-wide text-ink-500">Billing interval</p>
          <p className="mt-1 text-sm font-semibold text-ink-900">
            {isAnnual ? "Yearly" : "Monthly"}
          </p>
        </div>
      </div>

      {cancelAtPeriodEnd && (
        <p className="mt-4 text-sm text-amber-700">
          Your Pro plan is scheduled to cancel at the end of the current billing period.
          You can resume it before then to keep the benefits.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        {!isAnnual && !cancelAtPeriodEnd && <UpgradeToAnnualButton onUpgrade={() => mutate()} />}
        {!cancelAtPeriodEnd && <CancelSubscriptionButton onCancelled={() => mutate()} />}
        <ManageBillingButton />
      </div>

      {loading && <p className="mt-4 text-xs text-ink-400">Syncing subscription details...</p>}
    </div>
  );
}
