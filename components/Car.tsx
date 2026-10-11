"use client";

import { forwardRef } from "react";

// Base path helper supporting both local development and GitHub Pages (/itzfizz)
const getBasePath = () => {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH !== undefined) {
    return process.env.NEXT_PUBLIC_BASE_PATH;
  }
  return typeof window !== "undefined" && window.location.pathname.startsWith("/itzfizz")
    ? "/itzfizz"
    : "";
};

export const CAR_SRC = `${getBasePath()}/car-right.webp`;
export const CAR_MOBILE_SRC = `${getBasePath()}/car-right-mobile.webp`;

interface CarProps {
  className?: string;
  shadowRef?: React.RefObject<HTMLDivElement | null>;
  streaksRef?: React.RefObject<HTMLDivElement | null>;
  /** 'start' = positioned on left ready for scroll; 'parked' = right edge; 'custom' = custom positioning */
  mode?: "start" | "parked" | "custom";
}

export const Car = forwardRef<HTMLDivElement, CarProps>(
  ({ className = "", shadowRef, streaksRef, mode = "start" }, ref) => {
    // Positioning mode:
    // 'start': At its scroll start position (left portion of the road strip)
    // 'parked': At the right edge with only its rear visible
    const placement =
      mode === "parked"
        ? "right-0 translate-x-[55%] max-md:translate-x-[45%]"
        : mode === "start"
        ? "left-0 translate-x-[4vw] max-md:translate-x-[2vw]"
        : "";

    return (
      <div
        ref={ref}
        data-car-container
        className={`pointer-events-none absolute select-none z-50 ${placement} ${className}`}
        style={{
          width: "clamp(280px, 26vw, 480px)",
          aspectRatio: "2.02 / 1",
          transformOrigin: "center center",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        {/* Contact shadow (z-10 inside car container, light from upper-left) */}
        <div
          ref={shadowRef}
          className="pointer-events-none absolute inset-0 -z-10 translate-x-[2%] translate-y-[8%] scale-x-95 scale-y-80"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(10, 9, 7, 0.75) 0%, rgba(10, 9, 7, 0.45) 45%, transparent 72%)",
            willChange: "transform",
          }}
        />

        {/* Speed streaks behind the car (z-10 inside car, hidden during load & static idle) */}
        <div
          ref={streaksRef}
          className="pointer-events-none absolute top-1/2 -left-16 -translate-y-1/2 flex flex-col gap-3.5 opacity-0 pointer-events-none z-10"
          style={{ willChange: "transform, opacity", transformOrigin: "right center" }}
        >
          <div className="h-[1.5px] w-20 rounded-full bg-gradient-to-l from-white/70 to-transparent" />
          <div className="h-[2px] w-28 rounded-full bg-gradient-to-l from-[#50EF7E]/90 to-transparent" />
          <div className="h-[1.5px] w-16 rounded-full bg-gradient-to-l from-white/70 to-transparent" />
        </div>

        {/* Car Image with picture element for responsive srcset (z-20 inside car) */}
        <picture className="block h-full w-full relative z-20">
          <source media="(max-width: 767px)" srcSet={`${getBasePath()}/car-right-mobile.webp`} />
          <img
            src={`${getBasePath()}/car-right.webp`}
            alt="Silver Supercar top view"
            className="h-full w-full object-contain"
            loading="eager"
            decoding="async"
            draggable={false}
          />
        </picture>
      </div>
    );
  }
);

Car.displayName = "Car";
export default Car;
