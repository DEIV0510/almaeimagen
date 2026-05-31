import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default function AppHeader({ name }) {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-blush-50/85 backdrop-blur-md">
      <div className="container-x flex h-[64px] items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-script text-[26px] leading-none text-brand-800">Alma e Imagen</span>
          <span className="-mt-1 pl-0.5 font-sans text-[8px] font-semibold uppercase tracking-[0.4em] text-ink/70">
            The Academy
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/dashboard"
            className="hidden font-sans text-sm font-medium text-ink-soft transition-colors hover:text-brand-600 sm:block"
          >
            Mi curso
          </Link>
          {name && (
            <span className="hidden text-sm text-ink-muted md:block">
              Hola, <span className="font-semibold text-ink">{name}</span>
            </span>
          )}
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
