// Motor de partículas en Canvas 2D para el {D}.
// Cada partícula persigue un destino con física de resorte; el destino cambia por fases.

import { LLAVE, D } from "@/components/brand/LlaveD";

export type Punto = { x: number; y: number };

type Particula = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  a: number; // alfa actual
  ta: number; // alfa destino
  lima: boolean; // pertenece a las llaves
  retraso: number; // frames antes de empezar a moverse
  fase: number; // para la respiración
  t: number; // tamaño
};

// Caja del logo en coordenadas del path (coincide con el viewBox de LlaveD)
const LOGO = { x: 620, y: 652, w: 765, h: 360 };
const LLAVE_CAJA = { x: 629, y: 662, w: 131, h: 341 };

const mezclar = <T,>(arr: T[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/** Toma `n` puntos de lo que esté pintado en un canvas auxiliar */
function muestrear(dibujar: (ctx: CanvasRenderingContext2D) => void, w: number, h: number, n: number): Punto[] {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.ceil(w));
  c.height = Math.max(1, Math.ceil(h));
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.fillStyle = "#fff";
  dibujar(ctx);
  const datos = ctx.getImageData(0, 0, c.width, c.height).data;
  const paso = 2;
  const puntos: Punto[] = [];
  for (let y = 0; y < c.height; y += paso) {
    for (let x = 0; x < c.width; x += paso) {
      if (datos[(y * c.width + x) * 4 + 3] > 128) puntos.push({ x: x + Math.random(), y: y + Math.random() });
    }
  }
  if (!puntos.length) return [];
  mezclar(puntos);
  // Repite puntos si faltan; recorta si sobran
  return Array.from({ length: n }, (_, i) => puntos[i % puntos.length]);
}

/** {D} completo centrado en la caja dada */
export function puntosLogo(caja: { x: number; y: number; w: number; h: number }, nLlaves: number, nD: number) {
  const escala = Math.min(caja.w / LOGO.w, caja.h / LOGO.h);
  const ox = caja.x + (caja.w - LOGO.w * escala) / 2;
  const oy = caja.y + (caja.h - LOGO.h * escala) / 2;
  const w = caja.x + caja.w + 4;
  const h = caja.y + caja.h + 4;
  const transformar = (ctx: CanvasRenderingContext2D) => ctx.setTransform(escala, 0, 0, escala, ox - LOGO.x * escala, oy - LOGO.y * escala);

  const llaves = muestrear(
    (ctx) => {
      transformar(ctx);
      ctx.fill(new Path2D(LLAVE));
      ctx.transform(-1, 0, 0, 1, 2004, 0);
      ctx.fill(new Path2D(LLAVE));
    },
    w,
    h,
    nLlaves,
  );
  const d = muestrear(
    (ctx) => {
      transformar(ctx);
      ctx.fill(new Path2D(D), "evenodd");
    },
    w,
    h,
    nD,
  );
  return { llaves, d };
}

/** Dos llaves que enmarcan un rectángulo (el retrato) */
export function puntosMarco(caja: { x: number; y: number; w: number; h: number }, n: number) {
  const escala = caja.h / LLAVE_CAJA.h;
  const ancho = LLAVE_CAJA.w * escala;
  const separacion = Math.max(12, caja.w * 0.06);
  const w = caja.x + caja.w + ancho + separacion + 4;
  const h = caja.y + caja.h + 4;
  return muestrear(
    (ctx) => {
      // izquierda
      ctx.setTransform(escala, 0, 0, escala, caja.x - separacion - ancho - LLAVE_CAJA.x * escala, caja.y - LLAVE_CAJA.y * escala);
      ctx.fill(new Path2D(LLAVE));
      // derecha (espejo)
      ctx.setTransform(-escala, 0, 0, escala, caja.x + caja.w + separacion + ancho + LLAVE_CAJA.x * escala, caja.y - LLAVE_CAJA.y * escala);
      ctx.fill(new Path2D(LLAVE));
    },
    w,
    h,
    n,
  );
}

/** Puntos de un texto pintado con la fuente y posición dadas */
export function puntosTexto(texto: string, fuente: string, x: number, y: number, w: number, h: number, n: number) {
  return muestrear(
    (ctx) => {
      ctx.font = fuente;
      ctx.textBaseline = "middle";
      ctx.fillText(texto, x, y);
    },
    w,
    h,
    n,
  );
}

export class CampoDeParticulas {
  private ctx: CanvasRenderingContext2D;
  private ps: Particula[] = [];
  private raf = 0;
  private corriendo = false;
  private visible = true;
  private dpr = 1;
  private w = 0;
  private h = 0;
  private mouse = { x: -9999, y: -9999, activo: false };
  /** 0 → reposo; 1 → partículas dispersas (scroll fuera del hero) */
  dispersion = 0;
  private colores = { lima: "#b6ff55", tinta: "#f7f7f2" };

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d")!;
  }

  dimensionar(w: number, h: number) {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = w;
    this.h = h;
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.leerColores();
  }

  leerColores() {
    const css = getComputedStyle(document.documentElement);
    this.colores = {
      lima: css.getPropertyValue("--brace").trim() || "#b6ff55",
      tinta: css.getPropertyValue("--text").trim() || "#f7f7f2",
    };
  }

  /** Crea las partículas en posiciones iniciales dadas (o dispersas al azar) */
  crear(n: number, inicio?: Punto[]) {
    this.ps = Array.from({ length: n }, (_, i) => {
      const p = inicio?.[i] ?? { x: Math.random() * this.w, y: Math.random() * this.h };
      return {
        x: p.x,
        y: p.y,
        vx: 0,
        vy: 0,
        tx: p.x,
        ty: p.y,
        a: inicio ? 1 : 0,
        ta: 1,
        lima: false,
        retraso: 0,
        fase: Math.random() * Math.PI * 2,
        t: 1.3 + Math.random() * 1.2,
      };
    });
  }

  get cantidad() {
    return this.ps.length;
  }

  /** Asigna destinos: primero los de las llaves (lima), luego el resto */
  destinos(llaves: Punto[], resto: Punto[], opciones: { alfaResto?: number; escalonado?: number } = {}) {
    const { alfaResto = 1, escalonado = 0 } = opciones;
    this.ps.forEach((p, i) => {
      const esLlave = i < llaves.length;
      const d = esLlave ? llaves[i] : resto[(i - llaves.length) % Math.max(1, resto.length)];
      if (!d) return;
      p.tx = d.x;
      p.ty = d.y;
      p.lima = esLlave;
      p.ta = esLlave ? 1 : alfaResto;
      p.retraso = escalonado ? Math.floor(Math.random() * escalonado) : 0;
    });
  }

  /** Coloca todo en su destino sin animar (reduced motion / resize) */
  asentar() {
    for (const p of this.ps) {
      p.x = p.tx;
      p.y = p.ty;
      p.vx = p.vy = 0;
      p.a = p.ta;
      p.retraso = 0;
    }
    this.dibujar(0);
  }

  puntero(x: number, y: number, activo: boolean) {
    this.mouse = { x, y, activo };
  }

  setVisible(v: boolean) {
    this.visible = v;
    if (v && this.corriendo && !this.raf) this.raf = requestAnimationFrame(this.paso);
  }

  iniciar() {
    if (this.corriendo) return;
    this.corriendo = true;
    this.raf = requestAnimationFrame(this.paso);
  }

  detener() {
    this.corriendo = false;
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private paso = (t: number) => {
    this.raf = 0;
    if (!this.corriendo || !this.visible) return;
    this.fisica(t);
    this.dibujar(t);
    this.raf = requestAnimationFrame(this.paso);
  };

  private fisica(t: number) {
    const { x: mx, y: my, activo } = this.mouse;
    const radio = 110;
    for (const p of this.ps) {
      if (p.retraso > 0) {
        p.retraso--;
        continue;
      }
      // respiración muy leve alrededor del destino
      const bx = Math.sin(t * 0.0012 + p.fase) * 0.6;
      const by = Math.cos(t * 0.001 + p.fase) * 0.6;
      p.vx += (p.tx + bx - p.x) * 0.045;
      p.vy += (p.ty + by - p.y) * 0.045;
      if (activo) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy;
        if (d2 < radio * radio) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / radio) * 3.2;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
      }
      p.vx *= 0.82;
      p.vy *= 0.82;
      p.x += p.vx;
      p.y += p.vy;
      p.a += (p.ta - p.a) * 0.06;
    }
  }

  private dibujar(t: number) {
    const { ctx, dpr } = this;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, this.w, this.h);
    const cx = this.w / 2;
    const cy = this.h / 2;
    const disp = this.dispersion;
    for (const lima of [false, true]) {
      ctx.fillStyle = lima ? this.colores.lima : this.colores.tinta;
      for (const p of this.ps) {
        if (p.lima !== lima || p.a < 0.02) continue;
        let x = p.x;
        let y = p.y;
        if (disp > 0) {
          // al hacer scroll las partículas se alejan del centro con un giro
          const ang = p.fase + t * 0.0002;
          x += (x - cx) * disp * 0.9 + Math.cos(ang) * disp * 160;
          y += (y - cy) * disp * 0.6 + Math.sin(ang) * disp * 160 - disp * 120;
        }
        ctx.globalAlpha = p.a * (1 - disp * 0.85);
        ctx.fillRect(x, y, p.t, p.t);
      }
    }
    ctx.globalAlpha = 1;
  }
}
