import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.includes("/sign-in") ||
    pathname.includes("/sign-up") ||
    pathname.includes("/forgot-password")
  ) {
    const sessionCookie = getSessionCookie(request);

    if (sessionCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.includes("/dashboard") || pathname.includes("/admin")) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      const url = new URL("/sign-in", request.url);
      return NextResponse.redirect(url);
    }

    if (pathname.includes("/admin")) {
      const response = await fetch(
        `${request.nextUrl.origin}/api/auth/check-admin`,
        {
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        },
      );

      if (!response.ok) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
