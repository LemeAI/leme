"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import SubscriptionCard from "@/components/SubscriptionCard";
import InvoicesList from "@/components/InvoicesList";

export default function BillingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [authLoading, user, router]);

  if (authLoading || !user) {
    return null;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold tracking-tight text-ink-900">Billing</h1>
      <p className="mt-1 text-sm text-ink-500">
        Manage your plan, billing interval, and invoices.
      </p>

      <div className="mt-8 flex flex-col gap-8">
        <SubscriptionCard />

        <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-card">
          <h2 className="text-lg font-bold text-ink-900">Invoice history</h2>
          <div className="mt-4">
            <InvoicesList />
          </div>
        </div>
      </div>
    </div>
  );
}
