"use client";

import { useInvoices } from "@/lib/hooks/useInvoices";
import { formatDate } from "@/lib/utils";

function formatAmount(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  });
  return formatter.format(amount / 100);
}

export default function InvoicesList() {
  const { data, loading, error } = useInvoices();

  if (loading) {
    return <p className="text-sm text-ink-500">Loading invoices...</p>;
  }

  if (error) {
    return <p className="text-sm text-red-600">Could not load invoices.</p>;
  }

  const invoices = data?.invoices ?? [];

  if (invoices.length === 0) {
    return <p className="text-sm text-ink-500">No invoices yet.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {invoices.map((invoice) => (
        <li
          key={invoice.id}
          className="flex flex-col gap-1 rounded-xl border border-ink-100 bg-white p-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-medium text-ink-900">
              {invoice.number ?? `Invoice ${invoice.id.slice(-6)}`}
            </p>
            <p className="text-xs text-ink-500">
              {invoice.created ? formatDate(invoice.created) : "—"} · {invoice.status ?? "paid"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-ink-900">
              {formatAmount(invoice.amount_due, invoice.currency)}
            </span>
            {invoice.hosted_invoice_url && (
              <a
                href={invoice.hosted_invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-brand-600 hover:underline"
              >
                View
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
