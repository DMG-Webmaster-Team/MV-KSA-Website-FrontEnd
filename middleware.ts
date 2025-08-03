import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server'; // Import types
// import { localePrefix, locales } from './navigation';
import { routing } from './routing';
const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    // const { pathname, origin } = request.nextUrl;

  // Handle the localization middleware
  // const localeMiddleware = createMiddleware({
  //   localeDetection: false,
  //   defaultLocale: 'ar',
  //   locales,
  //   localePrefix
  // });

  // Run the locale middleware first
  return intlMiddleware(request);

  // return localeResponse || NextResponse.next();
}

export const config = {
  // Skip paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
