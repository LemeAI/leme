"use client";

import { useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";

export default function UpgradeToAnnualButton({
  onUpgrade,
}: {
  onUpgrade?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpgrade() {
    setLoading(true);
    setError(null);

    try {
      const data = await apiFetch<{ url: string }>("/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval: "year" }),
      });
      onUpgrade?.();
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to start upgrade.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleUpgrade}
        disabled={loading}
        className="w-full rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 disabled:opacity-50 sm:w-fit"
      >
        {loading ? "Opening checkout..." : "Upgrade to annual"}
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
