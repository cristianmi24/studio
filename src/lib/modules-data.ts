
import { BrainCircuit, DatabaseZap, Network, Layers } from "lucide-react";

// Define the structure for detailed content blocks
interface ContentBlock {
  type: 'paragraph' | 'heading' | 'list' | 'image';
  level?: number; // For headings (e.g., 3 for h3)
  items?: string[]; // For lists
  text?: string; // For paragraphs and headings
  src?: string; // For images
  alt?: string; // For images
}

// Define the structure for each module
export interface Module {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  summaryPoints: string[]; // Renamed from 'content' for clarity
  detailedContent: ContentBlock[];
}

// Define the module data
export const modules: Module[] = [
  {
    id: "module-1",
    title: "Módulo 1: Conceptos Fundamentales",
    icon: BrainCircuit,
    description: "Introducción a qué es la arquitectura de datos y por qué es importante.",
    summaryPoints: [
      "Definición de Arquitectura de Datos.",
      "Componentes clave: Datos, Procesos, Tecnología.",
      "Beneficios de una buena arquitectura.",
      "Roles relacionados (Arquitecto de Datos, Ingeniero de Datos).",
    ],
    detailedContent: [
      { type: 'heading', level: 3, text: '¿Qué es la Arquitectura de Datos?' },
      { type: 'paragraph', text: 'La arquitectura de datos es el conjunto de reglas, políticas, estándares y modelos que gobiernan y definen el tipo de datos que se recopilan y cómo se utilizan, almacenan, gestionan e integran dentro de una organización y sus sistemas de bases de datos. Funciona como un plano para la infraestructura de datos de una empresa.' },
      { type: 'image', src: 'https://picsum.photos/seed/conceptos/600/300', alt: 'Diagrama conceptual de arquitectura de datos' },
      { type: 'heading', level: 3, text: 'Componentes Clave' },
      { type: 'list', items: [
          'Datos: La información en sí misma, incluyendo su estructura, calidad y ciclo de vida.',
          'Procesos: Cómo fluyen los datos a través de la organización (captura, transformación, carga, etc.).',
          'Tecnología: Las herramientas y plataformas utilizadas para almacenar, procesar y analizar datos (bases de datos, herramientas ETL, plataformas de BI, etc.).',
        ]
      },
      { type: 'heading', level: 3, text: 'Beneficios' },
       { type: 'paragraph', text: 'Una arquitectura de datos bien diseñada ofrece numerosas ventajas:' },
      { type: 'list', items: [
          'Mejora la toma de decisiones basada en datos confiables.',
          'Aumenta la eficiencia operativa al optimizar flujos de datos.',
          'Facilita el cumplimiento normativo y la seguridad de los datos.',
          'Permite la integración de nuevas tecnologías y fuentes de datos.',
          'Mejora la colaboración entre equipos al proporcionar una visión unificada de los datos.',
        ]
      },
       { type: 'heading', level: 3, text: 'Roles Relacionados' },
       { type: 'list', items: [
          'Arquitecto de Datos: Diseña y supervisa la arquitectura general.',
          'Ingeniero de Datos: Construye y mantiene la infraestructura de datos (pipelines, bases de datos).',
          'Analista de Datos: Extrae insights y conocimiento a partir de los datos.',
          'Científico de Datos: Utiliza técnicas avanzadas para modelar y predecir.',
        ]
       }
    ],
  },
  {
    id: "module-2",
    title: "Módulo 2: Tipos de Arquitecturas",
    icon: Layers,
    description: "Exploración de diferentes enfoques arquitectónicos.",
    summaryPoints: [
      "Arquitectura Centralizada vs. Descentralizada.",
      "Data Warehouse vs. Data Lake vs. Data Lakehouse.",
      "Arquitectura Lambda y Kappa.",
      "Data Mesh y Data Fabric.",
    ],
    detailedContent: [
      { type: 'heading', level: 3, text: 'Centralizada vs. Descentralizada' },
      { type: 'paragraph', text: 'Las arquitecturas centralizadas (como el Data Warehouse tradicional) consolidan los datos en un único repositorio. Las descentralizadas (como Data Mesh) distribuyen la propiedad y gestión de los datos entre diferentes dominios o equipos.' },
      { type: 'heading', level: 3, text: 'Almacenes de Datos Clave' },
       { type: 'list', items: [
          'Data Warehouse (DWH): Almacena datos estructurados y procesados, optimizados para análisis de BI y reporting. Utiliza esquemas definidos (como estrella o copo de nieve).',
          'Data Lake: Almacena grandes volúmenes de datos crudos en su formato original (estructurados, semiestructurados, no estructurados). Flexible para exploración y análisis avanzados (ML).',
          'Data Lakehouse: Combina la flexibilidad del Data Lake con las capacidades de gestión y estructuración del Data Warehouse, permitiendo análisis de BI y ciencia de datos sobre la misma plataforma.',
        ]
      },
        { type: 'image', src: 'https://picsum.photos/seed/dw-dl-dlh/600/300', alt: 'Comparación DWH, Data Lake, Data Lakehouse' },
      { type: 'heading', level: 3, text: 'Arquitecturas de Procesamiento de Datos' },
        { type: 'list', items: [
           'Lambda: Combina procesamiento por lotes (batch) para análisis históricos robustos y procesamiento en tiempo real (streaming) para insights inmediatos. Compleja de mantener por tener dos pipelines separados.',
           'Kappa: Simplifica la arquitectura Lambda utilizando únicamente un pipeline de procesamiento en tiempo real (streaming) para todos los datos, reprocesando streams cuando es necesario para análisis históricos.',
        ]
      },
      { type: 'heading', level: 3, text: 'Enfoques Modernos y Descentralizados' },
         { type: 'list', items: [
           'Data Mesh: Un enfoque organizacional y técnico que trata los datos como un producto, con propiedad descentralizada por dominio, infraestructura de datos como plataforma self-service y gobernanza federada.',
           'Data Fabric: Una capa de abstracción y automatización que conecta fuentes de datos dispares, permitiendo acceder y gestionar datos sin moverlos físicamente. Se enfoca en la conectividad y metadatos.',
         ]
      }
    ],
  },
  {
    id: "module-3",
    title: "Módulo 3: Almacenamiento y Modelado",
    icon: DatabaseZap,
    description: "Cómo se almacenan y organizan los datos.",
    summaryPoints: [
      "Bases de datos relacionales (SQL).",
      "Bases de datos NoSQL (Documental, Clave-Valor, Columnar, Grafo).",
      "Modelado de datos (Entidad-Relación, Dimensional).",
      "Conceptos de ETL y ELT.",
    ],
    detailedContent: [
        { type: 'heading', level: 3, text: 'Bases de Datos Relacionales (SQL)' },
        { type: 'paragraph', text: 'Organizan los datos en tablas con filas y columnas, utilizando SQL (Structured Query Language) para consultas. Fortalezas en consistencia (ACID) y manejo de relaciones complejas. Ejemplos: PostgreSQL, MySQL, SQL Server.' },
        { type: 'heading', level: 3, text: 'Bases de Datos NoSQL' },
        { type: 'paragraph', text: 'Ofrecen modelos de datos más flexibles que las relacionales, diseñadas para escalabilidad y rendimiento en casos específicos.' },
        { type: 'list', items: [
            'Documentales: Almacenan datos en documentos (JSON, BSON). Flexibles en esquema. Ej: MongoDB, Couchbase.',
            'Clave-Valor: Almacenan datos como pares clave-valor simples. Muy rápidas para búsquedas por clave. Ej: Redis, DynamoDB.',
            'Columnares: Almacenan datos por columnas en lugar de filas. Eficientes para consultas analíticas que leen columnas específicas. Ej: Cassandra, HBase.',
            'Grafo: Almacenan entidades (nodos) y relaciones (aristas). Optimizadas para consultar conexiones y relaciones complejas. Ej: Neo4j, Amazon Neptune.',
          ]
        },
         { type: 'image', src: 'https://picsum.photos/seed/nosql-types/600/300', alt: 'Tipos de bases de datos NoSQL' },
        { type: 'heading', level: 3, text: 'Modelado de Datos' },
         { type: 'list', items: [
            'Modelo Entidad-Relación (ER): Representa entidades del mundo real y sus relaciones. Común en bases de datos transaccionales (OLTP).',
            'Modelo Dimensional: Organiza los datos en tablas de hechos (métricas) y dimensiones (contexto). Optimizado para Data Warehouses y análisis (OLAP). Esquemas comunes: estrella y copo de nieve.',
          ]
         },
        { type: 'heading', level: 3, text: 'Procesos de Integración: ETL vs. ELT' },
        { type: 'list', items: [
            'ETL (Extract, Transform, Load): Extrae datos de fuentes, los transforma en un área intermedia (staging) y luego los carga en el destino (ej. Data Warehouse). La transformación ocurre antes de la carga.',
            'ELT (Extract, Load, Transform): Extrae datos de fuentes, los carga directamente en el destino (ej. Data Lake/Lakehouse) y realiza las transformaciones allí utilizando la potencia de cómputo del destino. Más común en arquitecturas modernas con Data Lakes.',
          ]
        }
    ],
  },
   {
    id: "module-4",
    title: "Módulo 4: Gobernanza y Seguridad",
    icon: Network,
    description: "Asegurando la calidad y protección de los datos.",
    summaryPoints: [
      "Calidad de Datos.",
      "Seguridad de Datos (Encriptación, Acceso).",
      "Cumplimiento normativo (GDPR, etc.).",
      "Metadatos y Catálogo de Datos.",
    ],
    detailedContent: [
      { type: 'heading', level: 3, text: 'Gobernanza de Datos' },
      { type: 'paragraph', text: 'Es el ejercicio general de autoridad, control y toma de decisiones sobre los activos de datos. Incluye políticas, roles, responsabilidades y procesos para gestionar los datos de forma eficaz y segura.' },
      { type: 'heading', level: 3, text: 'Calidad de Datos' },
      { type: 'paragraph', text: 'Asegura que los datos sean precisos, completos, consistentes, oportunos y válidos para su propósito. Implica definir métricas de calidad, realizar limpieza de datos (data cleaning) y monitoreo continuo.' },
       { type: 'list', items: [
           'Dimensiones de Calidad: Exactitud, Completitud, Consistencia, Puntualidad, Unicidad, Validez.',
           'Procesos: Perfilado de datos, limpieza, estandarización, enriquecimiento, monitoreo.',
         ]
       },
      { type: 'heading', level: 3, text: 'Seguridad de Datos' },
      { type: 'paragraph', text: 'Protege los datos contra accesos no autorizados, corrupción o robo. Incluye medidas técnicas y organizativas.' },
        { type: 'list', items: [
           'Encriptación: Proteger datos en reposo (almacenados) y en tránsito (en movimiento por la red).',
           'Control de Acceso: Autenticación (verificar identidad) y autorización (definir permisos). Roles y políticas de acceso (RBAC, ABAC).',
           'Enmascaramiento y Anonimización: Ocultar datos sensibles para entornos de prueba o análisis.',
           'Auditoría: Registrar quién accedió a qué datos y cuándo.',
         ]
       },
       { type: 'image', src: 'https://picsum.photos/seed/data-security/600/300', alt: 'Conceptos de seguridad de datos' },
      { type: 'heading', level: 3, text: 'Cumplimiento Normativo' },
      { type: 'paragraph', text: 'Asegurar que el manejo de datos cumpla con leyes y regulaciones específicas de la industria o geografía (ej. GDPR en Europa, HIPAA en salud, CCPA en California). Implica entender los requisitos y aplicar controles adecuados.' },
       { type: 'heading', level: 3, text: 'Metadatos y Catálogo de Datos' },
        { type: 'list', items: [
            'Metadatos: Datos sobre los datos. Describen el origen, formato, estructura, significado y linaje de los datos.',
            'Catálogo de Datos: Un inventario centralizado de los activos de datos de una organización, utilizando metadatos para facilitar el descubrimiento, comprensión y uso de los datos. Mejora la colaboración y la gobernanza.',
          ]
        }
    ],
  },
];

// Helper function to find a module by ID
export function getModuleById(id: string): Module | undefined {
    return modules.find(module => module.id === id);
}
