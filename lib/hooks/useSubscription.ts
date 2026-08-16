"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { SubscriptionDetailsResponse } from "@/lib/types";

interface UseSubscriptionResult {
  data: SubscriptionDetailsResponse | null;
  loading: boolean;
  error: Error | undefined;
  mutate: () => void;
}

/**
 * Fetches the authenticated user's Pro subscription details via GET /billing/subscription.
 *
 * Only runs when the user is signed in and on the Pro plan.
 */
export function useSubscription(): UseSubscriptionResult {
  const { user, loading: authLoading } = useAuth();

  const key = user ? "/billing/subscription" : null;

  const { data, error, isLoading, mutate } = useSWR<SubscriptionDetailsResponse>(
    key,
    (path) => apiFetch<SubscriptionDetailsResponse>(path, { method: "GET" }),
    {
      keepPreviousData: false,
      shouldRetryOnError: false,
    },
  );

  return {
    data: data ?? null,
    loading: authLoading || isLoading,
    error,
    mutate,
  };
}
