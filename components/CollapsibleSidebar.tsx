"use client";

import { useState, type ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

// Wrapper de <aside> com um botão pra esconder/mostrar a barra lateral.
// Usado em /p/[id] e /s/[token], que têm um viewer de HTML ocupando o
// espaço principal e uma sidebar fixa ao lado — esconder a sidebar dá
// mais espaço pro conteúdo. "reopenLabel" customiza o botão flutuante de
// reabrir (ex: "Collaborate" em /s, ícone genérico por padrão em /p).
export default function CollapsibleSidebar({
  children,
  className = "",
  reopenLabel,
  defaultOpen = true,
  dict,
}: {
  children: ReactNode;
  className?: string;
  reopenLabel?: string;
  defaultOpen?: boolean;
  dict: Dictionary;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const d = dict.collapsibleSidebar;

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={reopenLabel ?? d.show}
        className={
          reopenLabel
            ? "fixed bottom-4 right-4 z-20 flex items-center gap-2 rounded-md bg-brand-500 px-5 py-2.5 text-sm font-medium text-black shadow-lg transition-colors hover:bg-brand-400"
            : "fixed bottom-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-mute shadow-lg transition-colors hover:bg-surface-2 hover:text-white"
        }
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
          <path
            d="M4 10h12M10 4v12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        {reopenLabel}
      </button>
    );
  }

  return (
    <aside className={className}>
      <div className="flex h-10 shrink-0 items-center justify-end border-b border-line-soft px-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={d.hide}
          className="flex items-center gap-1.5 rounded border border-line px-2.5 py-1 text-xs font-medium text-mute transition-colors hover:border-white hover:text-white"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
            <path
              d="M5 5l10 10M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          {d.hide}
        </button>
      </div>
      {children}
    </aside>
  );
}
