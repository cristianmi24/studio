import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BrainCircuit, DatabaseZap, Network, Layers } from "lucide-react"; // Import relevant icons

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
  },
];

export function ContentSection() {
  return (
    <section id="contenido" className="container py-12 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Contenido del Curso
      </h2>

      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
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
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {module.content.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                        </ul>
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
