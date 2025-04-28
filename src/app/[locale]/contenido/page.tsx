import { ContentSection } from '@/components/sections/content-section';
import { Separator } from '@/components/ui/separator';
// No specific translations needed directly on this page structure itself
// The ContentSection component will handle its own translations using useTranslations

export default function ContenidoPage() {
  return (
    <div>
        <ContentSection />
        {/* Separator might be removed if Footer follows directly */}
        {/* <Separator className="my-12 md:my-16" /> */}
    </div>
  );
}
