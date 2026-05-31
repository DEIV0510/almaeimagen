import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Por favor completa todos los campos." },
        { status: 400 }
      );
    }
    if (String(password).length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres." },
        { status: 400 }
      );
    }

    const normEmail = String(email).trim().toLowerCase();
    const exists = await prisma.user.findUnique({ where: { email: normEmail } });
    if (exists) {
      return NextResponse.json(
        { error: "Ya existe una cuenta con este correo. Inicia sesión." },
        { status: 409 }
      );
    }

    const hash = await bcrypt.hash(String(password), 10);
    const user = await prisma.user.create({
      data: { name: String(name).trim(), email: normEmail, password: hash },
    });

    const token = await createToken({
      uid: user.id,
      name: user.name,
      email: user.email,
    });

    const res = NextResponse.json({
      ok: true,
      user: { id: user.id, name: user.name, email: user.email },
    });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (e) {
    console.error("register error", e);
    return NextResponse.json(
      { error: "Error del servidor. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
