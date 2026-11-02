import type { Bilingue } from "@/components/i18n/T";

export type Proyecto = {
  slug: string;
  nombre: string;
  tipo: Bilingue;
  anio: string;
  rol: Bilingue;
  resumen: Bilingue;
  imagen: string;
  alt: string;
  href: string;
  externo?: boolean;
};

export const PROYECTOS: Proyecto[] = [
  {
    slug: "mayliss",
    nombre: "MayLiss",
    tipo: { es: "Landing page", en: "Landing page" },
    anio: "2026",
    rol: { es: "Dirección de arte, diseño y desarrollo", en: "Art direction, design and development" },
    resumen: {
      es: "Una landing con alma de revista de moda para una renta de vestidos en Tepic: el catálogo se siente como una sesión editorial.",
      en: "A fashion-magazine landing for a dress rental shop in Tepic: the catalog feels like an editorial shoot.",
    },
    imagen: "/img/mayliss/1440-0-hero.webp",
    alt: "Portada de la landing MayLiss: tres fotos de vestidos negros y el logotipo dorado",
    href: "/trabajo/mayliss",
  },
  {
    slug: "portafolio-v1",
    nombre: "Portafolio v1",
    tipo: { es: "Sitio personal", en: "Personal site" },
    anio: "2026",
    rol: { es: "Marca personal, contenido y diseño", en: "Personal brand, content and design" },
    resumen: {
      es: "La primera versión de DIMAPESA, hecha con GPT Sites: donde nacieron las llaves, el lima y el violeta.",
      en: "The first version of DIMAPESA, built with GPT Sites: where the braces, the lime and the violet were born.",
    },
    imagen: "/img/portafolio-v1.webp",
    alt: "Portada del primer portafolio de DIMAPESA: titular Code, design & systems y retrato de Diego",
    href: "https://dimapesa-portafolio.dimapesa-proyectos.chatgpt.site/",
    externo: true,
  },
];

export const CAPACIDADES = [
  {
    titulo: { es: "Estrategia", en: "Strategy" },
    texto: {
      es: "Encuentro el foco, ordeno la complejidad y convierto una idea en una dirección accionable.",
      en: "I find the focus, organize complexity, and turn an idea into an actionable direction.",
    },
  },
  {
    titulo: { es: "Producto digital", en: "Digital product" },
    texto: {
      es: "Diseño experiencias claras, útiles y coherentes, desde el primer flujo hasta el último detalle.",
      en: "I design clear, useful, and coherent experiences, from the first flow to the last detail.",
    },
  },
  {
    titulo: { es: "Tecnología", en: "Technology" },
    texto: {
      es: "Construyo soluciones funcionales y automatizaciones preparadas para crecer contigo.",
      en: "I build functional solutions and automations that are ready to grow with you.",
    },
  },
];

export const ARCHIVO = [
  {
    href: "/archivo/visuales",
    titulo: { es: "Visuales con IA", en: "AI visuals" },
    detalle: { es: "Retratos y dirección de arte", en: "Portraits and art direction" },
    media: "retrato",
  },
  {
    href: "/archivo/sitios",
    titulo: { es: "Sitios web", en: "Websites" },
    detalle: { es: "Ideas publicadas", en: "Ideas, published" },
    media: "sitio",
  },
  {
    href: "/archivo/musica",
    titulo: { es: "Música", en: "Music" },
    detalle: { es: "Canciones hechas con SUNO", en: "Songs made with SUNO" },
    media: "onda",
  },
  {
    href: "/blog",
    titulo: { es: "Blog", en: "Blog" },
    detalle: { es: "Notas sobre diseño, IA y código", en: "Notes on design, AI and code" },
    media: "llaves",
  },
] as const;
