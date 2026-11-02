"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { NAV } from "@/config/site";
import { LlaveD } from "@/components/brand/LlaveD";
import { T } from "@/components/i18n/T";
import { DUR, EASE, STAGGER } from "@/components/motion/ease";
import { bloquearScroll } from "@/components/motion/SmoothScroll";
import { LangToggle, ThemeToggle } from "./Preferencias";

const activo = (ruta: string, href: string) => ruta === href || (href !== "/" && ruta.startsWith(href.split("/").slice(0, 2).join("/")));

export function Header() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [conFondo, setConFondo] = useState(false);
  const reducido = useReducedMotion();

  useEffect(() => {
    const revisar = () => setConFondo(window.scrollY > 40);
    revisar();
    window.addEventListener("scroll", revisar, { passive: true });
    return () => window.removeEventListener("scroll", revisar);
  }, []);

  useEffect(() => setAbierto(false), [ruta]);

  useEffect(() => {
    bloquearScroll(abierto);
    if (!abierto) return;
    const alEscape = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", alEscape);
    return () => window.removeEventListener("keydown", alEscape);
  }, [abierto]);

  return (
    <>
      <header
        data-header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,opacity] duration-400 ease-editorial ${
          conFondo && !abierto ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 md:h-20 md:px-8">
          <Link href="/" aria-label="DIMAPESA, inicio" className="relative z-10 -ml-1 block w-14 md:w-16">
            <LlaveD className="w-full" />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[15px]">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={activo(ruta, item.href) ? "page" : undefined}
                    className="llaves transition-colors hover:text-text aria-[current=page]:text-text text-muted"
                  >
                    <T es={item.es} en={item.en} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-4 md:gap-5">
            <LangToggle />
            <ThemeToggle />
            <button
              type="button"
              className="text-[15px] lg:hidden"
              aria-expanded={abierto}
              aria-controls="menu-movil"
              onClick={() => setAbierto((v) => !v)}
            >
              {abierto ? <T es="Cerrar" en="Close" /> : <T es="Menú" en="Menu" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {abierto && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-4 pb-8 pt-28 md:px-8 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducido ? DUR.reducido : DUR.ui, ease: EASE }}
          >
            <motion.ul
              initial="oculto"
              animate="visible"
              transition={{ staggerChildren: reducido ? 0 : STAGGER, delayChildren: 0.1 }}
              className="flex flex-col gap-2"
            >
              {NAV.map((item) => (
                <motion.li
                  key={item.href}
                  variants={{
                    oculto: { opacity: 0, y: reducido ? 0 : 32 },
                    visible: { opacity: 1, y: 0, transition: { duration: DUR.texto, ease: EASE } },
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={activo(ruta, item.href) ? "page" : undefined}
                    className="llaves display-md inline-block py-1 text-[clamp(40px,11vw,64px)]"
                  >
                    <T es={item.es} en={item.en} />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <p className="meta">
              Diego Martin Pelayo Salazar
              <br />
              <T es="Tecnólogo creativo, México" en="Creative technologist, Mexico" />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
