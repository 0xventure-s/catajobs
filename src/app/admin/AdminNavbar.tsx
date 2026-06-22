import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AdminNavbarProps {
  email?: string | null;
}

export default function AdminNavbar({ email }: AdminNavbarProps) {
  return (
    <div className="px-3">
      <div className="m-auto flex max-w-5xl items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <div className="space-y-1">
          <Link
            href="/admin"
            className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700"
          >
            Panel interno
          </Link>
          <p className="text-sm text-slate-600">{email}</p>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button variant="outline" className="border-slate-300">
            Cerrar sesión
          </Button>
        </form>
      </div>
    </div>
  );
}
