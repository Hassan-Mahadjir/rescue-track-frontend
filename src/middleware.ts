import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getItem } from "./utils/storage";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Define public routes (wildcard pattern for signup steps)
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/signup/step-one",
    "/signup/step-two",
    "/signup/step-three",
    "/validation",
    "/google-redirect",
    "/microsoft-redirect",
    "/forgot-password",
    "/change-password",
  ];

  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/auth")
  ) {
    return NextResponse.next();
  }

  if (!token && !isPublicRoute) {
    console.log("🚫 Not authenticated, redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!token && isPublicRoute) {
    return NextResponse.next();
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|auth).*)"],
};
