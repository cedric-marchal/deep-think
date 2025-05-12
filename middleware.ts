import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip the pages that allow both authenticated and unauthenticated access
  if (pathname.includes("/reset-password")) {
    const hasToken = request.nextUrl.searchParams.has("token");

    // If no token in URL, redirect to forgot-password
    if (!hasToken) {
      return NextResponse.redirect(new URL("/forgot-password", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.includes("/verification-success")) {
    // 1. Check if user is authenticated
    const sessionCookie = getSessionCookie(request);

    // 2. Check if user has a verification token in the URL
    const hasVerificationToken = request.nextUrl.searchParams.has("token");

    // 3. If not authenticated or no token, redirect to sign-in
    if (!sessionCookie || !hasVerificationToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
