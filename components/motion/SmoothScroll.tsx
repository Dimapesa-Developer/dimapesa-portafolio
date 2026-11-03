"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Bloquea o libera el scroll (con o sin Lenis), p. ej. durante la intro o el menú */
export function bloquearScroll(bloquear: boolean) {
  // también en <body>: Safari de iOS ignora a veces el bloqueo en <html>
  document.documentElement.style.overflow = bloquear ? "hidden" : "";
  document.body.style.overflow = bloquear ? "hidden" : "";
  if (bloquear) window.__lenis?.stop();
  else window.__lenis?.start();
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tactil = window.matchMedia("(pointer: coarse)").matches;
    if (reducido || tactil) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
    window.__lenis = lenis;
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
