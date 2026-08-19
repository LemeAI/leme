"use client";

import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";
import { ApiError, apiFetch } from "@/lib/api";

export default function CancelSubscriptionButton({
  label,
  loadingLabel,
  confirmMessage,
  confirmTitle,
  cancelLabel,
  errorMessage,
  onCancelled,
}: {
  label: string;
  loadingLabel: string;
  confirmMessage: string;
  confirmTitle: string;
  cancelLabel: string;
  errorMessage: string;
  onCancelled?: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCancel() {
    setLoading(true);
    setError(null);

    try {
      await apiFetch<{ cancel_at_period_end: boolean }>("/billing/cancel", {
        method: "POST",
      });
      setConfirming(false);
      onCancelled?.();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : errorMessage);
      setConfirming(false);
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setConfirming(true)}
        disabled={loading}
        className="btn btn-danger w-full justify-center py-2 text-xs disabled:opacity-50 sm:w-fit"
      >
        {loading ? loadingLabel : label}
      </button>
      {error && <span className="text-xs text-red-400">{error}</span>}

      <ConfirmDialog
        open={confirming}
        title={confirmTitle}
        description={confirmMessage}
        confirmLabel={label}
        cancelLabel={cancelLabel}
        destructive
        busy={loading}
        onConfirm={handleCancel}
        onCancel={() => setConfirming(false)}
      />
    </div>
  );
}
