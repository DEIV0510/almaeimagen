import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import LessonList from "@/components/LessonList";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { buildCourseState } from "@/lib/course";
import { ArrowLeft, ArrowRight, Diamond } from "@/components/Icons";

export const dynamic = "force-dynamic";

export default async function ModulePage({ params }) {
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

  const idx = state.modules.findIndex((m) => m.slug === params.slug);
  if (idx === -1) notFound();

  const mod = state.modules[idx];
  if (!mod.unlocked) redirect("/dashboard");

  const nextRaw = state.modules[idx + 1] || null;
  const nextModule = nextRaw ? { slug: nextRaw.slug, title: nextRaw.title } : null;

  return (
    <div className="flex min-h-dvh flex-col bg-blush-50">
      <AppHeader name={session.name} />

      <main className="flex-1">
        {/* Module hero */}
        <section
          className="relative overflow-hidden text-white"
          style={{
            background: `linear-gradient(130deg, ${mod.accent} 0%, #5E0935 100%)`,
          }}
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="container-x relative z-10 py-12 sm:py-16">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <ArrowLeft className="text-base" /> Volver a mi curso
            </Link>

            <span className="mt-6 block font-sans text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
              {mod.tagline}
            </span>
            <h1 className="mt-2 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
              {mod.title}
            </h1>
            <p className="mt-4 max-w-2xl text-white/85">{mod.description}</p>

            <div className="mt-6 inline-flex items-start gap-3 rounded-2xl bg-white/15 px-5 py-3 backdrop-blur">
              <Diamond className="mt-0.5 text-base text-white/90" />
              <p className="text-sm text-white/90">
                <span className="font-semibold">Objetivo:</span> {mod.goal}
              </p>
            </div>
          </div>
        </section>

        {/* Lessons */}
        <section className="container-x py-12">
          <LessonList
            accent={mod.accent}
            lessons={mod.lessons}
            nextModule={nextModule}
          />
        </section>
      </main>
    </div>
  );
}
