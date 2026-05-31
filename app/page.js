import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { getSession } from "@/lib/auth";
import curriculum from "@/lib/curriculum";
import {
  moduleIcons,
  ArrowRight,
  Check,
  CheckCircle,
  Star,
  Diamond,
  Sparkles,
  Heart,
  Leaf,
  ChevronDown,
} from "@/components/Icons";

const { units, problems, benefits, resources, testimonials, stats } = curriculum;

export default async function LandingPage() {
  const session = await getSession();
  const enrollHref = session ? "/dashboard" : "/registro";
  const enrollLabel = session ? "Ir a mi academia" : "Quiero entrar a la academia";

  return (
    <main className="overflow-x-hidden">
      <Navbar user={session} />

      {/* ============ HERO ============ */}
      <section className="relative bg-blush-radial pt-[68px]">
        <div className="pointer-events-none absolute -right-32 top-16 h-[26rem] w-[26rem] rounded-full bg-sand-200/50 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-56 h-[24rem] w-[24rem] rounded-full bg-nude-300/40 blur-3xl" />

        <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-sand-300 bg-cream-50/70 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-700 backdrop-blur">
              <Sparkles className="text-sm" /> The Academy · by Leidy Sepúlveda
            </span>

            <h1 className="mt-6 font-serif text-[2.6rem] font-semibold leading-[1.08] text-ink sm:text-[3.6rem]">
              Transforma tu historia, <span className="gradient-text italic">sana tu interior</span> y proyecta la mujer que estás destinada a ser
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              <span className="font-medium text-ink">Alma e Imagen · The Academy</span> es una
              experiencia de formación emocional, espiritual y de imagen personal para mujeres que
              desean sanar, reconstruirse y proyectar su mejor versión.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={enrollHref} className="btn-primary !px-8 !py-4 text-base">
                {enrollLabel}
                <ArrowRight className="text-lg" />
              </Link>
              <Link href="#modulos" className="btn-ghost !px-8 !py-4 text-base">
                Ver módulos del programa
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-3">
                <div className="flex text-brand-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-sm" />
                  ))}
                </div>
                <p className="text-sm font-medium text-ink-soft">
                  {stats.students} mujeres en transformación
                </p>
              </div>
              <span className="hidden h-5 w-px bg-sand-300 sm:block" />
              <p className="text-sm font-medium text-ink-soft">
                {stats.units} módulos · {stats.lessons} clases
              </p>
            </div>
          </div>

          {/* Elegant cover (photo slot — reemplazable por una foto real de Leidy) */}
          <div className="relative mx-auto w-full max-w-md animate-fade-in lg:animate-float">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-sand-200 bg-gradient-to-br from-cream-100 via-nude-300/50 to-sand-200 shadow-card">
              <div className="absolute inset-0 [background:radial-gradient(120%_90%_at_100%_0%,rgba(255,255,255,.6),transparent_45%)]" />
              <span className="absolute right-5 top-8 select-none font-serif text-[7rem] font-semibold italic leading-none text-white/40">
                Alma
              </span>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.4em] text-mocha-700">
                  The Academy
                </span>
                <p className="font-script text-[3.4rem] leading-none text-brand-800">
                  Alma e Imagen
                </p>
                <p className="mt-3 max-w-[18rem] text-sm text-ink-soft">
                  Sanar por dentro para proyectarte por fuera.
                </p>
              </div>
            </div>

            <div className="absolute -left-4 top-12 flex items-center gap-2 rounded-2xl border border-sand-200 bg-white/85 px-4 py-3 shadow-soft backdrop-blur">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Heart className="text-base" />
              </span>
              <span className="text-xs font-semibold text-ink">Sanación emocional</span>
            </div>
            <div className="absolute -right-3 bottom-20 flex items-center gap-2 rounded-2xl border border-sand-200 bg-white/85 px-4 py-3 shadow-soft backdrop-blur">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Sparkles className="text-base" />
              </span>
              <span className="text-xs font-semibold text-ink">Imagen personal</span>
            </div>
          </div>
        </div>

        {/* Values strip */}
        <div className="border-y border-sand-200 bg-cream-100/60 backdrop-blur">
          <div className="container-x flex flex-wrap items-center justify-center gap-x-7 gap-y-3 py-5 text-center">
            {["Sanación", "Amor propio", "Reconciliación", "Imagen personal", "Proyección"].map(
              (v, i) => (
                <span key={v} className="flex items-center gap-7">
                  <span className="font-serif text-lg italic text-ink-soft">{v}</span>
                  {i < 4 && <Diamond className="hidden text-brand-400 sm:block" />}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ============ PROBLEMA ============ */}
      <section className="container-x py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="label">¿Te identificas?</span>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-ink sm:text-5xl">
            Sé exactamente lo que estás sintiendo
          </h2>
          <p className="mt-4 text-ink-soft">
            Tal vez has avanzado en muchas áreas de tu vida, pero por dentro algo sigue pidiendo ser
            atendido.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((p, i) => (
            <Reveal key={i} delay={(i % 3) * 90} className="card flex items-start gap-4 p-7">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nude-300/50 text-brand-700">
                <Leaf className="text-lg" />
              </span>
              <p className="leading-relaxed text-ink-soft">{p}</p>
            </Reveal>
          ))}
          <Reveal delay={180} className="flex items-center rounded-[1.75rem] bg-brand-gradient p-7 text-cream-50">
            <p className="font-serif text-2xl italic leading-snug">
              Mereces sanar, reconciliarte y volver a ti.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ SOLUCIÓN ============ */}
      <section className="relative bg-white py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="label">La ruta de transformación</span>
            <blockquote className="mt-6 font-serif text-3xl font-medium italic leading-snug text-ink sm:text-[2.6rem]">
              “No puedes transformar lo que no entiendes, ni sostener lo que no has preparado dentro
              de ti.”
            </blockquote>
            <p className="mt-7 text-lg leading-relaxed text-ink-soft">
              Por eso esta academia es una ruta completa: primero sanamos y preparamos tu mundo
              interior, y luego construimos tu imagen y tu proyección exterior. Adentro y afuera, en
              el orden correcto.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
            <Reveal className="card p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                <Heart className="text-xl" />
              </span>
              <h3 className="mt-4 font-serif text-2xl font-semibold text-ink">Sanas por dentro</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Regulación emocional, heridas de la infancia, perdón, gratitud y amor propio.
              </p>
            </Reveal>
            <Reveal delay={120} className="card p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                <Sparkles className="text-xl" />
              </span>
              <h3 className="mt-4 font-serif text-2xl font-semibold text-ink">Proyectas por fuera</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Asesoría de imagen, colorimetría, estilo y una proyección que comunica quién eres.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ MÓDULOS ============ */}
      <section id="modulos" className="container-x py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="label">El programa</span>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-ink sm:text-5xl">
            Siete etapas para volver a ti
          </h2>
          <p className="mt-4 text-ink-soft">
            Un camino guiado, módulo a módulo, desde la preparación interior hasta tu nuevo estilo.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 max-w-4xl space-y-4">
          {units.map((u, i) => {
            const Icon = moduleIcons[u.icon] || Sparkles;
            return (
              <Reveal key={u.slug} delay={(i % 4) * 70}>
                <details className="group overflow-hidden rounded-[1.5rem] border border-sand-200 bg-white shadow-soft [&_summary]:cursor-pointer">
                  <summary className="flex items-center gap-5 p-6 marker:content-none">
                    <span
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl text-cream-50"
                      style={{ background: u.accent }}
                    >
                      <Icon />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-brand-700">
                        {u.tagline}
                      </span>
                      <span className="mt-0.5 block font-serif text-2xl font-semibold text-ink">
                        {u.title}
                      </span>
                      <span className="mt-1 hidden font-serif text-base italic text-ink-muted sm:block">
                        {u.anchor}
                      </span>
                    </span>
                    <ChevronDown className="shrink-0 text-2xl text-brand-500 transition-transform group-open:rotate-180" />
                  </summary>

                  <div className="border-t border-sand-200 px-6 py-6 sm:pl-[5.75rem]">
                    <p className="font-serif text-base italic text-ink-soft sm:hidden">
                      {u.anchor}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft sm:mt-0">
                      <span className="font-semibold text-ink">Objetivo:</span> {u.goal}
                    </p>
                    <div className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {u.lessons.map((l, k) => (
                        <div key={k} className="flex items-start gap-2.5 text-sm text-ink-soft">
                          <Check className="mt-1 shrink-0 text-base text-brand-600" />
                          {l}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-10 text-center">
          <Link href={enrollHref} className="btn-primary !px-8 !py-4 text-base">
            {enrollLabel} <ArrowRight className="text-lg" />
          </Link>
        </Reveal>
      </section>

      {/* ============ BENEFICIOS ============ */}
      <section className="bg-white py-20 sm:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="label">Lo que lograrás</span>
            <h2 className="mt-3 font-serif text-4xl font-semibold text-ink sm:text-5xl">
              Tu transformación, paso a paso
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal
                key={i}
                delay={(i % 2) * 90}
                className="flex items-center gap-4 rounded-2xl border border-sand-200 bg-cream-50 p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-cream-50">
                  <Check className="text-base" />
                </span>
                <p className="font-medium text-ink">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RECURSOS INCLUIDOS ============ */}
      <section className="container-x py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="label">Todo incluido</span>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-ink sm:text-5xl">
            Recursos que te acompañan
          </h2>
          <p className="mt-4 text-ink-soft">
            Cada módulo viene con material práctico para que tu proceso sea profundo y sostenible.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {resources.map((r, i) => (
            <Reveal key={i} delay={(i % 4) * 70} className="card flex flex-col items-start p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-nude-300/50 text-brand-700">
                <Diamond className="text-lg" />
              </span>
              <p className="mt-4 font-serif text-lg font-semibold text-ink">{r.title}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ SOBRE LEIDY ============ */}
      <section id="leidy" className="bg-white py-20 sm:py-28">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="relative mx-auto w-full max-w-sm">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-sand-200 bg-gradient-to-br from-cream-100 to-nude-300/60 shadow-card">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="flex h-28 w-28 items-center justify-center rounded-full bg-brand-gradient font-serif text-4xl font-semibold text-cream-50 shadow-glow">
                  LS
                </span>
                <p className="mt-5 font-script text-4xl text-brand-800">Leidy Sepúlveda</p>
                <span className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.32em] text-ink-soft">
                  Fundadora & Mentora
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <span className="label">Sobre tu mentora</span>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Acompañamiento desde el alma
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              Leidy Sepúlveda acompaña a mujeres en procesos de transformación interior y exterior,
              integrando herramientas de sanación emocional, amor propio, asesoría de imagen y
              proyección personal.
            </p>
            <p className="mt-6 font-script text-4xl text-brand-800">Leidy Sepúlveda</p>
          </Reveal>
        </div>
      </section>

      {/* ============ TESTIMONIOS ============ */}
      <section id="testimonios" className="container-x py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="label">Testimonios</span>
          <h2 className="mt-3 font-serif text-4xl font-semibold text-ink sm:text-5xl">
            Historias que renacen
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} className="card flex flex-col p-7">
              <div className="flex text-brand-500">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} className="text-base" />
                ))}
              </div>
              <p className="mt-4 flex-1 font-serif text-lg italic leading-relaxed text-ink">
                “{t.quote}”
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-cream-50">
                  {t.initials}
                </span>
                <div>
                  <p className="font-sans text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-muted">{t.role}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="container-x pb-24">
        <Reveal className="relative overflow-hidden rounded-[2.25rem] bg-brand-gradient px-8 py-16 text-center text-cream-50 sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-72 w-72 rounded-full bg-nude-400/20 blur-3xl" />
          <div className="relative z-10">
            <p className="font-script text-5xl text-brand-200">Es momento</p>
            <h2 className="mt-1 font-serif text-4xl font-semibold sm:text-5xl">de volver a ti</h2>
            <p className="mx-auto mt-5 max-w-xl text-cream-100/85">
              Esta academia no es solo un curso. Es una ruta para sanar, reconciliarte con tu
              historia y proyectar la mujer que realmente eres.
            </p>
            <Link
              href={enrollHref}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream-50 px-8 py-4 text-base font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              {session ? "Ir a mi academia" : "Quiero comenzar mi transformación"}
              <ArrowRight className="text-lg" />
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer />
    </main>
  );
}
