"use client";

import useSWRMutation from "swr/mutation";
import CopyLink from "@/components/CopyLink";
import { ApiError, anonHeaders, apiFetch } from "@/lib/api";
import type { ShareResponse } from "@/lib/types";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

interface ShareBody {
  page_id: string;
}

async function createShareLink(
  url: string,
  { arg }: { arg: ShareBody },
): Promise<ShareResponse> {
  return apiFetch<ShareResponse>(url, {
    method: "POST",
    headers: anonHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(arg),
  });
}

export default function ShareButton({
  pageId,
  initialUrl,
  dict,
}: {
  pageId: string;
  initialUrl?: string | null;
  dict: Dictionary;
}) {
  const { data, trigger, isMutating, error } = useSWRMutation(
    "/share-links",
    createShareLink,
  );

  const d = dict.shareButton;
  const url = data?.url ?? initialUrl ?? null;
  const errorMessage =
    error instanceof ApiError ? error.message : error ? d.error : null;

  async function generate() {
    await trigger({ page_id: pageId }, { throwOnError: false });
  }

  if (url) {
    return <CopyLink url={url} dict={dict} />;
  }

  return (
    <div className="flex flex-col items-start gap-1 sm:items-end">
      <button
        onClick={generate}
        disabled={isMutating}
        type="button"
        className="btn btn-ghost shrink-0 py-2 text-xs disabled:opacity-50"
      >
        {isMutating ? d.generating : d.share}
      </button>
      {errorMessage && <span className="text-xs text-red-400">{errorMessage}</span>}
    </div>
  );
}
