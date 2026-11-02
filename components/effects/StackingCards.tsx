"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Tarjetas sticky que se apilan: la de abajo se encoge y oscurece mientras la siguiente la cubre */
export function StackingCards({ children }: { children: React.ReactNode[] }) {
  return (
    <ol className="relative">
      {children.map((hijo, i) => (
        <Tarjeta key={i} indice={i} total={children.length}>
          {hijo}
        </Tarjeta>
      ))}
    </ol>
  );
}

function Tarjeta({ children, indice, total }: { children: React.ReactNode; indice: number; total: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reducido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const ultima = indice === total - 1;
  const escala = useTransform(scrollYProgress, [0, 1], [1, ultima ? 1 : 0.9]);
  const brillo = useTransform(scrollYProgress, [0, 1], [1, ultima ? 1 : 0.35]);

  return (
    <li ref={ref} className="h-[105svh] last:h-auto md:h-[115svh]">
      <motion.div
        className="sticky origin-top"
        style={{
          top: `calc(5.5rem + ${indice * 14}px)`,
          ...(reducido ? {} : { scale: escala, opacity: brillo }),
        }}
      >
        {children}
      </motion.div>
    </li>
  );
}
