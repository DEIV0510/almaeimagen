import Link from "next/link";
import { redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { buildCourseState } from "@/lib/course";
import curriculum from "@/lib/curriculum";
import {
  moduleIcons,
  Lock,
  Check,
  CheckCircle,
  ArrowRight,
  Play,
  Sparkles,
} from "@/components/Icons";

export const dynamic = "force-dynamic";

const iconBySlug = Object.fromEntries(
  curriculum.units.map((u) => [u.slug, u.icon])
);

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const dbModules = await prisma.module.findMany({
    orderBy: { order: "asc" },
    include: { lessons: { orderBy: { order: "asc" } } },
  });
  const progress = await prisma.lessonProgress.findMany({
    where: { userId: session.uid },
  });
  const state = buildCourseState(
    dbModules,
    progress.map((p) => p.lessonId)
  );
  const current = state.modules.find((m) => m.unlocked && !m.completed) || null;
  const finished = state.completedModules === state.modules.length;

  return (
    <div className="flex min-h-dvh flex-col bg-blush-50">
      <AppHeader name={session.name} />

      <main className="flex-1">
        {/* Welcome + overall progress */}
        <section className="container-x py-10 sm:py-12">
          <span className="label flex items-center gap-2">
            <Sparkles className="text-sm" /> Tu campus
          </span>
          <h1 className="mt-2 font-serif text-4xl font-semibold text-ink sm:text-5xl">
            Hola, {session.name}
          </h1>
          <p className="mt-2 text-ink-soft">
            {finished
              ? "Completaste todo el método. Puedes repasar cualquier módulo cuando quieras."
              : "Continúa tu transformación. Cada módulo se desbloquea al completar el anterior."}
          </p>

          <div className="card mt-7 p-7 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-5xl font-semibold text-brand-700">
                    {state.percent}%
                  </span>
                  <span className="font-sans text-sm font-medium text-ink-muted">
                    completado
                  </span>
                </div>
                <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-cream-200">
                  <div
                    className="h-full rounded-full bg-brand-gradient transition-all duration-700"
                    style={{ width: `${state.percent}%` }}
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="text-base text-brand-600" />
                    {state.completedModules}/{state.modules.length} módulos
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Play className="text-sm text-brand-600" />
                    {state.totalDone}/{state.totalLessons} clases
                  </span>
                </div>
              </div>

              {current && (
                <Link href={`/curso/${current.slug}`} className="btn-primary shrink-0">
                  {current.completedCount > 0 ? "Continuar" : "Empezar"}: {current.title}
                  <ArrowRight className="text-base" />
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Module list */}
        <section className="container-x pb-16">
          <h2 className="mb-5 font-sans text-xs font-semibold uppercase tracking-[0.3em] text-ink-soft">
            Contenido del programa
          </h2>
          <div className="space-y-4">
            {state.modules.map((m) => {
              const Icon = moduleIcons[iconBySlug[m.slug]] || Sparkles;
              const locked = !m.unlocked;

              const inner = (
                <>
                  <span
                    className="absolute inset-y-0 left-0 w-1.5"
                    style={{ background: locked ? "#EAD7E1" : m.accent }}
                  />
                  <div className="flex items-center gap-5">
                    <div className="relative shrink-0">
                      {locked ? (
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-200 text-2xl text-ink-muted">
                          <Lock />
                        </span>
                      ) : (
                        <span
                          className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl text-cream-50"
                          style={{ background: m.accent }}
                        >
                          <Icon />
                        </span>
                      )}
                      {m.completed && (
                        <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-white ring-2 ring-white">
                          <Check className="text-xs" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-brand-700">
                          {m.tagline}
                        </span>
                        {m.completed && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
                            Completado
                          </span>
                        )}
                      </div>
                      <h3 className="mt-0.5 truncate font-serif text-xl font-semibold text-ink">
                        {m.title}
                      </h3>

                      {locked ? (
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
                          <Lock className="text-sm" /> Completa el módulo anterior para desbloquear
                        </p>
                      ) : (
                        <div className="mt-2 flex items-center gap-3">
                          <div className="h-1.5 w-32 overflow-hidden rounded-full bg-cream-200">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{ width: `${m.percent}%`, background: m.accent }}
                            />
                          </div>
                          <span className="text-xs font-medium text-ink-muted">
                            {m.completedCount}/{m.total} clases
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="hidden shrink-0 sm:block">
                      {locked ? (
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-100 text-ink-muted">
                          <Lock className="text-lg" />
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 rounded-full bg-brand-50 px-5 py-2.5 font-sans text-sm font-semibold text-brand-800 transition-colors group-hover:bg-ink group-hover:text-cream-50">
                          {m.completed
                            ? "Repasar"
                            : m.completedCount > 0
                            ? "Continuar"
                            : "Empezar"}
                          <ArrowRight className="text-base" />
                        </span>
                      )}
                    </div>
                  </div>
                </>
              );

              return locked ? (
                <div
                  key={m.id}
                  className="card relative overflow-hidden p-5 opacity-75 sm:p-6"
                >
                  {inner}
                </div>
              ) : (
                <Link
                  key={m.id}
                  href={`/curso/${m.slug}`}
                  className="card group relative block overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow sm:p-6"
                >
                  {inner}
                </Link>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
