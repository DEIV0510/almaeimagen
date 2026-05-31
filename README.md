# Alma e Imagen · The Academy — by Leidy Sepúlveda

Academia online de **sanación emocional, amor propio e imagen personal** para mujeres.
Incluye una **landing de ventas** premium + un **campus privado** con registro de alumnas y
**7 etapas de desbloqueo secuencial** (cada módulo se abre al completar el anterior).

Construida con **Next.js 14 + Prisma + SQLite + Tailwind CSS**. Sin dependencias nativas
(`bcryptjs` + `jose`), 100% funcional en Windows y lista para Vercel.

---

## 🚀 Cómo arrancar

> **Necesitas una base de datos PostgreSQL** (gratis en Neon o Vercel Postgres). Pega su URL en
> `.env` como `DATABASE_URL`. Guía completa en **[DEPLOY.md](DEPLOY.md)**.

```powershell
npm install        # solo la primera vez
npm run db:push    # crea la base de datos y las tablas (primera vez)
npm run db:seed    # carga las 7 unidades y sus clases (primera vez)
npm run dev        # levanta el servidor
```

Abre **http://localhost:5195**

> En Windows, si `npm` da error de permisos, usa `npm.cmd`.

### Cuenta de demo
- **Correo:** `demo@almaeimagen.com` · **Contraseña:** `academia123`

Para borrar todo y empezar de cero: `npm run db:reset`

---

## 🎓 El programa (7 etapas)

1. **Bienvenida** — introducción y método
2. **Módulo 0 · Mapa de Ruta** — sistema nervioso y autoconocimiento
3. **Módulo 1 · Raíces** — heridas de la infancia, niña interior
4. **Módulo 2 · Reconciliación** — perdón y gratitud
5. **Módulo 3 · Construcción del Ser** — amor propio e inteligencia emocional
6. **Módulo 4 · Mi Reflejo** — asesoría de imagen, colorimetría
7. **Módulo 5 · Proyección** — estilo, etiqueta y tu nueva versión

---

## 🎨 Cómo personalizar

| Qué cambiar | Archivo |
|---|---|
| **Módulos, frases ancla, objetivos y contenidos** | `lib/curriculum.js` (fuente única — la usan la landing y el seed). Tras editar, corre `npm run db:seed` |
| **Textos de la landing** (problema, solución, beneficios, recursos, testimonios) | `app/page.js` y `lib/curriculum.js` |
| **Colores de marca** (rosa fucsia, rosados suaves, magenta, negro) | `tailwind.config.js` |
| **Tipografías** (Cormorant Garamond, Montserrat, Sacramento) | `app/layout.js` |
| **Texto sobre Leidy** | `app/page.js`, sección `SOBRE LEIDY` |

### 📸 Fotos reales
El diseño usa composiciones de color como *placeholders* listos para reemplazar:
- **Hero** y **Sobre Leidy** en `app/page.js`. Sustituye el bloque por `<img src="/tu-foto.jpg" .../>`
  y guarda la imagen en `public/`.

### 🎬 Videos reales
Cada clase tiene un campo `videoUrl` en la base de datos (`prisma/seed.js`). Añade la URL y muestra
un `<video>`/`<iframe>` en el reproductor de `components/LessonList.js`.

---

## 🔒 Desbloqueo secuencial

- La **Bienvenida** siempre está disponible. Cada módulo se desbloquea al completar **todas** las
  clases del anterior.
- La regla se valida **en el servidor** (`lib/course.js` + `app/api/progress/route.js`): aunque
  alguien escriba la URL de un módulo bloqueado, será redirigida al campus.

---

## 🗂️ Estructura

```
app/
  page.js              Landing de ventas (pública)
  registro/ login/     Crear cuenta / iniciar sesión
  dashboard/           Campus privado (progreso + lista de módulos)
  curso/[slug]/        Página de cada módulo con sus clases
  api/auth/...         Registro, login y logout (JWT en cookie httpOnly)
  api/progress/        Marca clases como vistas (valida el desbloqueo)
components/            Navbar, Footer, AuthForm, LessonList, Icons, Reveal…
lib/                   prisma (DB) · auth (sesión) · course (desbloqueo) · curriculum (contenido)
prisma/                schema.prisma + seed.js
```

---

## 🛡️ Producción

- **Base de datos:** usa **PostgreSQL en la nube** (ya configurado en `schema.prisma`). Sigue
  **[DEPLOY.md](DEPLOY.md)** para crear la BD gratis, subir a GitHub y desplegar en Vercel.
- **`JWT_SECRET`** (`.env`): usa una clave larga y única (distinta en producción).
- **Pagos:** el botón de inscripción lleva al registro. Para cobrar se puede integrar Stripe o
  Mercado Pago (checkout antes de crear la cuenta).
- **Deploy:** listo para Vercel — ver **[DEPLOY.md](DEPLOY.md)**.
