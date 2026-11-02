"use client";

import { useState } from "react";
import { site } from "@/config/site";
import { T } from "@/components/i18n/T";

const TIPOS = [
  { es: "Sitio web", en: "Website" },
  { es: "Producto digital", en: "Digital product" },
  { es: "Automatización", en: "Automation" },
  { es: "Visuales o música", en: "Visuals or music" },
  { es: "Otra cosa", en: "Something else" },
];

const campo =
  "w-full border-b border-line bg-transparent py-3 text-[18px] outline-none transition-colors placeholder:text-muted/70 focus:border-brace-text";

/** Sitio estático: el formulario arma un correo y lo abre en la app de correo de quien escribe */
export function FormularioContacto() {
  const [tipo, setTipo] = useState<string | null>(null);

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const datos = new FormData(e.currentTarget);
    const nombre = String(datos.get("nombre") ?? "").trim();
    const mensaje = String(datos.get("mensaje") ?? "").trim();
    const asunto = `DIMAPESA: ${tipo ?? "Proyecto"}${nombre ? `, de ${nombre}` : ""}`;
    window.location.href = `mailto:${site.correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(mensaje)}`;
  };

  return (
    <form onSubmit={enviar} className="grid gap-10">
      <fieldset>
        <legend className="meta mb-4">
          <T es="¿Qué tienes en mente?" en="What do you have in mind?" />
        </legend>
        <div className="flex flex-wrap gap-2">
          {TIPOS.map((t) => (
            <button
              key={t.es}
              type="button"
              aria-pressed={tipo === t.es}
              onClick={() => setTipo(tipo === t.es ? null : t.es)}
              className="rounded-full border border-line px-4 py-2 text-[15px] transition-colors hover:border-text aria-pressed:border-lime aria-pressed:bg-lime aria-pressed:text-ink"
            >
              <T es={t.es} en={t.en} />
            </button>
          ))}
        </div>
      </fieldset>
      <label className="grid gap-1">
        <span className="meta">
          <T es="Tu nombre" en="Your name" />
        </span>
        <input name="nombre" autoComplete="name" className={campo} />
      </label>
      <label className="grid gap-1">
        <span className="meta">
          <T es="Cuéntame un poco" en="Tell me a little" />
        </span>
        <textarea name="mensaje" rows={4} required className={`${campo} resize-none`} />
      </label>
      <div className="flex flex-wrap items-center gap-6">
        <button
          type="submit"
          className="inline-flex h-14 items-center rounded-full bg-lime px-8 text-[16px] font-medium text-ink transition-transform duration-300 ease-editorial hover:-translate-y-0.5"
        >
          <T es="Abrir en mi correo" en="Open in my email" />
        </button>
        <p className="meta max-w-[32ch]">
          <T es="Se abre tu app de correo con el mensaje listo para enviar." en="Your email app opens with the message ready to send." />
        </p>
      </div>
    </form>
  );
}
