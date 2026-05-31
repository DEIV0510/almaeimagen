import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getSession } from "@/lib/auth";
import { Check, ArrowLeft } from "@/components/Icons";

export const metadata = { title: "Crear cuenta · Alma e Imagen Academy" };

const perks = [
  "Acceso inmediato al Módulo 1",
  "Aprende a tu ritmo, de por vida",
  "Comunidad privada de mujeres",
];

export default async function RegistroPage({ searchParams }) {
  if (await getSession()) redirect("/dashboard");
  const next =
    searchParams?.next && searchParams.next.startsWith("/")
      ? searchParams.next
      : "/dashboard";

  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-brand-gradient p-12 text-white lg:flex">
        <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
        <Link href="/" className="relative z-10 flex flex-col leading-none">
          <span className="font-script text-3xl">Alma e Imagen</span>
          <span className="-mt-1 pl-1 font-sans text-[9px] font-semibold uppercase tracking-[0.42em] text-white/70">
            The Academy
          </span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h2 className="font-serif text-4xl font-semibold leading-tight">
            Tu transformación empieza con un solo paso.
          </h2>
          <ul className="mt-8 space-y-4">
            {perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-white/90">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
                  <Check className="text-sm" />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 font-script text-2xl text-white/90">
          — Leidy Sepúlveda
        </p>
      </div>

      {/* Form */}
      <div className="flex items-center justify-center bg-blush-50 px-6 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-brand-600"
          >
            <ArrowLeft className="text-base" /> Volver al inicio
          </Link>
          <span className="label">Crea tu cuenta</span>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-ink sm:text-4xl">
            Únete a la academia
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Regístrate y comienza hoy mismo tu transformación.
          </p>
          <div className="mt-8">
            <AuthForm mode="register" nextPath={next} />
          </div>
        </div>
      </div>
    </main>
  );
}
