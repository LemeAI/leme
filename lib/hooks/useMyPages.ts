"use client";

import useSWR from "swr";
import { apiFetch, anonHeaders } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { HtmlPage } from "@/lib/types";

interface UseMyPagesResult {
  pages: HtmlPage[];
  loading: boolean;
  error: Error | undefined;
  refresh: () => void;
}

/**
 * Lists pages owned by the current identity: the authenticated user's
 * pages via GET /pages/mine, or this browser's anonymous uploads via
 * GET /pages/mine/anonymous when signed out.
 *
 * Uses SWR for request deduplication, caching and stale-while-revalidate.
 * The key changes whenever the Firebase identity changes, so signing in/out
 * automatically refetches.
 */
export function useMyPages(): UseMyPagesResult {
  const { user, loading: authLoading } = useAuth();

  const key = authLoading
    ? null
    : user
      ? (["/pages/mine", "user"] as const)
      : (["/pages/mine/anonymous", "anon"] as const);

  const { data, error, isLoading, mutate } = useSWR<HtmlPage[]>(
    key,
    async ([path, kind]) => {
      const headers = kind === "anon" ? anonHeaders() : undefined;
      return apiFetch<HtmlPage[]>(path, headers ? { headers } : {});
    },
    {
      // Avoid showing stale anonymous pages while the auth state is still
      // resolving or right after signing in/out.
      keepPreviousData: false,
    },
  );

  return {
    pages: data ?? [],
    loading: authLoading || isLoading,
    error,
    refresh: () => {
      void mutate();
    },
  };
}
