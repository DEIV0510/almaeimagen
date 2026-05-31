const { PrismaClient } = require("@prisma/client");
const { units } = require("../lib/curriculum.js");
const prisma = new PrismaClient();

function durationFor(title) {
  const t = title.toLowerCase();
  if (t.includes("audio")) return "12 min";
  if (t.includes("taller")) return "22 min";
  if (t.includes("reto"))
    return t.includes("60") ? "60 días" : t.includes("21") ? "21 días" : "30 días";
  if (t.includes("carta")) return "15 min";
  if (t.includes("instructivo") || t.includes("guía") || t.includes("guia")) return "10 min";
  if (t.includes("video")) return "8 min";
  if (t.includes("rueda") || t.includes("árbol") || t.includes("arbol")) return "14 min";
  return "9 min";
}

function contentFor(title, unit) {
  const t = title.toLowerCase();
  if (t.includes("audio"))
    return `Audio terapéutico guiado para integrar "${title}". Busca un lugar tranquilo, respira y permítete sentir.`;
  if (t.includes("taller"))
    return `Taller práctico: "${title}". Descarga el material, realiza los ejercicios y registra lo que descubras de ti.`;
  if (t.includes("reto"))
    return `Un reto para sostener el cambio en el tiempo: "${title}". La constancia es la que transforma.`;
  if (t.includes("carta"))
    return `Ejercicio de escritura consciente: "${title}". Escribir es una forma poderosa de sanar y soltar.`;
  if (t.includes("instructivo") || t.includes("guía") || t.includes("guia"))
    return `Guía visual paso a paso: "${title}". Tenla a la mano para aplicarla en tu día a día.`;
  return `En esta clase trabajamos "${title}", una pieza clave de ${unit.title}.`;
}

async function main() {
  // Reset course content (keeps registered users; progress cascades on lesson delete).
  await prisma.lessonProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();

  for (const u of units) {
    await prisma.module.create({
      data: {
        order: u.order,
        slug: u.slug,
        title: u.title,
        tagline: u.tagline,
        description: u.anchor || u.goal,
        goal: u.goal,
        accent: u.accent,
        lessons: {
          create: u.lessons.map((title, i) => ({
            order: i + 1,
            title,
            duration: durationFor(title),
            videoUrl: null,
            content: contentFor(title, u),
          })),
        },
      },
    });
  }

  const m = await prisma.module.count();
  const l = await prisma.lesson.count();
  console.log(`Seed completo: ${m} módulos y ${l} clases creadas.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
