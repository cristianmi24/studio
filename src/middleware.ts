import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n'; // Import locales and defaultLocale

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: defaultLocale,

  // Make sure pathnames like `/users/[id]` are matched via path-to-regexp
  // localePrefix: 'as-needed' // Default
});

export const config = {
  // Match only internationalized pathnames
  // Updated matcher to include API routes, static files, etc.
  matcher: [
    // Match all routes except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - images/ (public images folder) - assuming you have one
    '/((?!api|_next/static|_next/image|images|favicon.ico).*)'
    // Match the root path explicitly if needed, depending on localePrefix setting
    // '/'
 ]
};