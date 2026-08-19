"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

// Mostra uma URL somente-leitura com um botão de copiar. Usado sempre que
// já sabemos o link (não precisa gerar nada), como em /s/[token] — a
// própria página já É o link, então só faz sentido copiá-lo.
export default function CopyLink({ url, dict }: { url: string; dict: Dictionary }) {
  const [copied, setCopied] = useState(false);
  const d = dict.copyLink;

  async function copy() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center gap-1 rounded-md border border-line bg-white/5 p-1 pl-3">
      <input
        readOnly
        value={url}
        aria-label={d.copy}
        className="w-40 truncate bg-transparent text-xs text-mute outline-none sm:w-56"
      />
      <button
        onClick={copy}
        type="button"
        className="shrink-0 rounded px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
      >
        {copied ? d.copied : d.copy}
      </button>
    </div>
  );
}
