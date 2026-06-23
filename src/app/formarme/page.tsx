import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Brain,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  FileText,
  Megaphone,
  Palette,
  PlayCircle,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Formarme",
  description:
    "Cursos gratuitos de YouTube para fortalecer habilidades laborales en IA, diseño, datos, programación y empleabilidad.",
};

type CourseCategory =
  | "ia"
  | "diseno"
  | "datos"
  | "codigo"
  | "herramientas"
  | "seguridad"
  | "marketing"
  | "empleabilidad";

type Course = {
  title: string;
  source: string;
  category: CourseCategory;
  level: "Inicial" | "Inicial a intermedio" | "Intermedio";
  youtubeId: string;
  summary: string;
};

type CategoryInfo = {
  label: string;
  description: string;
  icon: LucideIcon;
  badgeClassName: string;
  iconClassName: string;
};

const categoryInfo: Record<CourseCategory, CategoryInfo> = {
  ia: {
    label: "IA para el trabajo",
    description:
      "Prompts, asistentes, investigación y herramientas para producir mejor sin perder criterio.",
    icon: Brain,
    badgeClassName: "border-emerald-200 bg-emerald-50 text-emerald-700",
    iconClassName: "text-emerald-600",
  },
  diseno: {
    label: "Diseño y producto",
    description:
      "Bases de UX/UI, Figma y prototipos para convertir ideas en pantallas claras.",
    icon: Palette,
    badgeClassName: "border-rose-200 bg-rose-50 text-rose-700",
    iconClassName: "text-rose-600",
  },
  datos: {
    label: "Datos y oficina",
    description:
      "Excel, Power BI, SQL y análisis para ordenar información y tomar mejores decisiones.",
    icon: BarChart3,
    badgeClassName: "border-amber-200 bg-amber-50 text-amber-800",
    iconClassName: "text-amber-600",
  },
  codigo: {
    label: "Programación",
    description:
      "Fundamentos web y lenguajes de entrada para crear proyectos reales desde cero.",
    icon: Code2,
    badgeClassName: "border-sky-200 bg-sky-50 text-sky-700",
    iconClassName: "text-sky-600",
  },
  herramientas: {
    label: "Herramientas técnicas",
    description:
      "Flujos de trabajo usados en equipos de desarrollo y proyectos digitales.",
    icon: Wrench,
    badgeClassName: "border-zinc-200 bg-zinc-50 text-zinc-700",
    iconClassName: "text-zinc-600",
  },
  seguridad: {
    label: "Ciberseguridad",
    description:
      "Conceptos base para cuidar datos, cuentas, equipos y entornos digitales.",
    icon: ShieldCheck,
    badgeClassName: "border-red-200 bg-red-50 text-red-700",
    iconClassName: "text-red-600",
  },
  marketing: {
    label: "Marketing digital",
    description:
      "Publicidad, adquisición y medición para negocios que venden o comunican online.",
    icon: Megaphone,
    badgeClassName: "border-lime-200 bg-lime-50 text-lime-800",
    iconClassName: "text-lime-700",
  },
  empleabilidad: {
    label: "Empleabilidad",
    description:
      "CV, perfil profesional y preparación para mostrar mejor la experiencia propia.",
    icon: BriefcaseBusiness,
    badgeClassName: "border-violet-200 bg-violet-50 text-violet-700",
    iconClassName: "text-violet-600",
  },
};

const categoryOrder: CourseCategory[] = [
  "ia",
  "diseno",
  "datos",
  "codigo",
  "herramientas",
  "seguridad",
  "marketing",
  "empleabilidad",
];

