"use client";

import type { ReactNode } from "react";
import { SWRConfig } from "swr";
import { apiFetch, ApiError } from "@/lib/api";

/**
 * Global SWR fetcher used by all data hooks.
 *
 * `apiFetch` already attaches Firebase ID tokens when the user is signed in,
 * so the SWR layer only needs to know the URL.
 */
export async function apiSWR<T>(url: string): Promise<T> {
  return apiFetch<T>(url);
}

/**
 * SWR configuration shared across the application.
 *
 * - dedupingInterval avoids duplicate in-flight requests for the same key.
 * - focusThrottleInterval prevents revalidation storms when the window is
 *   focused repeatedly.
 * - errorRetryCount limits automatic retries on transient failures.
 * - keepPreviousData reduces layout shifts while a new identity loads.
 */
export const swrConfig = {
  fetcher: apiSWR,
  dedupingInterval: 2_000,
  focusThrottleInterval: 5_000,
  errorRetryCount: 3,
  errorRetryInterval: 2_000,
  keepPreviousData: true,
  shouldRetryOnError: (error: ApiError | Error) => {
    // Do not retry client errors (4xx) by default; the request itself is wrong.
    if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
      return false;
    }
    return true;
  },
};

export function SWRProvider({ children }: { children: ReactNode }) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
