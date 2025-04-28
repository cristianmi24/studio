import { ContactSection } from '@/components/sections/contact-section';
// No specific translations needed directly on this page structure itself
// The ContactSection component will handle its own translations using useTranslations

export default function ContactoPage() {
  return (
    <div>
        <ContactSection />
         {/* No separator needed usually for the last section before footer */}
    </div>
  );
}
