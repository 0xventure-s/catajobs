import H1 from "@/components/ui/h1";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type PageFeedbackProps = {
  badge: string;
  title: string;
  description: string;
  supportText?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export default function PageFeedback({
  badge,
  title,
  description,
  supportText,
  icon,
  actions,
  className,
}: PageFeedbackProps) {
  return (
    <main className={cn("relative overflow-hidden", className)}>
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-sky-50 via-white to-white" />
      <div className="absolute left-1/2 top-20 h-44 w-44 -translate-x-[150%] rounded-full bg-sky-100 blur-3xl" />
      <div className="absolute right-1/2 top-24 h-56 w-56 translate-x-[160%] rounded-full bg-blue-100 blur-3xl" />

      <section className="relative mx-auto flex min-h-[70vh] max-w-5xl items-center px-3 py-14 sm:py-20">
        <div className="mx-auto w-full max-w-3xl rounded-[32px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur sm:p-10">
          <div className="flex flex-col items-center gap-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-700 shadow-inner shadow-sky-100">
              {icon}
            </div>

            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                {badge}
              </span>

              <H1 className="text-4xl leading-tight sm:text-5xl">{title}</H1>

              <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                {description}
              </p>
            </div>

            {actions ? (
              <div className="flex w-full flex-col justify-center gap-3 sm:flex-row">
                {actions}
              </div>
            ) : null}

            {supportText ? (
              <p className="max-w-xl text-sm leading-6 text-slate-500">
                {supportText}
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
