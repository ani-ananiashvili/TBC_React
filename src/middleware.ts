import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const language = req.cookies.get("language")?.value || "en";

  const supportedLanguages = ["en", "ka"];

  const isApiRequest = pathname.startsWith("/api");
  const isLanguagePrefix = supportedLanguages.some((lang) =>
    pathname.startsWith(`/${lang}`)
  );

  if (
    !isApiRequest &&
    !isLanguagePrefix &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/assets") &&
    !pathname.startsWith("/static") &&
    !pathname.endsWith(".ico")
  ) {
    const url = req.nextUrl.clone();

    url.pathname = `/${language}${pathname}`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path*",
    "/_next/:path*",
    "/assets/:path*",
    "/static/:path*",
    "/favicon.ico",
  ],
};
