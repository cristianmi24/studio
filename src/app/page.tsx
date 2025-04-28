import { HeroSection } from '@/components/sections/hero-section';
import { ContentSection } from '@/components/sections/content-section';
import { ExercisesSection } from '@/components/sections/exercises-section';
import { CreditsSection } from '@/components/sections/credits-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <Separator className="my-12 md:my-16" />
      <ContentSection />
      <Separator className="my-12 md:my-16" />
      <ExercisesSection />
      <Separator className="my-12 md:my-16" />
      <CreditsSection />
      <Separator className="my-12 md:my-16" />
      <ContactSection />
    </div>
  );
}
