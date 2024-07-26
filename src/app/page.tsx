import JobFilter from "@/components/JobFilter";
import JobResults from "@/components/JobResults";
import H1 from "@/components/ui/h1";
import { jobFilterValue } from "@/lib/validation";

type PageProps = {
  searchParams?: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
  };
};

export default async function Home({
  searchParams = {},
}: PageProps) {
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
        <H1>Empleos en Catamarca</H1>
        <p className="text-muted-foreground">
          Los mejores empleos de Catamarca City
        </p>
      </div>
      <section className="flex flex-col md:flex-row gap-5">
        <JobFilter />
        <JobResults filterValues={filterValues} />
      </section>
    </main>
  );
}