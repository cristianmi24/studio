'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Database, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

// Update hrefs to point to actual page routes
const navItems = [
  { label: 'Inicio', href: '/' }, // Changed from #inicio
  { label: 'Contenido', href: '/contenido' }, // Changed from #contenido
  { label: 'Ejercicios', href: '/ejercicios' }, // Changed from #ejercicios
  { label: 'Créditos', href: '/creditos' }, // Changed from #creditos
  { label: 'Contacto', href: '/contacto' }, // Changed from #contacto
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);


  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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
          <nav className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 w-[240px]">
             {/* Ensure SheetContent closes after navigation */}
             {/* One way is to wrap Link in a function that closes the sheet, */}
             {/* but for simplicity, let's assume default behavior or manual close */}
            <Link
              href="/"
              className="mb-6 flex items-center space-x-2 px-6"
            >
              <Database className="h-6 w-6 text-primary" />
              <span className="font-bold">DataArch Learning</span>
            </Link>
            <div className="flex flex-col space-y-3 px-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground"
                  // onClick={() => { /* Add logic to close sheet if needed */ }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Mobile Title */}
           <div className="md:hidden">
             <Link href="/" className="flex items-center space-x-2">
                <Database className="h-6 w-6 text-primary" />
                 <span className="font-bold">DataArch Learning</span>
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
