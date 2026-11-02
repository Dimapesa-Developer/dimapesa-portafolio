import type { Metadata } from "next";
import { ENTRADAS } from "@/data/archivo";
import { T } from "@/components/i18n/T";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { BotonPrincipal } from "@/components/ui/Boton";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notas sobre diseño, inteligencia artificial y código.",
};

export default function Blog() {
  return (
    <main>
      <CabeceraPagina
        titulo="Blog"
        entrada={<T es="Notas sobre diseño, inteligencia artificial y código." en="Notes on design, artificial intelligence and code." />}
      />
      <section className="px-4 pb-28 md:px-8 md:pb-40">
        {ENTRADAS.length ? (
          <ul className="border-t border-line">
            {ENTRADAS.map((e) => (
              <li key={e.slug} className="grid gap-2 border-b border-line py-8 md:grid-cols-12">
                <time className="meta md:col-span-2">{e.fecha}</time>
                <h2 className="display-md md:col-span-6">
                  <T es={e.titulo.es} en={e.titulo.en} />
                </h2>
                <p className="text-muted md:col-span-4">
                  <T es={e.resumen.es} en={e.resumen.en} />
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="grid gap-8 border-t border-line pt-10 md:grid-cols-12">
            <p className="font-mono text-[15px] text-muted md:col-span-4">
              <span className="text-brace-text">$</span> ls notas/
              <br />
              <T es="0 entradas" en="0 entries" />
            </p>
            <div className="md:col-span-7 md:col-start-6">
              <p className="display-md max-w-[20ch]">
                <T es="La primera nota está en camino." en="The first note is on its way." />
              </p>
              <div className="mt-10">
                <BotonPrincipal href="/contacto">
                  <T es="Proponer un tema" en="Suggest a topic" />
                </BotonPrincipal>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
