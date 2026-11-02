import type { Bilingue } from "@/components/i18n/T";

// Contenido del CV. Las secciones vacías no se muestran.
// TODO(Diego): agregar experiencia laboral y formación reales.

export type Puesto = { cargo: Bilingue; lugar: string; periodo: string; logros: Bilingue[] };
export const EXPERIENCIA: Puesto[] = [];

export type Estudio = { titulo: Bilingue; lugar: string; periodo: string };
export const FORMACION: Estudio[] = [];

export const PERFIL: Bilingue = {
  es: "Tecnólogo creativo en México. Diseño y construyo productos digitales que hacen lo complejo más claro, útil y humano, de la estrategia al código en producción.",
  en: "Creative technologist in Mexico. I design and build digital products that make complexity clear, useful, and human: from strategy and the first flow to code in production.",
};

export const PROYECTOS_CV = [
  {
    nombre: "MayLiss",
    anio: "2026",
    tipo: { es: "Landing editorial", en: "Editorial landing" },
    texto: {
      es: "Dirección de arte, diseño y desarrollo de una landing con alma de revista de moda para una renta de vestidos en Tepic. Mobile-first, accesible y con sistema de movimiento propio.",
      en: "Art direction, design and development of a fashion-magazine landing for a dress rental in Tepic. Mobile-first, accessible, with its own motion system.",
    },
    stack: "Next.js, Tailwind, Motion, Lenis",
    url: "dimapesa-developer.github.io/mayliss-landing",
  },
  {
    nombre: "DIMAPESA v2",
    anio: "2026",
    tipo: { es: "Portafolio personal", en: "Personal portfolio" },
    texto: {
      es: "Marca, diseño y código de este portafolio: intro generativa con partículas en Canvas, temas claro y oscuro, bilingüe y publicado como sitio estático.",
      en: "Brand, design and code for this portfolio: a generative particle intro in Canvas, light and dark themes, bilingual, published as a static site.",
    },
    stack: "Next.js, TypeScript, Canvas 2D, Motion",
    url: "dimapesa-developer.github.io/dimapesa-portafolio",
  },
  {
    nombre: "DIMAPESA v1",
    anio: "2026",
    tipo: { es: "Sitio personal", en: "Personal site" },
    texto: {
      es: "Primera versión de la marca personal, hecha con GPT Sites: donde nacieron las llaves, el lima y el violeta.",
      en: "First version of the personal brand, built with GPT Sites: where the braces, the lime and the violet were born.",
    },
    stack: "GPT Sites",
    url: "dimapesa-portafolio.dimapesa-proyectos.chatgpt.site",
  },
];

export const CREATIVO: Bilingue[] = [
  { es: "Visuales y retratos con IA", en: "AI visuals and portraits" },
  { es: "Música original con SUNO", en: "Original music with SUNO" },
  { es: "Sitios web con GPT Sites", en: "Websites with GPT Sites" },
];
