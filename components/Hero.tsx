"use client";

import { useRef } from "react";
import Scene from "./Scene";
import Canopy from "./Canopy";
import Road from "./Road";
import Car from "./Car";
import StatCard, { STAT_CARDS_DATA } from "./StatCard";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const roadStripRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const counterHeadlineRef = useRef<HTMLDivElement>(null);
  const ghostHeadlineRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const carShadowRef = useRef<HTMLDivElement>(null);
  const streaksRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full bg-[#1F2316] select-none">
      {/* 1. Static Cinematic Overlays: Vignette & Soft-Light SVG Grain (Nothing animates) */}
      <div className="scene-grain" aria-hidden="true" />
      <div className="scene-vignette" aria-hidden="true" />

      {/* Hero Viewport (100svh screen) */}
      <section className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center">
        {/* 2. Drone Aerial Scene: Foliage Verges & Leaf Specks */}
        <Scene />

        {/* 3. Road Strip (~27svh desktop / ~22svh mobile) with Mint Trail & Double Yellow */}
        <Road
          roadRef={roadStripRef}
          trailRef={trailRef}
          counterHeadlineRef={counterHeadlineRef}
          ghostHeadlineRef={ghostHeadlineRef}
          mode="final"
          className="z-10"
        />

        {/* 4. Real Supercar from /car-right.webp parked at the right edge with contact shadow */}
        <Car
          ref={carRef}
          shadowRef={carShadowRef}
          streaksRef={streaksRef}
          mode="parked"
          className="top-1/2 -translate-y-1/2 z-20"
        />

        {/* 5. Canopy Foliage Layer (Overlaps road edges, ABOVE car in z-index) */}
        <Canopy className="z-30" />

        {/* 6. Four Stat Cards in Staggered Diagonal Zig-Zag Layout (Final Active State) */}
        <div className="pointer-events-none absolute inset-0 z-25">
          {STAT_CARDS_DATA.map((card) => (
            <StatCard key={card.id} card={card} state="final" />
          ))}
        </div>

        {/* 7. SCROLL Hint (Bottom Center) */}
        <div
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-35 flex flex-col items-center gap-1.5"
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase font-extrabold tracking-[0.32em] text-white/50">
            SCROLL
          </span>
          <div className="h-5 w-[1.5px] overflow-hidden rounded-full bg-white/20">
            <div className="h-2 w-full bg-[#50EF7E] rounded-full" />
          </div>
        </div>
      </section>

      {/* 8. Next Section (100vh buffer so unpinning feels natural) */}
      <section className="relative min-h-[100vh] w-full bg-[#181B11] border-t border-white/10 px-8 py-24 flex flex-col items-center justify-center text-center z-40">
        <div className="max-w-2xl flex flex-col items-center gap-4">
          <span className="text-xs uppercase tracking-[0.3em] text-[#50EF7E] font-bold">
            ITZFIZZ EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
            ENGINEERED FOR RAW MOMENTUM
          </h2>
          <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-lg">
            Smooth scroll-driven choreography combining precision physics, responsive viewport adaptation, and high-impact visual design.
          </p>
        </div>
      </section>
    </div>
  );
}
