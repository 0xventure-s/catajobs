import prisma from "@/lib/prisma";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import { jobTypes } from "@/lib/jov-types";
import { Button } from "./ui/button";
import { log } from "console";

async function filterJobs(formData: FormData) {
  "use server";

  console.log(formData.get("q") as String)
}

export default async function JobFilter() {
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
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q"> Buscar</Label>
            <Input id="q" name="q" placeholder="Titulo,empresa,etc" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Tipo</Label>
            <Select id="type" name="type" defaultValue="">
              {" "}
              <option value="">Todos los tipos</option>{" "}
              {jobTypes.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location"> Ubicacion</Label>
            <Select id="location" name="location" defaultValue="">
              <option value="">Toda Catamarca</option>
              {distinctLocation.map((location) => (
                <option value={location} key={location}>
                  {location}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
              <input id="remote" name="remote" type="checkbox" className="scale-125 accent-blue-500" />
              <Label>Trabajos Remotos</Label>
          </div>
          <Button type="submit" className="w-full bg-blue-500" > Filtrar</Button>
        </div>
      </form>
    </div>
  );
}
