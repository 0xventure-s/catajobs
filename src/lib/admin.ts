import { auth } from "@/auth";
import type { Session } from "next-auth";
import { redirect } from "next/navigation";

export const ADMIN_LOGIN_PATH = "/login";

export function normalizeAdminRedirect(path?: string | null) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) {
    return "/admin";
  }

  if (path.startsWith(ADMIN_LOGIN_PATH)) {
    return "/admin";
  }

  return path;
}

export function isAdminEmail(email?: string | null) {
  const adminEmail = process.env.AUTH_ADMIN_EMAIL?.trim().toLowerCase();

  if (!adminEmail || !email) {
    return false;
  }

  return email.trim().toLowerCase() === adminEmail;
}

export function isAdminSession(session: Session | null) {
  return isAdminEmail(session?.user?.email);
}

export async function requireAdminSession() {
  const session = await auth();

  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    redirect(ADMIN_LOGIN_PATH);
  }

  return session;
}
