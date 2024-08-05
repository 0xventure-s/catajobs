import JobFilter from "@/components/JobFilter";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { jobFilterValue } from "@/lib/validation";
import { Metadata } from "next";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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
  const { q, type, location, remote,page } = searchParams;

  const filterValues: jobFilterValue = {
    q: q || undefined,
    type: type || undefined,
    location: location || undefined,
    remote: remote === "true",
  };

  return (
    <main className="max-w-5xl m-auto px-3 py-10 space-y-10">
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
      <section className="flex flex-col md:flex-row gap-5">
        <JobFilter defaultValue={filterValues} />
        <JobResults filterValues={filterValues} page={page ? parseInt(page) : undefined} />
      </section>
    </main>
  );
}