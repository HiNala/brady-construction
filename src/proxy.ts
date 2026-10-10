import { NextResponse, type NextRequest } from "next/server";

const VID = "bc_vid";
const SID = "bc_sid";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin guard: require session cookie for /admin (except login) and /api/admin
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (pathname === "/admin/login" || pathname === "/api/admin/login") {
      return NextResponse.next();
    }
    const token = request.cookies.get("bc_admin")?.value;
    if (!token || !isValidShape(token)) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.search = `?next=${encodeURIComponent(pathname)}`;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Visitor/session cookies for analytics
  const res = NextResponse.next();
  if (!request.cookies.get(VID)) {
    res.cookies.set(VID, crypto.randomUUID(), {
      maxAge: 60 * 60 * 24 * 365 * 2,
      sameSite: "lax",
      path: "/",
    });
  }
  if (!request.cookies.get(SID)) {
    res.cookies.set(SID, crypto.randomUUID(), {
      maxAge: 60 * 60 * 4, // 4h sliding session
      sameSite: "lax",
      path: "/",
    });
  }
  return res;
}

// Lightweight shape check only — full HMAC verify happens server-side in handlers
function isValidShape(token: string): boolean {
  const parts = token.split(".");
  return parts.length === 3 && parts[0] === "admin" && Number(parts[1]) > Date.now();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|images/|robots.txt|sitemap.xml|llms.txt|feed.xml|api/track).*)",
  ],
};
