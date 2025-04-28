import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <div className="z-10 order-first lg:order-last">
        {/* Placeholder for an illustrative image/animation */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="w-full max-w-md lg:max-w-lg h-auto text-primary drop-shadow-lg"
        >
          <path fill="currentColor" d="M256 0c-17.7 0-32 14.3-32 32V128H160c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64H160c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64H160c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V416h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288V288h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288V192h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288V32c0-17.7-14.3-32-32-32z"/>
        </svg>
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
}

// Basic shadow styling (can be enhanced in globals.css)
const shadowStyle = `
.shadow {
  position: absolute;
  filter: blur(60px);
  opacity: 0.5;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(25,118,210,0.4) 0%, rgba(0,128,128,0.3) 70%, rgba(255,255,255,0) 100%);
  width: 60%;
  height: 60%;
  top: 20%;
  left: 20%;
  z-index: 0;
  transform: translateZ(-10px);
  animation: pulse 5s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.05); opacity: 0.6; }
}

@media (max-width: 1024px) {
  .shadow {
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
  }
}
`;

// Inject styles directly (consider moving to CSS file for better organization)
if (typeof window !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = shadowStyle;
  document.head.appendChild(styleSheet);
}
