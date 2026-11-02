"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/** La tira se recorre en horizontal mientras se hace scroll vertical (sección sticky).
 *  Con reduced motion o en pantallas angostas vuelve a scroll horizontal nativo con snap. */
export function HorizontalGallery({ children, titulo }: { children: React.ReactNode[]; titulo?: React.ReactNode }) {
  const seccion = useRef<HTMLElement>(null);
  const tira = useRef<HTMLUListElement>(null);
  const [distancia, setDistancia] = useState(0);
  const [ancha, setAncha] = useState(false);
  const reducido = useReducedMotion();

  useEffect(() => {
    const el = tira.current;
    if (!el) return;
    const medir = () => {
      setAncha(window.innerWidth >= 768);
      setDistancia(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    window.addEventListener("resize", medir);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: seccion, offset: ["start start", "end end"] });
  const progreso = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const x = useTransform(progreso, (p) => -p * distancia);
  const fijo = ancha && !reducido;

  return (
    <section ref={seccion} style={fijo ? { height: `calc(100svh + ${distancia}px)` } : undefined} className="relative">
      <div className={fijo ? "sticky top-0 flex h-svh flex-col justify-center overflow-x-clip" : "py-12"}>
        {titulo && <div className="mb-8 px-4 md:px-8">{titulo}</div>}
        <motion.ul
          ref={tira}
          style={fijo ? { x } : undefined}
          className={
            fijo
              ? "flex w-max gap-6 px-8"
              : "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 md:gap-6 md:px-8"
          }
        >
          {children.map((hijo, i) => (
            <li key={i} className="shrink-0 snap-start">
              {hijo}
            </li>
          ))}
        </motion.ul>
        {fijo && (
          <div className="mx-8 mt-8 h-px bg-line">
            <motion.div className="h-px origin-left bg-brace" style={{ scaleX: progreso }} />
          </div>
        )}
      </div>
    </section>
  );
}
