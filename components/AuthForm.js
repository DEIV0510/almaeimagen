"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, User, Eye, EyeOff, ArrowRight } from "@/components/Icons";

export default function AuthForm({ mode = "login", nextPath = "/dashboard" }) {
  const router = useRouter();
  const isRegister = mode === "register";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/${isRegister ? "register" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Algo salió mal. Intenta de nuevo.");
        setLoading(false);
        return;
      }
      router.push(nextPath || "/dashboard");
      router.refresh();
    } catch {
      setError("No pudimos conectar. Revisa tu conexión.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {isRegister && (
        <Field label="Nombre completo">
          <div className="input-wrap">
            <User className="input-icon" />
            <input
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Tu nombre"
              className="input"
            />
          </div>
        </Field>
      )}

      <Field label="Correo electrónico">
        <div className="input-wrap">
          <Mail className="input-icon" />
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            className="input"
          />
        </div>
      </Field>

      <Field label="Contraseña">
        <div className="input-wrap">
          <input
            type={show ? "text" : "password"}
            required
            minLength={6}
            autoComplete={isRegister ? "new-password" : "current-password"}
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            placeholder={isRegister ? "Mínimo 6 caracteres" : "Tu contraseña"}
            className="input !pl-4 !pr-11"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-ink-muted transition-colors hover:text-brand-600"
            aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {show ? <EyeOff /> : <Eye />}
          </button>
        </div>
      </Field>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700"
        >
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full !py-4 disabled:opacity-60">
        {loading
          ? "Un momento…"
          : isRegister
          ? "Crear mi cuenta"
          : "Entrar a mi curso"}
        {!loading && <ArrowRight className="text-base" />}
      </button>

      <p className="text-center text-sm text-ink-soft">
        {isRegister ? (
          <>
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="font-semibold text-brand-600 hover:underline">
              Inicia sesión
            </Link>
          </>
        ) : (
          <>
            ¿Aún no tienes cuenta?{" "}
            <Link href="/registro" className="font-semibold text-brand-600 hover:underline">
              Regístrate gratis
            </Link>
          </>
        )}
      </p>

      <style jsx>{`
        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }
        :global(.input-icon) {
          position: absolute;
          left: 0.9rem;
          font-size: 1.15rem;
          color: #d6207e;
          opacity: 0.8;
        }
        .input {
          width: 100%;
          border-radius: 0.9rem;
          border: 1px solid #fdd7e9;
          background: #fff;
          padding: 0.85rem 1rem 0.85rem 2.7rem;
          font-size: 0.95rem;
          color: #2a1622;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input::placeholder {
          color: #c2a3b4;
        }
        .input:focus {
          outline: none;
          border-color: #ed2a8c;
          box-shadow: 0 0 0 4px rgba(237, 42, 140, 0.15);
        }
      `}</style>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block font-sans text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">
        {label}
      </span>
      {children}
    </label>
  );
}
