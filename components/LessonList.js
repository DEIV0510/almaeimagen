"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Play, Check, CheckCircle, Clock, ArrowRight } from "@/components/Icons";

export default function LessonList({
  accent = "#A07C49",
  lessons,
  nextModule = null,
}) {
  const router = useRouter();
  const [completed, setCompleted] = useState(
    () => new Set(lessons.filter((l) => l.done).map((l) => l.id))
  );
  const firstIncomplete = lessons.findIndex((l) => !completed.has(l.id));
  const [active, setActive] = useState(
    firstIncomplete === -1 ? 0 : firstIncomplete
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const lesson = lessons[active];
  const isDone = completed.has(lesson.id);
  const allDone = completed.size === lessons.length;
  const pct = Math.round((completed.size / lessons.length) * 100);

  async function markComplete() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "No se pudo guardar tu progreso.");
        setSaving(false);
        return;
      }
      const next = new Set(completed);
      next.add(lesson.id);
      setCompleted(next);
      router.refresh();
      setSaving(false);
      const nextIdx = lessons.findIndex((l, i) => i > active && !next.has(l.id));
      if (nextIdx !== -1) setActive(nextIdx);
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
      setSaving(false);
    }
  }

  return (
    <div>
      {/* Module progress */}
      <div className="mb-7">
        <div className="mb-2 flex items-center justify-between">
          <span className="label">Progreso del módulo</span>
          <span className="font-sans text-sm font-semibold text-ink">
            {completed.size}/{lessons.length} clases · {pct}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-cream-200">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${accent}, #B5179E)` }}
          />
        </div>
      </div>

      <div className="grid gap-7 lg:grid-cols-[1.55fr_1fr]">
        {/* Player */}
        <div>
          <div
            className="relative flex aspect-video items-center justify-center overflow-hidden rounded-3xl text-cream-50 shadow-glow"
            style={{ background: `linear-gradient(135deg, ${accent} 0%, #5E0935 100%)` }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(120%_120%_at_0%_0%,rgba(255,255,255,.5),transparent_45%)]" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-3xl backdrop-blur-sm ring-1 ring-white/40 transition-transform hover:scale-105">
                <Play className="ml-1" />
              </span>
              <span className="mt-4 max-w-xs px-4 font-serif text-xl italic">
                {lesson.title}
              </span>
              <span className="mt-1 font-sans text-xs uppercase tracking-[0.3em] text-cream-50/70">
                Video de la clase · {lesson.duration}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <span className="label">Clase {String(active + 1).padStart(2, "0")}</span>
            <h3 className="mt-2 font-serif text-3xl font-semibold text-ink">
              {lesson.title}
            </h3>
            <p className="mt-3 leading-relaxed text-ink-soft">{lesson.content}</p>

            {error && (
              <p role="alert" className="mt-4 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-800">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {isDone ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-5 py-3 font-sans text-sm font-semibold text-green-700 ring-1 ring-green-200">
                  <CheckCircle className="text-base" /> Clase completada
                </span>
              ) : (
                <button onClick={markComplete} disabled={saving} className="btn-primary disabled:opacity-60">
                  {saving ? "Guardando…" : "Marcar clase como vista"}
                  {!saving && <Check className="text-base" />}
                </button>
              )}
              {active < lessons.length - 1 && (
                <button onClick={() => setActive(active + 1)} className="btn-ghost">
                  Siguiente clase <ArrowRight className="text-base" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Lesson list */}
        <div>
          <div className="card overflow-hidden">
            <div className="border-b border-cream-200 px-5 py-4">
              <span className="label">Clases del módulo</span>
            </div>
            <ul>
              {lessons.map((l, i) => {
                const done = completed.has(l.id);
                const isActive = i === active;
                return (
                  <li key={l.id}>
                    <button
                      onClick={() => setActive(i)}
                      className={`flex w-full items-center gap-3 px-5 py-4 text-left transition-colors ${
                        isActive ? "bg-brand-50" : "hover:bg-cream-100"
                      }`}
                    >
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                          done
                            ? "bg-green-100 text-green-700"
                            : isActive
                            ? "bg-brand-700 text-cream-50"
                            : "bg-brand-100 text-brand-800"
                        }`}
                      >
                        {done ? <Check className="text-base" /> : i + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={`block truncate font-sans text-sm font-semibold ${isActive ? "text-brand-800" : "text-ink"}`}>
                          {l.title}
                        </span>
                        <span className="mt-0.5 flex items-center gap-1 font-sans text-xs text-ink-muted">
                          <Clock className="text-[0.85rem]" /> {l.duration}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {allDone && (
            <div className="mt-5 rounded-3xl border border-brand-200 bg-brand-gradient p-6 text-cream-50 shadow-glow">
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.28em] text-cream-50/80">
                ¡Felicidades!
              </span>
              <p className="mt-2 font-serif text-2xl">Completaste este módulo.</p>
              {nextModule ? (
                <>
                  <p className="mt-1 text-sm text-cream-50/85">
                    El siguiente módulo ya está desbloqueado.
                  </p>
                  <Link
                    href={`/curso/${nextModule.slug}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream-50 px-6 py-3 font-sans text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                  >
                    Ir a {nextModule.title} <ArrowRight className="text-base" />
                  </Link>
                </>
              ) : (
                <>
                  <p className="mt-1 text-sm text-cream-50/85">
                    Has completado el método Alma e Imagen. Es momento de volver a ti.
                  </p>
                  <Link
                    href="/dashboard"
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-cream-50 px-6 py-3 font-sans text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                  >
                    Volver a mi campus <ArrowRight className="text-base" />
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
