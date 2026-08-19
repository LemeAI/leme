"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/api";
import type { PageMemoryRead } from "@/lib/types";

interface UsePageMemoryResult {
  memory: Record<string, string | null>;
  loading: boolean;
  error: Error | undefined;
  refresh: () => void;
}

/**
 * Subscribe to a page's shared memory.
 *
 * Uses SWR for caching and revalidation. The shim inside the rendered HTML
 * writes directly to the backend; this hook lets the Leme UI display the
 * same data and warn about updates when the artifact does not re-render
 * on its own.
 */
export function usePageMemory(pageId: string | null): UsePageMemoryResult {
  const key = pageId ? `/pages/${pageId}/memory` : null;

  const { data, error, isLoading, mutate } = useSWR<PageMemoryRead>(
    key,
    (path) => apiFetch<PageMemoryRead>(path),
    { refreshInterval: 10000, keepPreviousData: false }
  );

  return {
    memory: data?.memory ?? {},
    loading: isLoading,
    error,
    refresh: () => mutate(),
  };
}
