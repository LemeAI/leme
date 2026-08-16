"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import type { MeResponse } from "@/lib/types";

interface UseProfileResult {
  data: MeResponse | null;
  loading: boolean;
}

interface FetchState {
  /** Identity the profile belongs to; null before anything has loaded. */
  key: string | null;
  data: MeResponse | null;
}

/**
 * Fetches the authenticated user's plan and usage via GET /me.
 *
 * Like `useMyPages`, `loading` is derived rather than assigned inside the
 * effect, which avoids a synchronous setState and the cascading render it
 * causes.
 */
export function useProfile(): UseProfileResult {
  const { user, loading: authLoading } = useAuth();
  const [state, setState] = useState<FetchState>({ key: null, data: null });

  const key = authLoading ? null : user ? `user:${user.uid}` : "anon";

  useEffect(() => {
    if (key === null || !user) return;

    let cancelled = false;
    apiFetch<MeResponse>("/me")
      .then((data) => {
        if (!cancelled) setState({ key, data });
      })
      .catch(() => {
        if (!cancelled) setState({ key, data: null });
      });

    return () => {
      cancelled = true;
    };
  }, [key, user]);

  // Signed out: there is no request to wait on, so nothing is pending.
  if (key === "anon") {
    return { data: null, loading: false };
  }

  const settled = state.key === key;
  return { data: settled ? state.data : null, loading: key === null || !settled };
}
