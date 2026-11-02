import type { Bilingue } from "@/components/i18n/T";

// Contenido del archivo creativo. Agrega elementos aquí y las páginas se actualizan solas.

export type Visual = { src: string; alt: string; titulo: Bilingue; anio: string };
export const VISUALES: Visual[] = [
  {
    src: "/img/diego-retrato.webp",
    alt: "Retrato de Diego con saco negro e iluminación violeta y verde",
    titulo: { es: "Retrato de estudio", en: "Studio portrait" },
    anio: "2026",
  },
  // TODO(Diego): agregar imágenes en public/img/visuales/
];

/** `audio`: ruta a un MP3 en /public o URL directa al archivo */
export type Pista = { titulo: string; duracion: string; audio: string; nota?: Bilingue };
export const PISTAS: Pista[] = [
  // TODO(Diego): { titulo: "Nombre", duracion: "3:12", audio: "/audio/nombre.mp3" }
];

export type Sitio = { nombre: string; url: string; imagen?: string; nota: Bilingue; herramienta: string; anio: string };
export const SITIOS: Sitio[] = [
  {
    nombre: "DIMAPESA v1",
    url: "https://dimapesa-portafolio.dimapesa-proyectos.chatgpt.site/",
    imagen: "/img/portafolio-v1.webp",
    nota: { es: "Primer portafolio personal, bilingüe y con tema claro y oscuro.", en: "First personal portfolio, bilingual with light and dark themes." },
    herramienta: "GPT Sites",
    anio: "2026",
  },
  {
    nombre: "MayLiss",
    url: "https://dimapesa-developer.github.io/mayliss-landing/",
    imagen: "/img/mayliss/1440-0-hero.webp",
    nota: { es: "Landing editorial para una renta de vestidos en Tepic.", en: "Editorial landing for a dress rental in Tepic." },
    herramienta: "Next.js",
    anio: "2026",
  },
];

export type Entrada = { slug: string; titulo: Bilingue; resumen: Bilingue; fecha: string };
export const ENTRADAS: Entrada[] = [];
