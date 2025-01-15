import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Language prefixing middleware
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

export const updateSession = async (request: NextRequest) => {
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const user = await supabase.auth.getUser();

    if (request.nextUrl.pathname.startsWith("/home") && user.error) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (request.nextUrl.pathname === "/" && !user.error) {
      return NextResponse.redirect(new URL("/home", request.url));
    }

    return response;
  } catch (e) {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};

export const config = {
  matcher: [
    "/:path*",
    "/_next/:path*",
    "/assets/:path*",
    "/static/:path*",
    "/favicon.ico",
  ],
};
