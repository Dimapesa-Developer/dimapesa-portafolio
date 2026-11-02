"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/components/motion/ease";

declare global {
  interface Window {
    __yaNavego?: boolean;
  }
}

/** Cortina violeta entre páginas: cubre y se retira hacia arriba al montar la nueva ruta.
 *  La primera carga no la lleva (en el inicio la intro hace ese papel). */
export default function Template({ children }: { children: React.ReactNode }) {
  const reducido = useReducedMotion();
  const [conCortina] = useState(() => typeof window !== "undefined" && !!window.__yaNavego);

  useEffect(() => {
    window.__yaNavego = true;
  }, []);

  return (
    <>
      {conCortina && !reducido && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60] origin-top bg-violet"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.05 }}
        >
          <span className="absolute bottom-6 left-4 font-serif text-[64px] leading-none text-paper md:left-8">{"{ }"}</span>
        </motion.div>
      )}
      {children}
    </>
  );
}
