import { HeartIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-5xl space-y-5 px-3 py-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Cata Jobs</h3>
            <p className="text-sm text-muted-foreground">
              Empleos, CV y formación para crecer en Catamarca.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href="/formarme" className="hover:underline">
              Formarme
            </Link>
            <Link href="/publicidad" className="hover:underline">
              Publicidad
            </Link>
            <Link
              href="https://wa.me/543834293512"
              className="hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contacto
            </Link>
            <Link href="/terms" className="hover:underline">
              Términos y condiciones
            </Link>
            <Link href="/privacy" className="hover:underline">
              Política de privacidad
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-1 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Cata Jobs. Hecho con
          <HeartIcon className="h-4 text-red-600" />
        </div>
      </div>
    </footer>
  );
}
