import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-secret-change-me"
);

export async function middleware(req) {
  const token = req.cookies.get("aei_token")?.value;
  let valid = false;
  if (token) {
    try {
      await jwtVerify(token, secret);
      valid = true;
    } catch {
      valid = false;
    }
  }

  if (!valid) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/curso/:path*"],
};
