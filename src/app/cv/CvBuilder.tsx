"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Award,
  BriefcaseBusiness,
  Download,
  GraduationCap,
  ListPlus,
  Mail,
  Plus,
  Trash2,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CvData,
  createCertification,
  createEducation,
  createEmptyCvData,
  createExperience,
  createHighlight,
  cvDraftSchema,
  cvSchema,
  getCvFileName,
  normalizeCvData,
} from "@/lib/cv";

import CvPreview from "./CvPreview";

const STORAGE_KEY = "catajobs.cv.draft.v1";

export default function CvBuilder() {
  const [activeMobileView, setActiveMobileView] = useState<"form" | "preview">(
    "form",
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const [saveStatus, setSaveStatus] = useState("Borrador listo");
  const [hasLoadedDraft, setHasLoadedDraft] = useState(false);

  const {
    control,
    register,
    reset,
    watch,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<CvData>({
    resolver: zodResolver(cvSchema),
    defaultValues: createEmptyCvData(),
    mode: "onBlur",
  });

  const watchedData = watch();
  const previewData = useMemo(() => normalizeCvData(watchedData), [watchedData]);
  const canDownload = cvSchema.safeParse(previewData).success;

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experiences",
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });

  const {
    fields: certificationFields,
    append: appendCertification,
    remove: removeCertification,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  useEffect(() => {
    const storedDraft = window.localStorage.getItem(STORAGE_KEY);

    if (storedDraft) {
      try {
        const parsed = cvDraftSchema.safeParse(JSON.parse(storedDraft));

        if (parsed.success) {
          reset(normalizeCvData(parsed.data));
          setSaveStatus("Borrador recuperado");
        }
      } catch {
        setSaveStatus("Borrador listo");
      }
    }

    setHasLoadedDraft(true);
  }, [reset]);

  useEffect(() => {
    if (!hasLoadedDraft) {
      return;
    }

    setSaveStatus("Guardando...");

    const timeoutId = window.setTimeout(() => {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(normalizeCvData(getValues())),
      );
      setSaveStatus("Borrador guardado");
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [getValues, hasLoadedDraft, watchedData]);

  async function downloadCv(values: CvData) {
    setDownloadError("");
    setIsGenerating(true);

    try {
      const [{ pdf }, { default: CvPdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./CvPdfDocument"),
      ]);
      const normalizedValues = normalizeCvData(values);
      const blob = await pdf(
        <CvPdfDocument data={normalizedValues} />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = getCvFileName(normalizedValues);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setDownloadError("No se pudo generar el PDF. Intentá nuevamente.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleInvalidDownload() {
    await trigger();
    setDownloadError("Completá tu nombre y al menos un dato de contacto.");
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-3 py-8 pb-28 md:px-6 md:pb-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="grid gap-4 border-b border-zinc-200 pb-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-3">
            <p className="text-sm font-semibold text-emerald-700">
              CV Harvard ATS
            </p>
            <h1 className="max-w-3xl text-3xl font-extrabold text-zinc-950 md:text-5xl">
              Armá un CV claro, sobrio y listo para postular.
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-zinc-600 md:text-base">
              Una plantilla limpia, fácil de leer y pensada para pasar filtros
              ATS sin perder presencia.
            </p>
          </div>
          <div className="hidden min-w-[16rem] rounded-md border border-zinc-200 bg-white p-3 shadow-sm lg:block">
            <p className="text-xs font-medium text-zinc-500">{saveStatus}</p>
            <DownloadButton
              canDownload={canDownload}
              isGenerating={isGenerating}
              className="mt-3 w-full"
            />
            {!canDownload && (
              <p className="mt-2 text-xs text-zinc-500">
                Completá nombre y contacto para descargar.
              </p>
            )}
          </div>
        </header>

        <div className="sticky top-0 z-30 -mx-3 border-b border-zinc-200 bg-zinc-50/95 px-3 py-3 backdrop-blur lg:hidden">
          <div className="grid grid-cols-2 rounded-md border border-zinc-200 bg-white p-1">
            <button
              type="button"
              className={getMobileTabClass(activeMobileView === "form")}
              onClick={() => setActiveMobileView("form")}
            >
              Datos
            </button>
            <button
              type="button"
              className={getMobileTabClass(activeMobileView === "preview")}
              onClick={() => setActiveMobileView("preview")}
            >
              Vista previa
            </button>
          </div>
        </div>

        <form
          id="cv-builder-form"
          className="grid gap-6 lg:grid-cols-[minmax(0,540px)_minmax(0,1fr)]"
          onSubmit={handleSubmit(downloadCv, handleInvalidDownload)}
        >
          <div
            className={
              activeMobileView === "form"
                ? "space-y-5"
                : "hidden lg:block lg:space-y-5"
            }
          >
            <FormPanel
              icon={<UserRound className="h-5 w-5" />}
              title="Datos personales"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Nombre completo"
                  error={getError(errors.fullName)}
                  className="sm:col-span-2"
                >
                  <Input
                    placeholder="Nombre y apellido"
                    {...register("fullName")}
                  />
                </Field>
                <Field label="Puesto objetivo" error={getError(errors.headline)}>
                  <Input
                    placeholder="Administración, ventas, atención al cliente"
                    {...register("headline")}
                  />
                </Field>
                <Field label="Ciudad" error={getError(errors.location)}>
                  <Input
                    placeholder="San Fernando del Valle de Catamarca"
                    {...register("location")}
                  />
                </Field>
                <Field label="Email" error={getError(errors.email)}>
                  <Input placeholder="nombre@correo.com" {...register("email")} />
                </Field>
                <Field label="Teléfono" error={getError(errors.phone)}>
                  <Input placeholder="+54 9 383 ..." {...register("phone")} />
                </Field>
                <Field label="LinkedIn" error={getError(errors.linkedin)}>
                  <Input
                    placeholder="linkedin.com/in/tu-perfil"
                    {...register("linkedin")}
                  />
                </Field>
                <Field label="Portafolio" error={getError(errors.website)}>
                  <Input
                    placeholder="tusitio.com"
                    {...register("website")}
                  />
                </Field>
              </div>
            </FormPanel>

            <FormPanel
              icon={<Mail className="h-5 w-5" />}
              title="Perfil profesional"
            >
              <Field label="Resumen" error={getError(errors.summary)}>
                <Textarea
                  rows={5}
                  placeholder="Experiencia, fortalezas y tipo de rol que buscás."
                  {...register("summary")}
                />
              </Field>
            </FormPanel>

            <FormPanel
              action={
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={experienceFields.length >= 4}
                  onClick={() => appendExperience(createExperience())}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar
                </Button>
              }
              icon={<BriefcaseBusiness className="h-5 w-5" />}
              title="Experiencia"
            >
              <div className="space-y-4">
                {experienceFields.map((field, index) => (
                  <ExperienceFields
                    key={field.id}
                    control={control}
                    errors={errors}
                    index={index}
                    register={register}
                    removeExperience={removeExperience}
                    showRemove={experienceFields.length > 1}
                    watch={watch}
                  />
                ))}
              </div>
            </FormPanel>

            <FormPanel
              action={
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={educationFields.length >= 3}
                  onClick={() => appendEducation(createEducation())}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar
                </Button>
              }
              icon={<GraduationCap className="h-5 w-5" />}
              title="Formación"
            >
              <div className="space-y-4">
                {educationFields.map((field, index) => (
                  <EducationFields
                    key={field.id}
                    errors={errors}
                    index={index}
                    register={register}
                    removeEducation={removeEducation}
                    showRemove={educationFields.length > 1}
                  />
                ))}
              </div>
            </FormPanel>

            <FormPanel
              icon={<ListPlus className="h-5 w-5" />}
              title="Habilidades"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Habilidades" error={getError(errors.skills)}>
                  <Textarea
                    rows={5}
                    placeholder="Excel, atención al cliente, manejo de caja, ventas."
                    {...register("skills")}
                  />
                </Field>
                <Field label="Idiomas" error={getError(errors.languages)}>
                  <Textarea
                    rows={5}
                    placeholder="Español nativo, inglés intermedio."
                    {...register("languages")}
                  />
                </Field>
              </div>
            </FormPanel>

            <FormPanel
              action={
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={certificationFields.length >= 4}
                  onClick={() => appendCertification(createCertification())}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Agregar
                </Button>
              }
              icon={<Award className="h-5 w-5" />}
              title="Certificaciones"
            >
              {certificationFields.length === 0 ? (
                <p className="rounded-md border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">
                  Sumá cursos o certificaciones relevantes.
                </p>
              ) : (
                <div className="space-y-4">
                  {certificationFields.map((field, index) => (
                    <CertificationFields
                      key={field.id}
                      errors={errors}
                      index={index}
                      register={register}
                      removeCertification={removeCertification}
                    />
                  ))}
                </div>
              )}
            </FormPanel>

            {downloadError && (
              <p className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {downloadError}
              </p>
            )}
          </div>

          <aside
            className={
              activeMobileView === "preview"
                ? "block"
                : "hidden lg:block"
            }
          >
            <div className="lg:sticky lg:top-6">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-zinc-950">
                    Vista previa
                  </h2>
                  <p className="text-sm text-zinc-500">
                    Hoja A4 con formato Harvard ATS.
                  </p>
                </div>
              </div>
              <CvPreview data={previewData} />
            </div>
          </aside>
        </form>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/95 p-3 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <p className="min-w-0 flex-1 truncate text-xs text-zinc-500">
            {saveStatus}
          </p>
          <DownloadButton
            canDownload={canDownload}
            isGenerating={isGenerating}
            className="shrink-0"
          />
        </div>
        {!canDownload && (
          <p className="mx-auto mt-2 max-w-7xl text-xs text-zinc-500">
            Completá nombre y contacto para descargar.
          </p>
        )}
      </div>
    </main>
  );
}

function DownloadButton({
  canDownload,
  className,
  isGenerating,
}: {
  canDownload: boolean;
  className?: string;
  isGenerating: boolean;
}) {
  return (
    <Button
      className={className}
      disabled={!canDownload || isGenerating}
      form="cv-builder-form"
      type="submit"
    >
      <Download className="mr-2 h-4 w-4" />
      {isGenerating ? "Generando..." : "Descargar PDF"}
    </Button>
  );
}

function FormPanel({
  action,
  children,
  icon,
  title,
}: {
  action?: React.ReactNode;
  children: React.ReactNode;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-zinc-950">
          <span className="text-emerald-700">{icon}</span>
          <h2 className="font-bold">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Field({
  children,
  className,
  error,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  error?: string;
  label: string;
}) {
  return (
    <div className={className}>
      <Label className="mb-2 block text-zinc-800">{label}</Label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

function ExperienceFields({
  control,
  errors,
  index,
  register,
  removeExperience,
  showRemove,
  watch,
}: {
  control: Control<CvData>;
  errors: FieldErrors<CvData>;
  index: number;
  register: UseFormRegister<CvData>;
  removeExperience: (index: number) => void;
  showRemove: boolean;
  watch: UseFormWatch<CvData>;
}) {
  const current = watch(`experiences.${index}.current`);
  const { fields, append, remove } = useFieldArray({
    control,
    name: `experiences.${index}.highlights` as const,
  });

  return (
    <div className="rounded-md border border-zinc-200 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-zinc-950">
          Experiencia {index + 1}
        </h3>
        {showRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeExperience(index)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Cargo"
          error={getError(errors.experiences?.[index]?.role)}
        >
          <Input {...register(`experiences.${index}.role`)} />
        </Field>
        <Field
          label="Empresa"
          error={getError(errors.experiences?.[index]?.company)}
        >
          <Input {...register(`experiences.${index}.company`)} />
        </Field>
        <Field
          label="Ubicación"
          error={getError(errors.experiences?.[index]?.location)}
        >
          <Input {...register(`experiences.${index}.location`)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Inicio"
            error={getError(errors.experiences?.[index]?.startDate)}
          >
            <Input placeholder="2023" {...register(`experiences.${index}.startDate`)} />
          </Field>
          <Field
            label="Fin"
            error={getError(errors.experiences?.[index]?.endDate)}
          >
            <Input
              disabled={Boolean(current)}
              placeholder="2025"
              {...register(`experiences.${index}.endDate`)}
            />
          </Field>
        </div>
      </div>

      <label className="mt-3 flex items-center gap-2 text-sm text-zinc-700">
        <input
          className="h-4 w-4 rounded border-zinc-300"
          type="checkbox"
          {...register(`experiences.${index}.current`)}
        />
        Trabajo actual
      </label>

      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Label>Logros</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={fields.length >= 5}
            onClick={() => append(createHighlight())}
          >
            <Plus className="mr-2 h-4 w-4" />
            Agregar logro
          </Button>
        </div>
        {fields.map((field, highlightIndex) => (
          <div key={field.id} className="flex gap-2">
            <Textarea
              rows={2}
              placeholder="Resultado concreto, responsabilidad o mejora lograda."
              {...register(
                `experiences.${index}.highlights.${highlightIndex}.text`,
              )}
            />
            {fields.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(highlightIndex)}
                aria-label="Eliminar logro"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationFields({
  errors,
  index,
  register,
  removeEducation,
  showRemove,
}: {
  errors: FieldErrors<CvData>;
  index: number;
  register: UseFormRegister<CvData>;
  removeEducation: (index: number) => void;
  showRemove: boolean;
}) {
  return (
    <div className="rounded-md border border-zinc-200 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-zinc-950">Formación {index + 1}</h3>
        {showRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeEducation(index)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Eliminar
          </Button>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Título"
          error={getError(errors.education?.[index]?.degree)}
        >
          <Input {...register(`education.${index}.degree`)} />
        </Field>
        <Field
          label="Institución"
          error={getError(errors.education?.[index]?.institution)}
        >
          <Input {...register(`education.${index}.institution`)} />
        </Field>
        <Field
          label="Ubicación"
          error={getError(errors.education?.[index]?.location)}
        >
          <Input {...register(`education.${index}.location`)} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Inicio"
            error={getError(errors.education?.[index]?.startDate)}
          >
            <Input {...register(`education.${index}.startDate`)} />
          </Field>
          <Field
            label="Fin"
            error={getError(errors.education?.[index]?.endDate)}
          >
            <Input {...register(`education.${index}.endDate`)} />
          </Field>
        </div>
        <Field
          label="Detalle"
          error={getError(errors.education?.[index]?.details)}
          className="sm:col-span-2"
        >
          <Textarea
            rows={3}
            placeholder="Promedio, orientación, proyecto o logro académico."
            {...register(`education.${index}.details`)}
          />
        </Field>
      </div>
    </div>
  );
}

function CertificationFields({
  errors,
  index,
  register,
  removeCertification,
}: {
  errors: FieldErrors<CvData>;
  index: number;
  register: UseFormRegister<CvData>;
  removeCertification: (index: number) => void;
}) {
  return (
    <div className="rounded-md border border-zinc-200 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-zinc-950">
          Certificación {index + 1}
        </h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => removeCertification(index)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Eliminar
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          label="Nombre"
          error={getError(errors.certifications?.[index]?.name)}
        >
          <Input {...register(`certifications.${index}.name`)} />
        </Field>
        <Field
          label="Emisor"
          error={getError(errors.certifications?.[index]?.issuer)}
        >
          <Input {...register(`certifications.${index}.issuer`)} />
        </Field>
        <Field
          label="Año"
          error={getError(errors.certifications?.[index]?.year)}
        >
          <Input {...register(`certifications.${index}.year`)} />
        </Field>
      </div>
    </div>
  );
}

function getMobileTabClass(isActive: boolean) {
  return [
    "rounded px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-zinc-950 text-white shadow-sm"
      : "text-zinc-600 hover:bg-zinc-100",
  ].join(" ");
}

function getError(error: { message?: unknown } | undefined) {
  return typeof error?.message === "string" ? error.message : undefined;
}
