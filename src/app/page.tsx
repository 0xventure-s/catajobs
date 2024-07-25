import JobFilter from "@/components/JobFilter";
import JobList from "@/components/JobList";
import prisma from "@/lib/prisma";
import Image from "next/image";

export default async function Home() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
  });
  return (
    <main className="max-w-5xl m-auto px-3 py-10 space-y-10">
      <div className="space-y-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Empleos en Catamarca
        </h1>
        <p className="text-muted-foreground"> Los mejores empleos de Catamarca City</p>
      </div>
      <section className="flex flex-col md:flex-row  ">
        <JobFilter/>
        <div className=" grow space-y-4">
          {jobs.map((job) => (
            <JobList job={job} key={job.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
