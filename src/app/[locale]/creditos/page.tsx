import { CreditsSection } from '@/components/sections/credits-section';
import { Separator } from '@/components/ui/separator';
// No specific translations needed directly on this page structure itself
// The CreditsSection component will handle its own translations using useTranslations

export default function CreditosPage() {
  return (
    <div>
        <CreditsSection />
         {/* Separator might be removed if Footer follows directly */}
        {/* <Separator className="my-12 md:my-16" /> */}
    </div>
  );
}
