"use client";

import useSWR from "swr";
import { getTemplates } from "@/lib/api";
import type { TemplateFilters, TemplateListResponse } from "@/lib/types";

interface UseTemplatesResult {
  response: TemplateListResponse | undefined;
  loading: boolean;
  error: Error | undefined;
  refresh: () => void;
}

/**
 * Lists published templates from the public template library.
 *
 * The key includes the filters so changing category, tag, or search refetches.
 */
export function useTemplates(filters: TemplateFilters = {}): UseTemplatesResult {
  const key = ["/templates", filters] as const;

  const fetcher = async (): Promise<TemplateListResponse> => {
    return getTemplates(key[1]);
  };

  const { data, error, isLoading, mutate } = useSWR<TemplateListResponse>(
    key,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  return {
    response: data,
    loading: isLoading,
    error,
    refresh: () => {
      void mutate();
    },
  };
}
