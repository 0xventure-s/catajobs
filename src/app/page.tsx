import JobFilter from "@/components/JobFilter";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { jobFilterValue } from "@/lib/validation";
import { Metadata } from "next";

type PageProps = {
  searchParams?: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
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

export default async function Home({ searchParams = {} }: PageProps) {
  const { q, type, location, remote } = searchParams;

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
      </div>
      <section className="flex flex-col md:flex-row gap-5">
        <JobFilter defaultValue={filterValues} />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}
