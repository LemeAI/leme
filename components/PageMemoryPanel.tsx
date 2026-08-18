"use client";

import { useMemo, useState } from "react";
import { usePageMemory } from "@/lib/hooks/usePageMemory";
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

  const entries = useMemo(() => {
    const normalized = filter.trim().toLowerCase();
    return Object.entries(memory)
      .filter(
        ([key, value]) =>
          key.toLowerCase().includes(normalized) ||
          String(value).toLowerCase().includes(normalized)
      )
      .sort(([a], [b]) => a.localeCompare(b));
  }, [memory, filter]);

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
    <div className="rounded-lg border border-line-soft p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">{dict.pageMemory.title}</h3>
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
          {entries.map(([key, value]) => (
            <li key={key} className="rounded bg-white/5 px-2 py-1.5">
              <span className="block truncate font-medium text-mute-dim">{key}</span>
              <span className="block truncate text-white">{value || <em className="text-mute">—</em>}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
