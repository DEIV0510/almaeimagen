import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream-50">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-700/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-mocha-600/30 blur-3xl" />

      <div className="container-x relative z-10 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex flex-col leading-none">
              <span className="font-script text-4xl text-brand-300">Alma e Imagen</span>
              <span className="mt-1 pl-1 font-sans text-[10px] font-semibold uppercase tracking-[0.42em] text-cream-50/60">
                The Academy
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream-50/70">
              Una experiencia de formación emocional, espiritual y de imagen personal para mujeres
              que desean sanar, reconciliarse con su historia y proyectar su mejor versión. Creada
              por Leidy Sepúlveda.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-cream-50/50">
              Explora
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-cream-50/75">
              <li>
                <Link href="/#modulos" className="transition-colors hover:text-brand-300">
                  El programa
                </Link>
              </li>
              <li>
                <Link href="/#leidy" className="transition-colors hover:text-brand-300">
                  Sobre Leidy
                </Link>
              </li>
              <li>
                <Link href="/#testimonios" className="transition-colors hover:text-brand-300">
                  Testimonios
                </Link>
              </li>
              <li>
                <Link href="/registro" className="transition-colors hover:text-brand-300">
                  Inscríbete
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-cream-50/50">
              Cuenta
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-cream-50/75">
              <li>
                <Link href="/login" className="transition-colors hover:text-brand-300">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link href="/registro" className="transition-colors hover:text-brand-300">
                  Crear cuenta
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="transition-colors hover:text-brand-300">
                  Mi campus
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream-50/10 pt-8 text-center text-xs text-cream-50/50 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} Alma e Imagen · The Academy — by Leidy Sepúlveda.</p>
          <p>Hecho con propósito en Colombia.</p>
        </div>
      </div>
    </footer>
  );
}
