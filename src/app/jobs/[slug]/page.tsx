import JobDetails from "@/components/JobDetail";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

const getJob = cache(async (slug: string) => {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return job;
});

async function getJobAndTrackView(slug: string) {
  try {
    return await prisma.job.update({
      where: { slug },
      data: {
        views: {
          increment: 1,
        },
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      notFound();
    }

    throw error;
  }
}

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
  const job = await getJobAndTrackView(slug);

  const { applicationEmail, applicationUrl } = job;

  return (
    <main className="m-auto my-10 max-w-5xl px-3">
      <section className="mb-10 rounded-lg bg-blue-50 p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-blue-800">
          ¿Cómo aplicar?
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-blue-700">
              Teléfono
            </h3>
            {applicationUrl ? (
              <a
                href={applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-600 hover:underline"
              >
                {applicationUrl}
              </a>
            ) : (
              <p className="text-gray-600 italic">No provisto</p>
            )}
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-blue-700">
              Ubicación o email
            </h3>
            {applicationEmail ? (
              <a
                href={`mailto:${applicationEmail}`}
                className="break-all text-blue-600 hover:underline"
              >
                {applicationEmail}
              </a>
            ) : (
              <p className="text-gray-600 italic">No provisto</p>
            )}
          </div>
        </div>
      </section>

      <div className="flex flex-col items-center gap-5 md:flex-row md:items-start">
        <JobDetails job={job} />
      </div>
    </main>
  );
}
