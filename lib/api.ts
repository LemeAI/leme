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

export interface ApiFetchOptions extends RequestInit {
  /** Request timeout in milliseconds. Defaults to 10 seconds. */
  timeoutMs?: number;
  /** Number of retry attempts for transient failures (5xx / network). Defaults to 2. */
  retries?: number;
}

const DEFAULT_TIMEOUT_MS = 10_000;
const DEFAULT_RETRIES = 2;

function generateRequestId(): string {
  // Simple, URL-safe 16-character ID. Good enough for request correlation
  // without adding a UUID library to the bundle.
  return Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join("");
}

/**
 * Build an AbortSignal that fires after `timeoutMs`, combined with any
 * caller-provided signal so both can cancel the request.
 */
function combineSignals(callerSignal: AbortSignal | undefined, timeoutMs: number): AbortSignal {
  if (typeof AbortSignal !== "undefined" && "timeout" in AbortSignal) {
    const timeoutSignal = AbortSignal.timeout(timeoutMs);
    if (!callerSignal) return timeoutSignal;

    const controller = new AbortController();
    const abort = () => controller.abort();
    timeoutSignal.addEventListener("abort", abort);
    callerSignal.addEventListener("abort", abort);
    return controller.signal;
  }

  // Fallback for older environments.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  callerSignal?.addEventListener("abort", () => controller.abort());
  return controller.signal;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function attemptFetch<T>(
  path: string,
  options: ApiFetchOptions,
  requestId: string,
): Promise<T> {
  const {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    retries: _retries,
    headers: originalHeaders,
    ...rest
  } = options;

  const headers = new Headers(originalHeaders);
  headers.set("X-Request-ID", requestId);

  const signal = combineSignals(options.signal ?? undefined, timeoutMs);

  const response = await fetch(apiUrl(path), {
    ...rest,
    headers,
    signal,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(response.status, body?.detail ?? "Request failed.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

/**
 * Wrapper around `fetch` for calling the Leme backend.
 *
 * - Attaches the Firebase ID token as a Bearer header when a user is signed in.
 * - Adds a per-request timeout and respects caller-provided AbortSignals.
 * - Retries transient failures (network errors and 5xx responses) with
 *   exponential backoff, but never retries client errors (4xx).
 * - Adds an `X-Request-ID` header for end-to-end tracing.
 */
export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  const currentUser = getFirebaseAuth().currentUser;

  if (currentUser) {
    const token = await currentUser.getIdToken();
    headers.set("Authorization", `Bearer ${token}`);
  }

  const requestId = generateRequestId();
  const maxAttempts = Math.max(1, (options.retries ?? DEFAULT_RETRIES) + 1);

  let lastError: Error | undefined;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await attemptFetch<T>(path, { ...options, headers }, requestId);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      const isRetryable =
        !(lastError instanceof ApiError && lastError.status >= 400 && lastError.status < 500);

      if (!isRetryable || attempt === maxAttempts - 1) {
        break;
      }

      // Exponential backoff: 200ms, 400ms, 800ms... capped at 5s.
      await sleep(Math.min(200 * 2 ** attempt, 5000));
    }
  }

  throw lastError ?? new Error("Unknown API error.");
}

export function anonHeaders(init?: HeadersInit): Headers {
  const headers = new Headers(init);
  if (!getFirebaseAuth().currentUser) {
    headers.set("X-Anon-Id", getOrCreateAnonId());
  }
  return headers;
}

import type {
  Template,
  TemplateCloneResponse,
  TemplateCreateRequest,
  TemplateFilters,
  TemplateListResponse,
  TemplateUpdateRequest,
} from "@/lib/types";

export async function getTemplates(filters: TemplateFilters = {}): Promise<TemplateListResponse> {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.tag) params.set("tag", filters.tag);
  if (filters.search) params.set("search", filters.search);
  if (filters.is_official !== undefined) params.set("is_official", String(filters.is_official));
  const query = params.toString();
  return apiFetch<TemplateListResponse>(`/templates${query ? `?${query}` : ""}`);
}

export async function getTemplate(id: string): Promise<Template> {
  return apiFetch<Template>(`/templates/${id}`);
}

export async function publishTemplate(payload: TemplateCreateRequest): Promise<Template> {
  return apiFetch<Template>("/templates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function updateTemplate(id: string, payload: TemplateUpdateRequest): Promise<Template> {
  return apiFetch<Template>(`/templates/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export async function deleteTemplate(id: string): Promise<void> {
  return apiFetch<void>(`/templates/${id}`, { method: "DELETE" });
}

export async function cloneTemplate(id: string): Promise<TemplateCloneResponse> {
  return apiFetch<TemplateCloneResponse>(`/templates/${id}/clone`, { method: "POST" });
}
