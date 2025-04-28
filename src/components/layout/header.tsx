'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'; // Import SheetClose
import { Menu, Database, Sun, Moon, ChevronDown, ChevronRight } from 'lucide-react'; // Import ChevronDown/Right
import { useTheme } from 'next-themes';
import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Import DropdownMenu components
import { modules } from '@/lib/modules-data'; // Import modules data
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion" // Import Accordion for mobile nav


// Update hrefs to point to actual page routes
const navItemsBase = [
  { label: 'Inicio', href: '/' },
  // Contenido is handled separately now with dropdown/accordion
  { label: 'Ejercicios', href: '/ejercicios' },
  { label: 'Créditos', href: '/creditos' },
  { label: 'Contacto', href: '/contacto' },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMobileSheetOpen, setIsMobileSheetOpen] = React.useState(false); // State for mobile sheet


  React.useEffect(() => setMounted(true), []);


  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const closeMobileSheet = () => setIsMobileSheetOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              DataArch Learning
            </span>
          </Link>
          {/* Desktop Nav */}
          <nav className="flex items-center gap-1 text-sm">
             {navItemsBase.map((item) => (
              <Button key={item.label} variant="ghost" asChild className="transition-colors hover:text-foreground/80 text-foreground/60 px-3">
                <Link href={item.href}>
                  {item.label}
                </Link>
               </Button>
            ))}
            {/* Contenido Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                 <Button variant="ghost" className="transition-colors hover:text-foreground/80 text-foreground/60 px-3">
                    Contenido
                    <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                 </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                    <Link href="/contenido" className="flex items-center gap-2 cursor-pointer">
                         <Database className="h-4 w-4" /> {/* Example icon */}
                         <span>Ver Resumen Contenido</span>
                    </Link>
                </DropdownMenuItem>
                {modules.map((module) => {
                   const Icon = module.icon;
                   return (
                     <DropdownMenuItem key={module.id} asChild>
                       <Link href={`/modules/${module.id}`} className="flex items-center gap-2 cursor-pointer">
                         <Icon className="h-4 w-4 text-muted-foreground" />
                         <span>{module.title}</span>
                       </Link>
                     </DropdownMenuItem>
                   );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Mobile Nav */}
        <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              aria-label="Toggle Menu"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 w-[280px]">
            <Link
              href="/"
              className="mb-6 flex items-center space-x-2 px-6"
              onClick={closeMobileSheet}
            >
              <Database className="h-6 w-6 text-primary" />
              <span className="font-bold">DataArch Learning</span>
            </Link>
            <div className="flex flex-col space-y-2 px-2">
              {navItemsBase.map((item) => (
                 <SheetClose key={item.label} asChild>
                    <Link
                        href={item.href}
                        className="block rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent"
                        // onClick={closeMobileSheet} // Now handled by SheetClose
                        >
                        {item.label}
                    </Link>
                </SheetClose>
              ))}
               {/* Mobile Accordion for Contenido */}
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b-0">
                        <AccordionTrigger className="flex items-center justify-between rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent hover:no-underline [&[data-state=open]>svg]:rotate-90">
                            Contenido
                             {/* Using ChevronRight, rotates 90deg when open */}
                            {/* <ChevronRight className="h-4 w-4 shrink-0 transition-transform duration-200" /> */}
                        </AccordionTrigger>
                        <AccordionContent className="pb-1 pl-4 pr-2 mt-1">
                             {/* Link to main content page */}
                             <SheetClose asChild>
                                <Link
                                    href="/contenido"
                                    className="block rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                >
                                    Resumen Contenido
                                </Link>
                             </SheetClose>
                             {/* Links to individual modules */}
                             {modules.map((module) => (
                                <SheetClose key={module.id} asChild>
                                    <Link
                                        href={`/modules/${module.id}`}
                                        className="block rounded-md px-4 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                    >
                                        {module.title}
                                    </Link>
                                </SheetClose>
                            ))}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Mobile Title */}
           <div className="md:hidden">
             <Link href="/" className="flex items-center space-x-2">
                <Database className="h-6 w-6 text-primary" />
                 <span className="font-bold">DataArch</span> {/* Shortened for mobile */}
             </Link>
           </div>
          <nav className="flex items-center">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
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
