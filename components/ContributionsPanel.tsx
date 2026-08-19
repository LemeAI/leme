"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ApiError, anonHeaders, apiFetch } from "@/lib/api";
import { useLocale } from "@/lib/i18n/use-locale";
import { formatTemplate } from "@/lib/i18n/format-template";
import ForkEditorModal from "@/components/ForkEditorModal";
import type { Contribution, ContributionType, ForkIconChoice } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

const TYPE_KEYS: Record<ContributionType, keyof Dictionary["contributions"]> = {
  comment: "typeComment",
  suggestion: "typeSuggestion",
  fork: "typeFork",
};

const TYPE_COLORS: Record<ContributionType, string> = {
  comment: "bg-white/10 text-mute",
  suggestion: "bg-amber-500/10 text-amber-400",
  fork: "bg-brand-500/15 text-brand-500",
};

export default function ContributionsPanel({
  pageId,
  pageTitle,
  pageHtml,
  initialContributions,
  allowForks,
  dict,
}: {
  pageId: string;
  pageTitle: string;
  pageHtml: string;
  initialContributions: Contribution[];
  allowForks: boolean;
  dict: Dictionary;
}) {
  const [contributions, setContributions] = useState(initialContributions);
  const locale = useLocale();
  const d = dict.contributions;
  const de = dict.forkEditor;
  const [type, setType] = useState<ContributionType>("comment");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [forkTitle, setForkTitle] = useState(
    formatTemplate(dict.contributions.forkOf, { title: pageTitle }),
  );
  const [forkHtml] = useState(pageHtml);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const typeLabel = (key: keyof Dictionary["contributions"]) => d[key] as string;

  function openEditor() {
    setEditorKey((k) => k + 1);
    setIsEditorOpen(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (type === "fork") {
      if (!allowForks) return;
      openEditor();
      return;
    }

    setLoading(true);
    setError(null);

    const payload: Record<string, unknown> = {
      page_id: pageId,
      type,
      author_name: authorName,
      content,
    };

    try {
      const contribution = await apiFetch<Contribution>("/contributions", {
        method: "POST",
        headers: anonHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(payload),
      });

      setContributions((prev) => [contribution, ...prev]);
      setContent("");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : d.error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateFork({
    title,
    html,
    message,
    authorName: forkAuthorName,
    icon,
  }: {
    title: string;
    html: string;
    message: string;
    authorName: string;
    icon: ForkIconChoice;
  }) {
    setLoading(true);
    setError(null);

    const payload: Record<string, unknown> = {
      page_id: pageId,
      type: "fork",
      author_name: forkAuthorName || authorName,
      content: message,
      html_content: html,
      title,
      icon_type: icon.type,
      icon_value: icon.value,
      icon_color: icon.color,
    };

    try {
      const contribution = await apiFetch<Contribution>("/contributions", {
        method: "POST",
        headers: anonHeaders({ "Content-Type": "application/json" }),
        body: JSON.stringify(payload),
      });

      setContributions((prev) => [contribution, ...prev]);
      setContent("");
      setIsEditorOpen(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : d.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={handleSubmit}
        className="panel flex flex-col gap-4 p-5"
      >
        <div className="flex gap-2 text-xs">
          {(Object.keys(TYPE_KEYS) as ContributionType[]).map((t) => {
            const disabled = t === "fork" && !allowForks;
            return (
              <button
                key={t}
                type="button"
                disabled={disabled}
                onClick={() => setType(t)}
                className={`rounded-full px-3 py-1 font-medium transition-colors ${
                  type === t ? "bg-white text-black" : "bg-white/5 text-mute hover:text-white"
                } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                title={disabled ? (d.forkDisabledHint as string | undefined) : undefined}
              >
                {typeLabel(TYPE_KEYS[t])}
              </button>
            );
          })}
        </div>

        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder={d.authorPlaceholder}
          className="field-input mt-0"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={
            type === "comment"
              ? d.commentPlaceholder
              : type === "suggestion"
              ? d.suggestionPlaceholder
              : d.forkMessagePlaceholder
          }
          rows={3}
          required={type !== "fork"}
          className="field-input mt-0"
        />

        {error && <p className="alert alert-error">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-fit disabled:opacity-50"
        >
          {loading
            ? d.submitting
            : type === "fork"
            ? de.openEditor
            : d.submit}
        </button>
      </form>

      <ul className="flex flex-col gap-3">
        {contributions.length === 0 && (
          <p className="text-sm text-mute-dim">{d.emptyState}</p>
        )}
        {contributions.map((c) => (
          <li
            key={c.id}
            className="panel p-4 text-sm"
          >
            <div className="mb-1 flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${TYPE_COLORS[c.type]}`}>
                {typeLabel(TYPE_KEYS[c.type])}
              </span>
              <span className="font-medium">{c.author_name}</span>
              <span className="text-xs text-mute-dim">{formatDate(c.created_at, locale)}</span>
            </div>
            <p className="text-mute">{c.content}</p>
            {c.type === "fork" && c.fork_page_id && (
              <Link
                href={`/${locale}/p/${c.fork_page_id}`}
                className="mt-2 inline-block text-xs text-brand-500 transition-colors hover:text-brand-400"
              >
                {d.viewFork}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <ForkEditorModal
        key={editorKey}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        initialHtml={forkHtml}
        initialTitle={forkTitle}
        pageTitle={pageTitle}
        authorName={authorName}
        forkMessage={content}
        dict={dict}
        onCreateFork={handleCreateFork}
        loading={loading}
      />
    </div>
  );
}
