import type { Metadata } from "next";
import { site } from "@/config/site";
import { T } from "@/components/i18n/T";
import { Reveal } from "@/components/motion/Reveal";
import { FormularioContacto } from "@/components/sections/FormularioContacto";

export const metadata: Metadata = {
  title: "Contacto",
  description: "¿Tienes una idea, una colaboración o una conversación pendiente? Escríbele a Diego Martin Pelayo Salazar.",
};

export default function Contacto() {
  return (
    <main className="grid gap-16 px-4 pb-28 pt-32 md:grid-cols-12 md:px-8 md:pb-40 md:pt-44">
      <div className="md:col-span-6">
        <Reveal as="h1" className="display-xl">
          <T es={<>Hagamos algo que importe.</>} en={<>Let’s make something that matters.</>} />
        </Reveal>
        <div className="mt-12 grid gap-6 text-[17px]">
          {site.correo && (
            <a href={`mailto:${site.correo}`} className="llaves w-fit text-brace-text">
              {site.correo}
            </a>
          )}
          <p className="text-muted">
            {site.ubicacion}, {site.coordenadas}
          </p>
          <a href={site.redes.github} target="_blank" rel="noopener" className="llaves w-fit">
            GitHub
          </a>
          <a href={site.redes.linkedin} target="_blank" rel="noopener" className="llaves w-fit">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="md:col-span-5 md:col-start-8 md:pt-6">
        <FormularioContacto />
      </div>
    </main>
  );
}
