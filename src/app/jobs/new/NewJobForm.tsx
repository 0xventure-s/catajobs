/* eslint-disable jsx-a11y/alt-text */
"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import H1 from "@/components/ui/h1";
import { createJobsSchema, CreateJobValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Select from "@/components/ui/select";
import { jobTypes, locationTypes } from "@/lib/jov-types";
import { Briefcase, Building2, Computer, FileText, Image, LocateFixed, Mail, Pencil, Phone, X } from "lucide-react";
import LocationInput from "@/components/LocationInput";
import { Label } from "@/components/ui/label";
import RichEditor from "@/components/RichEditor";
import { draftToMarkdown } from "markdown-draft-js";
import LoadingButton from "@/components/LoadingButton";
import { createJobPosting } from "./actions";

export default function NewJobForm() {
  const form = useForm<CreateJobValues>({
    resolver: zodResolver(createJobsSchema),
  });

  const {
    handleSubmit,
    watch,
    trigger,
    control,
    setValue,
    setFocus,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CreateJobValues) {
    const formData = new FormData()

    Object.entries(values).forEach(([key,value]) => {
      if(value) {
        formData.append(key, value)
      }
    })

    try {
      await createJobPosting(formData)
    } catch (error) {
      alert("Algo salio mal nene")
    }
  }

  return (
    <main className="max-w-3xl m-auto my-10 space-y-10">
      <div className="space-y-5 text-center">
        <H1>Crea un puesto de trabajo</H1>
        <p className="text-muted-foreground">
          Crea un trabajo GRATIS para que miles de personas lo puedan ver
        </p>
      </div>
      <div className="space-y-6 border rounded-lg p-4">
        <div>
          <h2 className="font-semibold">Detalles del empleo</h2>
          <p className="text-muted-foreground">
            Agrega una descripción al empleo
          </p>
        </div>

        <Form {...form}>
          <form
            className="space-y-4"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="tittle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Titulo del empleo
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Por ej: Empleado de Comercio para Local de Ropa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-green-500" />
                    Tipo de Trabajo
                  </FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="">
                      <option value="" hidden>
                        Selecciona una opcion
                      </option>
                      {jobTypes.map((jobType) => (
                        <option key={jobType} value={jobType}>
                          {jobType}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-purple-500" />
                    Nombre de tu empresa
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ej: Carniceria La Tradicion"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="companyLogo"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Image className="w-5 h-5 text-red-500" />
                    Logo de la empresa
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="locationType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Computer className="w-5 h-5 text-pink-500" />
                    ¿Presencial o Remoto?
                  </FormLabel>
                  <FormControl>
                    <Select {...field} defaultValue="" onChange={e => {
                      field.onChange(e)
                      if(e.currentTarget.value === "Remoto") {
                        trigger("location")
                      }
                    }}>
                      <option value="" hidden>
                        Selecciona una opcion
                      </option>
                      {locationTypes.map((locationType) => (
                        <option key={locationType} value={locationType}>
                          {locationType}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <LocateFixed className="w-5 h-5 text-orange-500" />
                    Ubicacion del empleo:
                  </FormLabel>
                  <FormControl>
                    <LocationInput onLocationSelected={field.onChange} ref={field.ref}/>
                  </FormControl>
                  {watch("location") && (
                    <div className="flex items-center gap-1">
                        <button type="button" onClick={() => {
                            setValue("location","",{shouldValidate:true})
                        }}>
                            <X size={20}/>
                        </button>
                        <span className="text-sm">{watch("location")}</span>
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label htmlFor="applicationEmail" className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-teal-500" />
                ¿Cómo te contactarán?
              </Label>
              
              <div className="flex justify-between">
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({field}) => (
                    <FormItem className="grow">
                      <FormControl>
                        <div className="flex items-center">
                          
                          <Input
                            placeholder="Número de Teléfono"
                            type="text"
                            {...field}
                          />
                          <span className="mx-2">o</span>
                        </div>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({field}) => (
                    <FormItem className="grow">
                      <FormControl>
                        <div className="flex items-center">
                         
                          <Input
                            id="applicationEmail" 
                            placeholder="Email o Ubicacion del Local"
                            type="text"
                            {...field}
                            onChange={e => {
                              field.onChange(e)
                              trigger("applicationEmail")
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )}
                />
              </div>
            </div> 

            <FormField
              control={control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <Label
                    onClick={() => setFocus("description")}
                    className="flex items-center gap-2"
                  >
                    <Pencil className="w-5 h-5 text-indigo-500" />
                    Descripción
                  </Label>
                  <FormControl>
                    <RichEditor
                      onChange={draft => field.onChange(draftToMarkdown(draft))}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <LoadingButton type="submit" loading={isSubmitting}>
              Crear
            </LoadingButton>
          </form>
        </Form>
      </div>
    </main>
  );
}