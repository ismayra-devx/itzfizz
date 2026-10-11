"use client";

import { useRef } from "react";
import Car from "./Car";

export default function Hero() {
  const carRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#1F2316] flex flex-col items-center justify-center">
      {/* Static Vignette and Grain */}
      <div className="scene-grain" />
      <div className="scene-vignette" />

      {/* Road Preview Strip */}
      <div className="relative w-full h-[27svh] bg-[#4A433C] flex items-center justify-center border-y border-[#3A332C]/60 shadow-2xl">
        {/* Double yellow lines */}
        <div className="absolute inset-x-0 flex flex-col gap-[4px] items-center pointer-events-none">
          <div className="w-full h-[3px] bg-[#C9984F]/90" />
          <div className="w-full h-[3px] bg-[#C9984F]/90" />
        </div>

        {/* Ghost Headline Preview */}
        <h1 className="ghost-headline z-10 text-[clamp(2.5rem,8vw,7.5rem)] font-extrabold uppercase tracking-[0.08em] select-none text-center">
          WELCOME ITZFIZZ
        </h1>

        {/* Car positioned centered on road */}
        <Car ref={carRef} className="z-20 left-1/2 -translate-x-1/2" />
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-[0.3em] text-[#50EF7E] font-semibold">
          Task 1 Scaffolding & Asset Verification
        </span>
        <span className="text-[11px] text-white/50 tracking-wider">
          Next.js App Router • Tailwind CSS • GSAP • Archivo 800 • GitHub Pages Export
        </span>
      </div>
    </div>
  );
}
