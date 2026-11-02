import type { Metadata } from "next";
import { ARCHIVO } from "@/data/contenido";
import { T } from "@/components/i18n/T";
import { MEDIOS } from "@/components/brand/Medios";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { HoverPreviewList } from "@/components/effects/HoverPreviewList";

export const metadata: Metadata = {
  title: "Archivo creativo",
  description: "Visuales con IA, sitios web, música hecha con SUNO y notas del blog de Diego Martin Pelayo Salazar.",
};

export default function Archivo() {
  return (
    <main>
      <CabeceraPagina
        titulo={<T es="Archivo" en="Archive" />}
        entrada={
          <T
            es="La obra que va más allá del producto digital: imágenes, sitios, sonido y notas. Crece poco a poco."
            en="The work beyond digital product: images, websites, sound and notes. It grows little by little."
          />
        }
      />
      <div className="px-4 pb-28 md:px-8 md:pb-40">
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
      </div>
    </main>
  );
}
