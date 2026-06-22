"use client";

import PageFeedback from "@/components/PageFeedback";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RotateCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function getErrorContent(error: Error) {
  const message = error.message.toLowerCase();
  const isDatabaseIssue =
    message.includes("prisma") ||
    message.includes("database_url") ||
    message.includes("postgres_prisma_url") ||
    message.includes("postgres_url_non_pooling");

  if (isDatabaseIssue) {
    return {
      badge: "Interrupción temporal",
      title: "Los empleos no están disponibles ahora",
      description:
        "Estamos restableciendo la información. Volvé a intentar dentro de unos minutos.",
      supportText:
        "Si estabas revisando una vacante, podés volver al inicio y probar otra vez más tarde.",
    };
  }

  return {
    badge: "Algo se interrumpió",
    title: "No pudimos completar la carga",
    description:
      "La página no terminó de abrirse como esperabas. Probá de nuevo o seguí desde el inicio.",
    supportText: "Si vuelve a pasar, intentá otra vez en unos minutos.",
  };
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const content = getErrorContent(error);

  return (
    <PageFeedback
      badge={content.badge}
      title={content.title}
      description={content.description}
      supportText={content.supportText}
      icon={<AlertTriangle className="h-7 w-7" />}
      actions={
        <>
          <Button
            size="lg"
            onClick={() => reset()}
            className="w-full bg-sky-600 hover:bg-sky-700 sm:w-auto"
          >
            <RotateCw className="mr-2 h-4 w-4" />
            Intentar de nuevo
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full border-slate-300 sm:w-auto"
          >
            <Link href="/">Volver al inicio</Link>
          </Button>
        </>
      }
    />
  );
}
