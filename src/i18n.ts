import {getRequestConfig, unstable_setRequestLocale} from 'next-intl/server'; // Import unstable_setRequestLocale
import { notFound } from 'next/navigation';

// Can be imported from a shared config
export const locales = ['en', 'es'];
export const defaultLocale = 'es';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  // Cast to 'any' to satisfy TypeScript, as includes expects the type of the array elements.
  if (!locales.includes(locale as any)) notFound(); // Validate that the incoming `locale` parameter is valid

  // Explicitly set the locale for this request/render
  unstable_setRequestLocale(locale); // Set the locale context
  return {
    locale, // Add the locale property here
    messages: (await import(`./messages/${locale}.json`)).default
    // Use getMessages() to provide all messages for the client components
  };
});
