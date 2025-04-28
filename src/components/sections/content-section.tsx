'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Use next/link
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { BrainCircuit, DatabaseZap, Network, Layers, ExternalLink } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button';
import { modules as rawModulesData } from '@/lib/modules-data'; // Import raw modules data
import { useTranslations, useLocale } from 'next-intl'; // Import next-intl hooks

const totalModules = rawModulesData.length; // Calculate total based on raw data

export function ContentSection() {
  const t = useTranslations('ContentSection'); // Translations for this section
  const locale = useLocale(); // Get current locale for links

  const [viewedModules, setViewedModules] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);

  // Effect for loading/saving viewed modules remains the same
  useEffect(() => {
    const storedViewedModules = localStorage.getItem('viewedModules');
    if (storedViewedModules) {
      setViewedModules(new Set(JSON.parse(storedViewedModules)));
    }
  }, []);

  useEffect(() => {
    const newProgress = Math.round((viewedModules.size / totalModules) * 100);
    setProgress(newProgress);
    if (viewedModules.size > 0){
       localStorage.setItem('viewedModules', JSON.stringify(Array.from(viewedModules)));
    }
  }, [viewedModules]); // Removed totalModules from dep array as it's constant now

  const handleModuleView = (moduleId: string | undefined) => {
    if (moduleId && !viewedModules.has(moduleId)) {
       setViewedModules(prev => new Set(prev).add(moduleId));
    }
  };

   // Map raw module data to potentially translated data if needed, or use keys
   // For simplicity, we'll use translation keys based on module ID for titles/descriptions
   const modules = rawModulesData.map(module => ({
     ...module,
     title: t(`${module.id}_title`), // e.g., ContentSection.module-1_title
     description: t(`${module.id}_desc`), // e.g., ContentSection.module-1_desc
     // Translate summary points if they exist as keys, otherwise use original
     summaryPoints: module.summaryPoints.map((_, index) =>
        t(`${module.id}_pt${index + 1}`) // e.g., ContentSection.module-1_pt1
     ),
   }));


  return (
    <section id="contenido" className="container py-12 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        {t('title')} {/* Translate section title */}
      </h2>
      <p className="text-center text-muted-foreground mb-2">
         {/* Translate progress text, passing variables */}
        {t('progress_text', { viewedCount: viewedModules.size, totalCount: totalModules })}
      </p>
      <Progress value={progress} className="w-full max-w-3xl mx-auto mb-10 h-3" aria-label={`Progreso del curso: ${progress}%`} />


      <Accordion
        type="single"
        collapsible
        className="w-full max-w-3xl mx-auto"
        onValueChange={handleModuleView}
        >
        {modules.map((module) => {
          const Icon = module.icon; // Get the original icon component
           return (
             <AccordionItem key={module.id} value={module.id} className="border-b border-border/40">
               <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4 px-4 rounded-t-md data-[state=open]:bg-muted">
                 <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-6 h-6 text-primary" />} {/* Render icon */}
                    {module.title} {/* Display potentially translated title */}
                 </div>
               </AccordionTrigger>
               <AccordionContent className="px-4 pt-0 pb-4 bg-muted rounded-b-md">
                <Card className="mt-2 border-none shadow-none bg-transparent">
                    <CardHeader className="p-0 pb-3">
                       <CardDescription className="text-base">{module.description}</CardDescription> {/* Display potentially translated description */}
                    </CardHeader>
                    <CardContent className="p-0">
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                        {module.summaryPoints.map((item, index) => (
                            <li key={index}>{item}</li> // Display potentially translated summary points
                        ))}
                        </ul>
                         {/* Update Link href to include locale */}
                        <Button variant="link" asChild className="p-0 h-auto text-primary hover:text-accent transition-colors">
                            <Link href={`/${locale}/modules/${module.id}`} aria-label={`Ver más detalles sobre ${module.title}`}>
                                {t('view_details')} {/* Translate button text */}
                                <ExternalLink className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </CardContent>
                 </Card>
               </AccordionContent>
             </AccordionItem>
           );
        })}
      </Accordion>
    </section>
  );
}
