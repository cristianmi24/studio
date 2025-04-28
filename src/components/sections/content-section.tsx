
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // Import Link
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"; // Remove CardTitle as it's not used here
import { BrainCircuit, DatabaseZap, Network, Layers, ExternalLink } from "lucide-react"; // Add ExternalLink
import { Progress } from "@/components/ui/progress";
import { Button } from '@/components/ui/button'; // Import Button

const modules = [
  {
    id: "module-1",
    title: "Módulo 1: Conceptos Fundamentales",
    icon: BrainCircuit,
    description: "Introducción a qué es la arquitectura de datos y por qué es importante.",
    content: [
      "Definición de Arquitectura de Datos.",
      "Componentes clave: Datos, Procesos, Tecnología.",
      "Beneficios de una buena arquitectura.",
      "Roles relacionados (Arquitecto de Datos, Ingeniero de Datos).",
    ],
    link: "#", // Placeholder link
  },
  {
    id: "module-2",
    title: "Módulo 2: Tipos de Arquitecturas",
    icon: Layers,
    description: "Exploración de diferentes enfoques arquitectónicos.",
    content: [
      "Arquitectura Centralizada vs. Descentralizada.",
      "Data Warehouse vs. Data Lake vs. Data Lakehouse.",
      "Arquitectura Lambda y Kappa.",
      "Data Mesh y Data Fabric.",
    ],
     link: "#", // Placeholder link
  },
  {
    id: "module-3",
    title: "Módulo 3: Almacenamiento y Modelado",
    icon: DatabaseZap,
    description: "Cómo se almacenan y organizan los datos.",
    content: [
      "Bases de datos relacionales (SQL).",
      "Bases de datos NoSQL (Documental, Clave-Valor, Columnar, Grafo).",
      "Modelado de datos (Entidad-Relación, Dimensional).",
      "Conceptos de ETL y ELT.",
    ],
     link: "#", // Placeholder link
  },
   {
    id: "module-4",
    title: "Módulo 4: Gobernanza y Seguridad",
    icon: Network,
    description: "Asegurando la calidad y protección de los datos.",
    content: [
      "Calidad de Datos.",
      "Seguridad de Datos (Encriptación, Acceso).",
      "Cumplimiento normativo (GDPR, etc.).",
      "Metadatos y Catálogo de Datos.",
    ],
     link: "#", // Placeholder link
  },
];

const totalModules = modules.length;

export function ContentSection() {
  const [viewedModules, setViewedModules] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Load viewed modules from localStorage on component mount
    const storedViewedModules = localStorage.getItem('viewedModules');
    if (storedViewedModules) {
      setViewedModules(new Set(JSON.parse(storedViewedModules)));
    }
  }, []);


  useEffect(() => {
    const newProgress = Math.round((viewedModules.size / totalModules) * 100);
    setProgress(newProgress);
    // Save viewed modules to localStorage whenever it changes
    if (viewedModules.size > 0){ // Avoid saving empty set initially if nothing is stored
       localStorage.setItem('viewedModules', JSON.stringify(Array.from(viewedModules)));
    }
  }, [viewedModules]);

  const handleModuleView = (moduleId: string | undefined) => {
    if (moduleId && !viewedModules.has(moduleId)) {
       setViewedModules(prev => new Set(prev).add(moduleId));
    }
  };


  return (
    <section id="contenido" className="container py-12 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Contenido del Curso
      </h2>
      <p className="text-center text-muted-foreground mb-2">
        Progreso del curso: {viewedModules.size} de {totalModules} módulos vistos.
      </p>
      <Progress value={progress} className="w-full max-w-3xl mx-auto mb-10 h-3" aria-label={`Progreso del curso: ${progress}%`} />


      <Accordion
        type="single"
        collapsible
        className="w-full max-w-3xl mx-auto"
        onValueChange={handleModuleView} // Update progress when accordion value changes
        >
        {modules.map((module) => {
          const Icon = module.icon;
           return (
             <AccordionItem key={module.id} value={module.id} className="border-b border-border/40">
               <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4 px-4 rounded-t-md data-[state=open]:bg-muted">
                 <div className="flex items-center gap-3">
                    <Icon className="w-6 h-6 text-primary" />
                    {module.title}
                 </div>
               </AccordionTrigger>
               <AccordionContent className="px-4 pt-0 pb-4 bg-muted rounded-b-md">
                <Card className="mt-2 border-none shadow-none bg-transparent">
                    <CardHeader className="p-0 pb-3">
                       <CardDescription className="text-base">{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                        {module.content.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                        </ul>
                        {/* Add the "Ver más detalles" link/button */}
                        <Button variant="link" asChild className="p-0 h-auto text-primary hover:text-accent transition-colors">
                            <Link href={module.link} aria-label={`Ver más detalles sobre ${module.title}`}>
                                Ver más detalles
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

