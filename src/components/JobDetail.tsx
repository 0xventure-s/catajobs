import { relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client"
import { Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image"
import Link from "next/link";
import Markdown from "./Markdown";

export type JobPageProps = {
    job:Job;
}

export default function JobDetail({job:{
    title,
    location,
    description,
    companyName,
    applicationUrl,
    applicationEmail,
    type,
    locationType,
    salary,
    companyLogoUrl,
    createdAt
}}:JobPageProps) {
  return (
    <section className="w-full grow space-y-5"> 
    <div className="flex items-center gap-3">
        {companyLogoUrl && (
            <Image
            src={companyLogoUrl}
            alt="Logo de la empresa"
            width={100}
            height={100}
            className="rounded-xl"
            />
        )}

        <div>

          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p className="font-semibold">
  {applicationUrl ? (
    <a href={applicationUrl} target="_blank" rel="noopener noreferrer">
      {companyName}
    </a>
  ) : (
    <span>{companyName}</span>
  )}
</p>
          </div>

            <div className="text-muted-foreground">

            <p className="flex items-center gap-1.5 ">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5 ">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>

          <p className="flex items-center gap-1.5 ">
            <Globe2 size={16} className="shrink-0" />
            {location || "Catamarca"}
          </p>
          <p className="flex items-center gap-1.5">
            <Clock size={16} className="shrink-0" />
            {relativeDate(createdAt)}
          </p>

            </div>



        </div>

        <div>
        
        </div>

    </div>
    <div>
    {description && <Markdown>{description}</Markdown>}
    </div>
    
    </section>
  )
}
