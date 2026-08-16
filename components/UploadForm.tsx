"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiError, anonHeaders, apiFetch } from "@/lib/api";
import { useLocale } from "@/lib/i18n/use-locale";
import type { UploadResponse } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

const MAX_SIZE_BYTES = 2 * 1024 * 1024;

export default function UploadForm({ dict }: { dict: Dictionary }) {
  const router = useRouter();
  const locale = useLocale();
  const t = dict.uploadForm;
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    setError(null);

    if (selected && !selected.name.toLowerCase().endsWith(".html")) {
      setError(t.errors.notHtml);
      setFile(null);
      return;
    }
    if (selected && selected.size > MAX_SIZE_BYTES) {
      setError(t.errors.tooLarge);
      setFile(null);
      return;
    }

    setFile(selected);
    if (selected && !title) {
      setTitle(selected.name.replace(/\.html?$/i, ""));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!file) {
      setError(t.errors.noFile);
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title || file.name);
    formData.append("description", description);

    try {
      const data = await apiFetch<UploadResponse>("/uploads", {
        method: "POST",
        body: formData,
        headers: anonHeaders(),
      });

      // Redireciona direto para a página com o HTML renderizado —
      // sem tela intermediária de "sucesso".
      router.push(`/${locale}/p/${data.page.id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t.errors.generic);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="panel flex flex-col gap-5 p-6">
      <label className="field-label">
        {t.fileLabel}
        <input
          type="file"
          accept=".html,text/html"
          onChange={handleFileChange}
          className="field-input file:mr-3 file:cursor-pointer file:rounded file:border-0 file:bg-white/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-white/20"
        />
      </label>

      <label className="field-label">
        {t.titleLabel}
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={t.titlePlaceholder}
          className="field-input"
        />
      </label>

      <label className="field-label">
        {t.descriptionLabel}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder={t.descriptionPlaceholder}
          className="field-input resize-y"
        />
      </label>

      {error && <p className="alert alert-error">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary w-fit disabled:opacity-50"
      >
        {loading ? t.uploading : t.upload}
      </button>
    </form>
  );
}
