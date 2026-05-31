// Single source of truth for the program (CommonJS so prisma/seed.js can require it
// and the Next.js app can default-import it: `import curriculum from "@/lib/curriculum"`).

const units = [
  {
    order: 1,
    slug: "bienvenida",
    label: "Bienvenida",
    title: "Bienvenida",
    tagline: "Bienvenida · Empieza aquí",
    anchor: "Tu transformación comienza en el momento en que decides volver a ti.",
    goal: "Darte la bienvenida, agradecer tu llegada a la academia, explicar el método y despertar el deseo de vivir todo el proceso.",
    accent: "#ED2A8C",
    icon: "sparkles",
    lessons: [
      "Bienvenida a la academia",
      "Cómo está construido el método",
      "Cómo aprovechar al máximo tu proceso",
    ],
  },
  {
    order: 2,
    slug: "mapa-de-ruta",
    label: "Módulo 0",
    title: "Mapa de Ruta",
    tagline: "Módulo 0 · Preparación",
    anchor:
      "No puedes transformar lo que no entiendes, ni sostener lo que no has preparado dentro de ti.",
    goal: "Preparar tu sistema nervioso y tu autoconocimiento antes de iniciar la sanación profunda.",
    accent: "#D6207E",
    icon: "compass",
    lessons: [
      "Regulación del sistema nervioso",
      "Autoconocimiento",
      "Audio de regulación del sistema nervioso",
      "Taller de sistema nervioso",
      "Taller de autoconocimiento con 50 preguntas",
    ],
  },
  {
    order: 3,
    slug: "raices",
    label: "Módulo 1",
    title: "Raíces",
    tagline: "Módulo 1 · Sanación del origen",
    anchor:
      "Sanar el origen no cambia tu historia, pero libera el diseño original de tu destino.",
    goal: "Identificar con compasión y honestidad las heridas primarias de la infancia y comprender cómo han moldeado tu personalidad.",
    accent: "#B5179E",
    icon: "leaf",
    lessons: [
      "Heridas de la infancia",
      "Herida materna",
      "Herida paterna",
      "Niña interior",
      "Carta a mamá",
      "Carta a papá",
      "Árbol genealógico",
      "Imagen útero",
      "Talleres y audios de sanación",
    ],
  },
  {
    order: 4,
    slug: "reconciliacion",
    label: "Módulo 2",
    title: "Reconciliación",
    tagline: "Módulo 2 · Perdón y gratitud",
    anchor: "El perdón limpia el espejo y la gratitud ilumina el reflejo.",
    goal: "Transformar el dolor identificado en Raíces en una plataforma de paz a través del perdón consciente y la gratitud.",
    accent: "#E2348F",
    icon: "sun",
    lessons: [
      "Ruta del perdón",
      "Taller del perdón",
      "Ejercicio de culpa",
      "Audio para trabajar el perdón",
      "Gratitud como ciencia",
      "Taller de gratitud",
      "Audio de gratitud",
      "Reto de 21 días de gratitud",
    ],
  },
  {
    order: 5,
    slug: "construccion-del-ser",
    label: "Módulo 3",
    title: "Construcción del Ser",
    tagline: "Módulo 3 · Amor propio e inteligencia emocional",
    anchor: "El amor propio no es un destino, es la casa donde vuelves a habitarte.",
    goal: "Fortalecer tu amor propio, regular tus emociones y reprogramar las creencias que te limitan.",
    accent: "#C71585",
    icon: "flower",
    lessons: [
      "Amor propio",
      "Taller de amor propio",
      "Reto de amor propio de 60 días",
      "Método 30 6/A",
      "Inteligencia emocional",
      "Taller de manejo de emociones",
      "Arteterapia",
      "Límites",
      "Reprogramación de creencias",
    ],
  },
  {
    order: 6,
    slug: "mi-reflejo",
    label: "Módulo 4",
    title: "Mi Reflejo",
    tagline: "Módulo 4 · Asesoría de imagen",
    anchor: "Cuando sanas por dentro, el espejo deja de mentirte.",
    goal: "Reconocer tu imagen personal —rostro, cuerpo y colorimetría— con criterio profesional.",
    accent: "#DD2486",
    icon: "mirror",
    lessons: [
      "Qué es una asesoría de imagen",
      "Taller de asesoría de imagen",
      "Visagismo",
      "Instructivo tipo de rostro con fotos",
      "Composición corporal",
      "Instructivo tipo de cuerpo con fotos",
      "Colorimetría",
      "Rueda de color",
      "Instructivo para usar la rueda de color",
    ],
  },
  {
    order: 7,
    slug: "proyeccion",
    label: "Módulo 5",
    title: "Proyección",
    tagline: "Módulo 5 · Tu nuevo estilo",
    anchor: "Proyectas con naturalidad la mujer que por fin reconoces en ti.",
    goal: "Proyectar seguridad, elegancia y autenticidad con un estilo que comunica quién eres.",
    accent: "#AE1565",
    icon: "crown",
    lessons: [
      "Estilos universales",
      "Edición de armario",
      "Ruta de compras",
      "Imagen que comunica",
      "Lenguaje corporal",
      "Comportamiento",
      "Etiqueta",
      "Guía de salud y nutrición",
      "Guía de automaquillaje",
      "Tu nuevo estilo",
      "Video de cierre, despedida y agradecimientos",
    ],
  },
];

const problems = [
  "Cargas heridas del pasado que aún pesan en tu presente.",
  "No sabes cómo sanar tu historia familiar y emocional.",
  "Te cuesta amarte, reconocerte y hablarte con compasión.",
  "Quieres verte y sentirte mejor, pero no sabes por dónde empezar.",
  "Deseas proyectar seguridad, elegancia y propósito.",
];

const benefits = [
  "Comprender tu historia personal con claridad y compasión",
  "Sanar heridas emocionales de raíz",
  "Fortalecer tu amor propio",
  "Regular tus emociones",
  "Reconocer y potenciar tu imagen personal",
  "Vestirte según tu cuerpo, rostro y colorimetría",
  "Proyectar seguridad, elegancia y autenticidad",
  "Construir una nueva versión de ti misma",
];

const resources = [
  { title: "Videos formativos", icon: "play" },
  { title: "Talleres descargables", icon: "download" },
  { title: "Audios terapéuticos", icon: "headphones" },
  { title: "Retos prácticos", icon: "target" },
  { title: "Guías de imagen personal", icon: "sparkles" },
  { title: "Instructivos visuales", icon: "image" },
  { title: "Ejercicios de autoconocimiento", icon: "compass" },
  { title: "Acompañamiento por módulos", icon: "heart" },
];

const testimonials = [
  {
    name: "Valentina R.",
    role: "Alumna de la academia",
    quote:
      "Entré buscando cambiar mi imagen y terminé sanando heridas que cargué por años. Hoy me miro distinto.",
    initials: "VR",
  },
  {
    name: "Daniela M.",
    role: "Alumna de la academia",
    quote:
      "El módulo de Raíces me removió por completo. Por primera vez entendí mi historia y pude soltarla con amor.",
    initials: "DM",
  },
  {
    name: "Carolina P.",
    role: "Alumna de la academia",
    quote:
      "Leidy acompaña desde el alma. Aprendí a perdonar, a quererme y, además, a vestirme y proyectarme con seguridad.",
    initials: "CP",
  },
];

const stats = { students: "+500", units: units.length, lessons: 0, rating: "4.9" };
stats.lessons = units.reduce((n, u) => n + u.lessons.length, 0);

module.exports = { units, problems, benefits, resources, testimonials, stats };
