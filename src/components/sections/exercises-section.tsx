'use client'; // Mark as client component if it needs client-side JS (likely for actual exercises)

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Move, Puzzle, ListChecks } from "lucide-react";
import { useTranslations } from 'next-intl'; // Import useTranslations

export function ExercisesSection() {
  const t = useTranslations('ExercisesSection'); // Initialize translations

  return (
    // Using secondary color for background might not be standard ShadCN, consider removing bg-secondary
    // or applying it differently if intended. For now, keeping it as per original code.
    <section id="ejercicios" className="container py-12 md:py-20 bg-secondary rounded-lg shadow-inner">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
         {t('title')} {/* Translate section title */}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Exercise 1: Drag and Drop */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">{t('drag_drop_title')}</CardTitle> {/* Translate */}
             <Move className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {t('drag_drop_desc')} {/* Translate */}
            </CardDescription>
            {/* Placeholder */}
            <div className="h-40 bg-muted rounded-md flex items-center justify-center text-muted-foreground italic">
              {t('coming_soon_area')} {/* Translate */}
            </div>
             <Button variant="outline" className="mt-4 w-full" disabled>{t('drag_drop_button')}</Button> {/* Translate */}
          </CardContent>
        </Card>

        {/* Exercise 2: Mini-Game (Ordering Steps) */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">{t('order_steps_title')}</CardTitle> {/* Translate */}
             <Puzzle className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
             {t('order_steps_desc')} {/* Translate */}
            </CardDescription>
            {/* Placeholder */}
            <div className="h-40 bg-muted rounded-md flex items-center justify-center text-muted-foreground italic">
               {t('coming_soon_area')} {/* Translate */}
            </div>
            <Button variant="outline" className="mt-4 w-full" disabled>{t('order_steps_button')}</Button> {/* Translate */}
          </CardContent>
        </Card>

        {/* Exercise 3: Quiz */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">{t('quiz_title')}</CardTitle> {/* Translate */}
             <ListChecks className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              {t('quiz_desc')} {/* Translate */}
            </CardDescription>
            {/* Placeholder */}
            <div className="h-40 bg-muted rounded-md flex items-center justify-center text-muted-foreground italic">
               {t('coming_soon_area')} {/* Translate */}
            </div>
             <Button variant="outline" className="mt-4 w-full" disabled>{t('quiz_button')}</Button> {/* Translate */}
          </CardContent>
        </Card>
      </div>
       <p className="text-center text-muted-foreground mt-8 italic">
        {t('note')} {/* Translate note */}
      </p>
    </section>
  );
}
