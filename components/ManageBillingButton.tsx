"use client";

import { useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";

// Abre o Stripe Billing Portal, onde quem assina o Pro pode trocar cartão,
// mudar de mensal pra anual (ou vice-versa) ou cancelar a assinatura.
export default function ManageBillingButton({
  label,
  loadingLabel,
}: {
  label: string;
  loadingLabel: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openPortal() {
    setLoading(true);
    setError(null);

    try {
      const data = await apiFetch<{ url: string }>("/billing/portal", { method: "POST" });
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Connection error while opening billing portal.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={openPortal}
        disabled={loading}
        className="btn btn-ghost w-fit py-2 text-xs disabled:opacity-50"
      >
        {loading ? loadingLabel : label}
      </button>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
