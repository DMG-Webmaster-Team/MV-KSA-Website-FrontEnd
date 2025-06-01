import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server'; // Import types
import { localePrefix, locales } from './navigation';
import Cookies from "js-cookie";
export default function middleware(req:NextRequest) {
  // Handle the localization middleware
  const localeMiddleware = createMiddleware({
    localeDetection: false,
    defaultLocale: 'en',
    locales,
    localePrefix
  });

  // Run the locale middleware first
  const localeResponse = localeMiddleware(req);

  // Perform authentication check for protected routes
  const token = req.cookies.get('auth_token')?.value || '';

  const { pathname } = req.nextUrl;

  // Define protected routes that require authentication
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];

  // If the user is trying to access a protected route without a token, redirect to login
  if (!token && protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Return the response (either the locale check or the next response after auth check)
  return localeResponse || NextResponse.next();
}

export const config = {
  // Skip paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
