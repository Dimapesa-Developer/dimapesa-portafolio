"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { asset } from "@/config/site";
import { T } from "@/components/i18n/T";
import { DUR, EASE, STAGGER } from "@/components/motion/ease";
import { bloquearScroll } from "@/components/motion/SmoothScroll";
import { CampoDeParticulas, puntosLogo, puntosMarco, puntosTexto, type Punto } from "@/components/canvas/particulas";

type Fase = "espera" | "prompt" | "logo" | "marco";

const PROMPT = {
  es: "diseña y construye algo que importe",
  en: "design and build something that matters",
};
const CLAVE_SESION = "dimapesa-intro-vista";

const relativo = (el: Element, base: Element) => {
  const r = el.getBoundingClientRect();
  const b = base.getBoundingClientRect();
  return { x: r.left - b.left, y: r.top - b.top, w: r.width, h: r.height };
};

export function Hero() {
  const reducido = useReducedMotion();
  const seccion = useRef<HTMLElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const retrato = useRef<HTMLDivElement>(null);
  const textoPrompt = useRef<HTMLSpanElement>(null);
  const campo = useRef<CampoDeParticulas | null>(null);
  const tiempos = useRef<number[]>([]);

  const [fase, setFase] = useState<Fase>("espera");
  const faseActual = useRef<Fase>("espera");
  faseActual.current = fase;
  const [escrito, setEscrito] = useState("");
  const [presionado, setPresionado] = useState(false);
  const [idioma, setIdioma] = useState<"es" | "en">("es");

  const cantidades = () => {
    const grande = window.innerWidth >= 768;
    return { llaves: grande ? 1500 : 760, d: grande ? 900 : 480 };
  };

  /** Lleva las partículas a enmarcar el retrato; el resto se funde dentro de la foto */
  const irAlMarco = useCallback((animar: boolean) => {
    const c = campo.current;
    const sec = seccion.current;
    const ret = retrato.current;
    if (!c || !sec || !ret) return;
    const caja = relativo(ret, sec);
    const { llaves } = cantidades();
    const marco = puntosMarco(caja, llaves);
    const dentro: Punto[] = Array.from({ length: c.cantidad }, () => ({
      x: caja.x + Math.random() * caja.w,
      y: caja.y + Math.random() * caja.h,
    }));
    c.destinos(marco, dentro, { alfaResto: 0, escalonado: animar ? 14 : 0 });
    if (!animar) c.asentar();
  }, []);

  const terminarIntro = useCallback(() => {
    tiempos.current.forEach(clearTimeout);
    tiempos.current = [];
    try {
      sessionStorage.setItem(CLAVE_SESION, "1");
    } catch {}
    delete document.documentElement.dataset.intro;
    bloquearScroll(false);
    setFase("marco");
  }, []);

  // Montaje: decide si hay intro y prepara el lienzo
  useEffect(() => {
    const sec = seccion.current;
    const cv = lienzo.current;
    if (!sec || !cv) return;
    const lang = document.documentElement.dataset.lang === "en" ? "en" : "es";
    setIdioma(lang);

    const c = new CampoDeParticulas(cv);
    campo.current = c;
    const { width, height } = sec.getBoundingClientRect();
    c.dimensionar(width, height);

    let vista = false;
    try {
      vista = sessionStorage.getItem(CLAVE_SESION) === "1";
    } catch {}

    const { llaves, d } = cantidades();
    if (reducido) {
      c.crear(llaves + d);
      irAlMarco(false);
      setFase("marco");
    } else if (vista || window.scrollY > 10) {
      c.crear(llaves + d);
      irAlMarco(true);
      c.iniciar();
      setFase("marco");
    } else {
      document.documentElement.dataset.intro = "on";
      bloquearScroll(true);
      setFase("prompt");
    }

    return () => {
      c.detener();
      tiempos.current.forEach(clearTimeout);
      delete document.documentElement.dataset.intro;
      bloquearScroll(false);
    };
  }, [reducido, irAlMarco]);

  // Intro: escribe el prompt, "genera" y convierte las letras en el {D}
  useEffect(() => {
    if (fase !== "prompt") return;
    const texto = PROMPT[idioma];
    let i = 0;
    const despues = (ms: number, fn: () => void) => tiempos.current.push(window.setTimeout(fn, ms));

    const escribir = () => {
      i++;
      setEscrito(texto.slice(0, i));
      if (i < texto.length) despues(26 + Math.random() * 24, escribir);
      else despues(380, generar);
    };

    const generar = () => {
      setPresionado(true);
      despues(260, () => {
        const c = campo.current;
        const sec = seccion.current;
        const span = textoPrompt.current;
        if (!c || !sec || !span) return;
        const caja = relativo(span, sec);
        const estilo = getComputedStyle(span);
        const { llaves, d } = cantidades();
        const inicio = puntosTexto(
          span.textContent ?? "",
          `${estilo.fontWeight} ${estilo.fontSize} ${estilo.fontFamily}`,
          caja.x,
          caja.y + caja.h / 2,
          sec.clientWidth,
          sec.clientHeight,
          llaves + d,
        );
        c.crear(llaves + d, inicio);
        const w = sec.clientWidth;
        const h = sec.clientHeight;
        const anchoLogo = Math.min(w * 0.82, 980);
        const logo = puntosLogo({ x: (w - anchoLogo) / 2, y: h * 0.22, w: anchoLogo, h: h * 0.5 }, llaves, d);
        c.destinos(logo.llaves, logo.d, { escalonado: 22 });
        c.iniciar();
        setFase("logo");
        despues(1500, () => {
          irAlMarco(true);
          terminarIntro();
        });
      });
    };

    despues(500, escribir);
  }, [fase, idioma, irAlMarco, terminarIntro]);

  // Escape salta la intro
  useEffect(() => {
    if (fase !== "prompt" && fase !== "logo") return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      saltar();
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  });

  const saltar = () => {
    const c = campo.current;
    if (!c) return;
    if (!c.cantidad) {
      const { llaves, d } = cantidades();
      c.crear(llaves + d);
    }
    irAlMarco(true);
    c.iniciar();
    terminarIntro();
  };

  // Redimensionar: recalcula destinos sin animar
  useEffect(() => {
    const sec = seccion.current;
    if (!sec) return;
    let previo = { w: sec.clientWidth, h: sec.clientHeight };
    let espera = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(espera);
      espera = window.setTimeout(() => {
        const ahora = { w: sec.clientWidth, h: sec.clientHeight };
        if (ahora.w === previo.w && Math.abs(ahora.h - previo.h) < 2) return;
        previo = ahora;
        const c = campo.current;
        if (!c) return;
        c.dimensionar(ahora.w, ahora.h);
        // durante la intro solo se ajusta el lienzo; el marco se arma al terminar
        if (faseActual.current !== "marco") return;
        const { llaves, d } = cantidades();
        c.crear(llaves + d);
        irAlMarco(false);
      }, 160);
    });
    ro.observe(sec);
    return () => {
      ro.disconnect();
      clearTimeout(espera);
    };
  }, [irAlMarco]);

  // Pausa fuera de vista y relee colores al cambiar de tema
  useEffect(() => {
    const sec = seccion.current;
    if (!sec) return;
    const io = new IntersectionObserver(([e]) => campo.current?.setVisible(e.isIntersecting));
    io.observe(sec);
    const mo = new MutationObserver(() => {
      campo.current?.leerColores();
      if (reducido) irAlMarco(false);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [reducido, irAlMarco]);

  // Al hacer scroll, el {D} se dispersa
  const { scrollYProgress } = useScroll({ target: seccion, offset: ["start start", "end start"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (campo.current && !reducido) campo.current.dispersion = Math.min(1, Math.max(0, p * 1.3));
  });

  const mover = (e: React.PointerEvent) => {
    const r = seccion.current?.getBoundingClientRect();
    if (r && !reducido) campo.current?.puntero(e.clientX - r.left, e.clientY - r.top, true);
  };
  const salir = () => campo.current?.puntero(-9999, -9999, false);

  const listo = fase === "marco";
  const t = (retraso: number) => ({ duration: reducido ? DUR.reducido : DUR.texto, ease: EASE, delay: reducido ? 0 : retraso });

  return (
    <section
      ref={seccion}
      onPointerMove={mover}
      onPointerLeave={salir}
      aria-label="Inicio"
      className="relative h-svh min-h-[600px] overflow-hidden"
    >
      {/* Retrato: la "D" dentro de las llaves */}
      <div
        ref={retrato}
        className="absolute left-1/2 top-[21svh] aspect-[4/5] w-[min(44vw,34svh)] -translate-x-1/2 md:left-auto md:right-[calc(30vw-min(12vw,20svh))] md:top-1/2 md:w-[min(24vw,40svh)] md:translate-x-0 md:-translate-y-[54%]"
      >
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={listo ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
          transition={{ duration: reducido ? DUR.reducido : 1.1, ease: EASE, delay: reducido ? 0 : 0.35 }}
        >
          <motion.div
            className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_92%,transparent)]"
            initial={{ scale: reducido ? 1 : 1.15 }}
            animate={listo ? { scale: 1 } : undefined}
            transition={{ duration: 2.4, ease: EASE, delay: 0.35 }}
          >
            <Image
              src={asset("/img/diego-recorte.webp")}
              alt="Diego Martin Pelayo Salazar con saco negro e iluminación violeta y verde"
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 768px) 24vw, 44vw"
              className="object-cover object-[50%_20%]"
            />
          </motion.div>
        </motion.div>
      </div>

      <canvas ref={lienzo} aria-hidden className="pointer-events-none absolute inset-0 z-10" />

      {/* Titular */}
      <motion.h1
        className="absolute bottom-[12svh] left-4 z-20 font-display font-semibold leading-[0.86] tracking-[-0.04em] text-[clamp(52px,15vw,156px)] md:bottom-[10svh] md:text-[clamp(52px,8.6vw,156px)] md:left-8"
        style={{ fontVariationSettings: '"opsz" 96' }}
        initial="oculto"
        animate={listo ? "visible" : "oculto"}
        transition={{ staggerChildren: reducido ? 0 : STAGGER, delayChildren: reducido ? 0 : 0.5 }}
      >
        {[
          { es: "Código,", en: "Code," },
          { es: "diseño y", en: "design &" },
          { es: "sistemas.", en: "systems." },
        ].map((linea) => (
          <span key={linea.es} className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              variants={{
                oculto: { y: reducido ? 0 : "105%", opacity: reducido ? 0 : 1 },
                visible: { y: 0, opacity: 1, transition: { duration: reducido ? DUR.reducido : 0.9, ease: EASE } },
              }}
            >
              <T es={linea.es} en={linea.en} />
            </motion.span>
          </span>
        ))}
      </motion.h1>

      <motion.div
        className="absolute bottom-[5svh] left-4 right-4 z-20 flex items-end justify-between gap-6 md:bottom-8 md:left-auto md:right-8 md:w-[min(24vw,40svh)] md:flex-col md:items-start md:gap-3"
        initial={{ opacity: 0 }}
        animate={listo ? { opacity: 1 } : undefined}
        transition={t(1.1)}
      >
        <p className="text-[15px] leading-snug">
          Diego Martin Pelayo Salazar
          <span className="block text-muted">
            <T es="Tecnólogo creativo en México" en="Creative technologist in Mexico" />
          </span>
        </p>
        <a href="#perfil" className="llaves shrink-0 text-[15px] text-muted transition-colors hover:text-text">
          <T es="Desliza" en="Scroll" />
        </a>
      </motion.div>

      {/* Intro tipo prompt */}
      <AnimatePresence>
        {fase === "prompt" && (
          <motion.div
            key="prompt"
            className="absolute inset-0 z-30 grid place-items-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="w-full max-w-[640px] rounded-[22px] border border-line bg-surface/80 p-4 backdrop-blur md:p-5">
              <p className="min-h-[3.2em] font-mono text-[15px] leading-relaxed md:text-[17px]" aria-live="polite">
                <span ref={textoPrompt}>{escrito}</span>
                <span className="ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[0.18em] animate-pulse bg-lime" aria-hidden />
              </p>
              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-sm text-muted">{"{ D }"} studio</span>
                <motion.span
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-lime px-5 text-sm font-medium text-ink"
                  animate={presionado ? { scale: [1, 0.92, 1] } : undefined}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  {idioma === "es" ? "Generar" : "Generate"}
                  <span aria-hidden>↵</span>
                </motion.span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(fase === "prompt" || fase === "logo") && (
        <button
          type="button"
          onClick={saltar}
          className="absolute bottom-6 right-4 z-40 text-sm text-muted transition-colors hover:text-text md:right-8"
        >
          {idioma === "es" ? "Saltar intro" : "Skip intro"}
        </button>
      )}
    </section>
  );
}
