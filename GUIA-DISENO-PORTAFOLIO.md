# Guía de diseño — Portafolio (look editorial elegante y limpio)

> **Para Claude:** este documento es la base de diseño de mi portafolio. Síguelo al pie de la letra; si algo que te pida después contradice esta guía, pregúntame antes. Todo el copy en **español de México**. Proyecto de referencia donde ya se aplicó este sistema: landing de MayLiss — https://dimapesa-developer.github.io/mayliss-landing/ (código: https://github.com/Dimapesa-Developer/mayliss-landing).

---

## 1. Idea en una línea
**Revista de moda, no plantilla web.** El contenido (imágenes de proyectos) manda; la tipografía es gigante y serif; la interfaz es mínima, en mayúsculas pequeñas; todo se mueve lento, una sola vez y con la misma curva.

## 2. Principios (no negociables)
1. **La imagen manda.** Imágenes grandes, a sangre (full-bleed) o en grid asimétrico. Texto mínimo.
2. **Contraste de escalas.** Titulares enormes (hasta 220px) contra etiquetas de 11px. Nada de tamaños "medianos" por todos lados.
3. **Cero adornos.** Sin `border-radius`, sin sombras, sin degradados decorativos, sin emojis, sin iconos decorativos, sin botones de colores, sin carruseles con puntitos, sin fotos de stock.
4. **Un solo acento** de color, usado con mesura (números, hovers, detalles). El color fuerte lo ponen las imágenes.
5. **Espacio en blanco generoso.** Secciones con `py-24 md:py-40`. Grid de 12 columnas **asimétrico** en desktop.
6. **Movimiento casi imperceptible.** Lento, elegante, una sola vez. Nada de rebotes, giros ni efectos "llamativos".
7. **Mobile-first impecable** (375px) y accesible (AA, teclado, `prefers-reduced-motion`).

## 3. Stack
| Pieza | Elección | Notas |
|---|---|---|
| Framework | **Next.js 15** (App Router) + **TypeScript** | `create-next-app` con Tailwind, sin `src/` |
| Estilos | **Tailwind CSS 4** | Tokens con `@theme` en `app/globals.css` |
| Animación | **Motion** (`motion`, antes Framer Motion) | Importar desde `motion/react` |
| Smooth scroll | **Lenis** (`lenis`) | Solo con mouse; en touch, scroll nativo |
| Fuentes | `next/font/google` | Solo los pesos que se usan, `display: "swap"` |
| Imágenes | `next/image` con `sizes` correctos | `priority` solo en la imagen del hero |
| Hosting | GitHub Pages (export estático) o Vercel | Ver sección 11 |

**Prohibido:** GSAP, AOS, Swiper o cualquier librería de carrusel. Los carruseles son CSS (`scroll-snap`) o scroll ligado con Motion.

```bash
npx create-next-app@15 portafolio --ts --tailwind --app --eslint --no-src-dir --import-alias "@/*" --use-npm --turbopack
cd portafolio && npm i motion lenis
```

## 4. Tokens de diseño

### 4.1 Color
| Token | Valor | Uso |
|---|---|---|
| `fondo` | `#FAF8F5` | Fondo general (blanco cálido) |
| `tinta` | `#111111` | Texto principal, botones sólidos |
| `gris` | `#6B6B6B` | Texto secundario (4.9:1 sobre fondo ✔ AA) |
| `linea` | `#E5E2DD` | Divisores de 1px, placeholders de imagen |
| `noche` | `#0B0B0B` | Secciones oscuras (footer, bloques destacados) |
| `acento` | **por definir** | Mi color de marca personal. Ver regla de contraste ↓ |

**Regla de contraste del acento** (aprendida en MayLiss con un dorado `#B69A76`):
- El acento "puro" casi nunca pasa AA como texto pequeño sobre fondo claro (el dorado daba 2.5:1).
- Crear 3 variantes: `acento` (decoración y texto sobre `noche`), `acento-medio` (≥3:1 sobre fondo, solo texto grande ≥24px) y `acento-oscuro` (≥4.5:1 sobre fondo, texto pequeño).
- Calcular el contraste antes de usarlo (fórmula WCAG). Referencia MayLiss: `#B69A76` decoración · `#9C7F57` texto grande (3.55:1) · `#7A6140` texto pequeño (5.49:1) · sobre `#0B0B0B` el acento puro da 7.4:1.

