import { ContentSection } from '@/components/sections/content-section';
import { Separator } from '@/components/ui/separator';

export default function ContenidoPage() {
  return (
    <div>
        <ContentSection />
        <Separator className="my-12 md:my-16" /> {/* Optional separator at the end */}
    </div>
  );
}
