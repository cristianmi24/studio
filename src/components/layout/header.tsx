

'use client';

import Link from 'next/link'; // Use next-intl Link
import { Button, buttonVariants } from '@/components/ui/button'; // Import buttonVariants
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Menu, Database, Sun, Moon, ChevronDown, Languages } from 'lucide-react'; // Add Languages icon
import { useTheme } from 'next-themes';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger, // Import DropdownMenuTrigger
  DropdownMenuLabel, // Import Label
  DropdownMenuSeparator // Import Separator
} from "@/components/ui/dropdown-menu";
import { modules } from '@/lib/modules-data';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations } from 'next-intl'; // Import next-intl hooks
import { usePathname, useRouter } from 'next/navigation'; // Import Next.js navigation hooks
import { locales } from '@/i18n'; // Import locales

interface HeaderProps {
    locale: string;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('Header'); // Initialize translations for the Header namespace
  const pathname = usePathname(); // Get current pathname (without locale)
  const router = useRouter(); // Get router instance

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const closeMobileSheet = () => setIsMobileSheetOpen(false);

    // Function to switch locale
  const switchLocale = (newLocale: string) => {
    // Replace the locale part of the path
    // Example: /es/contact -> /en/contact
    // Need to remove the current locale prefix first
    const currentLocalePrefix = `/${locale}`;
    const pathWithoutLocale = pathname.startsWith(currentLocalePrefix)
      ? pathname.substring(currentLocalePrefix.length) || '/' // Handle root path case
      : pathname;

    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.replace(newPath); // Use replace to avoid adding to history stack
    closeMobileSheet(); // Close sheet after switching locale
  };

  // Update hrefs to include locale and use translated labels
    const navItemsBase = [
    { label: t('nav_home'), href: `/${locale}/` },
    // Content is handled separately
    { label: t('nav_exercises'), href: `/${locale}/ejercicios` },
    { label: t('nav_credits'), href: `/${locale}/creditos` },
    { label: t('nav_contact'), href: `/${locale}/contacto` },
    ];


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
           {/* Update home link to include locale */}
          <Link href={`/${locale}/`} className="mr-6 flex items-center space-x-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              {t('title')}
            </span>
          </Link>
          {/* Desktop Nav */}
          <nav className="flex items-center gap-1 text-sm">
             {/* **FIX**: Removed Button asChild, applied styles directly to Link */}
             {navItemsBase.map((item) => (
                 <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                        buttonVariants({ variant: "ghost" }), // Apply button styles
                        "transition-colors hover:text-foreground/80 text-foreground/60 px-3" // Keep original classes
                    )}
                    >
                    {item.label}
                </Link>
            ))}
            {/* Contenido Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="transition-colors hover:text-foreground/80 text-foreground/60 px-3">
                    {t('nav_content')} {/* Translate */}
                    <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                 </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                 {/* Update links to include locale */}
                <DropdownMenuItem asChild>
                    <Link href={`/${locale}/contenido`} className="flex items-center gap-2 cursor-pointer">
                         <Database className="h-4 w-4" />
                         <span>{t('content_summary')}</span> {/* Translate */}
                    </Link>
                </DropdownMenuItem>
                {modules.map((module) => {
                   const Icon = module.icon;
                   return (
                     <DropdownMenuItem key={module.id} asChild>
                        {/* Update links to include locale */}
                       <Link href={`/${locale}/modules/${module.id}`} className="flex items-center gap-2 cursor-pointer">
                         <Icon className="h-4 w-4 text-muted-foreground" />
                         {/* Module titles might need translation if module data isn't already localized */}
                         <span>{module.title}</span>
                       </Link>
                     </DropdownMenuItem>
                   );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Mobile Nav Trigger */}
        <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              aria-label={t('toggle_menu')} // Translate aria-label
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">{t('toggle_menu')}</span> {/* Translate */}
            </Button>
          </SheetTrigger>
          {/* Mobile Nav Content */}
          <SheetContent side="left" className="pr-0 w-[280px]">
            {/* Update home link */}
            <Link
              href={`/${locale}/`}
              className="mb-6 flex items-center space-x-2 px-6"
              onClick={closeMobileSheet}
            >
              <Database className="h-6 w-6 text-primary" />
              <span className="font-bold">{t('title')}</span> {/* Translate */}
            </Link>
            <div className="flex flex-col space-y-2 px-2">
               {/* Update links and close sheet on click */}
              {navItemsBase.map((item) => (
                 <SheetClose key={item.label} asChild>
                    <Link
                        href={item.href}
                        className="block rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                        >
                        {item.label}
                    </Link>
                </SheetClose>
              ))}
               {/* Mobile Accordion for Contenido */}
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger className="flex items-center justify-between rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent hover:no-underline [&[data-state=open]>svg]:rotate-90">
                             {t('nav_content')} {/* Translate */}
                        </AccordionTrigger>
                        <AccordionContent className="pb-1 pl-4 pr-2 mt-1">
                             {/* Update link and close sheet */}
                             <SheetClose asChild>
                                <Link
                                    href={`/${locale}/contenido`}
                                    className="block rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                >
                                    {t('content_summary')} {/* Translate */}
                                </Link>
                             </SheetClose>
                             {/* Update module links and close sheet */}
                             {modules.map((module) => (
                                <SheetClose key={module.id} asChild>
                                    <Link
                                        href={`/${locale}/modules/${module.id}`}
                                        className="block rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                    >
                                         {/* Module titles might need translation */}
                                        {module.title}
                                    </Link>
                                </SheetClose>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                 {/* --- Mobile Language Switcher --- */}
                 <div className="px-4 pt-4">
                    <p className="text-sm font-medium text-muted-foreground mb-2">{t('language')}</p>
                    {locales.map((loc) => {
                        const langName = loc === 'en' ? 'English' : 'Español';
                        return (
                            <SheetClose key={loc} asChild>
                                <Button
                                variant={locale === loc ? "secondary" : "ghost"}
                                className="w-full justify-start mb-1"
                                onClick={() => switchLocale(loc)}
                                aria-label={`Switch to ${langName}`} // Add aria-label
                                >
                                {langName}
                                </Button>
                            </SheetClose>
                        );
                    })}
                </div>
                 {/* --- End Mobile Language Switcher --- */}
            </div>
          </SheetContent>
        </Sheet>


        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Mobile Title */}
           <div className="md:hidden">
             {/* Update link */}
             <Link href={`/${locale}/`} className="flex items-center space-x-2">
                <Database className="h-6 w-6 text-primary" />
                 <span className="font-bold">{t('short_title')}</span> {/* Translate */}
             </Link>
           </div>

          <nav className="flex items-center">
            {/* Language Switcher Dropdown - Desktop */}
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label={t('language')}>
                        <Languages className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{t('language')}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {locales.map((loc) => (
                        <DropdownMenuItem
                            key={loc}
                            onClick={() => switchLocale(loc)}
                            className={cn("cursor-pointer", locale === loc && "bg-accent text-accent-foreground")}
                        >
                             {/* Display language name */}
                            {loc === 'en' ? 'English' : 'Español'}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

             {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label={t('toggle_theme')} // Translate
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
