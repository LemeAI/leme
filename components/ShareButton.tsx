"use client";

import useSWRMutation from "swr/mutation";
import CopyLink from "@/components/CopyLink";
import { ApiError, apiFetch } from "@/lib/api";
import type { ShareResponse } from "@/lib/types";

interface ShareBody {
  page_id: string;
}

async function createShareLink(
  url: string,
  { arg }: { arg: ShareBody },
): Promise<ShareResponse> {
  return apiFetch<ShareResponse>(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
}

export default function ShareButton({
  pageId,
  initialUrl,
}: {
  pageId: string;
  initialUrl?: string | null;
}) {
  const { data, trigger, isMutating, error } = useSWRMutation(
    "/share-links",
    createShareLink,
  );

  const url = data?.url ?? initialUrl ?? null;
  const errorMessage =
    error instanceof ApiError
      ? error.message
      : error
        ? "Connection error while generating the link."
        : null;

  async function generate() {
    await trigger({ page_id: pageId });
  }

  if (url) {
    return <CopyLink url={url} />;
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={generate}
        disabled={isMutating}
        type="button"
        className="rounded-full bg-brand-500 px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-brand-600 disabled:opacity-50"
      >
        {isMutating ? "Generating..." : "Share"}
      </button>
      {errorMessage && <span className="text-xs text-red-600">{errorMessage}</span>}
    </div>
  );
}
