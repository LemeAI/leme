"use client";

import { useState } from "react";
import { usePageMemory } from "@/lib/hooks/usePageMemory";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

interface NewMemoryAlertProps {
  pageId: string;
  dict: Dictionary;
}

export default function NewMemoryAlert({ pageId, dict }: NewMemoryAlertProps) {
  const { memory } = usePageMemory(pageId);
  const [dismissed, setDismissed] = useState(false);
  const [memoryAtMount] = useState(() => JSON.stringify(memory));

  const memoryJson = JSON.stringify(memory);
  const hasChanges =
    memoryJson !== memoryAtMount && memoryJson !== "{}";
  const visible = !dismissed && hasChanges;

  function handleDismiss() {
    setDismissed(true);
  }

  function handleReload() {
    window.location.reload();
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md animate-slide-up-fade sm:bottom-6">
      <div className="rounded-lg border border-line-soft bg-black px-4 py-3 shadow-lg animate-alert-glow">
        <p className="text-sm text-white">{dict.newMemoryAlert.message}</p>
        <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={handleReload}
          className="btn btn-primary flex-1 py-1.5 text-xs"
        >
          {dict.newMemoryAlert.reload}
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          className="btn flex-1 py-1.5 text-xs"
        >
          {dict.newMemoryAlert.dismiss}
        </button>
        </div>
      </div>
    </div>
  );
}
