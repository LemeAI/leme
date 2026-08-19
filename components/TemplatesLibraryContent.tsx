"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/lib/hooks/useProfile";
import { useTemplates } from "@/lib/hooks/useTemplates";
import TemplateCard from "@/components/TemplateCard";
import TemplateFilters from "@/components/TemplateFilters";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { TemplateFilters as Filters } from "@/lib/types";

interface TemplatesLibraryContentProps {
  locale: Locale;
  dict: Dictionary;
}

export default function TemplatesLibraryContent({ locale, dict }: TemplatesLibraryContentProps) {
  const { user } = useAuth();
  const { data: profileData } = useProfile();
  const [filters, setFilters] = useState<Filters>({});
  const { response, loading, error } = useTemplates(filters);

  const t = dict.templates;
  const isPro = profileData?.profile.plan === "pro";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="title-page">{t?.title ?? "Templates"}</h1>
          <p className="mt-2 max-w-2xl text-mute">
            {t?.description ?? "Browse ready-to-use HTML templates. Pro users can clone and customize them."}
          </p>
        </div>
        {!user && (
          <Link href={`/${locale}/login`} className="btn btn-primary">
            {t?.signInToClone ?? "Sign in to clone"}
          </Link>
        )}
        {user && !isPro && (
          <Link href={`/${locale}/pricing`} className="btn btn-brand">
            {t?.upgradeToClone ?? "Upgrade to clone"}
          </Link>
        )}
      </div>

      <TemplateFilters filters={filters} onChange={setFilters} locale={locale} dict={dict} />

      {error && (
        <div className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {t?.error ?? "Could not load templates."}
        </div>
      )}

      {loading && !response && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-xl border border-line-soft bg-surface"
            />
          ))}
        </div>
      )}

      {!loading && !error && response && response.items.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-mute">{t?.empty ?? "No templates found."}</p>
        </div>
      )}

      {response && response.items.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {response.items.map((template) => (
            <TemplateCard key={template.id} template={template} locale={locale} dict={dict} />
          ))}
        </div>
      )}

      {response && response.total > response.limit && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            type="button"
            disabled={filters.offset === 0}
            onClick={() => setFilters({ ...filters, offset: Math.max(0, (filters.offset ?? 0) - response.limit) })}
            className="btn btn-ghost btn-sm disabled:opacity-50"
          >
            {t?.previous ?? "Previous"}
          </button>
          <span className="text-sm text-mute">
            {Math.min((filters.offset ?? 0) + response.limit, response.total)} / {response.total}
          </span>
          <button
            type="button"
            disabled={(filters.offset ?? 0) + response.limit >= response.total}
            onClick={() => setFilters({ ...filters, offset: (filters.offset ?? 0) + response.limit })}
            className="btn btn-ghost btn-sm disabled:opacity-50"
          >
            {t?.next ?? "Next"}
          </button>
        </div>
      )}
    </div>
  );
}
