import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'ar'],

  // ✅ Set Arabic as the default locale
  defaultLocale: 'ar',

  // Only prefix non-default locale in URL (e.g., "/en" but not "/ar")
  localePrefix: 'as-needed'
});
