// Helpers de URL da API, sem nenhuma dependência de Firebase — Server
// Components (/p/[id], /s/[token]) importam daqui. Se viessem de lib/api.ts,
// puxariam o SDK cliente do Firebase junto e o inicializariam no servidor,
// que além de inútil quebra o build quando as chaves não estão presentes.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function apiUrl(path: string): string {
  return `${API_URL}${path}`;
}

/** Public URL that serves a page's rendered HTML (storage shim + watermark applied). */
export function getPageContentUrl(pageId: string): string {
  return apiUrl(`/pages/${pageId}/content`);
}

/**
 * Public URL that serves a page's original stored HTML, untouched by the
 * storage shim or watermark. Used to seed the fork editor — forking the
 * decorated version would bake another page's watermark into the copy.
 */
export function getPageSourceUrl(pageId: string): string {
  return apiUrl(`/pages/${pageId}/content?decorate=false`);
}