### 4.2 Tipografía
| Rol | Fuente | Especificación |
|---|---|---|
| Display | **Bodoni Moda** 400/500 (+ italic para citas) | `clamp(56px, 14vw, 220px)`, `line-height: 0.9`, `letter-spacing: -0.02em` |
| Titulares de sección | Bodoni Moda | `clamp(48px, 7–9vw, 112–140px)`, mismo tracking |
| UI / etiquetas | **Inter** 400/500 | **11px, MAYÚSCULAS, `letter-spacing: 0.14em`** |
| Párrafos | Inter | 15px / 1.6 |
| Citas | Bodoni Moda *italic* | `clamp(22px, 3vw, 32px)` |

### 4.3 `app/globals.css`
```css
@import "tailwindcss";

@theme {
  --color-fondo: #faf8f5;
  --color-tinta: #111111;
  --color-gris: #6b6b6b;
  --color-linea: #e5e2dd;
  --color-noche: #0b0b0b;
  /* --color-acento: …;  --color-acento-medio: …;  --color-acento-oscuro: …; */
  --font-display: var(--font-bodoni), "Bodoni 72", "Didot", serif;
  --font-sans: var(--font-inter), system-ui, sans-serif;
  --ease-editorial: cubic-bezier(0.2, 0.7, 0.2, 1);
}

html { background: var(--color-fondo); color: var(--color-tinta); }
body { font-family: var(--font-sans); font-size: 15px; line-height: 1.6; -webkit-font-smoothing: antialiased; }

/* Etiquetas de UI: 11px, mayúsculas, tracking 0.14em */
@utility ui-label {
  font-size: 11px;
  line-height: 1.4;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

/* Titulares gigantes */
@utility display-xl {
  font-family: var(--font-display);
  font-size: clamp(56px, 14vw, 220px);
  line-height: 0.9;
  letter-spacing: -0.02em;
}

@utility no-scrollbar {
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}

:focus-visible { outline: 1px solid var(--color-tinta); outline-offset: 4px; }
::selection { background: var(--color-tinta); color: var(--color-fondo); }
```

### 4.4 Fuentes en `app/layout.tsx`
```tsx
import { Bodoni_Moda, Inter } from "next/font/google";

const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap" });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

// <html lang="es-MX" className={`${bodoni.variable} ${inter.variable}`}>
//   <body className="bg-fondo text-tinta"><SmoothScroll>{children}</SmoothScroll></body>
```

### 4.5 Layout y espaciado
- Gutter lateral: `px-4` (16px) en móvil, `md:px-8` (32px) en desktop.
- Secciones: `py-24 md:py-40`. Divisores: `border-t border-linea`.
- Grid asimétrico, ejemplo editorial: imagen grande `md:col-span-7` + imagen chica `md:col-span-4 md:col-start-9` **desplazada ~120px hacia abajo** + titular grande en el hueco.
- Imágenes en proporción **3:4** (tarjetas) o a sangre `h-svh`.
- Placeholder de imagen: `bg-linea` (nunca un spinner).

### 4.6 Componentes de interfaz
- **Botón primario:** rectángulo sólido `bg-tinta text-fondo`, texto `ui-label`, alto 56px (`h-14`). Sin radio, sin sombra. Hover: `opacity-80`.
- **Link de texto:** subrayado de 1px que crece de izquierda a derecha (ver 6.5). Los CTA llevan una línea fija tenue (`opacity-30`) + la que crece.
- **Navegación:** `ui-label`, `gap-8`. En móvil, la palabra **MENÚ** (no hamburguesa) abre un overlay a pantalla completa con links en Bodoni de 44px.
- **Header:** fijo, transparente sobre el hero y fondo `fondo` con borde `linea` al pasar el 80% del hero (transición 400ms).
- **Botón flotante** (contacto): rectángulo `bg-noche` abajo a la derecha, aparece al salir del hero.
- **Iconos:** solo los funcionales (redes sociales), monocromos, dibujados con SVG en línea de 20px y `currentColor`. Nunca con los colores de cada red.

