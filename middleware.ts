import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  if (!req.nextUrl.pathname.startsWith("/dashboard")) {
    return res;
  }
  // Minimal protection using a first-party cookie set on login
  const aq = req.cookies.get("aq_logged_in")?.value;
  if (aq !== "1") {
    const loginUrl = new URL("/", req.url);
    loginUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
  return res;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
