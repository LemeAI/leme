"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { MeResponse } from "@/lib/types";

interface UseProfileResult {
  data: MeResponse | null;
  loading: boolean;
  error: Error | undefined;
}

/**
 * Fetches the authenticated user's plan and usage via GET /me.
 *
 * Only runs when a user is signed in. Uses SWR for caching, deduplication
 * and automatic revalidation when the tab regains focus.
 */
export function useProfile(): UseProfileResult {
  const { user, loading: authLoading } = useAuth();

  const key = user ? "/me" : null;

  const { data, error, isLoading } = useSWR<MeResponse>(key, apiFetch, {
    keepPreviousData: false,
  });

  return {
    data: data ?? null,
    loading: authLoading || isLoading,
    error,
  };
}
