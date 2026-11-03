"use client";

import { useEffect, useState } from "react";

function guardar(clave: string, valor: string) {
  try {
    localStorage.setItem(clave, valor);
  } catch {}
}

/** Cambia entre español e inglés (atributo data-lang en <html>) */
export function LangToggle({ className = "" }: { className?: string }) {
  const [idioma, setIdioma] = useState<"es" | "en">("es");
  useEffect(() => setIdioma(document.documentElement.dataset.lang === "en" ? "en" : "es"), []);

  const cambiar = () => {
    const nuevo = idioma === "es" ? "en" : "es";
    const html = document.documentElement;
    html.dataset.lang = nuevo;
    html.lang = nuevo === "en" ? "en" : "es-MX";
    guardar("idioma", nuevo);
    setIdioma(nuevo);
    window.dispatchEvent(new CustomEvent("idioma", { detail: nuevo }));
  };

  return (
    <button
      type="button"
      onClick={cambiar}
      className={`-mx-2 px-2 py-3 text-sm transition-opacity hover:opacity-70 ${className}`}
      aria-label={idioma === "es" ? "Switch to English" : "Cambiar a español"}
    >
      <span className={idioma === "es" ? "text-text" : "text-muted"}>ES</span>
      <span className="mx-1 text-muted">/</span>
      <span className={idioma === "en" ? "text-text" : "text-muted"}>EN</span>
    </button>
  );
}

/** Cambia entre tema oscuro y claro */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [tema, setTema] = useState<"dark" | "light">("dark");
  useEffect(() => setTema(document.documentElement.dataset.theme === "light" ? "light" : "dark"), []);

  const cambiar = () => {
    const nuevo = tema === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nuevo;
    guardar("tema", nuevo);
    setTema(nuevo);
  };

  return (
    <button
      type="button"
      onClick={cambiar}
      className={`grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-text ${className}`}
      aria-label={tema === "dark" ? "Usar tema claro" : "Usar tema oscuro"}
    >
      {/* Media luna que gira al cambiar de tema */}
      <svg viewBox="0 0 20 20" className="size-4 transition-transform duration-500 ease-editorial" style={{ transform: `rotate(${tema === "dark" ? 0 : 180}deg)` }} aria-hidden>
        <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 3a7 7 0 0 1 0 14Z" fill="currentColor" />
      </svg>
    </button>
  );
}