const courses: Course[] = [
  {
    title: "Inteligencia artificial para todos",
    source: "EDteam",
    category: "ia",
    level: "Inicial",
    youtubeId: "DjshEwI6pVk",
    summary:
      "Una entrada clara para entender qué puede resolver la IA y cuándo conviene revisar sus respuestas.",
  },
  {
    title: "ChatGPT de principiante a experto",
    source: "Pedro SEO",
    category: "ia",
    level: "Inicial a intermedio",
    youtubeId: "FMBdhZf8u_Y",
    summary:
      "Útil para escribir mejores prompts, ordenar tareas y acelerar búsquedas sin depender de respuestas vagas.",
  },
  {
    title: "Gemini desde cero",
    source: "Pablo Martínez",
    category: "ia",
    level: "Inicial",
    youtubeId: "a-fX3GEWjBY",
    summary:
      "Recorrido práctico por una herramienta cada vez más presente en cuentas personales y laborales de Google.",
  },
  {
    title: "NotebookLM para estudiar e investigar",
    source: "Juanjo Digital",
    category: "ia",
    level: "Inicial a intermedio",
    youtubeId: "oxa2hLljQUk",
    summary:
      "Sirve para trabajar con apuntes, documentos y fuentes propias sin mezclar todo en una conversación genérica.",
  },
  {
    title: "Figma desde cero",
    source: "afor digital",
    category: "diseno",
    level: "Inicial",
    youtubeId: "VdS9ZGHHXWQ",
    summary:
      "Buen punto de partida para aprender la herramienta estándar de diseño de interfaces y colaboración visual.",
  },
  {
    title: "Diseño UX/UI para principiantes",
    source: "Igna UX",
    category: "diseno",
    level: "Inicial",
    youtubeId: "q6WPfjTU_B0",
    summary:
      "Combina criterios de diseño con práctica en Figma para pasar de una idea a una pantalla presentable.",
  },
  {
    title: "Figma para UX/UI",
    source: "jonmircha",
    category: "diseno",
    level: "Inicial",
    youtubeId: "XtysRVCNLT0",
    summary:
      "Una ruta ordenada para construir base técnica antes de avanzar hacia componentes, flujos y prototipos.",
  },
  {
    title: "Prototipos interactivos en Figma",
    source: "KnowHow Academy Spanish",
    category: "diseno",
    level: "Inicial a intermedio",
    youtubeId: "536PMDkvNKk",
    summary:
      "Ayuda a mostrar recorridos completos, validar pantallas y presentar ideas con más claridad.",
  },
  {
    title: "Power BI desde cero",
    source: "datdata",
    category: "datos",
    level: "Inicial",
    youtubeId: "vufMFnWpINo",
    summary:
      "Para transformar planillas y bases simples en reportes visuales que se entienden rápido.",
  },
  {
    title: "Excel desde cero",
    source: "Jr. Software Oficial",
    category: "datos",
    level: "Inicial",
    youtubeId: "6aMW5nEL4tA",
    summary:
      "Base necesaria para puestos administrativos, ventas, operaciones y cualquier trabajo con información diaria.",
  },
  {
    title: "Ciencia de datos para principiantes",
    source: "A2 Capacitación",
    category: "datos",
    level: "Inicial",
    youtubeId: "UWKQca26LLo",
    summary:
      "Introduce análisis, lectura de datos y pensamiento estadístico sin exigir experiencia técnica previa.",
  },
  {
    title: "SQL con MySQL, PostgreSQL y Docker",
    source: "freeCodeCamp Español",
    category: "datos",
    level: "Inicial a intermedio",
    youtubeId: "6JBsoPOwPew",
    summary:
      "Clave para perfiles de datos, backend, soporte técnico y cualquier rol que consulte bases de información.",
  },
  {
    title: "Python desde cero",
    source: "midudev",
    category: "codigo",
    level: "Inicial",
    youtubeId: "TkN2i-_4N4g",
    summary:
      "Un lenguaje accesible para automatizar tareas, analizar datos y empezar a programar con proyectos simples.",
  },
  {
    title: "JavaScript desde cero",
    source: "MoureDev",
    category: "codigo",
    level: "Inicial",
    youtubeId: "1glVfFxj8a4",
    summary:
      "Base del desarrollo web moderno, útil para crear sitios, interfaces y automatizaciones del lado del navegador.",
  },
  {
    title: "HTML y CSS desde cero",
    source: "Soy Dalto",
    category: "codigo",
    level: "Inicial",
    youtubeId: "ELSm-G201Ls",
    summary:
      "Fundamentos para maquetar páginas, entender la web y construir un portfolio propio.",
  },
  {
    title: "React con proyectos",
    source: "freeCodeCamp Español",
    category: "codigo",
    level: "Inicial a intermedio",
    youtubeId: "6Jfk8ic3KVk",
    summary:
      "Una continuación natural para quienes ya manejan JavaScript y quieren crear interfaces más completas.",
  },
  {
    title: "Git y GitHub desde cero",
    source: "freeCodeCamp Español",
    category: "herramientas",
    level: "Inicial",
    youtubeId: "mBYSUUnMt9M",
    summary:
      "Imprescindible para guardar avances, colaborar en código y mostrar proyectos de forma profesional.",
  },
  {
    title: "Ciberseguridad para principiantes",
    source: "Hixec",
    category: "seguridad",
    level: "Inicial",
    youtubeId: "NoV_pP0Bx_Q",
    summary:
      "Base práctica para entender riesgos digitales, proteger cuentas y abrir una ruta hacia seguridad informática.",
  },
  {
    title: "Google Ads completo",
    source: "Marc Ramentol",
    category: "marketing",
    level: "Inicial a intermedio",
    youtubeId: "GfKaoQxTrtk",
    summary:
      "Para aprender campañas pagas, intención de búsqueda y medición básica de resultados comerciales.",
  },
  {
    title: "CV con IA",
    source: "Humanos como recurso",
    category: "empleabilidad",
    level: "Inicial",
    youtubeId: "uJekcS0HitQ",
    summary:
      "Orientado a ordenar experiencia, ajustar secciones y mejorar la presentación antes de postularse.",
  },
];

