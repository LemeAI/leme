const ANON_ID_KEY = "leme_anon_id";

/**
 * Client-generated identifier for uploads made without an account, sent as
 * the X-Anon-Id header. Replaces the old httpOnly cookie now that the API
 * lives on a different origin than the frontend — cross-site cookies are
 * fragile under Safari/Firefox tracking prevention, while a header works
 * the same everywhere. Same guarantee as before: an opaque technical id,
 * never personal data.
 */
export function getOrCreateAnonId(): string {
  if (typeof window === "undefined") return "";

  let anonId = window.localStorage.getItem(ANON_ID_KEY);
  if (!anonId) {
    anonId = crypto.randomUUID();
    window.localStorage.setItem(ANON_ID_KEY, anonId);
  }
  return anonId;
}

export function getAnonId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ANON_ID_KEY);
}
