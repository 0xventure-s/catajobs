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
            Conectándote con los mejores empleos de Catamarca.
            </p>
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-muted-foreground">
            <Link href="/about" className="hover:underline">
              
            </Link>
            <Link href="https://wa.me/+543834293512" legacyBehavior>
  <a className="hover:underline" target="_blank" rel="noopener noreferrer">
    Contacto
  </a>
</Link>
            <Link href="/terms" className="hover:underline">
              Terminos y Condiciones
            </Link>
            <Link href="/privacy" className="hover:underline">
              Politica de privacidad
            </Link>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground flex items-center">
          © {new Date().getFullYear()} Hecho con <div><HeartIcon className="h-4 text-red-600"/></div>
        </div>
      </div>
    </footer>
  );
}