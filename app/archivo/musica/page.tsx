import type { Metadata } from "next";
import { PISTAS } from "@/data/archivo";
import { T } from "@/components/i18n/T";
import { CabeceraPagina } from "@/components/ui/CabeceraPagina";
import { Reproductor } from "@/components/sections/Reproductor";

export const metadata: Metadata = {
  title: "Música",
  description: "Canciones originales hechas con SUNO, para escuchar sin salir del portafolio.",
};

export default function Musica() {
  return (
    <main>
      <CabeceraPagina
        titulo={<T es="Música" en="Music" />}
        entrada={
          <T
            es="Canciones donde la tecnología se vuelve emoción. Hechas con SUNO, para escucharse sin salir del portafolio."
            en="Songs where technology becomes emotion. Made with SUNO, to be heard without leaving the portfolio."
          />
        }
      />
      <section className="px-4 pb-28 md:px-8 md:pb-40">
        <Reproductor
          pistas={PISTAS}
          vacio={
            <T
              es="La primera sesión de escucha está en preparación. Vuelve pronto o escríbeme si quieres escuchar un adelanto."
              en="The first listening session is being prepared. Come back soon, or write to me for an early preview."
            />
          }
        />
      </section>
    </main>
  );
}
