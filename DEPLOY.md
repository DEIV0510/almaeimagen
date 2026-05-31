# 🚀 Guía de despliegue — GitHub + Vercel

La app usa **PostgreSQL en la nube** (no SQLite) para que los registros y el progreso de las
alumnas **persistan** en producción. Sigue estos pasos una sola vez.

---

## 1) Crear la base de datos PostgreSQL (gratis)

Elige UNA opción:

### Opción A — Vercel Postgres (la más fácil)
1. En [vercel.com](https://vercel.com) → tu proyecto → pestaña **Storage** → **Create Database** → **Postgres**.
2. Cuando lo conectes al proyecto, Vercel añade las variables automáticamente. Copia el valor de
   **`POSTGRES_URL_NON_POOLING`** (esa es la conexión *directa*).

### Opción B — Neon (también gratis)
1. Crea una cuenta en [neon.tech](https://neon.tech) y un proyecto.
2. En **Connection Details**, copia la cadena de conexión. Desactiva "Pooled connection" para
   obtener la **directa** (sin `-pooler`).

> Guarda esa cadena: se ve así
> `postgresql://usuario:password@host/basededatos?sslmode=require`

---

## 2) Crear las tablas y cargar los módulos (una vez)

En tu PC, dentro de la carpeta del proyecto:

```powershell
# 1. Pega tu cadena de Postgres en el archivo .env (variable DATABASE_URL)
# 2. Instala y prepara la base de datos:
npm install
npm run db:push    # crea las tablas en la nube
npm run db:seed    # carga las 7 unidades y sus 54 clases
```

(Opcional) Para verla en local apuntando a esa base de datos: `npm run dev` → http://localhost:5195

---

## 3) Subir el código a GitHub

```powershell
git init
git add .
git commit -m "Alma e Imagen - The Academy"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

> Tu archivo `.env` **no se sube** (está en `.gitignore`). Los secretos se configuran en Vercel.

---

## 4) Desplegar en Vercel

1. En [vercel.com](https://vercel.com) → **Add New… → Project** → importa tu repo de GitHub.
2. En **Settings → Environment Variables**, añade:
   - `DATABASE_URL` = tu cadena de Postgres
   - `JWT_SECRET` = una clave larga y única (distinta a la de desarrollo)
3. Pulsa **Deploy**. ✨

Vercel detecta Next.js automáticamente (genera el cliente de Prisma en el build vía `postinstall`).

---

## 5) Actualizar el contenido más adelante

El contenido de los módulos vive en la base de datos. Si editas `lib/curriculum.js`:

```powershell
npm run db:seed    # con DATABASE_URL apuntando a la base de PRODUCCIÓN
```

Los cambios de **diseño/código** (colores, textos de la landing, etc.) se reflejan solo con hacer
`git push` (Vercel redespliega solo).

---

## Notas

- Usa la conexión **directa** (sin `-pooler`/`pgbouncer`) para `db:push` y `db:seed`.
- Para mucho tráfico, luego puedes poner la URL **"pooled"** como `DATABASE_URL` en Vercel.
- ¿Quieres dev local sin nube? Puedes cambiar temporalmente `provider = "sqlite"` y
  `DATABASE_URL="file:./dev.db"` en desarrollo, pero recuerda volver a `postgresql` para producir.
