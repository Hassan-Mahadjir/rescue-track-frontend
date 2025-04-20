import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Define your public routes
  const publicRoutes = [
    "/login",
    "/signup",
    "signup/step-one",
    "/signup/step-two",
    "singup/step-three",
    "/signup/validation",
  ];

  const isPublicRoute = publicRoutes.some((path) => pathname.startsWith(path));

  // ✅ Skip middleware for API routes and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/auth") // If you use `/auth/*` for backend auth routes
  ) {
    return NextResponse.next();
  }

  // 🚫 If user is NOT authenticated and tries to access a protected route
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 🚫 If user IS authenticated and tries to access a public route
  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Match everything but exclude these folders explicitly
export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|auth).*)"],
};
