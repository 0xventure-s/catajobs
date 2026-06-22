import { auth } from "@/auth";
import {
  ADMIN_LOGIN_PATH,
  isAdminEmail,
  normalizeAdminRedirect,
} from "@/lib/admin";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuthenticatedAdmin = isAdminEmail(req.auth?.user?.email);
  const isLoginRoute = req.nextUrl.pathname === ADMIN_LOGIN_PATH;

  if (isLoginRoute && isAuthenticatedAdmin) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  if (!isLoginRoute && !isAuthenticatedAdmin) {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, req.nextUrl);
    loginUrl.searchParams.set(
      "from",
      normalizeAdminRedirect(req.nextUrl.pathname + req.nextUrl.search),
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
