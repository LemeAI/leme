"use client";

import useSWR from "swr";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { InvoicesResponse } from "@/lib/types";

interface UseInvoicesResult {
  data: InvoicesResponse | null;
  loading: boolean;
  error: Error | undefined;
}

/**
 * Fetches the authenticated user's Stripe invoice history via GET /billing/invoices.
 */
export function useInvoices(): UseInvoicesResult {
  const { user, loading: authLoading } = useAuth();

  const key = user ? "/billing/invoices" : null;

  const { data, error, isLoading } = useSWR<InvoicesResponse>(
    key,
    (path) => apiFetch<InvoicesResponse>(path, { method: "GET" }),
    {
      keepPreviousData: false,
      shouldRetryOnError: false,
    },
  );

  return {
    data: data ?? null,
    loading: authLoading || isLoading,
    error,
  };
}
