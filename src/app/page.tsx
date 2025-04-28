import { HeroSection } from '@/components/sections/hero-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      {/* Other sections will be moved to their own pages */}
    </div>
  );
}
