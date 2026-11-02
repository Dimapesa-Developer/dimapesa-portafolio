export const site = {
  nombre: "DIMAPESA",
  persona: "Diego Martin Pelayo Salazar",
  url: "https://dimapesa-developer.github.io/dimapesa-portafolio",
  // TODO(Diego): correo público de contacto (el sitio v1 no tenía uno)
  correo: "",
  ubicacion: "México",
  coordenadas: "23.2494° N",
  redes: {
    github: "https://github.com/Dimapesa-Developer",
  },
} as const;

/** Ruta a un archivo de /public respetando el subdirectorio de GitHub Pages */
export const asset = (ruta: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${ruta}`;

export const NAV = [
  { href: "/trabajo/mayliss", es: "Trabajo", en: "Work" },
  { href: "/archivo", es: "Archivo", en: "Archive" },
  { href: "/sobre-mi", es: "Sobre mí", en: "About" },
  { href: "/blog", es: "Blog", en: "Blog" },
  { href: "/contacto", es: "Contacto", en: "Contact" },
] as const;
