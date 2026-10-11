"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Scene from "./Scene";
import Canopy from "./Canopy";
import Road from "./Road";
import Car from "./Car";
import StatCard, { STAT_CARDS_DATA } from "./StatCard";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
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
    let restTimer: NodeJS.Timeout | null = null;

    // Check user preference for reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Wrap all GSAP animations in gsap.context with containerRef scoping
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const heroSection = heroSectionRef.current;
      if (!container || !heroSection) return;

      const ghostLetters = container.querySelectorAll<HTMLElement>("[data-ghost-letter]");
      const cardEls = container.querySelectorAll<HTMLElement>("[data-card-id]");
      const slowSpecks = container.querySelectorAll<HTMLElement>('[data-speck="slow"]');
      const fastSpecks = container.querySelectorAll<HTMLElement>('[data-speck="fast"]');
      const canopy1 = container.querySelector<HTMLElement>('[data-canopy="1"]');
      const canopy2 = container.querySelector<HTMLElement>('[data-canopy="2"]');
      const canopy3 = container.querySelector<HTMLElement>('[data-canopy="3"]');

      if (prefersReduced) {
        // Reduced motion: skip pin and show final resting state immediately
        gsap.set([sceneRef.current, canopyRef.current, roadStripRef.current], {
          opacity: 1,
          scaleX: 1,
        });
        gsap.set(ghostLetters, { yPercent: 0 });
        gsap.set(scrollHintRef.current, { opacity: 0 });
        gsap.set(trailRef.current, { xPercent: 0 });
        gsap.set(counterHeadlineRef.current, { xPercent: 0 });

        // Park car at right edge
        const carWidth = carRef.current ? carRef.current.offsetWidth : 360;
        const leftOffset =
          window.innerWidth < 768 ? window.innerWidth * 0.02 : window.innerWidth * 0.04;
        gsap.set(carRef.current, {
          xPercent: 0,
          x: window.innerWidth - leftOffset - carWidth * 0.35,
          rotation: 0,
        });

        // Activate all cards in final state
        cardEls.forEach((cardEl) => {
          const fill = cardEl.querySelector<HTMLElement>("[data-card-fill]");
          const num = cardEl.querySelector<HTMLElement>("[data-card-number]");
          const target = cardEl.getAttribute("data-card-target");
          const bg = cardEl.getAttribute("data-card-bg");
          const text = cardEl.getAttribute("data-card-text");
          if (fill) gsap.set(fill, { scaleX: 1 });
          if (num && target) num.textContent = `${target}%`;
          if (bg) cardEl.style.backgroundColor = bg;
          if (text) cardEl.style.color = text;
        });
        return;
      }

      // ─── 1. INITIAL HIDDEN STATES (Before first paint - No FOUC) ─────────
      gsap.set([sceneRef.current, canopyRef.current], { opacity: 0 });
      gsap.set(roadStripRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });
      gsap.set(ghostLetters, { yPercent: 110 });
      gsap.set(cardEls, {
        opacity: 0,
        scale: 0.94,
        transformOrigin: "center center",
      });
      // Car starts off-screen left during load
      gsap.set(carRef.current, {
        xPercent: -150,
        x: 0,
        rotation: 0,
      });
      if (streaksRef.current) {
        gsap.set(streaksRef.current, { scaleX: 0, opacity: 0 });
      }
      gsap.set(scrollHintRef.current, { opacity: 0, y: 12 });

      // Trail starts hidden to the left; solid headline counter-translates
      gsap.set(trailRef.current, { xPercent: -100 });
      gsap.set(counterHeadlineRef.current, { xPercent: 100 });

      // ─── 2. TIMELINE A: MASTER LOAD CHOREOGRAPHY (~2.4s) ────────────────
      const loadTl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Ground verges & canopies fade up, road strip draws in left to right
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

      // Ghost outlined letters rise from asphalt masks
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

      // Cards enter in dim outlined inactive state
      loadTl.to(
        cardEls,
        {
          opacity: 1,
          scale: 1,
          duration: 0.65,
          ease: "power3.out",
          stagger: 0.12,
        },
        0.9
      );

      // Car rolls in from off-screen left to its start position
      let idleRumble: gsap.core.Tween | null = null;
      loadTl.to(
        carRef.current,
        {
          xPercent: 0,
          duration: 1.1,
          ease: "power3.out",
          onComplete: () => {
            // Idle rumble loop (±0.6px) at start position
            idleRumble = gsap.to(carRef.current, {
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

      // SCROLL hint fades in
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

      // ─── 3. B.4 VELOCITY QUICKTO CONTROLLERS (Clamped & Eased) ──────────
      // Fast, non-allocating velocity tween targets using gsap.quickTo
      const carRotateTo = gsap.quickTo(carRef.current, "rotation", {
        duration: 0.35,
        ease: "power2.out",
      });
      const streakScaleTo = streaksRef.current
        ? gsap.quickTo(streaksRef.current, "scaleX", {
            duration: 0.3,
            ease: "power2.out",
          })
        : null;
      const streakOpacityTo = streaksRef.current
        ? gsap.quickTo(streaksRef.current, "opacity", {
            duration: 0.25,
            ease: "power2.out",
          })
        : null;

      // ─── 4. TIMELINE B: SCROLL-DRIVEN SCRUBBED TIMELINE ─────────────────
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: () => (window.innerWidth < 768 ? "+=250%" : "+=350%"),
          pin: true,
          pinSpacing: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Idle rumble toggle
            if (idleRumble) {
              if (self.progress > 0.01 && idleRumble.isActive()) {
                idleRumble.pause();
              } else if (self.progress <= 0.01 && !idleRumble.isActive()) {
                idleRumble.play();
              }
            }

            // B.4 Velocity calculation (no layout reads, purely from ScrollTrigger)
            const velocity = self.getVelocity();

            // Clamped car tilt: ±1.5deg
            const clampedTilt = gsap.utils.clamp(-1.5, 1.5, (velocity / 1200) * 1.2);
            carRotateTo(clampedTilt);

            // Clamped speed streaks behind the car (scaleX 0->1)
            const speedRatio = gsap.utils.clamp(0, 1, Math.abs(velocity) / 1600);
            if (streakScaleTo) streakScaleTo(speedRatio);
            if (streakOpacityTo) streakOpacityTo(speedRatio > 0.04 ? speedRatio * 0.95 : 0);

            // Ease back to rest when scrolling stops
            if (restTimer) clearTimeout(restTimer);
            restTimer = setTimeout(() => {
              carRotateTo(0);
              if (streakScaleTo) streakScaleTo(0);
              if (streakOpacityTo) streakOpacityTo(0);
            }, 80);
          },
        },
      });

      // B.5 Scroll hint fades out immediately on initial scroll
      scrollTl.to(
        scrollHintRef.current,
        {
          opacity: 0,
          y: -12,
          duration: 6,
          ease: "power1.out",
        },
        0
      );

      // B.1 Car travel from start position across the road to right edge
      // Function-based value so window resize is dynamically supported
      scrollTl.to(
        carRef.current,
        {
          x: () => {
            const carEl = carRef.current;
            const carWidth = carEl ? carEl.offsetWidth : 360;
            const leftOffset =
              window.innerWidth < 768
                ? window.innerWidth * 0.02
                : window.innerWidth * 0.04;
            return window.innerWidth - leftOffset - carWidth * 0.35;
          },
          ease: "none",
          duration: 100,
        },
        0
      );

      // B.2 Counter-translating mint trail reveal locked to car rear edge
      scrollTl.to(
        trailRef.current,
        {
          xPercent: 0,
          ease: "none",
          duration: 100,
        },
        0
      );

      scrollTl.to(
        counterHeadlineRef.current,
        {
          xPercent: 0,
          ease: "none",
          duration: 100,
        },
        0
      );

      // B.5 Ground life specks drift LEFT at two different speeds (transform only)
      if (slowSpecks.length > 0) {
        scrollTl.to(
          slowSpecks,
          {
            x: "-8vw",
            ease: "none",
            duration: 100,
          },
          0
        );
      }

      if (fastSpecks.length > 0) {
        scrollTl.to(
          fastSpecks,
          {
            x: "-18vw",
            ease: "none",
            duration: 100,
          },
          0
        );
      }

      // B.5 Canopy layers parallax drift (-2vw to -5vw across scroll, transform only)
      if (canopy1) {
        scrollTl.to(canopy1, { x: "-2.5vw", ease: "none", duration: 100 }, 0);
      }
      if (canopy2) {
        scrollTl.to(canopy2, { x: "-5vw", ease: "none", duration: 100 }, 0);
      }
      if (canopy3) {
        scrollTl.to(canopy3, { x: "-3.5vw", ease: "none", duration: 100 }, 0);
      }

      // B.3 Card activations at exact thresholds: 28% -> 44% -> 61% -> 78%
      const cardActivationWindow = 7;

      STAT_CARDS_DATA.forEach((cardData) => {
        const cardEl = container.querySelector<HTMLElement>(
          `[data-card-id="${cardData.id}"]`
        );
        if (!cardEl) return;

        const fillLayer = cardEl.querySelector<HTMLElement>("[data-card-fill]");
        const numberEl = cardEl.querySelector<HTMLElement>("[data-card-number]");
        const captionEl = cardEl.querySelector<HTMLElement>("[data-card-caption]");

        const startTime = cardData.threshold * 100;
        const countObj = { val: 0 };

        // 1. Color-fill layer sweep: scaleX 0 -> 1 (origin left)
        if (fillLayer) {
          scrollTl.to(
            fillLayer,
            {
              scaleX: 1,
              duration: cardActivationWindow,
              ease: "power2.out",
            },
            startTime
          );
        }

        // 2. Card border tint flip
        scrollTl.to(
          cardEl,
          {
            borderColor: "rgba(0,0,0,0.08)",
            duration: cardActivationWindow,
            ease: "power2.out",
          },
          startTime
        );

        // 3. Subtle scale pulse: 1 -> 1.04 -> 1
        scrollTl
          .to(
            cardEl,
            {
              scale: 1.04,
              duration: cardActivationWindow * 0.5,
              ease: "power1.out",
            },
            startTime
          )
          .to(
            cardEl,
            {
              scale: 1,
              duration: cardActivationWindow * 0.5,
              ease: "power1.in",
            },
            startTime + cardActivationWindow * 0.5
          );

        // 4. Text color flip
        if (numberEl) {
          scrollTl.to(
            numberEl,
            {
              color: cardData.textColor,
              duration: cardActivationWindow,
              ease: "power2.out",
            },
            startTime
          );
        }

        if (captionEl) {
          scrollTl.to(
            captionEl,
            {
              color: cardData.captionColor,
              duration: cardActivationWindow,
              ease: "power2.out",
            },
            startTime
          );
        }

        // 5. Reversible number count-up: 0 -> target
        if (numberEl) {
          scrollTl.to(
            countObj,
            {
              val: cardData.target,
              duration: cardActivationWindow,
              ease: "power2.out",
              onUpdate: () => {
                numberEl.textContent = `${Math.round(countObj.val)}${cardData.suffix}`;
              },
            },
            startTime
          );
        }
      });
    }, containerRef);

    // Clean up all GSAP timelines, quickTo instances, and timers on unmount
    return () => {
      if (restTimer) clearTimeout(restTimer);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full bg-[#1F2316] select-none">
      {/* 1. Static Cinematic Overlays: Vignette & Soft-Light SVG Grain (Nothing animates) */}
      <div className="scene-grain" aria-hidden="true" />
      <div className="scene-vignette" aria-hidden="true" />

      {/* Hero Viewport (100svh screen pinned during scroll) */}
      <section
        ref={heroSectionRef}
        className="relative h-[100svh] w-full overflow-hidden flex items-center justify-center"
      >
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
