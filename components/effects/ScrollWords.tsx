"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

/** Cada palabra se enciende al ritmo del scroll. Las palabras que empiezan con * van en la voz serif. */
export function ScrollWords({ texto, className = "" }: { texto: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const palabras = texto.split(" ");

  return (
    <p ref={ref} className={className}>
      {palabras.map((p, i) => {
        const voz = p.startsWith("*");
        const limpia = voz ? p.slice(1) : p;
        return (
          <Palabra key={i} progreso={scrollYProgress} rango={[i / palabras.length, (i + 1) / palabras.length]} estatica={!!reducido} voz={voz}>
            {limpia}
          </Palabra>
        );
      })}
    </p>
  );
}

function Palabra({
  children,
  progreso,
  rango,
  estatica,
  voz,
}: {
  children: string;
  progreso: MotionValue<number>;
  rango: [number, number];
  estatica: boolean;
  voz: boolean;
}) {
  const opacidad = useTransform(progreso, rango, [0.16, 1]);
  return (
    <>
      <motion.span style={estatica ? undefined : { opacity: opacidad }} className={voz ? "voz text-violet-text" : undefined}>
        {children}
      </motion.span>{" "}
    </>
  );
}
