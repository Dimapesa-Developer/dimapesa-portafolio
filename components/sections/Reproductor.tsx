"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/config/site";
import type { Pista } from "@/data/archivo";
import { SplitFlap } from "@/components/effects/SplitFlap";

const fuente = (audio: string) => (audio.startsWith("http") ? audio : asset(audio));
const reloj = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** Reproductor propio: lista de pistas, barra de progreso y título tipo split-flap */
export function Reproductor({ pistas, vacio }: { pistas: Pista[]; vacio: React.ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [actual, setActual] = useState(0);
  const [sonando, setSonando] = useState(false);
  const [tiempo, setTiempo] = useState({ t: 0, d: 0 });

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    const act = () => setTiempo({ t: a.currentTime, d: a.duration || 0 });
    const fin = () => (actual < pistas.length - 1 ? setActual(actual + 1) : setSonando(false));
    a.addEventListener("timeupdate", act);
    a.addEventListener("loadedmetadata", act);
    a.addEventListener("ended", fin);
    return () => {
      a.removeEventListener("timeupdate", act);
      a.removeEventListener("loadedmetadata", act);
      a.removeEventListener("ended", fin);
    };
  }, [actual, pistas.length]);

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    if (sonando) a.play().catch(() => setSonando(false));
    else a.pause();
  }, [sonando, actual]);

  if (!pistas.length) {
    return (
      <div className="border border-line bg-surface p-6 md:p-10">
        <p className="font-mono text-[clamp(18px,3vw,32px)] uppercase tracking-[0.06em] text-brace-text">
          <SplitFlap texto="SESIÓN 01 {EN PREPARACIÓN}" />
        </p>
        <p className="mt-6 max-w-[48ch] text-muted">{vacio}</p>
      </div>
    );
  }

  const pista = pistas[actual];
  const progreso = tiempo.d ? tiempo.t / tiempo.d : 0;

  return (
    <div className="border border-line bg-surface">
      <audio ref={audio} src={fuente(pista.audio)} preload="metadata" />
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:p-10">
        <button
          type="button"
          onClick={() => setSonando((v) => !v)}
          className="grid size-16 shrink-0 place-items-center rounded-full bg-lime text-ink transition-transform hover:scale-105"
          aria-label={sonando ? "Pausar" : "Reproducir"}
        >
          <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
            {sonando ? <path d="M5 4h3v12H5zM12 4h3v12h-3z" fill="currentColor" /> : <path d="M6 4l10 6-10 6z" fill="currentColor" />}
          </svg>
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-[clamp(18px,3vw,32px)] uppercase tracking-[0.06em]">
            <SplitFlap texto={pista.titulo.toUpperCase()} />
          </p>
          <div
            className="mt-4 h-1 cursor-pointer bg-line"
            role="slider"
            tabIndex={0}
            aria-label="Progreso"
            aria-valuemin={0}
            aria-valuemax={Math.round(tiempo.d)}
            aria-valuenow={Math.round(tiempo.t)}
            onClick={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              if (audio.current && tiempo.d) audio.current.currentTime = ((e.clientX - r.left) / r.width) * tiempo.d;
            }}
            onKeyDown={(e) => {
              if (!audio.current) return;
              if (e.key === "ArrowRight") audio.current.currentTime += 5;
              if (e.key === "ArrowLeft") audio.current.currentTime -= 5;
            }}
          >
            <div className="h-full origin-left bg-brace" style={{ transform: `scaleX(${progreso})` }} />
          </div>
          <p className="meta mt-2">
            {reloj(tiempo.t)} / {pista.duracion}
          </p>
        </div>
      </div>
      <ol className="border-t border-line">
        {pistas.map((p, i) => (
          <li key={p.titulo}>
            <button
              type="button"
              onClick={() => {
                setActual(i);
                setSonando(true);
              }}
              aria-current={i === actual ? "true" : undefined}
              className="flex w-full items-center justify-between gap-4 border-b border-line px-6 py-4 text-left transition-colors last:border-b-0 hover:bg-surface-2 aria-[current=true]:text-brace-text md:px-10"
            >
              <span>
                <span className="mr-4 text-muted">{i + 1}</span>
                {p.titulo}
              </span>
              <span className="meta">{p.duracion}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
