import {createNavigation} from 'next-intl/navigation';
import { routing } from './routing';

// export const locales = ['en', 'ar'] as const;
// export const localePrefix = 'as-needed';

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
