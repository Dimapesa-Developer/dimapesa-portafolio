import type { Metadata } from "next";
import Image from "next/image";
import { asset, site } from "@/config/site";
import { CAPACIDADES } from "@/data/contenido";
import {
  CREATIVO,
  DISPONIBILIDAD,
  EXPERIENCIA,
  FORMACION,
  FORMACION_CONTINUA,
  IDIOMAS,
  PERFIL,
  PROYECTOS_CV,
  TITULAR,
} from "@/data/cv";
import { T } from "@/components/i18n/T";
import { Llave, LlaveD } from "@/components/brand/LlaveD";
import { GRUPOS, IconoHerramienta } from "@/components/brand/Herramientas";

export const metadata: Metadata = {
  title: "CV",
  description: "Currículum de Diego Martin Pelayo Salazar, ingeniero en TI: sistemas, desarrollo web e IA.",
};

const PDFS = [
  { href: "/cv/diego-pelayo-cv-claro.pdf", es: "PDF claro", en: "Light PDF" },
  { href: "/cv/diego-pelayo-cv-oscuro.pdf", es: "PDF oscuro", en: "Dark PDF" },
  { href: "/cv/diego-pelayo-cv-en.pdf", es: "PDF en inglés", en: "PDF in English" },
];

const sinProtocolo = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** Título de sección del CV: la palabra entre llaves, como en la navegación activa */
function Titulo({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2.5 whitespace-nowrap text-[12.5px] font-medium tracking-[0.01em] text-text">
      <span className="font-serif text-[15px] text-brace-text">{"{ "}</span>
      {children}
      <span className="font-serif text-[15px] text-brace-text">{" }"}</span>
    </h2>
  );
}

/** Una hoja tamaño carta: 8.5 × 11 in = 816 × 1056 px */
function Hoja({ children }: { children: React.ReactNode }) {
  return (
    <article className="cv-hoja relative mx-auto flex w-full max-w-[816px] flex-col overflow-hidden border border-line bg-bg md:min-h-[1056px]">
      {children}
    </article>
  );
}

function Pie() {
  return (
    <footer className="mt-auto flex items-end justify-between gap-6 border-t border-line px-6 py-4 md:px-10">
      <p className="voz text-[17px] leading-tight">
        <T es={<>Diseñado con intención.<br />Construido para avanzar.</>} en={<>Designed with intention.<br />Built to move forward.</>} />
      </p>
      <p className="font-display text-[30px] font-semibold leading-none tracking-[-0.04em]" style={{ fontVariationSettings: '"opsz" 96, "wdth" 75' }}>
        <span className="font-serif font-normal text-brace-text">{"{"}</span>DIMAPESA<span className="font-serif font-normal text-brace-text">{"}"}</span>
      </p>
    </footer>
  );
}

