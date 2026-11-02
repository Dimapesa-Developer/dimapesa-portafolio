import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asset } from "@/config/site";
import { T } from "@/components/i18n/T";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Reveal } from "@/components/motion/Reveal";
import { BotonPrincipal } from "@/components/ui/Boton";
import { Llave } from "@/components/brand/LlaveD";
import { GRUPOS, IconoHerramienta } from "@/components/brand/Herramientas";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Diego Martin Pelayo Salazar, tecnólogo creativo en México: estrategia, diseño y tecnología.",
};

// TODO(Diego): revisar textos y agregar trayectoria real (estudios, trabajos, clientes)
const METODO = [
  { t: { es: "Escuchar", en: "Listen" }, d: { es: "Entender a quién sirve el proyecto y qué tiene que cambiar para esa persona.", en: "Understand who the project serves and what needs to change for them." } },
  { t: { es: "Ordenar", en: "Organize" }, d: { es: "Convertir la complejidad en una dirección clara, con prioridades y límites.", en: "Turn complexity into a clear direction, with priorities and limits." } },
  { t: { es: "Diseñar", en: "Design" }, d: { es: "Dar forma a la experiencia: flujo, tono, tipografía, movimiento y detalle.", en: "Shape the experience: flow, tone, type, motion and detail." } },
  { t: { es: "Construir", en: "Build" }, d: { es: "Llevarlo a producción con código, automatización y herramientas de IA.", en: "Take it to production with code, automation and AI tools." } },
];


export default function SobreMi() {
  return (
    <main>
      <section className="grid gap-12 px-4 pb-24 pt-32 md:grid-cols-12 md:px-8 md:pb-36 md:pt-44">
        <div className="md:col-span-7">
          <Reveal as="h1" className="display-xl">
            <T es={<>Hola, soy<br />Diego.</>} en={<>Hi, I’m<br />Diego.</>} />
          </Reveal>
          <Reveal as="p" delay={0.1} className="display-md mt-12 max-w-[22ch] text-muted">
            <T
              es={<>Pienso como estratega, diseño como <span className="voz text-violet-text">humano</span> y construyo como tecnólogo.</>}
              en={<>I think like a strategist, design like a <span className="voz text-violet-text">human</span> and build like a technologist.</>}
            />
          </Reveal>
        </div>
        {/* El retrato dentro de las llaves, igual que en el inicio: la foto manda la altura */}
        <div className="flex justify-center md:col-span-5 md:col-start-8 md:self-center">
          <div className="relative w-[min(44vw,300px)] md:w-[min(18vw,320px)]">
            <Llave puntos className="absolute right-[calc(100%+4%)] top-0 h-full w-auto" />
            <ImageReveal className="aspect-[4/5] [mask-image:linear-gradient(to_bottom,#000_82%,transparent)]">
              <Image src={asset("/img/diego-recorte.webp")} alt="Diego Martin Pelayo Salazar" fill priority sizes="(min-width: 768px) 18vw, 44vw" className="object-cover object-[50%_25%]" />
            </ImageReveal>
            <Llave puntos cierre className="absolute left-[calc(100%+4%)] top-0 h-full w-auto" />
          </div>
        </div>
      </section>

      <section className="grid gap-10 border-t border-line px-4 py-24 md:grid-cols-12 md:px-8 md:py-36">
        <h2 className="display-md md:col-span-4">
          <T es="Lo que hago" en="What I do" />
        </h2>
        <div className="grid max-w-[60ch] gap-6 text-[18px] leading-relaxed md:col-span-7 md:col-start-6">
          <p>
            <T
              es="Diseño y construyo productos digitales que hacen lo complejo más claro, útil y humano. Trabajo en el punto donde una buena idea se encuentra con una ejecución precisa."
              en="I design and build digital products that make complexity clear, useful, and human. I work where a good idea meets precise execution."
            />
          </p>
          <p className="text-muted">
            <T
              es="Además del producto digital, exploro imágenes con inteligencia artificial, sitios web y música hecha con SUNO. Todo empieza con la misma pregunta: ¿qué tiene que sentir quien lo usa?"
              en="Beyond digital product, I explore AI imagery, websites and music made with SUNO. Everything starts with the same question: what should the person using it feel?"
            />
          </p>
        </div>
      </section>

      <section aria-labelledby="metodo" className="border-t border-line px-4 py-24 md:px-8 md:py-36">
        <h2 id="metodo" className="display-lg mb-14 md:mb-20">
          <T es="Cómo trabajo" en="How I work" />
        </h2>
        <ol className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {METODO.map((m, i) => (
            <Reveal as="li" key={m.t.es} delay={i * 0.08} className="border-t border-line pt-5">
              <span className="font-serif text-[56px] leading-none text-violet-text">{i + 1}</span>
              <h3 className="mt-4 text-[22px] font-medium"><T es={m.t.es} en={m.t.en} /></h3>
              <p className="mt-3 text-muted"><T es={m.d.es} en={m.d.en} /></p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="grid gap-10 border-t border-line px-4 py-24 md:grid-cols-12 md:px-8 md:py-36">
        <h2 className="display-md md:col-span-4">
          <T es={<>Herramientas<br />y lenguajes</>} en={<>Tools &amp;<br />languages</>} />
        </h2>
        <div className="grid gap-10 md:col-span-7 md:col-start-6">
          {GRUPOS.map((g) => (
            <div key={g.id}>
              <h3 className="meta mb-4">
                <T es={g.es} en={g.en} />
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {g.items.map((h, i) => (
                  <Reveal
                    as="li"
                    key={h.nombre}
                    delay={i * 0.03}
                    className="group inline-flex items-center gap-2.5 rounded-full border border-line py-2.5 pl-3.5 pr-5 text-[15px] transition-colors duration-300 hover:border-brace"
                  >
                    <IconoHerramienta
                      nombre={h.nombre}
                      className="size-[18px] shrink-0 text-muted transition-colors duration-300 group-hover:text-brace-text"
                    />
                    {h.nombre}
                    {h.nota && (
                      <span className="text-muted">
                        <T es={h.nota.es} en={h.nota.en} />
                      </span>
                    )}
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <div className="flex flex-wrap items-center gap-6">
            <BotonPrincipal href="/contacto">
              <T es="Trabajemos juntos" en="Let’s work together" />
            </BotonPrincipal>
            <Link href="/cv" className="llaves text-[17px] font-medium text-brace-text">
              <T es="Ver mi CV" en="See my CV" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
