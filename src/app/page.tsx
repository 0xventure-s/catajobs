import AdvertisingBanner from "@/components/AdvertisingBanner";
import JobFilter from "@/components/JobFilter";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { jobFilterValue } from "@/lib/validation";
import { ArrowRight, BookOpen } from "lucide-react";
import { Metadata } from "next";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";

type PageProps = {
  searchParams?: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
};

function getTitle({ q, type, location, remote }: jobFilterValue) {
  let titleParts = [];

  if (q) {
    titleParts.push(`${q} empleos`);
  } else if (type) {
    titleParts.push(`Empleos de ${type} `);
  } else if (remote) {
    titleParts.push("Empleos remotos");
  } else {
    titleParts.push("Empleos");
  }

  if (location) {
    titleParts.push(`en ${location}`);
  } else if (!remote && !q && !type) {
    titleParts.push("en Catamarca");
  }

  return titleParts.join(" ");
}

function getCurrentDate() {
  return format(new Date(), "d 'de' MMMM, yyyy", { locale: es });
}

export default async function Home({ searchParams = {} }: PageProps) {
  const { q, type, location, remote, page } = searchParams;

  const filterValues: jobFilterValue = {
    q: q || undefined,
    type: type || undefined,
    location: location || undefined,
    remote: remote === "true",
  };

  return (
    <main className="m-auto max-w-5xl space-y-10 px-3 py-10">
      <div className="space-y-5 text-center">
        <H1>{getTitle(filterValues)}</H1>
        <p className="text-muted-foreground">
          Los mejores empleos de Catamarca City
        </p>
        <div className="flex justify-center items-center space-x-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <p className="text-sm text-green-600 font-medium">
            Actualizado al {getCurrentDate()}
          </p>
        </div>
      </div>
      <AdvertisingBanner variant="hero" />
      <section className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border border-emerald-200 bg-emerald-50 text-emerald-700">
              <BookOpen className="h-5 w-5" />
            </span>
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Formarme
              </p>
              <h2 className="text-2xl font-black tracking-tight text-zinc-950">
                Aprende algo útil antes de postularte.
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-zinc-600">
                20 cursos gratuitos de YouTube en IA, diseño, datos,
                programación y empleabilidad.
              </p>
            </div>
          </div>
          <Link
            href="/formarme"
            className="inline-flex items-center justify-center rounded-md bg-zinc-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Ver cursos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
      <section className="flex flex-col gap-5 md:flex-row">
        <JobFilter defaultValue={filterValues} />
        <JobResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
      </section>
      <AdvertisingBanner variant="inline" />
    </main>
  );
}
