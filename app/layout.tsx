import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { asset, site } from "@/config/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || site.url),
  title: {
    default: "DIMAPESA — Diego Martin Pelayo Salazar",
    template: "%s — DIMAPESA",
  },
  description:
    "Diego Martin Pelayo Salazar, tecnólogo creativo en México. Estrategia, diseño de producto digital, tecnología y automatización.",
  alternates: { canonical: asset("/") },
  // El sitio trae su propio cambio ES/EN; el traductor del navegador reescribiría el texto y rompería las animaciones
  other: { google: "notranslate" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "DIMAPESA",
    title: "DIMAPESA — Código, diseño y sistemas",
    description: "Diseño y construyo productos digitales que hacen lo complejo más claro, útil y humano.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

// Aplica tema e idioma guardados antes de pintar, para evitar parpadeo
const preferencias = `try{var d=document.documentElement,t=localStorage.getItem("tema"),l=localStorage.getItem("idioma");if(t)d.dataset.theme=t;if(l){d.dataset.lang=l;d.lang=l==="en"?"en":"es-MX"}}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      data-theme="dark"
      data-lang="es"
      translate="no"
      className={`${bricolage.variable} ${instrument.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferencias }} />
      </head>
      <body className="bg-bg text-text">
        <a
          href="#contenido"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-lime px-4 py-2 text-ink focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <SmoothScroll>
          <Header />
          <div id="contenido">{children}</div>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
