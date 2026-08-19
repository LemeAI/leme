"use client";

import { useState } from "react";
import { usePublishTemplate } from "@/lib/hooks/usePublishTemplate";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";
import type { ForkIconChoice, TemplateCategory } from "@/lib/types";

const CATEGORIES: TemplateCategory[] = ["pm_po", "service_provider", "forms", "other"];

interface PublishTemplatePanelProps {
  pageId: string;
  pageTitle: string;
  pageDescription: string | null;
  icon: ForkIconChoice;
  dict: Dictionary;
  onPublished?: () => void;
}

export default function PublishTemplatePanel({
  pageId,
  pageTitle,
  pageDescription,
  icon,
  dict,
  onPublished,
}: PublishTemplatePanelProps) {
  const t = dict.templates?.publishPanel;
  const { publish, publishing, error } = usePublishTemplate();
  const [title, setTitle] = useState(pageTitle);
  const [description, setDescription] = useState(pageDescription ?? "");
  const [category, setCategory] = useState<TemplateCategory>("other");
  const [tags, setTags] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await publish({
      source_page_id: pageId,
      title: title.trim() || pageTitle,
      description: description.trim() || undefined,
      category,
      tags: tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean),
      icon,
    });
    onPublished?.();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="field-label mb-1.5 block text-xs">{t?.titleLabel ?? "Title"}</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="field-input w-full"
          required
        />
      </div>

      <div>
        <label className="field-label mb-1.5 block text-xs">{t?.descriptionLabel ?? "Description"}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="field-input w-full"
        />
      </div>

      <div>
        <label className="field-label mb-1.5 block text-xs">{t?.categoryLabel ?? "Category"}</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as TemplateCategory)}
          className="field-input w-full"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {dict.templates?.categories?.[cat] ?? cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="field-label mb-1.5 block text-xs">{t?.tagsLabel ?? "Tags (comma separated)"}</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder={t?.tagsPlaceholder ?? "lead, form, saas"}
          className="field-input w-full"
        />
      </div>

      {error && <p className="alert alert-error text-sm">{error.message}</p>}

      <button type="submit" disabled={publishing} className="btn btn-primary disabled:opacity-50">
        {publishing ? (t?.publishing ?? "Publishing...") : (t?.publishButton ?? "Publish as template")}
      </button>
    </form>
  );
}
