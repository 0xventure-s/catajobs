import JobDetails from "@/components/JobDetail";
import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return job;
});



export async function generateStaticParams() {
  const jobs = await prisma.job.findMany({
    where: { approved: true },
    select: { slug: true },
  });

  return jobs.map(({ slug }) => slug);
}

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;

  return (
    <main className="m-auto my-10 max-w-5xl px-3">
      {/* Nueva sección de información de aplicación */}
      <section className="mb-10 bg-blue-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">¿Cómo aplicar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-700">Numero de Telefono</h3>
            {applicationUrl ? (
              <a href={applicationUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                {applicationUrl}
              </a>
            ) : (
              <p className="text-gray-600 italic">No provisto</p>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-700">Ubicación o email</h3>
            {applicationEmail ? (
              <a href={`mailto:${applicationEmail}`} className="text-blue-600 hover:underline break-all">
                {applicationEmail}
              </a>
            ) : (
              <p className="text-gray-600 italic">No provisto</p>
            )}
          </div>
        </div>
      </section>

      {/* Contenido existente */}
      <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
        <JobDetails job={job} />
      </div>
    </main>
  );
}