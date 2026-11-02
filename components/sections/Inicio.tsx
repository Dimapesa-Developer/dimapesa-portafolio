import Image from "next/image";
import Link from "next/link";
import { asset } from "@/config/site";
import { ARCHIVO, CAPACIDADES, PROYECTOS } from "@/data/contenido";
import { T } from "@/components/i18n/T";
import { MEDIOS } from "@/components/brand/Medios";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/effects/ScrollWords";
import { StackingCards } from "@/components/effects/StackingCards";
import { HoverPreviewList } from "@/components/effects/HoverPreviewList";
import { BotonPrincipal } from "@/components/ui/Boton";

export function Manifiesto() {
  return (
    <section id="perfil" className="px-4 py-28 md:px-8 md:py-44">
      <div className="grid gap-12 md:grid-cols-12">
        <h2 className="display-lg md:col-span-11">
          <span className="t-es">
            <ScrollWords texto="Pienso como estratega. Diseño como *humano. Construyo como tecnólogo." />
          </span>
          <span className="t-en" lang="en">
            <ScrollWords texto="I think like a strategist. Design like a *human. Build like a technologist." />
          </span>
        </h2>
        <Reveal as="p" className="max-w-[46ch] text-[17px] text-muted md:col-span-5 md:col-start-7">
          <T
            es="Trabajo en el punto donde una buena idea se encuentra con una ejecución precisa. Mi enfoque combina estructura, sensibilidad visual y tecnología para crear soluciones con carácter y propósito."
            en="I work where a good idea meets precise execution. My approach combines structure, visual sensitivity, and technology to create solutions with character and purpose."
          />
        </Reveal>
      </div>
    </section>
  );
}

export function Capacidades() {
  return (
    <section aria-labelledby="capacidades" className="border-t border-line px-4 py-24 md:px-8 md:py-36">
      <div className="grid gap-x-8 gap-y-14 md:grid-cols-12">
        <h2 id="capacidades" className="display-md md:col-span-4">
          <T es={<>De la idea<br />al sistema.</>} en={<>From idea<br />to system.</>} />
        </h2>
        <ul className="grid gap-12 sm:grid-cols-3 sm:gap-8 md:col-span-8">
          {CAPACIDADES.map((c, i) => (
            <Reveal as="li" key={c.titulo.es} delay={i * 0.08} className="border-t border-line pt-5">
              <h3 className="text-[clamp(24px,2.4vw,34px)] font-medium leading-[1.05] tracking-[-0.02em]">
                <T es={c.titulo.es} en={c.titulo.en} />
              </h3>
              <p className="mt-3 text-muted">
                <T es={c.texto.es} en={c.texto.en} />
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Proyectos() {
  return (
    <section aria-labelledby="proyectos" className="px-4 pt-24 md:px-8 md:pt-36">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20">
        <Reveal as="h2" className="display-xl">
          <span id="proyectos">
            <T es="Proyectos" en="Projects" />
          </span>
        </Reveal>
        <p className="meta max-w-[30ch]">
          <T es="Trabajo seleccionado. Desliza para apilar." en="Selected work. Scroll to stack." />
        </p>
      </div>
      <StackingCards>
        {PROYECTOS.map((p) => (
          <article key={p.slug} className="grid overflow-hidden border border-line bg-surface md:grid-cols-12">
            <Link
              href={p.href}
              {...(p.externo ? { target: "_blank", rel: "noopener" } : {})}
              className="group relative block aspect-[16/10] overflow-hidden md:col-span-8 md:aspect-auto md:min-h-[min(68svh,640px)]"
            >
              <Image
                src={asset(p.imagen)}
                alt={p.alt}
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className="object-cover object-left-top transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </Link>
            <div className="flex flex-col justify-between gap-10 p-5 md:col-span-4 md:p-8">
              <div>
                <p className="meta">
                  <T es={p.tipo.es} en={p.tipo.en} />, {p.anio}
                </p>
                <h3 className="display-md mt-3">{p.nombre}</h3>
                <p className="mt-5 max-w-[42ch] text-muted">
                  <T es={p.resumen.es} en={p.resumen.en} />
                </p>
              </div>
              <div className="flex flex-col items-start gap-5">
                <p className="text-sm">
                  <T es={p.rol.es} en={p.rol.en} />
                </p>
                <Link
                  href={p.href}
                  {...(p.externo ? { target: "_blank", rel: "noopener" } : {})}
                  className="llaves text-[17px] font-medium text-brace-text"
                >
                  {p.externo ? <T es="Visitar sitio ↗" en="Visit site ↗" /> : <T es="Ver caso" en="Read case" />}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </StackingCards>
    </section>
  );
}

export function ArchivoIndice() {
  return (
    <section aria-labelledby="archivo" className="px-4 py-24 md:px-8 md:py-40">
      <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12">
        <h2 id="archivo" className="display-md md:col-span-6">
          <T es={<>Imágenes, sitios<br />y sonido.</>} en={<>Images, websites<br />& sound.</>} />
        </h2>
        <p className="max-w-[46ch] text-muted md:col-span-5 md:col-start-8">
          <T
            es="Un espacio para la obra que va más allá del producto digital: imágenes asistidas por IA, sitios creados con GPT Sites y música original hecha con SUNO."
            en="A place for the work that expands beyond product design: AI-assisted visuals, websites made with GPT Sites, and original music made with SUNO."
          />
        </p>
      </div>
      <HoverPreviewList
        filas={ARCHIVO.map((a) => {
          const Medio = MEDIOS[a.media];
          return {
            href: a.href,
            titulo: <T es={a.titulo.es} en={a.titulo.en} />,
            detalle: <T es={a.detalle.es} en={a.detalle.en} />,
            media: <Medio />,
          };
        })}
      />
    </section>
  );
}

export function LlamadoContacto() {
  return (
    <section aria-labelledby="hablemos" className="relative overflow-hidden bg-violet px-4 py-24 text-paper md:px-8 md:py-40">
      <h2 id="hablemos" className="display-xl max-w-[12ch]">
        <T es="Hagamos algo que importe." en="Let’s make something that matters." />
      </h2>
      <div className="mt-12 flex flex-col items-start gap-8 md:mt-16 md:flex-row md:items-end md:justify-between">
        <p className="max-w-[40ch] text-[17px]">
          <T
            es="¿Tienes una idea, una colaboración o una conversación pendiente? Este es un buen lugar para empezar."
            en="Have an idea, a collaboration, or a conversation waiting to happen? This is a good place to start."
          />
        </p>
        <BotonPrincipal href="/contacto">
          <T es="Iniciar conversación" en="Start a conversation" />
        </BotonPrincipal>
      </div>
    </section>
  );
}
