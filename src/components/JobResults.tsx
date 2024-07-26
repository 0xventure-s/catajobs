import React from "react";
import JobList from "./JobList";
import prisma from "@/lib/prisma";
import { jobFilterValue } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import { se } from "date-fns/locale";

type JobResultProps = {
  filterValues: jobFilterValue;
};

export default async function JobResults({
  filterValues: { q, type, location, remote },
}: JobResultProps) {
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          { title: { search: searchString } },
          { companyName: { search: searchString } },
          { type: { search: searchString } },
          { location: { search: searchString } },
          { locationType: { search: searchString } },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remoto" } : {},
      { approved: true },
    ],
  };

  const jobs = await prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className=" grow space-y-4">
      {jobs.map((job) => (
        <JobList job={job} key={job.id} />
      ))}

      {jobs.length === 0 && (
        <p className="m-auto text-center">No se encontraron trabajos.Borra el filtro</p>
      )}
    </div>
  );
}
