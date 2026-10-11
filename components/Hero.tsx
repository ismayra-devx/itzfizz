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
  const scrollHintRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full bg-[#1F2316] select-none">
      {/* Fixed Overlays: Static Grain & Vignette */}
      <div className="scene-grain" />
      <div className="scene-vignette" />

      {/* Hero Viewport (100svh pinned section) */}
      <section className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center">
        {/* Background Drone Aerial Scene: Foliage Verges & Leaf Specks */}
        <Scene />

        {/* Central Road Strip (~27svh desktop / ~22svh mobile) with Mint Trail Mask */}
        <Road
          roadRef={roadStripRef}
          trailRef={trailRef}
          counterHeadlineRef={counterHeadlineRef}
          ghostHeadlineRef={ghostHeadlineRef}
          className="z-15"
        />

        {/* Car Component (Centered vertically on road center line) */}
        <Car
          ref={carRef}
          shadowRef={carShadowRef}
          streaksRef={streaksRef}
          className="z-20 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
        />

        {/* Canopy Foliage Layer (Overlaps road edges, ABOVE car in z-index) */}
        <Canopy className="z-30" />

        {/* 4 Stat Cards in Staggered Diagonal Zig-Zag Layout */}
        <div className="pointer-events-none absolute inset-0 z-35">
          {STAT_CARDS_DATA.map((card) => (
            <StatCard key={card.id} card={card} />
          ))}
        </div>

        {/* Cinematic Scroll Hint (Bottom Center) */}
        <div
          ref={scrollHintRef}
          className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase font-bold tracking-[0.32em] text-white/50">
            SCROLL
          </span>
          <div className="h-6 w-[1.5px] overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-full bg-[#50EF7E] animate-bounce" />
          </div>
        </div>
      </section>

      {/* Next Section (100vh buffer so unpinning feels natural and clean) */}
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
