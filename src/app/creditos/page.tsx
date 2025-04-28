import { CreditsSection } from '@/components/sections/credits-section';
import { Separator } from '@/components/ui/separator';

export default function CreditosPage() {
  return (
    <div>
        <CreditsSection />
        <Separator className="my-12 md:my-16" /> {/* Optional separator at the end */}
    </div>
  );
}
