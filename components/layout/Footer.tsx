import Link from "next/link";
import { NAV, site } from "@/config/site";
import { T } from "@/components/i18n/T";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line px-4 pb-8 pt-20 md:px-8 md:pt-28">
      <div className="grid gap-12 md:grid-cols-12">
        <p className="voz text-[clamp(28px,3.4vw,44px)] leading-[1.05] md:col-span-6">
          <T
            es={<>Diseñado con intención.<br />Construido para avanzar.</>}
            en={<>Designed with intention.<br />Built to move forward.</>}
          />
        </p>
        <nav aria-label="Pie de página" className="md:col-span-3 md:col-start-8">
          <ul className="flex flex-col gap-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="llaves text-muted transition-colors hover:text-text">
                  <T es={item.es} en={item.en} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-2 md:col-span-2">
          <Link href="/cv" className="llaves text-muted hover:text-text">
            CV
          </Link>
          <a href={site.redes.github} target="_blank" rel="noopener" className="llaves text-muted hover:text-text">
            GitHub
          </a>
        </div>
      </div>

      {/* Firma gigante que ocupa todo el ancho */}
      <p
        aria-hidden
        className="mt-20 select-none whitespace-nowrap text-center font-display font-semibold leading-[0.8] tracking-[-0.04em] text-[17.2vw] md:mt-28"
        style={{ fontVariationSettings: '"opsz" 96, "wdth" 75' }}
      >
        <span className="font-serif font-normal text-brace-text">{"{"}</span>DIMAPESA<span className="font-serif font-normal text-brace-text">{"}"}</span>
      </p>

      <div className="meta mt-8 flex flex-wrap justify-between gap-4">
        <span>© {new Date().getFullYear()} {site.persona}</span>
        <span>
          <T es="Hecho a mano en México" en="Handmade in Mexico" /> · {site.coordenadas}
        </span>
      </div>
    </footer>
  );
}
