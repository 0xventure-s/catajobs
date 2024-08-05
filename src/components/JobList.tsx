import { Job } from "@prisma/client";
import Image from "next/image";
import companyLogoPlaceHolder from "@/assets/company-logo-placeholder.png";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { relativeDate } from "@/lib/utils";
import Badge from "./Badge";

export type JobListProp = {
  job: Job;
};
export default function JobList({
  job: {
    title,
    companyName,
    type,
    locationType,
    location : JobLocation,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobListProp) {
  return (
    <article className="flex gap-4 border rounded-lg p-5 hover:bg-muted/60">
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
        </div>
      </div>

      <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
        <Badge>{type}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} />
          {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
}
