"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";
import Scene from "./Scene";
import Canopy from "./Canopy";
import Road from "./Road";
import Car from "./Car";
import StatCard, { STAT_CARDS_DATA } from "./StatCard";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const canopyRef = useRef<HTMLDivElement>(null);
  const roadStripRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const counterHeadlineRef = useRef<HTMLDivElement>(null);
  const ghostHeadlineRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const carShadowRef = useRef<HTMLDivElement>(null);
  const streaksRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Check user preference for reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Wrap all GSAP animations in gsap.context with containerRef scoping
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      const ghostLetters = container.querySelectorAll<HTMLElement>("[data-ghost-letter]");
      const cards = container.querySelectorAll<HTMLElement>("[data-card-id]");

      if (prefersReduced) {
        // Skip animation and immediately show settled load state
        gsap.set([sceneRef.current, canopyRef.current, scrollHintRef.current], {
          opacity: 1,
        });
        gsap.set(roadStripRef.current, { scaleX: 1 });
        gsap.set(ghostLetters, { yPercent: 0 });
        gsap.set(cards, { opacity: 1, scale: 1 });
        gsap.set(carRef.current, { xPercent: 0, x: 0 });
        return;
      }

      // ─── SET HIDDEN INITIAL STATES (Before first paint - No FOUC) ───────
      gsap.set([sceneRef.current, canopyRef.current], { opacity: 0 });
      gsap.set(roadStripRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(ghostLetters, { yPercent: 110 });
      gsap.set(cards, {
        opacity: 0,
        scale: 0.94,
        transformOrigin: "center center",
      });
      // Car starts off-screen left (nose facing right)
      gsap.set(carRef.current, {
        xPercent: -150,
      });
      gsap.set(scrollHintRef.current, { opacity: 0, y: 12 });

      // ─── MASTER LOAD TIMELINE A (~2.4s, no scroll lock) ─────────────────
      const loadTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 1. Ground verges and canopies fade up; road strip draws in left to right
      loadTl
        .to(
          [sceneRef.current, canopyRef.current],
          {
            opacity: 1,
            duration: 0.85,
            ease: "power2.out",
          },
          0
        )
        .to(
          roadStripRef.current,
          {
            scaleX: 1,
            duration: 1.15,
            ease: "expo.inOut",
          },
          0.1
        );

      // 2. Ghost outlined headline letters rise from mask on the asphalt
      loadTl.to(
        ghostLetters,
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.045,
        },
        0.5
      );

      // 3. The 4 cards enter ONE BY ONE in DIM inactive state (.94 -> 1, opacity 0 -> 1)
      loadTl.to(
        cards,
        {
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.12,
        },
        0.9
      );

      // 4. The car rolls in from off-screen left to its start position
      loadTl.to(
        carRef.current,
        {
          xPercent: 0,
          duration: 1.1,
          ease: "power3.out",
          onComplete: () => {
            // Idle rumble loop (±0.6px) once car reaches start position
            gsap.to(carRef.current, {
              y: "+=0.6",
              yoyo: true,
              repeat: -1,
              duration: 0.12,
              ease: "sine.inOut",
            });
          },
        },
        1.2
      );

      // 5. SCROLL hint fades in
      loadTl.to(
        scrollHintRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        1.8
      );
    }, containerRef);

    // Clean up all GSAP tweens, timelines, and loops on unmount
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#1F2316] select-none">
      {/* 1. Static Cinematic Overlays: Vignette & Soft-Light SVG Grain (Nothing animates) */}
      <div className="scene-grain" aria-hidden="true" />
      <div className="scene-vignette" aria-hidden="true" />

      {/* Hero Viewport (100svh screen) */}
      <section className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center">
        {/* 2. Drone Aerial Scene: Foliage Verges & Leaf Specks */}
        <Scene ref={sceneRef} />

        {/* 3. Central Road Strip (~27svh desktop / ~22svh mobile) with Mint Trail Mask */}
        <Road
          roadRef={roadStripRef}
          trailRef={trailRef}
          counterHeadlineRef={counterHeadlineRef}
          ghostHeadlineRef={ghostHeadlineRef}
          mode="interactive"
          className="z-10"
        />

        {/* 4. Real Supercar from /car-right.webp at its scroll start position on the road */}
        <Car
          ref={carRef}
          shadowRef={carShadowRef}
          streaksRef={streaksRef}
          mode="start"
          className="top-1/2 -translate-y-1/2 z-20"
        />

        {/* 5. Canopy Foliage Layer (Overlaps road edges, ABOVE car in z-index) */}
        <Canopy ref={canopyRef} className="z-30" />

        {/* 6. Four Stat Cards in Staggered Diagonal Zig-Zag Layout (Dim Inactive State) */}
        <div className="pointer-events-none absolute inset-0 z-25">
          {STAT_CARDS_DATA.map((card) => (
            <StatCard key={card.id} card={card} state="inactive" />
          ))}
        </div>

        {/* 7. SCROLL Hint (Bottom Center) */}
        <div
          ref={scrollHintRef}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-35 flex flex-col items-center gap-1.5"
          aria-hidden="true"
        >
          <span className="text-[10px] uppercase font-extrabold tracking-[0.32em] text-white/50">
            SCROLL
          </span>
          <div className="h-5 w-[1.5px] overflow-hidden rounded-full bg-white/20">
            <div className="h-2 w-full bg-[#50EF7E] rounded-full animate-bounce" />
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
