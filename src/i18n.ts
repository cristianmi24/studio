import {getRequestConfig} from 'next-intl/server';
import { notFound } from 'next/navigation';

// Can be imported from a shared config
export const locales = ['en', 'es'];
export const defaultLocale = 'es';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  // Cast to 'any' to satisfy TypeScript, as includes expects the type of the array elements.
  if (!locales.includes(locale as any)) notFound();

  return {
    locale, // Add the locale property here
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
