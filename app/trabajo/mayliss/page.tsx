import type { Metadata } from "next";
import Image from "next/image";
import { asset } from "@/config/site";
import { T } from "@/components/i18n/T";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { BotonPrincipal } from "@/components/ui/Boton";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { HorizontalGallery } from "@/components/effects/HorizontalGallery";

export const metadata: Metadata = {
  title: "MayLiss, caso de estudio",
  description: "Landing editorial para una renta de vestidos de fiesta en Tepic, Nayarit. Dirección de arte, diseño y desarrollo.",
};

const SITIO = "https://dimapesa-developer.github.io/mayliss-landing/";

const FICHA = [
  { k: { es: "Cliente", en: "Client" }, v: { es: "MayLiss, renta de vestidos", en: "MayLiss, dress rental" } },
  { k: { es: "Lugar", en: "Location" }, v: { es: "Tepic, Nayarit", en: "Tepic, Nayarit" } },
  { k: { es: "Año", en: "Year" }, v: { es: "2026", en: "2026" } },
  { k: { es: "Rol", en: "Role" }, v: { es: "Dirección de arte, diseño y desarrollo", en: "Art direction, design and development" } },
  { k: { es: "Stack", en: "Stack" }, v: { es: "Next.js 15, Tailwind 4, Motion, Lenis", en: "Next.js 15, Tailwind 4, Motion, Lenis" } },
];

const PASOS = [
  {
    t: { es: "Entender a quién le habla", en: "Understand who it speaks to" },
    d: {
      es: "Mujeres de 15 a 35 años que llegan desde Instagram y WhatsApp, casi siempre en el teléfono. El sitio se diseñó primero a 375px.",
      en: "Women aged 15 to 35 arriving from Instagram and WhatsApp, almost always on their phone. The site was designed at 375px first.",
    },
  },
  {
    t: { es: "Elegir una dirección de arte", en: "Choose an art direction" },
    d: {
      es: "Revista de moda, no plantilla web: la foto manda, titulares en Bodoni gigantes y una interfaz mínima. El color lo ponen los vestidos.",
      en: "A fashion magazine, not a web template: photos lead, giant Bodoni headlines and a minimal interface. The dresses bring the color.",
    },
  },
  {
    t: { es: "Ordenar la renta en 4 pasos", en: "Turn the rental into 4 steps" },
    d: {
      es: "Elige, aparta con 50%, ajustamos y lo regresas al día siguiente. Lo que antes se explicaba por chat ahora se entiende de un vistazo.",
      en: "Choose, reserve with 50%, we tailor it and you return it the next day. What used to be explained over chat now reads at a glance.",
    },
  },
  {
    t: { es: "Construir con movimiento lento", en: "Build with slow motion" },
    d: {
      es: "Una sola curva para todo, cortinas de imagen, una lista por evento con foto que sigue al cursor y una tira de estrenos que se recorre con el scroll.",
      en: "One easing curve for everything, image curtains, an event list with a photo that follows the cursor and a new-arrivals strip that moves with scroll.",
    },
  },
];

const ESCRITORIO = [
  { src: "escritorio-editorial", alt: "Sección editorial con el titular Estrena sin comprar" },
  { src: "escritorio-eventos", alt: "Lista de eventos en tipografía Bodoni gigante" },
  { src: "escritorio-estrenos", alt: "Tira horizontal de vestidos nuevos" },
  { src: "escritorio-pasos", alt: "Cómo funciona la renta en cuatro pasos" },
  { src: "escritorio-frase", alt: "Foto a sangre con la frase Un vestido distinto para cada fiesta" },
];

const MOVIL = [
  { src: "movil-portada", alt: "Portada en móvil con el logotipo dorado" },
  { src: "movil-editorial", alt: "Sección editorial en móvil" },
  { src: "movil-eventos", alt: "Lista de eventos con miniaturas en móvil" },
  { src: "movil-visitanos", alt: "Datos de contacto y horario en móvil" },
  { src: "movil-pie", alt: "Pie de página negro con el logotipo" },
];

const TEXTO_MOVIL = (
  <T
    es="Menú de texto en lugar de hamburguesa, fotos a sangre, miniaturas fijas donde no hay cursor y un botón de WhatsApp que aparece al salir de la portada."
    en="A text menu instead of a hamburger, full-bleed photos, fixed thumbnails where there is no cursor and a WhatsApp button that appears after the cover."
  />
);

