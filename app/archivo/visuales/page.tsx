import type { Metadata } from "next";
import Image from "next/image";
import { asset } from "@/config/site";
import { VISUALES } from "@/data/archivo";
import { T } from "@/components/i18n/T";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { ImageReveal } from "@/components/motion/ImageReveal";

export const metadata: Metadata = {
  title: "Visuales con IA",
  description: "Retratos, experimentos y dirección de arte desarrollados con inteligencia artificial.",
};

export default function Visuales() {
  return (
    <main>
      <CabeceraPagina
        titulo={<T es="Visuales con IA" en="AI visuals" />}
        entrada={
          <T
            es="Ideas visuales con pulso digital: retratos, experimentos y dirección de arte desarrollados con inteligencia artificial."
            en="Visual ideas with a digital pulse: portraits, experiments, and art direction shaped with artificial intelligence."
          />
        }
      />
      <section className="grid gap-x-6 gap-y-16 px-4 pb-28 sm:grid-cols-2 md:grid-cols-12 md:px-8 md:pb-40">
        {VISUALES.map((v, i) => (
          <figure key={v.src} className={i % 3 === 0 ? "md:col-span-5" : i % 3 === 1 ? "md:col-span-4 md:col-start-8 md:mt-32" : "md:col-span-6 md:col-start-3"}>
            <ImageReveal className="aspect-[4/5] bg-surface">
              <Image src={asset(v.src)} alt={v.alt} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </ImageReveal>
            <figcaption className="meta mt-3 flex justify-between">
              <T es={v.titulo.es} en={v.titulo.en} />
              <span>{v.anio}</span>
            </figcaption>
          </figure>
        ))}
        {VISUALES.length < 3 && (
          <div className="flex flex-col justify-end border border-dashed border-line p-6 md:col-span-4 md:col-start-8 md:mt-32 md:aspect-[4/5]">
            <p className="font-serif text-[64px] leading-none text-brace-text">{"{ }"}</p>
            <p className="mt-4 max-w-[30ch] text-muted">
              <T es="La galería completa llega pronto." en="The full gallery is coming soon." />
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
