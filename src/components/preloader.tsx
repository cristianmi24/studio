'use client';

import { useState, useEffect } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`preloader ${!loading ? 'hidden' : ''}`}>
      {/* You can replace this simple spinner with an SVG, image, or more complex animation */}
      <div className="preloader-icon"></div>
       {/* Optional: Add text like "Cargando..." */}
       {/* <p className="mt-4 text-muted-foreground">Cargando...</p> */}
    </div>
  );
};

export default Preloader;
