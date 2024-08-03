import prisma from "@/lib/prisma";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { jobTypes } from "@/lib/jov-types";
import { Button } from "./ui/button";
import { jobFilterSchema, jobFilterValue } from "@/lib/validation";
import { redirect } from "next/navigation";
import FormSubmitBtn from "./FormSubmitBtn";

async function filterJobs(formData: FormData) {
  "use server";
  
  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);

  const serParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/?${serParams.toString()}`)
}

type JobFilterProps = {
    defaultValue: jobFilterValue,
}
 
export default async function JobFilter({defaultValue}: JobFilterProps) {
  const distinctLocation = (await prisma.job
    .findMany({
      where: { approved: true },
      select: { location: true },
      distinct: ["location"],
    })
    .then((location) =>
      location.map(({ location }) => location).filter(Boolean),
    )) as string[];

  return (
    <div className="md:w-[260px] md:sticky p-4 top-0 bg-background border rounded-lg h-fit">
      <details className="md:hidden mb-4">
        <summary className="cursor-pointer text-center py-2 bg-blue-500 text-white rounded">
          Abrir filtros
        </summary>
        <div className="mt-4">
          <FilterForm defaultValue={defaultValue} distinctLocation={distinctLocation} />
        </div>
      </details>
      <div className="hidden md:block">
        <FilterForm defaultValue={defaultValue} distinctLocation={distinctLocation} />
      </div>
    </div>
  );
}

function FilterForm({ defaultValue, distinctLocation }: { defaultValue: jobFilterValue, distinctLocation: string[] }) {
  return (
    <form action={filterJobs}>
      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="q">Buscar</Label>
          <Input id="q" name="q" placeholder="Titulo, empresa, etc" defaultValue={defaultValue.q || ""} />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="type">Tipo</Label>
          <Select id="type" name="type" defaultValue={defaultValue.type || ""}>
            <option value="">Todos los tipos</option>
            {jobTypes.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="location">Ubicacion</Label>
          <Select id="location" name="location" defaultValue={defaultValue.location || ""}>
            <option value="">Toda Catamarca</option>
            {distinctLocation.map((location) => (
              <option value={location} key={location}>
                {location}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <FormSubmitBtn className="w-full bg-blue-500 hover:bg-blue-900">
            Filtrar
          </FormSubmitBtn>
          <p className="text-center text-xs text-gray-500 mt-2">Toca para actualizar</p>
        </div>
      </div>
    </form>
  );
}