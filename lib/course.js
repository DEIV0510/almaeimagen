// Pure helpers for sequential module unlocking + progress computation.
// A module is UNLOCKED only when every lesson of the previous module is completed.

export function buildCourseState(modules, completedLessonIds) {
  const done = new Set(completedLessonIds);
  let prevCompleted = true; // module 1 is always unlocked
  let totalLessons = 0;
  let totalDone = 0;

  const out = modules.map((m) => {
    const lessons = (m.lessons || []).map((l) => ({
      ...l,
      done: done.has(l.id),
    }));
    const completedCount = lessons.filter((l) => l.done).length;
    const moduleCompleted =
      lessons.length > 0 && completedCount === lessons.length;
    const unlocked = prevCompleted;

    totalLessons += lessons.length;
    totalDone += completedCount;

    const state = {
      ...m,
      lessons,
      completedCount,
      total: lessons.length,
      percent: lessons.length
        ? Math.round((completedCount / lessons.length) * 100)
        : 0,
      completed: moduleCompleted,
      unlocked,
    };

    prevCompleted = moduleCompleted;
    return state;
  });

  return {
    modules: out,
    totalLessons,
    totalDone,
    percent: totalLessons ? Math.round((totalDone / totalLessons) * 100) : 0,
    completedModules: out.filter((m) => m.completed).length,
  };
}

/** Server-side guard: is a given module currently unlocked for this user? */
export function isModuleUnlocked(modules, completedLessonIds, moduleId) {
  const { modules: st } = buildCourseState(modules, completedLessonIds);
  const m = st.find((x) => x.id === moduleId);
  return m ? m.unlocked : false;
}
