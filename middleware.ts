import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "go-money-session";

export function middleware(request: NextRequest) {
  const hasSession = request.cookies.has(SESSION_COOKIE);
  const { pathname } = request.nextUrl;

  // There's no standalone "/" page anymore — it always resolves to either
  // the dashboard or the login screen, so decide immediately based on
  // session rather than rendering an empty root route.
  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(hasSession ? "/dashboard" : "/login", request.url),
    );
  }

  if (!hasSession && pathname.startsWith("/dashboard")) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // An already-authenticated user hitting the auth pages should land back
  // in the dashboard instead of seeing a login form for a session they
  // already have.
  if (hasSession && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/signup"],
};
