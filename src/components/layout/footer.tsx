import * as React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40">
      <div className="container flex flex-col items-center justify-center gap-4 h-20 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          {/* <Database className="hidden h-6 w-6 md:inline-block text-primary" /> */}
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {currentYear} DataArch Learning. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
