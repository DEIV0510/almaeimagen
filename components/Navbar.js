"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Close, ArrowRight } from "@/components/Icons";

const links = [
  { href: "/#modulos", label: "El programa" },
  { href: "/#leidy", label: "Leidy" },
  { href: "/#testimonios", label: "Testimonios" },
];

export default function Navbar({ user = null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-brand-100 bg-blush-50/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="container-x flex h-[68px] items-center justify-between">
        <Link href="/" className="flex flex-col leading-none" onClick={() => setOpen(false)}>
          <span className="font-script text-[28px] leading-none text-brand-800">Alma e Imagen</span>
          <span className="-mt-1 pl-1 font-sans text-[8.5px] font-semibold uppercase tracking-[0.42em] text-ink/70">
            The Academy
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-sans text-sm font-medium text-ink-soft transition-colors hover:text-brand-600"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <Link href="/dashboard" className="btn-primary text-xs">
              Mi curso <ArrowRight className="text-base" />
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="font-sans text-sm font-semibold text-ink transition-colors hover:text-brand-600"
              >
                Ingresar
              </Link>
              <Link href="/registro" className="btn-primary text-xs">
                Inscríbete <ArrowRight className="text-base" />
              </Link>
            </>
          )}
        </div>

        <button
          className="text-2xl text-ink lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-brand-100 bg-blush-50/95 backdrop-blur-md lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 font-sans text-sm font-medium text-ink-soft transition-colors hover:bg-brand-50 hover:text-brand-600"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-brand-100 pt-4">
              {user ? (
                <Link href="/dashboard" onClick={() => setOpen(false)} className="btn-primary">
                  Ir a mi curso <ArrowRight className="text-base" />
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setOpen(false)} className="btn-ghost">
                    Ingresar
                  </Link>
                  <Link href="/registro" onClick={() => setOpen(false)} className="btn-primary">
                    Inscríbete ahora <ArrowRight className="text-base" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
