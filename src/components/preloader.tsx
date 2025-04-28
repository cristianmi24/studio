'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl'; // Import useTranslations

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
      <div className="preloader-icon"></div>
       {/* Optional: Add translated text */}
       {/* <p className="mt-4 text-muted-foreground">{t('loading')}</p> */}
    </div>
  );
};

export default Preloader;
