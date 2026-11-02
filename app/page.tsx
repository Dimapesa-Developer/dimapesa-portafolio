import { Hero } from "@/components/sections/Hero";
import { ArchivoIndice, Capacidades, LlamadoContacto, Manifiesto, Proyectos } from "@/components/sections/Inicio";

export default function Inicio() {
  return (
    <main>
      <Hero />
      <Manifiesto />
      <Capacidades />
      <Proyectos />
      <ArchivoIndice />
      <LlamadoContacto />
    </main>
  );
}
