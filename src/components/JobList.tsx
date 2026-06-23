import { Job } from "@prisma/client";
import Image from "next/image";
import companyLogoPlaceHolder from "@/assets/company-logo-placeholder.png";
import { Briefcase, Clock, Eye, Globe2, MapPin } from "lucide-react";
import { getFallbackJobViews } from "@/lib/job-views";
import { relativeDate } from "@/lib/utils";
import Badge from "./Badge";

export type JobListProp = {
  job: Job & {
    views?: number | null;
  };
};

function formatViews(count: number) {
  return count === 1 ? "1 vista" : `${count} vistas`;
}

export default function JobList({
  job: {
    slug,
    title,
    companyName,
    type,
    locationType,
    location: JobLocation,
    companyLogoUrl,
    views,
    createdAt,
  },
}: JobListProp) {
  const viewLabel = formatViews(views ?? getFallbackJobViews(slug));

  return (
    <article className="flex gap-4 rounded-lg border p-5 transition-colors hover:bg-muted/60">
      <Image
        src={companyLogoUrl || companyLogoPlaceHolder}
        alt={`${companyName} logo`}
        width={100}
        height={100}
        className="rounded-lg self-center"
      />

      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5 ">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>

          <p className="flex items-center gap-1.5 ">
            <Globe2 size={16} className="shrink-0" />
            {JobLocation || "Catamarca"}
          </p>

          <p className="flex items-center gap-1.5 sm:hidden ">
            <Clock size={16} className="shrink-0" />
            {relativeDate(createdAt)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Eye size={16} className="shrink-0" />
            {viewLabel}
          </p>
        </div>
      </div>

      <div className="hidden shrink-0 flex-col items-end justify-between gap-4 sm:flex">
        <Badge>{type}</Badge>
        <div className="space-y-1 text-sm text-muted-foreground">
          <span className="flex items-center justify-end gap-1.5">
            <Eye size={16} />
            {viewLabel}
          </span>
          <span className="flex items-center justify-end gap-1.5">
            <Clock size={16} />
            {relativeDate(createdAt)}
          </span>
        </div>
      </div>
    </article>
  );
}
