"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError, apiFetch } from "@/lib/api";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

const MONTHLY_PRICE = 9;
const YEARLY_PRICE = 90; // ~2 months free compared to paying monthly

type Interval = "month" | "year";

type ProPlanDict = Dictionary["pricing"]["pro"];

// Card do plano Pro com toggle mensal/anual e checkout de verdade via
// Stripe. Fica de fora do server component da página porque precisa de
// estado (toggle) e de chamar a API de checkout no clique.
export default function ProPlanCard({ locale, dict }: { locale: string; dict: ProPlanDict }) {
  const router = useRouter();
  const [interval, setInterval] = useState<Interval>("month");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpgrade() {
    setLoading(true);
    setError(null);

    try {
      const data = await apiFetch<{ url: string }>("/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      });

      // Redireciona pro Stripe Checkout (fora do app, precisa ser navegação
      // completa, não client-side routing).
      window.location.href = data.url;
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        router.push(`/${locale}/login`);
        return;
      }
      setError(err instanceof ApiError ? err.message : "Connection error while starting checkout.");
      setLoading(false);
    }
  }

  const price = interval === "month" ? MONTHLY_PRICE : YEARLY_PRICE;

  return (
    <div className="panel-accent flex flex-col gap-5 p-7">
      <div>
        <h2 className="subhead">{dict.name}</h2>
        <p className="mt-1.5 text-sm text-mute">{dict.description}</p>
      </div>

      <div className="flex items-center gap-1 rounded-md border border-line-soft bg-black/40 p-1 text-xs">
        <button
          type="button"
          onClick={() => setInterval("month")}
          className={`flex-1 rounded py-1.5 font-medium transition-colors ${
            interval === "month" ? "bg-white text-black" : "text-mute hover:text-white"
          }`}
        >
          {dict.monthly}
        </button>
        <button
          type="button"
          onClick={() => setInterval("year")}
          className={`flex-1 rounded py-1.5 font-medium transition-colors ${
            interval === "year" ? "bg-white text-black" : "text-mute hover:text-white"
          }`}
        >
          {dict.yearly}
        </button>
      </div>

      <div>
        <p className="text-[32px] font-medium tracking-[-0.035em]">
          ${price}
          <span className="text-sm font-normal text-mute">
            /{interval === "month" ? dict.priceUnitMonth : dict.priceUnitYear}
          </span>
        </p>
        {interval === "year" && <p className="mt-1 text-xs text-brand-500">{dict.yearlySavings}</p>}
      </div>

      <ul className="flex flex-1 flex-col gap-2.5 text-sm text-mute">
        {dict.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span className="mt-px text-brand-500">✓</span>
            {feature}
          </li>
        ))}
      </ul>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="button"
        onClick={handleUpgrade}
        disabled={loading}
        className="btn btn-brand w-full justify-center disabled:opacity-50"
      >
        {loading ? dict.ctaLoading : dict.cta}
      </button>
    </div>
  );
}
