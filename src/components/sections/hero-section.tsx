import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image'; // Import next/image

export function HeroSection() {
  return (
    <section id="inicio" className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#1976D2] to-[#008080] text-transparent bg-clip-text">
              Bienvenido a
            </span>{" "}
            DataArch Learning
          </h1>{" "}
          <h2 className="inline">
             Introducción a la{" "}
            <span className="inline bg-gradient-to-r from-[#008080] to-[#1976D2] text-transparent bg-clip-text">
              Arquitectura de Datos
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Explora los fundamentos de la arquitectura de datos a través de módulos interactivos, ejercicios prácticos y autoevaluaciones.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Button className="w-full md:w-1/3" asChild>
            <Link href="#contenido">Empezar a Aprender</Link>
          </Button>
        </div>
          <h3 className="text-2xl font-bold pt-8">Objetivos del OVA</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-2 text-left mx-auto lg:mx-0 md:w-10/12">
            <li>Comprender los conceptos clave de la arquitectura de datos.</li>
            <li>Identificar diferentes tipos de arquitecturas y sus casos de uso.</li>
            <li>Explorar herramientas y tecnologías relevantes en el campo.</li>
            <li>Desarrollar habilidades básicas para diseñar arquitecturas de datos simples.</li>
          </ul>
      </div>

      {/* Hero Image */}
      <div className="z-10 order-first lg:order-last flex justify-center items-center">
        <Image
          src="https://picsum.photos/seed/data-study/600/400" // Placeholder image related to data/studying
          alt="Visualización abstracta de conceptos de arquitectura de datos"
          width={600}
          height={400}
          className="rounded-lg shadow-xl object-cover"
          priority // Load the image with priority as it's in the hero section
        />
      </div>

    </section>
  );
}
