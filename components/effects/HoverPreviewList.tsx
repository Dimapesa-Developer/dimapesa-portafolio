"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { EASE } from "@/components/motion/ease";

export type Fila = { href: string; titulo: React.ReactNode; detalle: React.ReactNode; media: React.ReactNode };

/** Lista de nombres gigantes; al pasar el mouse una vista previa sigue al cursor */
export function HoverPreviewList({ filas }: { filas: Fila[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [activo, setActivo] = useState<number | null>(null);
  const reducido = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 150, damping: 20 });
  const y = useSpring(my, { stiffness: 150, damping: 20 });

  const mover = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <ul ref={ref} className="relative border-t border-line" onPointerMove={mover} onPointerLeave={() => setActivo(null)}>
      {filas.map((f, i) => (
        <li key={f.href} className="border-b border-line">
          <Link
            href={f.href}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActivo(i)}
            onFocus={() => setActivo(null)}
            className="group grid grid-cols-[1fr_auto] items-center gap-4 py-6 md:grid-cols-12 md:py-8"
          >
            <span
              className={`display-lg transition-[color,transform] duration-500 ease-editorial md:col-span-8 md:text-[clamp(44px,7vw,112px)] ${
                activo !== null && activo !== i ? "text-muted/40" : ""
              } group-hover:translate-x-3 group-focus-visible:translate-x-3 motion-reduce:transform-none`}
            >
              <span className="mr-[0.12em] inline-block font-serif font-normal text-brace-text opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {"{"}
              </span>
              {f.titulo}
              <span className="ml-[0.12em] inline-block font-serif font-normal text-brace-text opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {"}"}
              </span>
            </span>
            <span className="meta hidden md:col-span-3 md:col-start-10 md:block">{f.detalle}</span>
            {/* En pantallas táctiles: miniatura fija */}
            <span className="relative block size-16 overflow-hidden md:hidden" aria-hidden>
              {f.media}
            </span>
          </Link>
        </li>
      ))}

      <motion.div
        aria-hidden
        style={{ x, y }}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
      >
        <AnimatePresence>
          {activo !== null && (
            <motion.div
              key={activo}
              className="absolute -left-[150px] -top-[100px] h-[200px] w-[300px] overflow-hidden bg-surface"
              initial={{ opacity: 0, scale: reducido ? 1 : 0.9, rotate: reducido ? 0 : -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              {filas[activo].media}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ul>
  );
}
