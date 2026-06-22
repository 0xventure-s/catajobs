"use server";

import { signIn } from "@/auth";
import { ADMIN_LOGIN_PATH, normalizeAdminRedirect } from "@/lib/admin";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authenticate(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const from = normalizeAdminRedirect(
    typeof formData.get("from") === "string"
      ? (formData.get("from") as string)
      : null,
  );

  try {
    await signIn("credentials", {
      email: typeof email === "string" ? email : "",
      password: typeof password === "string" ? password : "",
      redirectTo: from,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(
        `${ADMIN_LOGIN_PATH}?error=credentials&from=${encodeURIComponent(from)}`,
      );
    }

    throw error;
  }
}