## 5. Sistema de movimiento

### 5.1 Reglas globales
| Parámetro | Valor |
|---|---|
| Curva única | `[0.2, 0.7, 0.2, 1]` (CSS: `cubic-bezier(0.2, 0.7, 0.2, 1)`) |
| Duraciones | imágenes **900ms** · textos **600ms** · UI (menú, header) **400ms** · reduced motion **200ms** |
| Escalonado | **80ms** entre hermanos |
| Disparo | **una sola vez**: `viewport={{ once: true, amount: 0.25 }}` |
| Propiedades | **solo** `transform`, `opacity` y `clip-path` (nunca width/height/top/left) → 60fps |
| Reduced motion | sin parallax, sin Ken Burns, sin Lenis, sin scroll ligado; los reveals pasan a fade de 200ms (`useReducedMotion()`) |

### 5.2 Catálogo de animaciones
| Elemento | Animación |
|---|---|
| Imágenes de sección | `clip-path: inset(100% 0 0 0)` → `inset(0)` + `scale 1.08 → 1` (900ms) |
| Titulares | fade + `translateY 24px`; varias líneas → línea por línea con stagger |
| Etiquetas / precios / metadatos | fade simple, 150ms después de su imagen |
| Hero (foto) | Ken Burns: `scale 1.08 → 1` en 8s, una vez |
| Hero (scroll) | parallax: la media baja al 30% (`useScroll` + `useTransform`), solo desktop |
| Marca hero → header | logo gigante abajo-izquierda que se encoge y sube al header (Motion `layoutId`, 400ms) |
| Menú móvil | overlay con fade 400ms; links entran desde abajo con stagger |
| Lista con imagen flotante | en hover, una foto sigue al cursor con `useSpring` (stiffness 150, damping 20) y aparece con `scale 0.95 → 1` |
| Tarjetas | hover desktop: crossfade a una 2ª imagen en 400ms. Sin zoom ni sombras |
| Galería horizontal | la tira se recorre en horizontal mientras se hace scroll vertical (sección sticky) |
| Links | subrayado `scaleX 0 → 1` desde la izquierda, 300ms |
| Botón flotante | fade + `translateY 12px` al salir del hero |

## 6. Código de referencia (probado en producción)
Estructura: `components/motion/` con piezas reutilizables y `components/sections/` con las secciones.

### 6.1 `components/motion/ease.ts`
```ts
// Curva y tiempos únicos para todo el sitio
export const EASE = [0.2, 0.7, 0.2, 1] as const;
export const DUR = { imagen: 0.9, texto: 0.6, ui: 0.4, reducido: 0.2 } as const;
export const STAGGER = 0.08;
export const VIEWPORT = { once: true, amount: 0.25 } as const;
```

### 6.2 `components/motion/SmoothScroll.tsx` (Lenis)
```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tactil = window.matchMedia("(pointer: coarse)").matches;
    if (reducido || tactil) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

### 6.3 `components/motion/Reveal.tsx` (titulares y etiquetas)
```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE, STAGGER, VIEWPORT } from "./ease";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** "titulo": fade + translateY 24px · "etiqueta": fade simple */
  variante?: "titulo" | "etiqueta";
  as?: "div" | "p" | "span" | "h2" | "h3" | "li";
};

export function Reveal({ children, className, delay = 0, variante = "titulo", as = "div" }: Props) {
  const reducido = useReducedMotion();
  const Tag = motion[as];
  const y = variante === "titulo" && !reducido ? 24 : 0;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: reducido ? DUR.reducido : DUR.texto, ease: EASE, delay: reducido ? 0 : delay }}
    >
      {children}
    </Tag>
  );
}

