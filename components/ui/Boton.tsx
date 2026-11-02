import Link from "next/link";

/** Botón principal: píldora lima, la única superficie lima del sitio */
export function BotonPrincipal({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const externo = href.startsWith("http") || href.startsWith("mailto:");
  const clases = `group inline-flex h-14 items-center gap-3 rounded-full bg-lime pl-7 pr-2 text-[16px] font-medium text-ink transition-transform duration-300 ease-editorial hover:-translate-y-0.5 motion-reduce:transform-none ${className}`;
  const contenido = (
    <>
      {children}
      <span className="grid size-10 place-items-center rounded-full bg-ink text-lime transition-transform duration-300 ease-editorial group-hover:rotate-[-45deg] motion-reduce:transform-none" aria-hidden>
        ↗
      </span>
    </>
  );
  return externo ? (
    <a href={href} className={clases} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
      {contenido}
    </a>
  ) : (
    <Link href={href} className={clases}>
      {contenido}
    </Link>
  );
}
