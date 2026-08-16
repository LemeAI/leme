"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import SubscriptionCard from "@/components/SubscriptionCard";
import InvoicesList from "@/components/InvoicesList";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

type BillingContentProps = {
  locale: Locale;
  dict: Dictionary;
};

export default function BillingContent({ locale, dict }: BillingContentProps) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const b = dict.billing;

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace(`/${locale}/login`);
    }
  }, [authLoading, user, router, locale]);

  if (authLoading || !user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <h1 className="title-page">{b.title}</h1>
      <p className="mt-3 text-[15px] text-mute">{b.subtitle}</p>

      <div className="mt-10 flex flex-col gap-6">
        <SubscriptionCard dict={dict} />

        <div className="panel p-6">
          <h2 className="subhead">{b.invoices.title}</h2>
          <div className="mt-5">
            <InvoicesList dict={dict} />
          </div>
        </div>
      </div>
    </div>
  );
}
