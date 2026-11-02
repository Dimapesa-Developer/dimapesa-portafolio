"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

const SIGNOS = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789{}";

/** Letrero tipo aeropuerto: cada letra baraja caracteres antes de asentarse. Se dispara cuando cambia `texto`. */
export function SplitFlap({ texto, className = "" }: { texto: string; className?: string }) {
  const reducido = useReducedMotion();
  const [mostrado, setMostrado] = useState(texto);
  const raf = useRef(0);

  useEffect(() => {
    if (reducido) {
      setMostrado(texto);
      return;
    }
    const inicio = performance.now();
    const porLetra = 28;
    const barajar = 260;
    const paso = (t: number) => {
      const dt = t - inicio;
      let listo = true;
      const salida = [...texto]
        .map((c, i) => {
          if (c === " " || dt > i * porLetra + barajar) return c;
          listo = false;
          return SIGNOS[Math.floor(Math.random() * SIGNOS.length)];
        })
        .join("");
      setMostrado(salida);
      if (!listo) raf.current = requestAnimationFrame(paso);
    };
    raf.current = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(raf.current);
  }, [texto, reducido]);

  return (
    <span className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden>{mostrado}</span>
    </span>
  );
}