/** Titular de varias líneas: cada línea entra con stagger */
export function RevealLines({ lineas, className, as = "h2" }: { lineas: string[]; className?: string; as?: "h1" | "h2" | "p" }) {
  const reducido = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={{ staggerChildren: reducido ? 0 : STAGGER }}
    >
      {lineas.map((linea) => (
        <motion.span
          key={linea}
          className="block"
          variants={{
            oculto: { opacity: 0, y: reducido ? 0 : 24 },
            visible: { opacity: 1, y: 0, transition: { duration: reducido ? DUR.reducido : DUR.texto, ease: EASE } },
          }}
        >
          {linea}
        </motion.span>
      ))}
    </Tag>
  );
}
```

### 6.4 `components/motion/ImageReveal.tsx` (cortina de imagen)
> ⚠️ **Lección importante:** el `whileInView` debe ir en un contenedor **sin** `clip-path`. Un elemento recortado al 100% no lo detecta el IntersectionObserver y la imagen **nunca aparece**.

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE, VIEWPORT } from "./ease";

export function ImageReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reducido = useReducedMotion();
  const t = { duration: reducido ? DUR.reducido : DUR.imagen, ease: EASE };

  return (
    <motion.div className={`relative ${className}`} initial="oculto" whileInView="visible" viewport={VIEWPORT}>
      <motion.div
        className="absolute inset-0 overflow-hidden"
        variants={
          reducido
            ? { oculto: { opacity: 0 }, visible: { opacity: 1, transition: t } }
            : {
                oculto: { clipPath: "inset(100% 0% 0% 0%)" },
                visible: { clipPath: "inset(0% 0% 0% 0%)", transition: t },
              }
        }
      >
        <motion.div
          className="absolute inset-0"
          variants={{ oculto: { scale: reducido ? 1 : 1.08 }, visible: { scale: 1, transition: t } }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
// Uso: <ImageReveal className="aspect-[3/4] bg-linea"><Image src=… fill sizes=… className="object-cover" /></ImageReveal>
```

### 6.5 `components/motion/UnderlineLink.tsx`
```tsx
import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Subrayado visible siempre (CTA); si no, crece al hover */
  fijo?: boolean;
};

export function UnderlineLink({ fijo = false, className = "", children, ...props }: Props) {
  const externo = props.href?.startsWith("http");
  return (
    <a
      {...props}
      {...(externo ? { target: "_blank", rel: "noopener" } : {})}
      className={`group relative inline-block pb-1 ${className}`}
    >
      {children}
      {fijo && <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-current opacity-30" />}
      <span
        aria-hidden
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
      />
    </a>
  );
}
```

### 6.6 `components/motion/hooks.ts`
```ts
"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [coincide, setCoincide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const actualizar = () => setCoincide(mq.matches);
    actualizar();
    mq.addEventListener("change", actualizar);
    return () => mq.removeEventListener("change", actualizar);
  }, [query]);
  return coincide;
}

/** true cuando el scroll pasó `fraccion` de la altura de la ventana (el hero mide 100svh) */
export function usePasoDelHero(fraccion: number) {
  const [paso, setPaso] = useState(false);
  useEffect(() => {
    const revisar = () => setPaso(window.scrollY > window.innerHeight * fraccion);
    revisar();
    window.addEventListener("scroll", revisar, { passive: true });
    window.addEventListener("resize", revisar);
    return () => {
      window.removeEventListener("scroll", revisar);
      window.removeEventListener("resize", revisar);
    };
  }, [fraccion]);
  return paso;
}
```

### 6.7 Marca gigante del hero que se encoge al header (`layoutId`)
Un solo elemento con `layoutId` que se renderiza **o** en el hero **o** en el header; Motion anima el cambio de posición y tamaño.
```tsx
const LOGO_GRANDE = "text-[clamp(60px,16.5vw,250px)]";   // tamaño = alto de las letras
const LOGO_COMPACTO = "text-[24px] md:text-[28px]";

function Wordmark({ grande }: { grande: boolean }) {
  return (
    <motion.span
      layoutId="wordmark"
      transition={{ duration: 0.4, ease: EASE }}
      className={`block w-max ${grande ? `${LOGO_GRANDE} origin-bottom-left` : `${LOGO_COMPACTO} origin-top-left`}`}
    >
      {/* Mi logo/nombre aquí. Si es logo + letras, medir todo en `em` para que escale uniforme. */}
    </motion.span>
  );
}

// const compacto = usePasoDelHero(0.8);
// Header:  {compacto && <Wordmark grande={false} />}
// Hero:    <span className={`invisible ${LOGO_GRANDE}`}>…</span>  ← reserva el espacio (sin saltos)
//          <span className="absolute inset-0">{!compacto && <Wordmark grande />}</span>
// Envolver header + hero en <LayoutGroup>.
```

