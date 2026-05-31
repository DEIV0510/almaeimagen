import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { isModuleUnlocked } from "@/lib/course";

export async function POST(req) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { lessonId } = await req.json();
  const lesson = await prisma.lesson.findUnique({
    where: { id: Number(lessonId) },
  });
  if (!lesson) {
    return NextResponse.json({ error: "Clase no encontrada" }, { status: 404 });
  }

  // Server-side enforcement of sequential unlocking — can't skip ahead via API.
  const modules = await prisma.module.findMany({
    orderBy: { order: "asc" },
    include: { lessons: { orderBy: { order: "asc" } } },
  });
  const completed = await prisma.lessonProgress.findMany({
    where: { userId: session.uid },
  });
  const completedIds = completed.map((c) => c.lessonId);

  if (!isModuleUnlocked(modules, completedIds, lesson.moduleId)) {
    return NextResponse.json(
      { error: "Este módulo aún está bloqueado. Completa el módulo anterior." },
      { status: 403 }
    );
  }

  await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: { userId: session.uid, lessonId: lesson.id },
    },
    update: { completed: true, completedAt: new Date() },
    create: { userId: session.uid, lessonId: lesson.id, completed: true },
  });

  const fresh = await prisma.lessonProgress.findMany({
    where: { userId: session.uid },
  });

  return NextResponse.json({
    ok: true,
    completedLessonIds: fresh.map((c) => c.lessonId),
  });
}
