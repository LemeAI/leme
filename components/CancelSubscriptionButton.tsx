"use client";

import { useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";

export default function CancelSubscriptionButton({
  onCancelled,
}: {
  onCancelled?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCancel() {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your Pro plan? You will keep access until the end of the current billing period.",
    );
    if (!confirmed) return;

    setLoading(true);
    setError(null);

    try {
      await apiFetch<{ cancel_at_period_end: boolean }>("/billing/cancel", {
        method: "POST",
      });
      onCancelled?.();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to cancel subscription.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleCancel}
        disabled={loading}
        className="w-full rounded-full border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition-colors hover:bg-red-50 disabled:opacity-50 sm:w-fit"
      >
        {loading ? "Cancelling..." : "Cancel Pro plan"}
      </button>
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
