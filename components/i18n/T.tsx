/** Texto bilingüe sin JavaScript: se renderizan ambos idiomas y `html[data-lang]` oculta uno */
export function T({ es, en }: { es: React.ReactNode; en: React.ReactNode }) {
  return (
    <>
      <span className="t-es">{es}</span>
      <span className="t-en" lang="en">
        {en}
      </span>
    </>
  );
}

export type Bilingue = { es: string; en: string };
