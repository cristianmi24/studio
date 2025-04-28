import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Move, Puzzle, ListChecks } from "lucide-react"; // Icons for exercise types

export function ExercisesSection() {
  return (
    <section id="ejercicios" className="container py-12 md:py-20 bg-secondary rounded-lg shadow-inner">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Ejercicios Interactivos
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Placeholder Exercise 1: Drag and Drop */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Arrastrar y Soltar</CardTitle>
             <Move className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Organiza los componentes de una arquitectura de datos simple arrastrándolos a su lugar correcto.
            </CardDescription>
            {/* Placeholder for Drag and Drop area */}
            <div className="h-40 bg-muted rounded-md flex items-center justify-center text-muted-foreground italic">
              (Área de Arrastrar y Soltar - Próximamente)
            </div>
             <Button variant="outline" className="mt-4 w-full" disabled>Iniciar Ejercicio</Button>
          </CardContent>
        </Card>

        {/* Placeholder Exercise 2: Mini-Game */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Ordenar Pasos</CardTitle>
             <Puzzle className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
             Coloca en orden los pasos típicos para implementar un Data Warehouse.
            </CardDescription>
            {/* Placeholder for Mini-Game area */}
            <div className="h-40 bg-muted rounded-md flex items-center justify-center text-muted-foreground italic">
              (Mini-Juego - Próximamente)
            </div>
            <Button variant="outline" className="mt-4 w-full" disabled>Iniciar Juego</Button>
          </CardContent>
        </Card>

        {/* Placeholder Exercise 3: Quiz */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Prueba Rápida</CardTitle>
             <ListChecks className="h-6 w-6 text-accent" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Evalúa tu comprensión sobre los tipos de bases de datos NoSQL con esta prueba de opción múltiple.
            </CardDescription>
            {/* Placeholder for Quiz area */}
            <div className="h-40 bg-muted rounded-md flex items-center justify-center text-muted-foreground italic">
              (Autoevaluación - Próximamente)
            </div>
             <Button variant="outline" className="mt-4 w-full" disabled>Iniciar Prueba</Button>
          </CardContent>
        </Card>
      </div>
       <p className="text-center text-muted-foreground mt-8 italic">
        Nota: Las funcionalidades interactivas completas se implementarán utilizando JavaScript puro.
      </p>
    </section>
  );
}
