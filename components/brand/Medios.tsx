import Image from "next/image";
import { asset } from "@/config/site";

// Miniaturas para el archivo: se dibujan con la marca cuando todavía no hay foto propia.

export function MedioRetrato() {
  return (
    <div className="absolute inset-0 bg-violet">
      <Image src={asset("/img/diego-recorte.webp")} alt="" fill sizes="300px" className="object-cover object-[50%_25%]" />
    </div>
  );
}

export function MedioSitio() {
  return (
    <div className="absolute inset-0 flex flex-col bg-ink">
      <div className="flex h-5 shrink-0 items-center gap-1 border-b border-white/10 px-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-1.5 rounded-full bg-white/25" />
        ))}
      </div>
      <div className="relative flex-1">
        <Image src={asset("/img/portafolio-v1.webp")} alt="" fill sizes="300px" className="object-cover object-top" />
      </div>
    </div>
  );
}

/** Barras de una forma de onda, deterministas para que coincidan servidor y cliente */
export function MedioOnda() {
  const barras = Array.from({ length: 36 }, (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45)));
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[3%] bg-violet px-[8%]">
      {barras.map((h, i) => (
        <span key={i} className="w-[1.6%] rounded-full bg-paper" style={{ height: `${h * 62}%` }} />
      ))}
    </div>
  );
}

export function MedioLlaves() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-lime font-serif text-[min(18vw,96px)] leading-none text-ink">
      {"{ }"}
    </div>
  );
}

export const MEDIOS = {
  retrato: MedioRetrato,
  sitio: MedioSitio,
  onda: MedioOnda,
  llaves: MedioLlaves,
} as const;
