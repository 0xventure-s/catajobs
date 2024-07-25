import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";

async function filterJobs(formData: FormData) {
  "use server";
}

export default function JobFilter() {
  return (
    <div className="md:w-[260px] md:sticky p-4 top-0 bg-background border rounded-lg h-fit">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q"> Buscar</Label>
            <Input id="q" name="q" placeholder="Titulo,empresa,etc" />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location"> Ubicacion</Label>
            <Select  id="location" name="location"></Select>
          </div>
        </div>
      </form>
    </div>
  );
}
