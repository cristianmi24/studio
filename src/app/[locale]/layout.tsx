
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css'; // Adjust path relative to new location
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import Preloader from '@/components/preloader';
import Chatbot from '@/components/chatbot';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/i18n'; // Import locales
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'; // Import getMessages & unstable_setRequestLocale

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

// Since metadata cannot be dynamically generated based on locale easily in the root layout
// without complex setups, we keep it generally applicable or move specific titles to page level.
export const metadata: Metadata = {
  title: {
     default: 'DataArch Learning - Introducción a Arquitectura de Datos',
     template: '%s | DataArch Learning', // Allows pages to set their own title part
  },
  description: 'OVA interactivo sobre arquitectura de datos / Interactive OVA on data architecture',
  keywords: 'arquitectura de datos, OVA, aprendizaje interactivo, bases de datos, big data, data architecture, interactive learning, databases',
};

// Function to generate static params for each locale
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}


export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { locale } = await params; // Await params and then destructure locale
  // Set request locale - Essential for server components using next-intl
  unstable_setRequestLocale(locale);

  // Use getMessages() to provide all messages for the client components
  // getRequestConfig in i18n.ts now handles locale validation.
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          poppins.variable // Apply the font variable here
        )}
      >
         {/* Wrap content with NextIntlClientProvider */}
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            >
            <Preloader />
            <div className="relative flex min-h-dvh flex-col bg-background">
                <Header locale={locale}/>
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
            <Chatbot />
            <Toaster />
            </ThemeProvider>
         </NextIntlClientProvider>
      </body>
    </html>
  );
}
