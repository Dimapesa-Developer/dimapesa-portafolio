import type { Metadata } from "next";
import Image from "next/image";
import { asset } from "@/config/site";
import { SITIOS } from "@/data/archivo";
import { T } from "@/components/i18n/T";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Sitios web",
  description: "Experiencias web creadas para compartirse, con enlaces y notas de cada proyecto.",
};

export default function Sitios() {
  return (
    <main>
      <CabeceraPagina
        titulo={<T es="Ideas, publicadas." en="Ideas, published." />}
        entrada={
          <T
            es="Experiencias web creadas para compartirse: una selección que crece, con enlace y notas de cada proyecto."
            en="Web experiences built to be shared: a growing selection, with a link and notes for each project."
          />
        }
      />
      <ul className="grid gap-16 px-4 pb-28 md:grid-cols-2 md:gap-x-6 md:px-8 md:pb-40">
        {SITIOS.map((s, i) => (
          <Reveal as="li" key={s.url} delay={i * 0.08} className={`min-w-0 ${i % 2 ? "md:mt-24" : ""}`}>
            <a href={s.url} target="_blank" rel="noopener" className="group block">
              <div className="overflow-hidden rounded-[14px] border border-line bg-ink">
                <div className="flex h-8 items-center gap-1.5 border-b border-white/10 px-3">
                  {[0, 1, 2].map((k) => (
                    <span key={k} className="size-2 rounded-full bg-white/25" />
                  ))}
                  <span className="ml-3 truncate font-mono text-[11px] text-white/50">{s.url.replace("https://", "")}</span>
                </div>
                <div className="relative aspect-[16/10]">
                  {s.imagen && (
                    <Image
                      src={asset(s.imagen)}
                      alt={`Vista de ${s.nombre}`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  )}
                </div>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h2 className="display-md">
                  <span className="llaves">{s.nombre}</span>
                </h2>
                <span className="meta shrink-0">
                  {s.herramienta}, {s.anio}
                </span>
              </div>
              <p className="mt-2 max-w-[48ch] text-muted">
                <T es={s.nota.es} en={s.nota.en} />
              </p>
            </a>
          </Reveal>
        ))}
      </ul>
    </main>
  );
}
