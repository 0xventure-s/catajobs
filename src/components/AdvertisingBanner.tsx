import { ArrowRight, Megaphone } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

type AdvertisingBannerProps = {
  variant?: "hero" | "inline";
};

export default function AdvertisingBanner({
  variant = "hero",
}: AdvertisingBannerProps) {
  const isHero = variant === "hero";

  return (
    <Link
      href="/publicidad"
      className={cn(
        "group relative block overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/70 text-slate-950 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.22)] backdrop-blur-xl",
        "before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.72),rgba(255,255,255,0.34))] before:content-['']",
        isHero ? "p-6 md:p-8" : "p-5 md:p-6",
      )}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:18px_18px] opacity-60" />
        <div className="absolute -right-8 top-0 h-28 w-28 rounded-full border border-slate-200/80 bg-white/80 blur-2xl transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute bottom-0 left-1/4 h-24 w-24 rounded-full bg-slate-200/55 blur-3xl" />
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
        <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
      </div>

      <div
        className={cn(
          "relative z-10 flex gap-6",
          isHero
            ? "flex-col items-start justify-between md:flex-row md:items-center"
            : "flex-col md:flex-row md:items-center md:justify-between",
        )}
      >
        <div className={cn("max-w-2xl space-y-4", !isHero && "max-w-xl")}>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600 backdrop-blur">
            <Megaphone className="h-4 w-4" />
            Publicidad destacada
          </span>
          <div className="space-y-2">
            <h2
              className={cn(
                "max-w-xl font-black tracking-tight text-slate-950",
                isHero ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl",
              )}
            >
              Tu publicidad aquí.
            </h2>
            <p className="max-w-lg text-base leading-7 text-slate-600 md:text-lg">
              Haz clic para conocer más.
            </p>
          </div>
        </div>

        <div className="relative flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm font-semibold text-slate-700 backdrop-blur md:self-center">
          Ver más
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
