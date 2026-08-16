"use client";

import { useEffect, useState } from "react";
import { anonHeaders, apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { HtmlPage } from "@/lib/types";

interface UseMyPagesResult {
  pages: HtmlPage[];
  loading: boolean;
}

interface FetchState {
  /** Identity the pages belong to; null before anything has loaded. */
  key: string | null;
  pages: HtmlPage[];
}

/**
 * Lists pages owned by the current identity: the authenticated user's
 * pages via GET /pages/mine, or this browser's anonymous uploads via
 * GET /pages/mine/anonymous when signed out.
 *
 * `loading` is derived by comparing the identity we have data for against
 * the current one, rather than being set at the top of the effect —
 * calling setState synchronously in an effect body triggers an extra
 * render pass on every identity change.
 */
export function useMyPages(): UseMyPagesResult {
  const { user, loading: authLoading } = useAuth();
  const [state, setState] = useState<FetchState>({ key: null, pages: [] });

  const key = authLoading ? null : user ? `user:${user.uid}` : "anon";

  useEffect(() => {
    if (key === null) return;

    let cancelled = false;
    const path = user ? "/pages/mine" : "/pages/mine/anonymous";
    const request = user
      ? apiFetch<HtmlPage[]>(path)
      : apiFetch<HtmlPage[]>(path, { headers: anonHeaders() });

    request
      .then((pages) => {
        if (!cancelled) setState({ key, pages });
      })
      .catch(() => {
        if (!cancelled) setState({ key, pages: [] });
      });

    return () => {
      cancelled = true;
    };
  }, [key, user]);

  const settled = state.key === key;
  return { pages: settled ? state.pages : [], loading: key === null || !settled };
}
