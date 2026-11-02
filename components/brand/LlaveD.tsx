// Logotipo {D} redibujado del PNG oficial: llaves lima + D serif.
export const LLAVE =
  "M760 662v14c-38 0-52 4-58 10s-8 19-8 34v68c0 24-12 37-32 44v2c20 7 32 20 32 44v68c0 16 3 29 9 35 7 6 21 9 57 10v12c-45 0-70-4-80-10-12-8-18-23-18-47v-68c0-20-6-33-33-39v-12c27-6 33-19 33-39v-68c0-24 7-40 19-48 11-7 34-10 79-10Z";
export const D =
  "M872 682h126c82 0 129 53 129 130 0 78-52 131-129 131H872v-12h34V694h-34Zm72 12v237h50c58 0 90-38 90-119 0-82-32-118-90-118Z";

export function LlaveD({ className = "", titulo = "DIMAPESA" }: { className?: string; titulo?: string }) {
  return (
    <svg viewBox="620 652 765 360" className={className} role="img" aria-label={titulo}>
      <path d={LLAVE} fill="var(--brace)" />
      <path d={LLAVE} fill="var(--brace)" transform="translate(2004 0) scale(-1 1)" />
      <path d={D} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

/** Una sola llave del logotipo; `cierre` la refleja para hacer "}".
 *  `puntos` la rellena con una trama de puntos, como las partículas del inicio. */
export function Llave({ cierre = false, puntos = false, trama = 5, className = "" }: { cierre?: boolean; puntos?: boolean; trama?: number; className?: string }) {
  const id = `trama-${cierre ? "c" : "a"}-${trama}`;
  return (
    <svg viewBox="629 662 131 341" className={className} aria-hidden preserveAspectRatio="xMidYMid meet">
      {puntos && (
        <defs>
          <pattern id={id} width={trama} height={trama} patternUnits="userSpaceOnUse">
            <circle cx={trama / 2} cy={trama / 2} r={trama * 0.28} fill="var(--brace)" />
          </pattern>
        </defs>
      )}
      <path d={LLAVE} fill={puntos ? `url(#${id})` : "var(--brace)"} transform={cierre ? "translate(1389 0) scale(-1 1)" : undefined} />
    </svg>
  );
}
