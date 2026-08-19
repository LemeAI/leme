"use client";

import { useMemo, useState } from "react";
import { usePageMemory } from "@/lib/hooks/usePageMemory";
import { useMemoryHighlightState } from "@/lib/hooks/useMemoryHighlightState";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

interface PageMemoryPanelProps {
  pageId: string;
  dict: Dictionary;
}

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function PageMemoryPanel({ pageId, dict }: PageMemoryPanelProps) {
  const { memory, loading, error } = usePageMemory(pageId);
  const [filter, setFilter] = useState("");
  const { baseMemory, freshUntilByKey, now } = useMemoryHighlightState(memory, loading);

  const changedKeys = useMemo(() => {
    const set = new Set<string>();
    for (const key of Object.keys(memory)) {
      if (!(key in baseMemory) || baseMemory[key] !== memory[key]) {
        set.add(key);
      }
    }
    return set;
  }, [memory, baseMemory]);

  const freshKeys = useMemo(() => {
    const set = new Set<string>();
    for (const [key, until] of Object.entries(freshUntilByKey)) {
      if (until > now) set.add(key);
    }
    return set;
  }, [freshUntilByKey, now]);

  const hasChanges = changedKeys.size > 0;
  const hasFreshChanges = freshKeys.size > 0;

  const entries = useMemo(() => {
    const normalized = filter.trim().toLowerCase();
    return Object.entries(memory)
      .filter(
        ([key, value]) =>
          key.toLowerCase().includes(normalized) ||
          String(value).toLowerCase().includes(normalized)
      )
      .sort(([a], [b]) => {
        const aFresh = freshKeys.has(a) ? 2 : changedKeys.has(a) ? 1 : 0;
        const bFresh = freshKeys.has(b) ? 2 : changedKeys.has(b) ? 1 : 0;
        if (aFresh !== bFresh) return bFresh - aFresh;
        return a.localeCompare(b);
      });
  }, [memory, filter, freshKeys, changedKeys]);

  function handleExport() {
    const rows = [
      ["key", "value"],
      ...entries.map(([key, value]) => [key, value ?? ""]),
    ];
    downloadCsv(`leme-memory-${pageId}.csv`, rows);
  }

  if (loading) {
    return (
      <div className="rounded-lg border border-line-soft p-4">
        <p className="text-sm text-mute">{dict.pageMemory.loading}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-line-soft p-4">
        <p className="text-sm text-red-400">{dict.pageMemory.error}</p>
      </div>
    );
  }

  return (
    <div className={hasFreshChanges ? "rounded-lg border border-line-soft p-4 animate-alert-glow" : "rounded-lg border border-line-soft p-4"}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-white">{dict.pageMemory.title}</h3>
          {hasFreshChanges && (
            <span
              className="inline-block h-2 w-2 rounded-full bg-brand-500 animate-memory-dot-pulse"
              aria-hidden="true"
            />
          )}
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="text-xs font-medium text-accent hover:underline"
        >
          {dict.pageMemory.exportCsv}
        </button>
      </div>

      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder={dict.pageMemory.filterPlaceholder}
        className="field-input mb-3 w-full text-sm"
      />

      {entries.length === 0 ? (
        <p className="text-sm text-mute">{dict.pageMemory.empty}</p>
      ) : (
        <ul className="max-h-48 space-y-2 overflow-y-auto text-sm">
          {entries.map(([key, value]) => {
            const isFresh = freshKeys.has(key);
            const isChanged = changedKeys.has(key);
            const itemClass =
              isFresh
                ? "rounded border-l-2 border-brand-500 bg-brand-500/15 px-2 py-1.5 animate-memory-pulse"
                : isChanged
                  ? "rounded border-l-2 border-brand-500/60 bg-brand-500/8 px-2 py-1.5"
                  : "rounded bg-white/5 px-2 py-1.5";

            return (
              <li key={key} className={itemClass}>
                <div className="flex items-center gap-2">
                  <span className="block truncate font-medium text-mute-dim">{key}</span>
                  {isFresh && (
                    <span
                      className="inline-block h-1.5 w-1.5 flex-none rounded-full bg-brand-500 animate-memory-dot-pulse"
                      aria-hidden="true"
                    />
                  )}
                </div>
                <span className="block truncate text-white">{value || <em className="text-mute">—</em>}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
