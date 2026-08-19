"use client";

import { useState } from "react";
import { ApiError, apiFetch } from "@/lib/api";
import type { HtmlPage } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export default function PageSettingsPanel({
  pageId,
  allowContributions,
  hideBranding,
  allowForks,
  dict,
  onChange,
}: {
  pageId: string;
  allowContributions: boolean;
  hideBranding: boolean;
  allowForks: boolean;
  dict: Dictionary;
  onChange?: (page: HtmlPage) => void;
}) {
  const s = dict.pageSettings;
  const [contributions, setContributions] = useState(allowContributions);
  const [showHeader, setShowHeader] = useState(!hideBranding);
  const [forks, setForks] = useState(allowForks);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(nextContributions: boolean, nextShowHeader: boolean, nextForks: boolean) {
    const previous = { contributions, showHeader, forks };
    setContributions(nextContributions);
    setShowHeader(nextShowHeader);
    setForks(nextForks);
    setSaving(true);
    setError(null);

    try {
      const page = await apiFetch<HtmlPage>(`/pages/${pageId}/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          allow_contributions: nextContributions,
          hide_branding: !nextShowHeader,
          allow_forks: nextForks,
        }),
      });
      onChange?.(page);
    } catch (err) {
      setContributions(previous.contributions);
      setShowHeader(previous.showHeader);
      setForks(previous.forks);
      setError(err instanceof ApiError ? err.message : s.error);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 px-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-mute-dim">
          {s.title}
        </p>
        <span className="rounded-full bg-brand-500/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] text-brand-500">
          {s.proOnly}
        </span>
      </div>

      <div className="panel divide-y divide-line-soft">
        <SettingToggle
          label={s.contributions}
          hint={s.contributionsHint}
          checked={contributions}
          disabled={saving}
          onChange={(next) => save(next, showHeader, forks)}
        />
        <SettingToggle
          label={s.forks}
          hint={s.forksHint}
          checked={forks}
          disabled={saving}
          onChange={(next) => save(contributions, showHeader, next)}
        />
        <SettingToggle
          label={s.branding}
          hint={s.brandingHint}
          checked={showHeader}
          disabled={saving}
          onChange={(next) => save(contributions, next, forks)}
        />
      </div>

      {saving && <p className="px-1 text-xs text-mute-dim">{s.saving}</p>}
      {error && <p className="alert alert-error">{error}</p>}
    </div>
  );
}

function SettingToggle({
  label,
  hint,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  disabled: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 p-4">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`mt-0.5 flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors disabled:opacity-50 ${
          checked ? "bg-brand-500" : "bg-white/15"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
      <span className="min-w-0">
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-0.5 block text-xs leading-relaxed text-mute-dim">{hint}</span>
      </span>
    </label>
  );
}