export default function CasoMayliss() {
  return (
    <main>
      <CabeceraPagina
        titulo="MayLiss"
        entrada={
          <T
            es="Una landing con alma de revista de moda para una renta de vestidos de fiesta en Tepic. El reto: que rentar un vestido se sintiera como estrenarlo."
            en="A fashion-magazine landing for a party dress rental in Tepic. The challenge: make renting a dress feel like wearing it for the first time."
          />
        }
        pie={<BotonPrincipal href={SITIO}><T es="Ver el sitio en vivo" en="See the live site" /></BotonPrincipal>}
      />

      <div className="px-4 md:px-8">
        <ImageReveal className="aspect-[16/10] w-full bg-surface">
          <Image
            src={asset("/img/mayliss/1440-0-hero.webp")}
            alt="Portada de la landing MayLiss: tres fotos de vestidos negros y el logotipo dorado"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </ImageReveal>
      </div>

      <section className="grid gap-12 px-4 py-24 md:grid-cols-12 md:px-8 md:py-36">
        <dl className="grid content-start gap-5 md:col-span-4">
          {FICHA.map((f) => (
            <div key={f.k.es} className="border-t border-line pt-3">
              <dt className="meta"><T es={f.k.es} en={f.k.en} /></dt>
              <dd className="mt-1"><T es={f.v.es} en={f.v.en} /></dd>
            </div>
          ))}
        </dl>
        <div className="md:col-span-7 md:col-start-6">
          <Reveal as="p" className="display-md">
            <T
              es="Su catálogo ya vivía en Instagram y WhatsApp. Faltaba un lugar que contara la marca con la misma elegancia que sus vestidos."
              en="Its catalog already lived on Instagram and WhatsApp. What was missing was a place that told the brand story with the same elegance as its dresses."
            />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="proceso" className="border-t border-line px-4 py-24 md:px-8 md:py-36">
        <h2 id="proceso" className="display-lg mb-14 md:mb-20">
          <T es="Proceso" en="Process" />
        </h2>
        <ol className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {PASOS.map((p, i) => (
            <Reveal as="li" key={p.t.es} delay={i * 0.08} className="border-t border-line pt-5">
              <span className="font-serif text-[56px] leading-none text-violet-text">{i + 1}</span>
              <h3 className="mt-4 text-[20px] font-medium leading-tight"><T es={p.t.es} en={p.t.en} /></h3>
              <p className="mt-3 text-muted"><T es={p.d.es} en={p.d.en} /></p>
            </Reveal>
          ))}
        </ol>
      </section>

      <HorizontalGallery
        titulo={
          <h2 className="display-md">
            <T es="En escritorio" en="On desktop" />
          </h2>
        }
      >
        {ESCRITORIO.map((img) => (
          <figure key={img.src} className="w-[86vw] md:w-[min(62vw,calc((100svh-260px)*1.6))]">
            <div className="relative aspect-[16/10] overflow-hidden border border-line bg-surface">
              <Image src={asset(`/img/mayliss/${img.src}.webp`)} alt={img.alt} fill sizes="(min-width: 768px) 62vw, 82vw" className="object-cover" />
            </div>
          </figure>
        ))}
      </HorizontalGallery>

      {/* Móvil: la tira de teléfonos avanza con el scroll, igual que la galería de escritorio */}
      <div className="md:hidden">
        <HorizontalGallery
          sentido="derecha"
          titulo={
            <div className="grid gap-4">
              <h2 className="display-md">
                <T es="Pensado para el pulgar" en="Designed for the thumb" />
              </h2>
              <p className="max-w-[46ch] text-[15px] text-muted">{TEXTO_MOVIL}</p>
            </div>
          }
        >
          {MOVIL.map((img) => (
            <figure key={img.src} className="w-[min(58vw,calc((100svh-330px)*0.462))]">
              <div className="relative aspect-[390/844] overflow-hidden rounded-[18px] border border-line bg-surface">
                <Image src={asset(`/img/mayliss/${img.src}.webp`)} alt={img.alt} fill sizes="58vw" className="object-cover" />
              </div>
            </figure>
          ))}
        </HorizontalGallery>
      </div>

      {/* Escritorio: los cinco teléfonos caben en una fila escalonada */}
      <section aria-labelledby="movil" className="hidden px-8 py-36 md:block">
        <div className="mb-12 grid grid-cols-12 gap-6">
          <h2 id="movil" className="display-md col-span-5">
            <T es="Pensado para el pulgar" en="Designed for the thumb" />
          </h2>
          <p className="col-span-5 col-start-8 max-w-[46ch] text-muted">{TEXTO_MOVIL}</p>
        </div>
        <ul className="grid grid-cols-5 gap-4">
          {MOVIL.map((img, i) => (
            <li key={img.src} className={i % 2 ? "translate-y-16" : ""}>
              <ImageReveal className="aspect-[390/844] overflow-hidden rounded-[18px] border border-line bg-surface">
                <Image src={asset(`/img/mayliss/${img.src}.webp`)} alt={img.alt} fill sizes="19vw" className="object-cover" />
              </ImageReveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line px-4 py-24 md:px-8 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <h2 className="display-md md:col-span-5">
            <T es="Lo que se entregó" en="What was delivered" />
          </h2>
          <ul className="grid gap-4 text-[17px] md:col-span-6 md:col-start-7">
            {[
              { es: "Sistema de diseño documentado: tokens, tipografía, movimiento y contraste AA del dorado de marca.", en: "A documented design system: tokens, type, motion and AA contrast for the brand gold." },
              { es: "Landing de una página, mobile-first, con accesibilidad de teclado y reduced motion.", en: "A one-page, mobile-first landing with keyboard access and reduced motion support." },
              { es: "Publicación automática en GitHub Pages en cada cambio.", en: "Automatic publishing to GitHub Pages on every change." },
              { es: "Una guía reutilizable que hoy es la base de este portafolio.", en: "A reusable guide that is now the foundation of this portfolio." },
            ].map((x) => (
              <li key={x.es} className="border-t border-line pt-4">
                <T es={x.es} en={x.en} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
