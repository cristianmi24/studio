import { HeroSection } from '@/components/sections/hero-section';
// Optionally import useTranslations if needed directly on this page, though unlikely for just HeroSection
// import {useTranslations} from 'next-intl';

export default function Home() {
  // const t = useTranslations('HomePage'); // Example if you needed translations here

  return (
    <div className="flex flex-col">
      <HeroSection />
      {/* Other sections were moved to their own pages */}
    </div>
  );
}
