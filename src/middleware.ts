import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ------ Protected route prefixes -------------------------------------------
// Any path starting with these segments requires an active session.

const PROTECTED_PREFIXES = ["/customer", "/provider", "/admin"];

// ------ Middleware ---------------------------------------------------------

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // Check for the lightweight session cookie set by tokenStorage.save()
  // This cookie is written client-side on login and cleared on logout.
  const hasSession = request.cookies.get("ps_has_session");

  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);
    // Preserve the original destination so we can redirect back after login
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// ------ Matcher ------------------------------------------------------------
// Only run middleware on the relevant protected route groups.
// Excludes static files, images, and Next.js internals automatically.

export const config = {
  matcher: ["/customer/:path*", "/provider/:path*", "/admin/:path*"],
};
