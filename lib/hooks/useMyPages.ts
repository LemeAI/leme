"use client";

import { useEffect, useState } from "react";
import { anonHeaders, apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { HtmlPage } from "@/lib/types";

interface UseMyPagesResult {
  pages: HtmlPage[];
  loading: boolean;
}

/**
 * Lists pages owned by the current identity: the authenticated user's
 * pages via GET /pages/mine, or this browser's anonymous uploads via
 * GET /pages/mine/anonymous when signed out.
 */
export function useMyPages(): UseMyPagesResult {
  const { user, loading: authLoading } = useAuth();
  const [pages, setPages] = useState<HtmlPage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    let cancelled = false;
    setLoading(true);

    const path = user ? "/pages/mine" : "/pages/mine/anonymous";
    const request = user ? apiFetch<HtmlPage[]>(path) : apiFetch<HtmlPage[]>(path, { headers: anonHeaders() });

    request
      .then((result) => {
        if (!cancelled) setPages(result);
      })
      .catch(() => {
        if (!cancelled) setPages([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return { pages, loading };
}