export default function CV() {
  return (
    <main className="cv-pagina px-4 pb-24 pt-28 md:px-8 md:pt-36">
      <div className="cv-controles mx-auto mb-8 flex max-w-[816px] flex-wrap items-center justify-between gap-4">
        <h1 className="display-md">CV</h1>
        <ul className="flex flex-wrap gap-2">
          {PDFS.map((p) => (
            <li key={p.href}>
              <a
                href={asset(p.href)}
                download
                className="inline-flex h-10 items-center rounded-full border border-line px-4 text-[14px] transition-colors hover:border-brace hover:text-brace-text"
              >
                <T es={p.es} en={p.en} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="cv-hojas grid gap-8">
        {/* Hoja 1: quién soy y experiencia */}
        <Hoja>
          <header className="relative grid gap-6 border-b border-line px-6 pb-5 pt-6 md:grid-cols-[1fr_auto] md:px-10 md:pt-7">
            <div>
              <LlaveD className="w-11" />
              <p
                className="mt-4 font-display font-semibold leading-[0.9] tracking-[-0.035em] text-[clamp(40px,7vw,54px)]"
                style={{ fontVariationSettings: '"opsz" 96' }}
              >
                Diego Martin
                <br />
                Pelayo Salazar
              </p>
              <p className="mt-3 text-[16px]">
                <T es={TITULAR.es} en={TITULAR.en} />
              </p>
              <p className="voz mt-0.5 text-[18px] text-violet-text">
                <T es="código, diseño y sistemas" en="code, design & systems" />
              </p>
            </div>
            {/* Retrato entre llaves de puntos, como en el sitio */}
            <div className="relative mx-auto w-[108px] self-end md:mx-0 md:mr-10">
              <Llave puntos className="absolute right-[calc(100%+6px)] top-0 h-full w-auto" />
              <div className="relative aspect-[4/5] [mask-image:linear-gradient(to_bottom,#000_80%,transparent)]">
                <Image src={asset("/img/diego-recorte.webp")} alt="Diego Martin Pelayo Salazar" fill sizes="108px" className="object-cover object-[50%_20%]" priority />
              </div>
              <Llave puntos cierre className="absolute left-[calc(100%+6px)] top-0 h-full w-auto" />
            </div>
          </header>

          <div className="grid flex-1 md:grid-cols-[244px_1fr]">
            <aside className="grid content-start gap-5 border-line px-6 py-5 md:border-r md:px-7">
              <section>
                <Titulo><T es="Contacto" en="Contact" /></Titulo>
                <ul className="grid gap-1 break-words text-[12px] leading-snug">
                  <li className="font-medium">{site.correo}</li>
                  <li>{sinProtocolo(site.redes.linkedin)}</li>
                  <li>{sinProtocolo(site.redes.github)}</li>
                  <li>{sinProtocolo(site.url)}</li>
                  <li className="mt-1 text-muted">{site.ubicacion}, México</li>
                  <li className="text-muted"><T es={DISPONIBILIDAD.es} en={DISPONIBILIDAD.en} /></li>
                </ul>
              </section>

              <section>
                <Titulo><T es="Formación" en="Education" /></Titulo>
                <ul className="grid gap-3 text-[12px] leading-snug">
                  {FORMACION.map((f) => (
                    <li key={f.titulo.es}>
                      <p className="font-medium"><T es={f.titulo.es} en={f.titulo.en} /></p>
                      <p className="mt-0.5 text-muted">{f.lugar}</p>
                      <p className="text-muted">{f.periodo}</p>
                    </li>
                  ))}
                  {FORMACION_CONTINUA.map((f) => (
                    <li key={f.es}><T es={f.es} en={f.en} /></li>
                  ))}
                </ul>
              </section>

              <section>
                <Titulo><T es="Idiomas" en="Languages" /></Titulo>
                <ul className="grid gap-1 text-[12px]">
                  {IDIOMAS.map((i) => (
                    <li key={i.idioma.es} className="flex justify-between gap-3">
                      <T es={i.idioma.es} en={i.idioma.en} />
                      <span className="text-muted"><T es={i.nivel.es} en={i.nivel.en} /></span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <Titulo><T es="Archivo creativo" en="Creative archive" /></Titulo>
                <ul className="grid gap-1 text-[12px]">
                  {CREATIVO.map((c) => (
                    <li key={c.es}><T es={c.es} en={c.en} /></li>
                  ))}
                </ul>
              </section>
            </aside>

            <div className="grid content-start gap-6 px-6 py-5 md:px-9">
              <section>
                <Titulo><T es="Perfil" en="Profile" /></Titulo>
                <p className="text-[15.5px] font-medium leading-[1.4] tracking-[-0.005em]">
                  <T es={PERFIL.es} en={PERFIL.en} />
                </p>
                <p className="mt-2 text-[14px] leading-snug text-muted">
                  <T
                    es={<>Pienso como estratega, diseño como <span className="voz text-[16px] text-violet-text">humano</span> y construyo como tecnólogo.</>}
                    en={<>I think like a strategist, design like a <span className="voz text-[16px] text-violet-text">human</span> and build like a technologist.</>}
                  />
                </p>
              </section>

              <section>
                <Titulo><T es="Experiencia" en="Experience" /></Titulo>
                <ol className="grid gap-5">
                  {EXPERIENCIA.map((e) => (
                    <li key={e.cargo.es} className="border-t border-line pt-3">
                      <p className="flex items-baseline justify-between gap-4">
                        <span className="text-[17px] font-semibold tracking-[-0.015em]"><T es={e.cargo.es} en={e.cargo.en} /></span>
                        <span className="shrink-0 text-[12px] text-brace-text"><T es={e.periodo.es} en={e.periodo.en} /></span>
                      </p>
                      <p className="mt-0.5 text-[12.5px] leading-snug text-muted">
                        <T es={e.lugar.es} en={e.lugar.en} />, {e.ciudad}
                      </p>
                      <ul className="mt-2.5 grid gap-1.5 text-[12.5px] leading-snug">
                        {e.logros.map((l) => (
                          <li key={l.es} className="relative pl-4">
                            <span aria-hidden className="absolute left-0 top-0 font-serif text-brace-text">{"}"}</span>
                            <T es={l.es} en={l.en} />
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
          <Pie />
        </Hoja>

        {/* Hoja 2: herramientas, proyectos y capacidades */}
        <Hoja>
          <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line px-6 py-5 md:px-10">
            <div className="flex items-center gap-4">
              <LlaveD className="w-9" />
              <p className="text-[15px] font-semibold tracking-[-0.01em]">Diego Martin Pelayo Salazar</p>
            </div>
            <p className="text-[12px] text-muted">{site.correo}</p>
          </header>

          <div className="grid content-start gap-7 px-6 py-6 md:px-10">
            <section>
              <Titulo><T es="Herramientas y lenguajes" en="Tools & languages" /></Titulo>
              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {GRUPOS.map((g) => (
                  <div key={g.id} className="border-t border-line pt-2.5">
                    <p className="mb-2 text-[11.5px] text-muted"><T es={g.es} en={g.en} /></p>
                    <ul className="flex flex-wrap gap-1">
                      {g.items.map((h) => (
                        <li key={h.nombre} className="inline-flex items-center gap-1.5 rounded-full border border-line py-[3px] pl-2 pr-2.5 text-[11px]">
                          <IconoHerramienta nombre={h.nombre} className="size-3 shrink-0 text-muted" />
                          {h.nombre}
                          {h.nota && <span className="text-muted"><T es={h.nota.es} en={h.nota.en} /></span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Titulo><T es="Proyectos destacados" en="Selected projects" /></Titulo>
              <ol className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {PROYECTOS_CV.map((p) => (
                  <li key={p.nombre} className="grid content-start gap-1 border-t border-line pt-2.5">
                    <p className="flex items-baseline justify-between gap-3">
                      <span className="text-[16px] font-semibold tracking-[-0.015em]">{p.nombre}</span>
                      <span className="shrink-0 text-[11.5px] text-muted">
                        <T es={p.tipo.es} en={p.tipo.en} />
                        {p.anio && `, ${p.anio}`}
                      </span>
                    </p>
                    <p className="text-[12px] leading-snug"><T es={p.texto.es} en={p.texto.en} /></p>
                    {(p.stack || p.url) && (
                      <p className="grid gap-0.5 text-[11px] text-muted">
                        {p.stack && <span>{p.stack}</span>}
                        {p.url && <span className="break-all text-brace-text">{p.url}</span>}
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <Titulo><T es="Capacidades" en="Capabilities" /></Titulo>
              <ul className="grid gap-4 sm:grid-cols-3">
                {CAPACIDADES.map((c) => (
                  <li key={c.titulo.es} className="border-t border-line pt-2.5">
                    <p className="text-[15px] font-medium"><T es={c.titulo.es} en={c.titulo.en} /></p>
                    <p className="mt-1 text-[12px] leading-snug text-muted"><T es={c.texto.es} en={c.texto.en} /></p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <Pie />
        </Hoja>
      </div>
    </main>
  );
}
