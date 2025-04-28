import { ExercisesSection } from '@/components/sections/exercises-section';
import { Separator } from '@/components/ui/separator';
// No specific translations needed directly on this page structure itself
// The ExercisesSection component will handle its own translations using useTranslations

export default function EjerciciosPage() {
  return (
     <div>
        <ExercisesSection />
         {/* Separator might be removed if Footer follows directly */}
        {/* <Separator className="my-12 md:my-16" /> */}
    </div>
  );
}
