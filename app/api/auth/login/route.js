import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { createToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Ingresa tu correo y contraseña." },
        { status: 400 }
      );
    }

    const normEmail = String(email).trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: normEmail } });
    if (!user) {
      return NextResponse.json(
        { error: "Correo o contraseña incorrectos." },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(String(password), user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Correo o contraseña incorrectos." },
        { status: 401 }
      );
    }

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
    console.error("login error", e);
    return NextResponse.json(
      { error: "Error del servidor. Intenta de nuevo." },
      { status: 500 }
    );
  }
}
