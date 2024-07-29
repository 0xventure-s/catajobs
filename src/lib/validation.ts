import { z } from "zod";
import { jobTypes, locationTypes } from "./jov-types";

const requieredString = z.string().min(1, "Requerido");

const numericRequieredString = requieredString.regex(
  /^\d$/,
  "Pone un numero hijo de pu",
);

const companyLogoSchema = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    " Subi alguna imagen si o si",
  )
  .refine((file) => {
    return !file || file.size < 1024 * 1024 * 2;
  }, "La imagen es muy grande. Debe ser menor a 2MB");

const aplicationShema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).email().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Un Email o un Numero es necesario",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requieredString.refine(
      (value) => locationTypes.includes(value),

      "Ubicacion Erronea o no disponible",
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remoto" || data.location,
    {
      message: "La ubicacion es necesaria para los trabajos presenciales",
      path: ["location"],
    },
  );

export const createJobsSchema = z
  .object({
    tittle: requieredString.max(100),
    type: requieredString.refine(
      (value) => jobTypes.includes(value),
      "Tipo de trabajo invalido",
    ),
    companyName: requieredString.max(100),
    companyLogo: companyLogoSchema,
    description: z.string().max(5000).optional(),
    salary: numericRequieredString.max(9, "No mientas").optional(),
  })
  .and(aplicationShema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobsSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type jobFilterValue = z.infer<typeof jobFilterSchema>;
#