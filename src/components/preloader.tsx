
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl'; // Import useTranslations
import { Loader2 } from 'lucide-react'; // Import a spinner icon

const Preloader = () => {
  const t = useTranslations('Preloader'); // Initialize translations
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${!loading ? 'hidden' : ''}`}>
      <div className="flex flex-col items-center justify-center">
        {/* Loading Spinner */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" /> {/* Slightly larger spinner */}
         {/* Optional: Add translated text */}
         {/* <p className="mt-4 text-muted-foreground">{t('loading')}</p> */}
      </div>
    </div>
  );
};

export default Preloader;
