"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useCodeMirror } from "@/lib/hooks/useCodeMirror";
import ForkIconPicker from "@/components/ForkIconPicker";
import ResizableSplitter from "@/components/ResizableSplitter";
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
  const [splitterPosition, setSplitterPosition] = useState(50);
  const [step, setStep] = useState<1 | 2>(1);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLIFrameElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleEditorChange = useCallback((value: string) => {
    setPreviewHtml(value);
  }, []);

  const { containerRef, value: html, selectText } = useCodeMirror({
    initialValue: initialHtml,
    onChange: handleEditorChange,
  });

  // Foca no botão de fechar quando o modal abre (acessibilidade).
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Fecha com Escape no passo 1; volta ao passo 1 no passo 2.
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape" || !isOpen || loading) return;
      if (step === 2) {
        setStep(1);
      } else {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, onClose, step]);

  function handleSubmit() {
    onCreateFork({
      title: title.trim() || initialTitle,
      html,
      message: message.trim(),
      authorName: authorName.trim(),
      icon,
    });
  }

  const handleResize = useCallback(
    (delta: number) => {
      if (!bodyRef.current) return;
      const rect = bodyRef.current.getBoundingClientRect();
      const deltaPercent = (delta / rect.width) * 100;
      setSplitterPosition((prev) => Math.min(80, Math.max(20, prev + deltaPercent)));
    },
    []
  );

  const previewWithSelector = useMemo(() => {
    if (!previewHtml) return previewHtml;
    const script = `
<script>
(function () {
  function selectorFor(el) {
    if (el.id) return '#' + el.id;
    const tag = el.tagName.toLowerCase();
    const classes = Array.from(el.classList).filter(function (c) { return c.indexOf('leme-') !== 0; }).join('.');
    if (classes) return tag + '.' + classes;
    let nth = 1;
    let sibling = el.previousElementSibling;
    while (sibling) {
      if (sibling.tagName === el.tagName) nth++;
      sibling = sibling.previousElementSibling;
    }
    return tag + ':nth-of-type(' + nth + ')';
  }
  function isInteractive(el) {
    if (!el) return false;
    const interactiveTags = { a: true, button: true, input: true, select: true, textarea: true, details: true, summary: true };
    let node = el;
    while (node && node !== document.body && node !== document.documentElement) {
      const tag = node.tagName.toLowerCase();
      if (interactiveTags[tag]) return true;
      if (node.getAttribute('onclick') || node.getAttribute('role') === 'button' || node.getAttribute('tabindex') === '0') return true;
      node = node.parentElement;
    }
    return false;
  }
  function clearSelection() {
    var prev = document.querySelector('.leme-selected');
    if (prev) prev.classList.remove('leme-selected');
  }
  document.addEventListener('click', function (e) {
    var el = e.target;
    if (!el || el === document.body || el === document.documentElement) return;
    var interactive = isInteractive(el);
    if (!interactive) {
      e.preventDefault();
      e.stopPropagation();
    }
    clearSelection();
    el.classList.add('leme-selected');
    var path = [];
    var current = el;
    while (current && current !== document.body && current !== document.documentElement) {
      path.unshift(selectorFor(current));
      current = current.parentElement;
    }
    parent.postMessage({
      type: 'leme-element-selected',
      selector: path.join(' > '),
      outerHTML: el.outerHTML,
      text: (el.textContent || '').slice(0, 200)
    }, '*');
  }, true);
})();
</script>
    `.trim();
    const style = `
<style>
  .leme-selected {
    outline: 3px solid #ff6a00 !important;
    outline-offset: 2px !important;
    box-shadow: 0 0 0 4px rgba(255, 106, 0, 0.18) !important;
  }
</style>
    `.trim();
    const injection = style + "\\n" + script;
    if (previewHtml.toLowerCase().includes("</body>")) {
      return previewHtml.replace(/<\/body>/i, injection + "</body>");
    }
    return previewHtml + injection;
  }, [previewHtml]);

  // Escuta cliques de elementos no preview do iframe.
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type !== "leme-element-selected") return;
      const { outerHTML } = event.data as { outerHTML?: string };
      if (!outerHTML || !selectText) return;

      selectText(outerHTML);
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [selectText]);

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
      <div
        className={`flex w-full flex-col overflow-hidden rounded-xl border border-line-soft bg-surface shadow-2xl ${
          step === 1 ? "h-[95vh] max-w-[95vw]" : "max-h-[80vh] w-full max-w-3xl"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line-soft px-4 py-3">
          <div>
            <h2 className="text-base font-medium text-white">{formatTemplate(d.title, { title: pageTitle })}</h2>
            <p className="text-xs text-mute">{step === 1 ? d.subtitle : d.editTitle}</p>
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
        {step === 1 ? (
          <div
            ref={bodyRef}
            className="flex min-h-0 flex-1 flex-col divide-y divide-line-soft sm:flex-row sm:divide-y-0"
          >
            {/* Editor */}
            <div
              className="flex min-h-0 shrink-0 flex-col"
              style={{ flexBasis: `${splitterPosition}%` }}
            >
              <div className="border-b border-line-soft px-4 py-2 text-xs font-medium uppercase tracking-wider text-mute-dim">
                {d.htmlTab}
              </div>
              <div className="min-h-0 flex-1 p-2">
                <div ref={containerRef} className="h-full overflow-hidden rounded-md border border-line-soft" />
              </div>
            </div>

            <ResizableSplitter onResize={handleResize} />

            {/* Preview */}
            <div className="flex min-h-0 flex-1 flex-col">
              <div className="border-b border-line-soft px-4 py-2 text-xs font-medium uppercase tracking-wider text-mute-dim">
                {d.previewTab}
              </div>
              <div className="min-h-0 flex-1 p-2">
                <iframe
                  ref={previewRef}
                  title={d.previewTab}
                  srcDoc={previewWithSelector}
                  sandbox="allow-scripts allow-forms allow-popups allow-modals"
                  className="h-full w-full rounded-md border border-line-soft bg-white"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
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
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-line-soft bg-surface px-4 py-4">
          <div className="flex items-center justify-end gap-3">
            {step === 1 ? (
              <>
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
                  onClick={() => setStep(2)}
                  disabled={loading}
                  className="btn btn-primary disabled:opacity-50"
                >
                  {d.next}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={loading}
                  className="btn btn-ghost disabled:opacity-50"
                >
                  {d.back}
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn btn-primary disabled:opacity-50"
                >
                  {loading ? d.creating : d.createFork}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
