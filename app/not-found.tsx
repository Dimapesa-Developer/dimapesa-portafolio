import { T } from "@/components/i18n/T";
import { BotonPrincipal } from "@/components/ui/Boton";

export default function NoEncontrado() {
  return (
    <main className="flex min-h-svh flex-col justify-center px-4 pt-24 md:px-8">
      <h1 className="font-display font-semibold leading-[0.8] tracking-[-0.04em] text-[clamp(120px,30vw,420px)]" style={{ fontVariationSettings: '"opsz" 96' }}>
        <span className="font-serif font-normal text-brace-text">{"{"}</span>404<span className="font-serif font-normal text-brace-text">{"}"}</span>
      </h1>
      <p className="display-md mt-8 max-w-[22ch]">
        <T es="Esta página no existe o cambió de lugar." en="This page doesn’t exist or has moved." />
      </p>
      <div className="mt-10">
        <BotonPrincipal href="/">
          <T es="Volver al inicio" en="Back to home" />
        </BotonPrincipal>
      </div>
    </main>
  );
}