### 6.8 Galería horizontal ligada al scroll (sección sticky)
```tsx
const seccion = useRef<HTMLElement>(null);
const tira = useRef<HTMLUListElement>(null);
const [distancia, setDistancia] = useState(0);

useEffect(() => {
  const el = tira.current;
  if (!el) return;
  const medir = () => setDistancia(Math.max(0, el.scrollWidth - window.innerWidth));
  medir();
  const ro = new ResizeObserver(medir);
  ro.observe(el);
  window.addEventListener("resize", medir);
  return () => { ro.disconnect(); window.removeEventListener("resize", medir); };
}, []);

const { scrollYProgress } = useScroll({ target: seccion, offset: ["start start", "end end"] });
const progreso = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
const x = useTransform(progreso, (p) => -p * distancia);

// <section ref={seccion} style={{ height: `calc(100svh + ${distancia}px)` }}>
//   <div className="sticky top-0 flex h-svh flex-col justify-center overflow-x-clip">
//     <motion.ul ref={tira} style={{ x }} className="flex w-max gap-6 px-8">…tarjetas…</motion.ul>
//   </div>
// </section>
```
- Usar `overflow-x-clip` (no `hidden`): con `hidden`, el foco de teclado puede desplazar el contenedor y romper la tira.
- Ancho de tarjeta limitado también por el alto de pantalla: `w-[min(22vw,calc((100svh-320px)*0.75))]`.
- Barra de progreso: línea de 1px que hace `scaleX: progreso`.
- Con reduced motion → volver a scroll horizontal nativo con `snap-x snap-mandatory`.

### 6.9 Imagen flotante que sigue al cursor (listas)
```tsx
const mx = useMotionValue(0), my = useMotionValue(0);
const x = useSpring(mx, { stiffness: 150, damping: 20 });
const y = useSpring(my, { stiffness: 150, damping: 20 });
// onPointerMove (solo pointerType === "mouse"): mx.set(e.clientX - rect.left); my.set(e.clientY - rect.top)
// <motion.div style={{ x, y }} className="pointer-events-none absolute left-0 top-0 hidden md:block">
//   <AnimatePresence>{activo !== null && <motion.div key={activo} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} …/>}</AnimatePresence>
// En móvil: miniatura fija a la derecha de cada fila.
```

### 6.10 Hero con Ken Burns y parallax
```tsx
const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
// <motion.div style={desktop && !reducido ? { y } : undefined}>
//   <motion.div initial={{ scale: reducido ? 1 : 1.08 }} animate={{ scale: 1 }} transition={{ duration: 8, ease: EASE }}>
//     <Image … priority fetchPriority="high" />
```
- Fotos verticales en hero horizontal: mejor **3 paneles verticales** (tríptico) que recortar el cuerpo.
- Texto sobre foto: blanco + **velo sutil** inferior (`bg-gradient-to-t from-black/45`) solo por contraste AA. **No** usar `mix-blend-difference` para texto pequeño: sobre grises medios da contraste pobre.

## 7. Estructura de secciones sugerida para el portafolio
1. **Header** fijo (nombre/logo + `TRABAJO · SOBRE MÍ · CONTACTO`).
2. **Hero** 100svh: nombre gigante en Bodoni + rol en `ui-label` + imagen o video del mejor proyecto.
3. **Proyectos destacados** en grid editorial asimétrico (7/12 + 4/12 desplazado), con ImageReveal y metadatos en 11px (`CLIENTE · AÑO · ROL`).
4. **Índice de proyectos** como lista de palabras gigantes con imagen flotante al hover.
5. **Galería horizontal** ligada al scroll (más trabajos o detalles).
6. **Proceso / servicios** en 4 columnas con número grande en Bodoni (`01 02 03 04`).
7. **Full-bleed** con una frase personal en Bodoni sobre imagen.
8. **Contacto**: dos columnas, datos + botón sólido. Redes con iconos monocromos.
9. **Footer** oscuro (`noche`) con logo, frase en italic y © año.
10. **Página de caso** (`/proyectos/[slug]`): hero de imagen, ficha en 11px, texto 15px a 60–65ch, imágenes alternando a sangre y en grid.

