import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MessageCircle,
  MousePointerClick,
  PanelTop,
} from "lucide-react";

import H1 from "@/components/ui/h1";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Publicidad",
  description: "Espacios de publicidad en Cata Jobs por 100 mil al mes.",
};

const whatsappLink =
  "https://wa.me/543834293512?text=Hola%2C%20quiero%20conocer%20la%20publicidad%20en%20Cata%20Jobs";

const details = [
  {
    icon: PanelTop,
    title: "Presencia visible",
    description: "Tu marca se muestra en espacios destacados dentro del recorrido principal.",
  },
  {
    icon: CalendarDays,
    title: "Duración mensual",
    description: "Un valor fijo para un período completo, sin vueltas ni cálculos extra.",
  },
  {
    icon: MousePointerClick,
    title: "Enlace directo",
    description: "El banner puede dirigir a WhatsApp, una web o la acción que necesites.",
  },
];

function GlassPanel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/72 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.22)] backdrop-blur-xl",
        "before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0.34))] before:content-['']",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:18px_18px] opacity-60" />
        <div className="absolute -right-8 top-0 h-28 w-28 rounded-full border border-slate-200/80 bg-white/80 blur-2xl" />
        <div className="absolute bottom-0 left-1/4 h-24 w-24 rounded-full bg-slate-200/55 blur-3xl" />
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
        <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function AdvertisingPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-3 py-10">
      <GlassPanel className="p-6 md:p-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600 backdrop-blur">
              Publicidad en Cata Jobs
            </span>

            <div className="space-y-3">
              <H1 className="max-w-2xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                Un espacio claro para negocios que quieren estar presentes.
              </H1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                El formato es simple, visible y directo. Ideal para mostrar una
                marca, una promoción o un canal de contacto dentro del sitio.
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-5 backdrop-blur-md">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Precio
            </p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
                100 mil
              </span>
              <span className="pb-1 text-base text-slate-600">al mes</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Coordinación directa por WhatsApp para consultar disponibilidad y
              definir el enlace del banner.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-2xl bg-slate-950 text-white hover:bg-slate-800",
                )}
              >
                Escribir ahora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <div className="flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                <MessageCircle className="mr-2 h-4 w-4 text-emerald-600" />
                +543834293512
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>

      <section className="grid gap-4 md:grid-cols-3">
        {details.map(({ icon: Icon, title, description }) => (
          <GlassPanel key={title} className="p-5">
            <div className="mb-4 inline-flex rounded-2xl border border-slate-200 bg-white p-3 text-slate-700">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
          </GlassPanel>
        ))}
      </section>

      <GlassPanel className="p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
              Contacto
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
              +543834293512
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Si querés reservar un espacio o pedir más información, escribí
              directo por WhatsApp.
            </p>
          </div>

          <Link
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700",
            )}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Abrir WhatsApp
          </Link>
        </div>
      </GlassPanel>
    </main>
  );
}
