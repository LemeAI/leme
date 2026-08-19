"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { TemplateCategory, TemplateFilters as Filters } from "@/lib/types";

interface TemplateFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  locale: Locale;
  dict: Dictionary;
}

const CATEGORIES: TemplateCategory[] = ["pm_po", "service_provider", "forms", "other"];

export default function TemplateFilters({ filters, onChange, dict }: TemplateFiltersProps) {
  const [search, setSearch] = useState(filters.search ?? "");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange({ ...filters, search: search.trim() || undefined });
  };

  const setCategory = (category: TemplateCategory | undefined) => {
    onChange({ ...filters, category });
  };

  const t = dict.templates;

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSearchSubmit} className="flex gap-2">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t?.searchPlaceholder ?? "Search templates..."}
          className="field-input flex-1"
        />
        <button type="submit" className="btn btn-ghost">
          {t?.search ?? "Search"}
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory(undefined)}
          className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
            !filters.category
              ? "bg-brand text-white"
              : "bg-white/5 text-mute hover:bg-white/10 hover:text-white"
          }`}
        >
          {t?.allCategories ?? "All"}
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setCategory(category)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              filters.category === category
                ? "bg-brand text-white"
                : "bg-white/5 text-mute hover:bg-white/10 hover:text-white"
            }`}
          >
            {t?.categories?.[category] ?? category}
          </button>
        ))}
      </div>
    </div>
  );
}