function getCoursesByCategory(category: CourseCategory) {
  return courses.filter((course) => course.category === category);
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const category = categoryInfo[course.category];
  const url = `https://www.youtube.com/watch?v=${course.youtubeId}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Ver ${course.title} en YouTube`}
        className="relative block aspect-video overflow-hidden bg-zinc-100"
      >
        <Image
          src={`https://i.ytimg.com/vi/${course.youtubeId}/hqdefault.jpg`}
          alt={`Preview del curso ${course.title}`}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
          priority={index < 3}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-md bg-white/95 px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm">
          <PlayCircle className="h-4 w-4 text-red-600" />
          Ver preview
        </span>
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-2 py-1 text-xs font-semibold",
              category.badgeClassName,
            )}
          >
            {category.label}
          </span>
          <span className="rounded-md border border-zinc-200 px-2 py-1 text-xs font-semibold text-zinc-600">
            {course.level}
          </span>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold leading-tight text-zinc-950">
            {course.title}
          </h3>
          <p className="text-sm font-medium text-zinc-500">{course.source}</p>
          <p className="text-sm leading-6 text-zinc-600">{course.summary}</p>
        </div>

        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-zinc-950 underline-offset-4 hover:underline"
        >
          Abrir curso
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export default function FormarmePage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-3 py-8">
      <section className="space-y-3 border-b border-zinc-200 pb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
          Formarme
        </p>
        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-zinc-950 md:text-4xl">
            Cursos gratuitos para crecer con criterio.
          </h1>
          <p className="text-sm leading-6 text-zinc-600 md:text-base">
            20 cursos gratuitos de YouTube en IA, diseño, datos, programación y
            empleabilidad.
          </p>
        </div>
      </section>

      <nav
        aria-label="Filtros de cursos"
        className="flex flex-wrap gap-2 border-b border-zinc-200 pb-6"
      >
        {categoryOrder.map((category) => {
          const count = getCoursesByCategory(category).length;
          const Icon = categoryInfo[category].icon;

          return (
            <a
              key={category}
              href={`#${category}`}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 text-sm font-semibold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50"
            >
              <Icon
                className={cn("h-4 w-4", categoryInfo[category].iconClassName)}
              />
              <span>{categoryInfo[category].label}</span>
              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500">
                {count}
              </span>
            </a>
          );
        })}
      </nav>

      <div className="space-y-12">
        {categoryOrder.map((category) => {
          const categoryCourses = getCoursesByCategory(category);
          const Icon = categoryInfo[category].icon;

          return (
            <section
              key={category}
              id={category}
              className="scroll-mt-24 space-y-5"
            >
              <div className="flex flex-col gap-3 border-b border-zinc-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md border",
                      categoryInfo[category].badgeClassName,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-zinc-950">
                      {categoryInfo[category].label}
                    </h2>
                    <p className="max-w-2xl text-sm leading-6 text-zinc-600">
                      {categoryInfo[category].description}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-zinc-500">
                  {categoryCourses.length}{" "}
                  {categoryCourses.length === 1 ? "curso" : "cursos"}
                </span>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {categoryCourses.map((course) => (
                  <CourseCard
                    key={course.youtubeId}
                    course={course}
                    index={courses.findIndex(
                      (item) => item.youtubeId === course.youtubeId,
                    )}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="rounded-lg border border-zinc-200 bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-zinc-50 text-zinc-700">
              <FileText className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-semibold text-zinc-950">
                Lista curada, no catálogo abierto.
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-600">
                Cada curso fue elegido por utilidad laboral, claridad para
                empezar y disponibilidad gratuita en YouTube.
              </p>
            </div>
          </div>
          <Link
            href="/cv"
            className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-zinc-50"
          >
            Armar mi CV
          </Link>
        </div>
      </section>
    </main>
  );
}
