"use client";

import { useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";

export default function UpgradeToAnnualButton({
  label,
  loadingLabel,
  errorMessage,
  onUpgrade,
}: {
  label: string;
  loadingLabel: string;
  errorMessage: string;
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
      setError(err instanceof ApiError ? err.message : errorMessage);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleUpgrade}
        disabled={loading}
        className="btn btn-brand w-full justify-center py-2 text-xs disabled:opacity-50 sm:w-fit"
      >
        {loading ? loadingLabel : label}
      </button>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </div>
  );
}
