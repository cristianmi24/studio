import { ExercisesSection } from '@/components/sections/exercises-section';
import { Separator } from '@/components/ui/separator';

export default function EjerciciosPage() {
  return (
     <div>
        <ExercisesSection />
        <Separator className="my-12 md:my-16" /> {/* Optional separator at the end */}
    </div>
  );
}
