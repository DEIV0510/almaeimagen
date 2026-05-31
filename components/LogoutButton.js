"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton({ className = "" }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      disabled={loading}
      className={`font-sans text-sm font-medium text-ink-soft transition-colors hover:text-brand-600 disabled:opacity-50 ${className}`}
    >
      {loading ? "Saliendo…" : "Cerrar sesión"}
    </button>
  );
}
