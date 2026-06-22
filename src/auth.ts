import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const adminEmail = process.env.AUTH_ADMIN_EMAIL?.trim().toLowerCase();
const adminPassword = process.env.AUTH_ADMIN_PASSWORD;

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credenciales",
      credentials: {
        email: { label: "Correo", type: "email" },
        password: { label: "Clave", type: "password" },
      },
      authorize(credentials) {
        if (!adminEmail || !adminPassword) {
          return null;
        }

        const email =
          typeof credentials?.email === "string"
            ? credentials.email.trim().toLowerCase()
            : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";

        if (email !== adminEmail || password !== adminPassword) {
          return null;
        }

        return {
          id: email,
          email,
          name: "Administrador",
        };
      },
    }),
  ],
});
