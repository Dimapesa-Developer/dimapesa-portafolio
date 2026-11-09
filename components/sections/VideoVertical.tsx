"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { T } from "@/components/i18n/T";

/** Video vertical 9:16: arranca en silencio y en bucle al entrar en pantalla, se pausa al salir.
 *  El sonido solo se activa con el botón (los navegadores bloquean el autoplay con audio). */
export function VideoVertical({ src, poster, titulo, className = "" }: { src: string; poster: string; titulo: string; className?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [sonando, setSonando] = useState(false);
  const [conSonido, setConSonido] = useState(false);
  const pausadoPorUsuario = useRef(false);
  const reducido = useReducedMotion();

  useEffect(() => {
    const v = video.current;
    if (!v || reducido) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !pausadoPorUsuario.current) v.play().catch(() => {});
        else if (!e.isIntersecting) v.pause();
      },
      { threshold: 0.5 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reducido]);

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      pausadoPorUsuario.current = false;
      v.play().catch(() => {});
    } else {
      pausadoPorUsuario.current = true;
      v.pause();
    }
  };

  const alternarSonido = () => {
    const v = video.current;
    if (!v) return;
    v.muted = !v.muted;
    setConSonido(!v.muted);
    if (!v.muted && v.paused) {
      pausadoPorUsuario.current = false;
      v.play().catch(() => {});
    }
  };

  const boton =
    "grid size-11 place-items-center rounded-full bg-ink/70 text-paper backdrop-blur transition-colors hover:bg-ink focus-visible:outline-lime";

  return (
    <figure className={className}>
      <div className="relative aspect-[9/16] overflow-hidden rounded-[22px] border border-line bg-ink">
        <video
          ref={video}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={titulo}
          onPlay={() => setSonando(true)}
          onPause={() => setSonando(false)}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button type="button" onClick={alternar} className={boton} aria-label={sonando ? "Pausar video" : "Reproducir video"}>
            <svg viewBox="0 0 20 20" className="size-4" aria-hidden>
              {sonando ? <path d="M5 4h3v12H5zM12 4h3v12h-3z" fill="currentColor" /> : <path d="M6 4l10 6-10 6z" fill="currentColor" />}
            </svg>
          </button>
          <button type="button" onClick={alternarSonido} className={boton} aria-label={conSonido ? "Silenciar" : "Activar sonido"} aria-pressed={conSonido}>
            <svg viewBox="0 0 20 20" className="size-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8h3l4-3.5v11L6 12H3Z" fill="currentColor" />
              {conSonido ? <path d="M13.5 7.5a3.5 3.5 0 0 1 0 5M15.5 5.5a6.5 6.5 0 0 1 0 9" /> : <path d="M13.5 8l4 4M17.5 8l-4 4" />}
            </svg>
          </button>
        </div>
      </div>
      <figcaption className="meta mt-3 flex justify-between gap-4">
        <span>
          <T es="Toca el ícono de sonido para escuchar la música" en="Tap the speaker to hear the music" />
        </span>
        <span>0:35</span>
      </figcaption>
    </figure>
  );
}
