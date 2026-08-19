import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "./lib/i18n/config";

const PUBLIC_FILE = /\.(.*)$/;

function getLocale(req: NextRequest): string {
  // Respeita cookie explícito do usuário, se existir.
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && locales.includes(cookieLocale as typeof locales[number])) {
    return cookieLocale;
  }

  // Fallback: detecta pelo Accept-Language.
  const acceptLanguage = req.headers.get("accept-language");
  if (acceptLanguage) {
    for (const lang of acceptLanguage.split(",")) {
      const code = lang.split(";")[0].split("-")[0].toLowerCase();
      if (locales.includes(code as typeof locales[number])) {
        return code;
      }
    }
  }

  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignora arquivos estáticos, API, Next internals, sitemap e robots.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/sitemap.xml") ||
    pathname.startsWith("/robots.txt") ||
    pathname.startsWith("/icon.svg") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Verifica se o pathname já começa com um locale válido.
  const pathnameLocale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameLocale) {
    const response = NextResponse.next();
    response.cookies.set("NEXT_LOCALE", pathnameLocale, { path: "/" });
    return response;
  }

  // Redireciona para o locale detectado.
  const locale = getLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set("NEXT_LOCALE", locale, { path: "/" });
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|sitemap.xml|robots.txt|icon.svg|.*\\.).*)"],
};