## 8. Accesibilidad y rendimiento
- Contraste **AA** en todo texto (ver regla del acento). Overlay sutil si el texto va sobre imagen.
- `alt` descriptivo en cada imagen; las decorativas duplicadas con `alt=""`.
- Navegación con teclado y `:focus-visible` visible; `Escape` cierra el menú.
- `lang="es-MX"`, `<title>` y meta description propios, Open Graph con imagen.
- Hero con `priority`; el resto lazy. Videos: `muted loop playsInline`, poster siempre, carga perezosa con IntersectionObserver fuera del hero.
- Meta Lighthouse móvil: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 95.

## 9. Lecciones aprendidas (evitar repetir errores)
1. **Clip-path + IntersectionObserver:** el disparador va en un padre sin recorte (sección 6.4).
2. **`ml-auto` dentro de un grid** encoge el elemento a su contenido; en desktop añadir `md:ml-0`.
3. **Imágenes de otro dominio:** si el servidor envía `Cross-Origin-Resource-Policy: same-origin`, en un hosting estático no cargan (en local sí, porque las optimiza el servidor de Next). Solución: copiarlas a `public/` y comprimirlas (`sharp`, webp q≈78).
4. **GitHub Pages vive en un subdirectorio** (`/nombre-repo`): todas las rutas a `/public` deben pasar por un helper `asset()` que antepone `NEXT_PUBLIC_BASE_PATH`; `next/image` **no** lo agrega solo. El `canonical` también lo necesita.
5. **Contraste de marcas doradas/pastel:** casi nunca sirven como texto pequeño sobre fondo claro; crear variante oscura.
6. **Al verificar animaciones**, una pestaña en segundo plano congela `requestAnimationFrame`: medir con Chrome headless o con la pestaña visible antes de concluir que algo falla.
7. **Logos de marca:** usarlos como SVG en línea (no PNG); si se necesita separar isotipo y letras, extraer los subtrazos del path.

## 10. Checklist de QA por sección
- [ ] Screenshot en **375px** y **1440px**, comparado contra esta guía.
- [ ] Sin scroll horizontal en móvil (`document.documentElement.scrollWidth === 375`).
- [ ] Animaciones con la curva y tiempos globales; solo `transform/opacity/clip-path`.
- [ ] `prefers-reduced-motion` probado (Chrome: `--force-prefers-reduced-motion`).
- [ ] Consola sin errores; ninguna imagen rota (`naturalWidth === 0`).
- [ ] `npx tsc --noEmit`, `npm run lint` y `npm run build` limpios.
- [ ] Lighthouse móvil ≥ 90 / 95 / 95.

## 11. Publicación gratis en GitHub Pages
`next.config.ts`:
```ts
import type { NextConfig } from "next";

const githubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(githubPages ? { output: "export", trailingSlash: true } : {}),
  basePath,
  images: { unoptimized: githubPages },
};

export default nextConfig;
```
Helper: `export const asset = (ruta: string) => \`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${ruta}\`;`

`.github/workflows/deploy.yml`:
```yaml
name: Publicar en GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - id: pages
        uses: actions/configure-pages@v5
      - run: npm ci
      - name: Build estático
        run: npm run build
        env:
          GITHUB_PAGES: "true"
          NEXT_PUBLIC_BASE_PATH: ${{ steps.pages.outputs.base_path }}
          NEXT_PUBLIC_SITE_URL: ${{ steps.pages.outputs.origin }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
Activar Pages con "GitHub Actions" como fuente (`gh api -X POST repos/<usuario>/<repo>/pages -f build_type=workflow`). Si el repo se llama `<usuario>.github.io`, el sitio queda en la raíz y no hace falta `basePath`.

---

## 12. Por definir (lo iré agregando)
- [ ] Mi nombre / logo y si quiero isotipo + letras.
- [ ] Color de acento personal (y sus variantes de contraste).
- [ ] Lista de proyectos con imágenes, año, cliente, rol y links.
- [ ] Texto de "Sobre mí", servicios y datos de contacto/redes.
- [ ] Dominio propio o `usuario.github.io`.
