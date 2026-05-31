import Link from "next/link";
import { redirect } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { getSession } from "@/lib/auth";
import { Sparkles, ArrowLeft } from "@/components/Icons";

export const metadata = { title: "Iniciar sesión · Alma e Imagen Academy" };

export default async function LoginPage({ searchParams }) {
  if (await getSession()) redirect("/dashboard");
  const next =
    searchParams?.next && searchParams.next.startsWith("/")
      ? searchParams.next
      : "/dashboard";

  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      {/* Form */}
      <div className="order-2 flex items-center justify-center bg-blush-50 px-6 py-12 lg:order-1">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition-colors hover:text-brand-600"
          >
            <ArrowLeft className="text-base" /> Volver al inicio
          </Link>
          <span className="label">Bienvenida de nuevo</span>
          <h1 className="mt-2 font-serif text-3xl font-semibold text-ink sm:text-4xl">
            Inicia sesión
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Continúa tu transformación donde la dejaste.
          </p>
          <div className="mt-8">
            <AuthForm mode="login" nextPath={next} />
          </div>
        </div>
      </div>

      {/* Brand panel */}
      <div className="relative order-1 hidden flex-col justify-between overflow-hidden bg-ink p-12 text-white lg:order-2 lg:flex">
        <div className="pointer-events-none absolute -left-20 bottom-10 h-80 w-80 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 rounded-full bg-plum/30 blur-3xl" />
        <Link href="/" className="relative z-10 flex flex-col leading-none">
          <span className="font-script text-3xl text-brand-300">Alma e Imagen</span>
          <span className="-mt-1 pl-1 font-sans text-[9px] font-semibold uppercase tracking-[0.42em] text-white/60">
            The Academy
          </span>
        </Link>
        <div className="relative z-10 max-w-md">
          <Sparkles className="text-3xl text-brand-300" />
          <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight">
            Tu mejor versión te está esperando.
          </h2>
          <p className="mt-4 text-white/70">
            Retoma tus módulos, sigue avanzando y proyecta el alma e imagen que
            mereces.
          </p>
        </div>
        <p className="relative z-10 font-script text-2xl text-brand-300">
          Alma e Imagen
        </p>
      </div>
    </main>
  );
}
