import { getFirebaseAuth } from "@/lib/firebase";
import { getOrCreateAnonId } from "@/lib/anon-client";
import { apiUrl } from "@/lib/api-url";

export { apiUrl, getPageContentUrl, getPageSourceUrl } from "@/lib/api-url";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  const currentUser = getFirebaseAuth().currentUser;

  if (currentUser) {
    const token = await currentUser.getIdToken();
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(apiUrl(path), { ...options, headers });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(response.status, body?.detail ?? "Request failed.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export function anonHeaders(init?: HeadersInit): Headers {
  const headers = new Headers(init);
  if (!getFirebaseAuth().currentUser) {
    headers.set("X-Anon-Id", getOrCreateAnonId());
  }
  return headers;
}

