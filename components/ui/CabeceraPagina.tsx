import { Reveal } from "@/components/motion/Reveal";

/** Encabezado común de páginas internas: titular gigante + entrada corta */
export function CabeceraPagina({ titulo, entrada, pie }: { titulo: React.ReactNode; entrada?: React.ReactNode; pie?: React.ReactNode }) {
  return (
    <header className="px-4 pb-16 pt-36 md:px-8 md:pb-24 md:pt-48">
      <Reveal as="h1" className="display-xl max-w-[14ch]">
        {titulo}
      </Reveal>
      {(entrada || pie) && (
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
          {entrada && (
            <Reveal as="p" delay={0.1} className="max-w-[52ch] text-[18px] leading-relaxed text-muted md:col-span-6 md:col-start-7">
              {entrada}
            </Reveal>
          )}
          {pie && <div className="md:col-span-6 md:col-start-7">{pie}</div>}
        </div>
      )}
    </header>
  );
}
