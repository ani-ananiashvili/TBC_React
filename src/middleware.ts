import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Get the language from cookies 
  const language = req.cookies.get('language')?.value || 'en';

  // supported languages
  const supportedLanguages = ['en', 'ka']; 

  // Check if the pathname starts with '/api' or already contains a language prefix (like /en or /ka)
  const isApiRequest = pathname.startsWith('/api');
  const isLanguagePrefix = supportedLanguages.some(lang => pathname.startsWith(`/${lang}`));

  // If the URL doesn't already have a language prefix, it's not an /api request, and it's not a Next.js internal request (/_next)
  if (!isApiRequest && !isLanguagePrefix && !pathname.startsWith('/_next')) {
    const url = req.nextUrl.clone();

    // Add the language as a dynamic segment ([lang]) and preserve the original pathname
    url.pathname = `/${language}${pathname}`;

    return NextResponse.redirect(url); // Redirect to the language-prefixed URL
  }

  // If the language prefix is already present or it's an /api request, continue as normal
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*', // Match all paths
};
