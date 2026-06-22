import { z } from "zod";

const requiredMessage = "Completá este dato";

const optionalText = (max: number, message = `Máximo ${max} caracteres`) =>
  z.string().trim().max(max, message).optional().or(z.literal(""));

const optionalEmail = optionalText(120).refine(
  (value) => !value || z.string().email().safeParse(value).success,
  "Ingresá un email válido",
);

const optionalLink = optionalText(160).refine(
  (value) =>
    !value ||
    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=%]*)?$/i.test(
      value,
    ),
  "Ingresá un enlace válido",
);

const highlightSchema = z.object({
  id: z.string(),
  text: optionalText(180, "Máximo 180 caracteres por logro"),
});

const experienceSchema = z.object({
  id: z.string(),
  role: optionalText(90),
  company: optionalText(90),
  location: optionalText(70),
  startDate: optionalText(30),
  endDate: optionalText(30),
  current: z.boolean().optional(),
  highlights: z.array(highlightSchema).max(5).default([]),
});

const educationSchema = z.object({
  id: z.string(),
  degree: optionalText(100),
  institution: optionalText(100),
  location: optionalText(70),
  startDate: optionalText(30),
  endDate: optionalText(30),
  details: optionalText(220),
});

const certificationSchema = z.object({
  id: z.string(),
  name: optionalText(100),
  issuer: optionalText(90),
  year: optionalText(30),
});

export const cvBaseSchema = z.object({
  fullName: optionalText(80),
  headline: optionalText(90),
  email: optionalEmail,
  phone: optionalText(40),
  location: optionalText(80),
  linkedin: optionalLink,
  website: optionalLink,
  summary: optionalText(600, "Máximo 600 caracteres"),
  experiences: z.array(experienceSchema).max(4).default([]),
  education: z.array(educationSchema).max(3).default([]),
  skills: optionalText(500, "Máximo 500 caracteres"),
  languages: optionalText(260, "Máximo 260 caracteres"),
  certifications: z.array(certificationSchema).max(4).default([]),
});

export const cvDraftSchema = cvBaseSchema.partial();

export const cvSchema = cvBaseSchema.superRefine((data, ctx) => {
  if (!hasText(data.fullName)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: requiredMessage,
      path: ["fullName"],
    });
  }

  const hasContact = [data.email, data.phone, data.linkedin, data.website].some(
    hasText,
  );

  if (!hasContact) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Sumá al menos un dato de contacto",
      path: ["email"],
    });
  }
});

export type CvData = z.infer<typeof cvBaseSchema>;

export function hasText(value?: string | null) {
  return Boolean(value && value.trim().length > 0);
}

export function createCvId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2);
}

export function createHighlight(id = createCvId()) {
  return {
    id,
    text: "",
  };
}

export function createExperience(id = createCvId()) {
  return {
    id,
    role: "",
    company: "",
    location: "",
    startDate: "",
    endDate: "",
    current: false,
    highlights: [createHighlight(`${id}-highlight-1`)],
  };
}

export function createEducation(id = createCvId()) {
  return {
    id,
    degree: "",
    institution: "",
    location: "",
    startDate: "",
    endDate: "",
    details: "",
  };
}

export function createCertification(id = createCvId()) {
  return {
    id,
    name: "",
    issuer: "",
    year: "",
  };
}

export function createEmptyCvData(): CvData {
  return {
    fullName: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    summary: "",
    experiences: [createExperience("experience-1")],
    education: [createEducation("education-1")],
    skills: "",
    languages: "",
    certifications: [],
  };
}

export function normalizeCvData(data?: Partial<CvData>): CvData {
  const empty = createEmptyCvData();

  return {
    ...empty,
    ...data,
    experiences:
      data?.experiences && data.experiences.length > 0
        ? data.experiences.map((experience) => ({
            ...createExperience(),
            ...experience,
            highlights:
              experience.highlights && experience.highlights.length > 0
                ? experience.highlights.map((highlight) => ({
                    ...createHighlight(),
                    ...highlight,
                  }))
                : [createHighlight()],
          }))
        : empty.experiences,
    education:
      data?.education && data.education.length > 0
        ? data.education.map((education) => ({
            ...createEducation(),
            ...education,
          }))
        : empty.education,
    certifications:
      data?.certifications?.map((certification) => ({
        ...createCertification(),
        ...certification,
      })) ?? [],
  };
}

export function getCvFileName(data: Pick<CvData, "fullName">) {
  const slug = data.fullName
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return slug ? `cv-${slug}.pdf` : "cv-cata-jobs.pdf";
}

export function normalizeLink(value?: string) {
  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return "";
  }

  return /^https?:\/\//i.test(trimmedValue)
    ? trimmedValue
    : `https://${trimmedValue}`;
}
