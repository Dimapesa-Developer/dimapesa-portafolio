export const site = {
  nombre: "DIMAPESA",
  persona: "Diego Martin Pelayo Salazar",
  url: "https://dimapesa-developer.github.io/dimapesa-portafolio",
  correo: "dimapesa.trabajo@gmail.com",
  ubicacion: "Tepic, Nayarit",
  coordenadas: "21.50° N, 104.89° O", // Tepic
  redes: {
    github: "https://github.com/Dimapesa-Developer",
    linkedin: "https://www.linkedin.com/in/diego-martin-pelayo-salazar/",
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
