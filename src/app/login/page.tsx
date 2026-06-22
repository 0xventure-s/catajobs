import { auth } from "@/auth";
import { authenticate } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isAdminSession, normalizeAdminRedirect } from "@/lib/admin";
import { LockKeyhole } from "lucide-react";
import { redirect } from "next/navigation";

interface LoginPageProps {
  searchParams?: {
    error?: string;
    from?: string;
  };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await auth();

  if (isAdminSession(session)) {
    redirect("/admin");
  }

  const from = normalizeAdminRedirect(searchParams?.from);
  const hasError = searchParams?.error === "credentials";

  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-sky-50 via-white to-white" />
      <div className="absolute left-1/2 top-16 h-40 w-40 -translate-x-[170%] rounded-full bg-sky-100 blur-3xl" />
      <div className="absolute right-1/2 top-24 h-48 w-48 translate-x-[180%] rounded-full bg-blue-100 blur-3xl" />

      <section className="relative mx-auto flex min-h-[72vh] max-w-5xl items-center px-3 py-14">
        <div className="mx-auto w-full max-w-md rounded-[28px] border border-slate-200/80 bg-white/95 p-7 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-700 shadow-inner shadow-sky-100">
              <LockKeyhole className="h-7 w-7" />
            </div>
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                Acceso administrativo
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
                Revisá y moderá publicaciones
              </h1>
              <p className="text-sm leading-6 text-slate-600">
                Ingresá con las credenciales del panel para aprobar, revisar o
                eliminar avisos.
              </p>
            </div>
          </div>

          <form action={authenticate} className="space-y-4">
            <input type="hidden" name="from" value={from} />

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Correo
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="admin@catajobs.local"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Clave
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Ingresá tu clave"
                required
              />
            </div>

            {hasError ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                Los datos no coinciden. Revisalos e intentá otra vez.
              </p>
            ) : null}

            <Button
              type="submit"
              className="w-full bg-sky-600 hover:bg-sky-700"
            >
              Entrar al panel
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
