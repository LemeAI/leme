"use client";

import { useState } from "react";
import Link from "next/link";
import ConfirmDialog from "@/components/ConfirmDialog";
import { ApiError, anonHeaders, apiFetch } from "@/lib/api";
import type { HtmlPage } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import { formatTemplate } from "@/lib/i18n/format-template";

export default function UploadsMenu({
  pages,
  currentPageId,
  locale,
  dict,
  onDeleted,
}: {
  pages: HtmlPage[];
  currentPageId: string;
  locale: Locale;
  dict: Dictionary;
  onDeleted?: (pageId: string) => void;
}) {
  const u = dict.uploadsMenu;
  const [pendingPage, setPendingPage] = useState<HtmlPage | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function confirmDelete() {
    const page = pendingPage;
    if (!page) return;

    setDeletingId(page.id);
    setError(null);

    try {
      await apiFetch<void>(`/pages/${page.id}`, {
        method: "DELETE",
        headers: anonHeaders(),
      });
      setPendingPage(null);
      onDeleted?.(page.id);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : u.deleteError);
      setPendingPage(null);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="px-1 text-[11px] font-medium uppercase tracking-[0.14em] text-mute-dim">
        {u.title}
      </p>

      {pages.length === 0 ? (
        <p className="px-1 text-sm text-mute">{u.empty}</p>
      ) : (
        <ul className="flex flex-col gap-1">
          {pages.map((page) => {
            const isCurrent = page.id === currentPageId;
            const isDeleting = deletingId === page.id;

            return (
              <li
                key={page.id}
                className={`group flex items-center gap-1 rounded-md pr-1 transition-colors ${
                  isCurrent
                    ? "border-l-2 border-brand-500 bg-white/5"
                    : "hover:bg-white/5"
                } ${isDeleting ? "opacity-50" : ""}`}
              >
                <Link
                  href={`/${locale}/p/${page.id}`}
                  className={`flex min-w-0 flex-1 flex-col gap-0.5 rounded-md px-3 py-2 text-sm transition-colors ${
                    isCurrent ? "text-white" : "text-mute group-hover:text-white"
                  }`}
                >
                  <span className="truncate font-medium">{page.title}</span>
                  <span className="truncate text-xs text-mute-dim">
                    {formatTemplate(u.views, { count: page.views_count })}
                    {isCurrent && ` · ${u.viewingNow}`}
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => setPendingPage(page)}
                  disabled={isDeleting}
                  aria-label={formatTemplate(u.deleteLabel, { title: page.title })}
                  title={u.deleteLabel}
                  className="shrink-0 rounded p-2 text-mute-dim opacity-0 transition-colors hover:bg-red-500/10 hover:text-red-400 focus-visible:opacity-100 group-hover:opacity-100 disabled:cursor-not-allowed"
                >
                  <TrashIcon />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {error && <p className="alert alert-error mt-1">{error}</p>}

      <ConfirmDialog
        open={pendingPage !== null}
        title={u.deleteTitle}
        description={formatTemplate(u.deleteConfirm, { title: pendingPage?.title ?? "" })}
        confirmLabel={u.deleteCta}
        cancelLabel={u.cancel}
        destructive
        busy={deletingId !== null}
        onConfirm={confirmDelete}
        onCancel={() => setPendingPage(null)}
      />
    </div>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M3.5 5.5h13M8 5.5V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5M5 5.5l.7 10a1.5 1.5 0 0 0 1.5 1.4h5.6a1.5 1.5 0 0 0 1.5-1.4l.7-10M8.5 9v4.5M11.5 9v4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
