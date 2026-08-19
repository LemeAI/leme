"use client";

import { useState, useCallback } from "react";
import { cloneTemplate } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/lib/hooks/useProfile";
import type { HtmlPage } from "@/lib/types";

interface UseCloneTemplateResult {
  clone: (id: string) => Promise<HtmlPage | null>;
  cloning: boolean;
  error: Error | null;
}

/**
 * Clones a template into the current user's account.
 *
 * Returns null when the user is not authenticated or not on a Pro plan,
 * so callers can redirect to login or show an upsell.
 */
export function useCloneTemplate(): UseCloneTemplateResult {
  const { user } = useAuth();
  const { data: profileData } = useProfile();
  const [cloning, setCloning] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clone = useCallback(
    async (id: string): Promise<HtmlPage | null> => {
      if (!user) {
        return null;
      }
      if (profileData?.profile.plan !== "pro") {
        return null;
      }
      setCloning(true);
      setError(null);
      try {
        const result = await cloneTemplate(id);
        return result.page;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Clone failed.");
        setError(error);
        throw error;
      } finally {
        setCloning(false);
      }
    },
    [user, profileData?.profile.plan],
  );

  return { clone, cloning, error };
}
