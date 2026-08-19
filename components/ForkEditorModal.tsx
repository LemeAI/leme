"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useCodeMirror } from "@/lib/hooks/useCodeMirror";
import ForkIconPicker from "@/components/ForkIconPicker";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { ForkIconChoice } from "@/lib/types";

interface ForkEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialHtml: string;
  initialTitle: string;
  pageTitle: string;
  authorName: string;
  forkMessage: string;
  dict: Dictionary;
  onCreateFork: (payload: {
    title: string;
    html: string;
    message: string;
    authorName: string;
    icon: ForkIconChoice;
  }) => void;
  loading?: boolean;
}

function formatTemplate(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));
}

export default function ForkEditorModal({
  isOpen,
  onClose,
  initialHtml,
  initialTitle,
  pageTitle,
  authorName: initialAuthorName,
  forkMessage: initialForkMessage,
  dict,
  onCreateFork,
  loading = false,
}: ForkEditorModalProps) {
  const d = dict.forkEditor;
  const [title, setTitle] = useState(initialTitle);
  const [authorName, setAuthorName] = useState(initialAuthorName);
  const [message, setMessage] = useState(initialForkMessage);
  const [icon, setIcon] = useState<ForkIconChoice>({ type: "emoji", value: "🚀", color: "#ff6a00" });
  const [previewHtml, setPreviewHtml] = useState(initialHtml);
  const previewRef = useRef<HTMLIFrameElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleEditorChange = useCallback((value: string) => {
    setPreviewHtml(value);
  }, []);

  const { containerRef, value: html } = useCodeMirror({
    initialValue: initialHtml,
    onChange: handleEditorChange,
  });

  // Foca no botão de fechar quando o modal abre (acessibilidade).
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Fecha com Escape.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen && !loading) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, onClose]);

  function handleSubmit() {
    onCreateFork({
      title: title.trim() || initialTitle,
      html,
      message: message.trim(),
      authorName: authorName.trim(),
      icon,
    });
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={formatTemplate(d.title, { title: pageTitle })}
    >
      <div className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-line-soft bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line-soft px-4 py-3">
          <div>
            <h2 className="text-base font-medium text-white">{formatTemplate(d.title, { title: pageTitle })}</h2>
            <p className="text-xs text-mute">{d.subtitle}</p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-md p-1.5 text-mute transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
            aria-label={d.close}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="grid min-h-0 flex-1 grid-cols-1 divide-y divide-line-soft sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {/* Editor */}
          <div className="flex min-h-0 flex-col">
            <div className="border-b border-line-soft px-4 py-2 text-xs font-medium uppercase tracking-wider text-mute-dim">
              {d.htmlTab}
            </div>
            <div className="min-h-0 flex-1 p-2">
              <div ref={containerRef} className="h-full overflow-hidden rounded-md border border-line-soft" />
            </div>
          </div>

          {/* Preview */}
          <div className="flex min-h-0 flex-col">
            <div className="border-b border-line-soft px-4 py-2 text-xs font-medium uppercase tracking-wider text-mute-dim">
              {d.previewTab}
            </div>
            <div className="min-h-0 flex-1 p-2">
              <iframe
                ref={previewRef}
                title={d.previewTab}
                srcDoc={previewHtml}
                sandbox="allow-scripts allow-forms allow-popups allow-modals"
                className="h-full w-full rounded-md border border-line-soft bg-white"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-line-soft bg-surface px-4 py-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="field-label mb-1.5 text-xs">{d.editTitle}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={d.editTitle}
                className="field-input mb-3 w-full"
              />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="field-label mb-1.5 text-xs">{d.authorLabel}</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder={d.authorLabel}
                    className="field-input w-full"
                  />
                </div>
                <div>
                  <label className="field-label mb-1.5 text-xs">{d.messageLabel}</label>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={d.messageLabel}
                    className="field-input w-full"
                  />
                </div>
              </div>
            </div>

            <div>
              <ForkIconPicker value={icon} onChange={setIcon} />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="btn btn-ghost disabled:opacity-50"
            >
              {d.cancel}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="btn btn-primary disabled:opacity-50"
            >
              {loading ? d.creating : d.createFork}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
