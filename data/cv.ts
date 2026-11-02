import type { Bilingue } from "@/components/i18n/T";

// Contenido del CV (2 hojas carta). Textos redactados a partir de la entrevista con Diego.

export const TITULAR: Bilingue = {
  es: "Ingeniero en TI · Sistemas, desarrollo web e IA",
  en: "IT Engineer · Systems, web development & AI",
};

export const PERFIL: Bilingue = {
  es: "Ingeniero en Tecnologías de la Información con más de 7 años en soporte técnico y administración de sistemas en el Gobierno del Estado de Nayarit. En paralelo diseño y desarrollo sitios web, CRMs, identidad visual y automatizaciones con inteligencia artificial para negocios locales. Busco un puesto donde unir sistemas, desarrollo y diseño.",
  en: "Information Technology engineer with 7+ years in technical support and systems administration for the State Government of Nayarit. Alongside, I design and build websites, CRMs, visual identities and AI-powered automations for local businesses. I’m looking for a role that brings together systems, development and design.",
};

export const DISPONIBILIDAD: Bilingue = {
  es: "Disponible para remoto, presencial o reubicación",
  en: "Open to remote, on-site or relocation",
};

export type Puesto = { cargo: Bilingue; lugar: Bilingue; ciudad: string; periodo: Bilingue; logros: Bilingue[] };
export const EXPERIENCIA: Puesto[] = [
  {
    cargo: { es: "Técnico en Sistemas y Soporte", en: "Systems & Support Technician" },
    lugar: {
      es: "Recaudación de Rentas, Secretaría de Administración y Finanzas del Gobierno del Estado de Nayarit",
      en: "Revenue Collection Office, Ministry of Administration and Finance, State Government of Nayarit",
    },
    ciudad: "Tepic, Nayarit",
    periodo: { es: "Abr 2019 – actualidad", en: "Apr 2019 – present" },
    logros: [
      {
        es: "Administro el Sistema Integral de Recaudación de la oficina: operación diaria, configuración y resolución de incidencias.",
        en: "Administer the office’s Integrated Revenue Collection System: daily operation, configuration and incident resolution.",
      },
      {
        es: "Administro y doy mantenimiento a los servidores que sostienen el servicio de recaudación.",
        en: "Administer and maintain the servers that keep the revenue collection service running.",
      },
      {
        es: "Brindo atención y soporte a contribuyentes en sus trámites y consultas.",
        en: "Provide assistance and support to taxpayers with their procedures and inquiries.",
      },
    ],
  },
  {
    cargo: { es: "Diseñador y desarrollador independiente", en: "Freelance designer & developer" },
    lugar: { es: "Proyectos para negocios locales", en: "Projects for local businesses" },
    ciudad: "Nayarit",
    periodo: { es: "Proyectos independientes", en: "Independent projects" },
    logros: [
      {
        es: "Compostela Truck Repair (mecánica diésel): diseño y desarrollo de su sitio web y de un CRM para el taller.",
        en: "Compostela Truck Repair (diesel mechanics): designed and built its website and a CRM for the shop.",
      },
      {
        es: "MayLiss (renta de vestidos): logotipos, dirección de arte y landing editorial con Next.js.",
        en: "MayLiss (dress rental): logos, art direction and an editorial landing built with Next.js.",
      },
      {
        es: "Radiadores Fernando y otros negocios: logotipos e identidad visual.",
        en: "Radiadores Fernando and other businesses: logos and visual identity.",
      },
      {
        es: "Imágenes y música originales con IA para marcas y proyectos personales.",
        en: "Original AI-generated images and music for brands and personal projects.",
      },
    ],
  },
];

export type Estudio = { titulo: Bilingue; lugar: string; periodo: string };
export const FORMACION: Estudio[] = [
  {
    titulo: {
      es: "Ingeniería en Tecnologías de la Información y Comunicación",
      en: "B.Eng. in Information and Communication Technologies",
    },
    lugar: "Universidad Tecnológica de Nayarit",
    periodo: "2015 – 2019",
  },
];

// TODO(Diego): si quieres, lista aquí los nombres de tus cursos de Platzi
export const FORMACION_CONTINUA: Bilingue[] = [
  { es: "Cursos completados en Platzi", en: "Completed courses on Platzi" },
];

export const IDIOMAS: { idioma: Bilingue; nivel: Bilingue }[] = [
  { idioma: { es: "Español", en: "Spanish" }, nivel: { es: "nativo", en: "native" } },
  { idioma: { es: "Inglés", en: "English" }, nivel: { es: "B1", en: "B1" } },
  { idioma: { es: "Francés", en: "French" }, nivel: { es: "A1", en: "A1" } },
];

export const PROYECTOS_CV = [
  {
    nombre: "MayLiss",
    anio: "2026",
    tipo: { es: "Landing editorial", en: "Editorial landing" },
    texto: {
      es: "Landing con alma de revista de moda para una renta de vestidos en Tepic. Mobile-first, accesible y con sistema de movimiento propio.",
      en: "A fashion-magazine landing for a dress rental in Tepic. Mobile-first, accessible, with its own motion system.",
    },
    stack: "Next.js, Tailwind, Motion, Lenis",
    url: "dimapesa-developer.github.io/mayliss-landing",
  },
  {
    nombre: "Compostela Truck Repair",
    anio: "",
    tipo: { es: "Sitio web y CRM", en: "Website & CRM" },
    texto: {
      es: "Sitio web y CRM a la medida para un taller de mecánica diésel: presencia en línea y control de clientes en un solo lugar.",
      en: "A custom website and CRM for a diesel repair shop: online presence and customer management in one place.",
    },
    stack: "",
    url: "",
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
  { es: "Logotipos e identidad visual", en: "Logos and visual identity" },
  { es: "Visuales y retratos con IA", en: "AI visuals and portraits" },
  { es: "Música original con SUNO", en: "Original music with SUNO" },
  { es: "Sitios web con GPT Sites", en: "Websites with GPT Sites" },
];
