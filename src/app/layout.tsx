import type { Metadata } from 'next';
import { Poppins } from 'next/font/google'; // Import Poppins
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster
import { ThemeProvider } from '@/components/theme-provider'; // Import ThemeProvider
import Preloader from '@/components/preloader'; // Import Preloader
import Chatbot from '@/components/chatbot'; // Import Chatbot

// Configure Poppins font
const poppins = Poppins({
  weight: ['400', '600', '700'], // Specify needed weights
  subsets: ['latin'],
  variable: '--font-poppins', // Define CSS variable
});

export const metadata: Metadata = {
  title: 'DataArch Learning - Introducción a Arquitectura de Datos',
  description: 'OVA interactivo sobre arquitectura de datos',
  keywords: 'arquitectura de datos, OVA, aprendizaje interactivo, bases de datos, big data',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning> {/* Add suppressHydrationWarning for ThemeProvider */}
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          poppins.variable // Apply the font variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Preloader />
          <div className="relative flex min-h-dvh flex-col bg-background">
             <Header />
            <main className="flex-1">{children}</main>
             <Footer />
          </div>
          <Chatbot />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
