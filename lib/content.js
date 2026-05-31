// Backward-compat shim — the single source of truth is now lib/curriculum.js
import curriculum from "@/lib/curriculum";

export const modules = curriculum.units;
export const courseStats = curriculum.stats;
