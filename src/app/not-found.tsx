import PageFeedback from "@/components/PageFeedback";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <PageFeedback
      badge="Página no disponible"
      title="Ese enlace ya no está activo"
      description="Revisá la dirección o seguí explorando las búsquedas publicadas en Catamarca."
      supportText="A veces un aviso cambia de ubicación o deja de estar visible."
      icon={<SearchX className="h-7 w-7" />}
      actions={
        <Button
          asChild
          size="lg"
          className="w-full bg-sky-600 hover:bg-sky-700 sm:w-auto"
        >
          <Link href="/">Ver empleos</Link>
        </Button>
      }
    />
  );
}
