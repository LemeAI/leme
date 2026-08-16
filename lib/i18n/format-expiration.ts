import type { Dictionary } from "./dictionaries/en";
import { formatTemplate } from "./format-template";

export function formatExpiration(dict: Dictionary, expiresAt: string | null): string | null {
  if (!expiresAt) return null;

  const diffMs = new Date(expiresAt).getTime() - Date.now();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return dict.common.expiration.expired;
  if (diffDays === 1) return dict.common.expiration.oneDay;
  return formatTemplate(dict.common.expiration.days, { count: diffDays });
}
