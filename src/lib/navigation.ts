import { createNavigation } from 'next-intl/navigation';
import { locales } from '@/i18n';
import { defineRouting } from 'next-intl/routing';

const routing = defineRouting({ locales, defaultLocale: 'en' });

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
