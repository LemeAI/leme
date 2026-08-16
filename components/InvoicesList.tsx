"use client";

import { useInvoices } from "@/lib/hooks/useInvoices";
import { formatDate } from "@/lib/utils";
import { getDateLocale } from "@/lib/i18n/date-locale";
import { useLocale } from "@/lib/i18n/use-locale";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

function formatAmount(amount: number, currency: string, locale: string): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  });
  return formatter.format(amount / 100);
}

export default function InvoicesList({ dict }: { dict: Dictionary }) {
  const { data, loading, error } = useInvoices();
  const locale = useLocale();
  const dateLocale = getDateLocale(locale);
  const i = dict.billing.invoices;

  if (loading) {
    return <p className="text-sm text-mute">{i.loading}</p>;
  }

  if (error) {
    return <p className="alert alert-error">{i.error}</p>;
  }

  const invoices = data?.invoices ?? [];

  if (invoices.length === 0) {
    return <p className="text-sm text-mute">{i.empty}</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line-soft bg-line-soft">
      {invoices.map((invoice) => (
        <li
          key={invoice.id}
          className="flex flex-col gap-2 bg-black/30 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="text-sm font-medium">
              {invoice.number ?? `${i.invoice} ${invoice.id.slice(-6)}`}
            </p>
            <p className="mt-1 text-xs text-mute-dim">
              {invoice.created ? formatDate(invoice.created, dateLocale) : "—"} · {invoice.status ?? i.statusPaid}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              {formatAmount(invoice.amount_due, invoice.currency, locale)}
            </span>
            {invoice.hosted_invoice_url && (
              <a
                href={invoice.hosted_invoice_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded text-sm text-brand-500 transition-colors hover:text-brand-400"
              >
                {i.view}
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
