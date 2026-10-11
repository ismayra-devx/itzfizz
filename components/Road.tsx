"use client";

import { forwardRef } from "react";
import Headline from "./Headline";

interface RoadProps {
  className?: string;
  roadRef?: React.RefObject<HTMLDivElement | null>;
  trailRef?: React.RefObject<HTMLDivElement | null>;
  counterHeadlineRef?: React.RefObject<HTMLDivElement | null>;
  ghostHeadlineRef?: React.RefObject<HTMLDivElement | null>;
}

export const Road = forwardRef<HTMLDivElement, RoadProps>(
  (
    {
      className = "",
      roadRef,
      trailRef,
      counterHeadlineRef,
      ghostHeadlineRef,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`relative w-full h-[27svh] max-sm:h-[22svh] flex items-center justify-center select-none ${className}`}
        style={{ willChange: "transform" }}
      >
        {/* Animated Road Strip Container (draws in scaleX 0->1 during load) */}
        <div
          ref={roadRef}
          className="absolute inset-0 origin-left overflow-hidden border-y border-[#38312A]/80 shadow-[0_15px_40px_rgba(0,0,0,0.45)]"
          style={{
            backgroundColor: "#4A433C",
            // Darker shadow gradient on lower half + subtle edge wear
            backgroundImage:
              "linear-gradient(180deg, rgba(88,80,72,0.4) 0%, rgba(74,67,60,0.1) 40%, rgba(46,41,36,0.6) 80%, rgba(32,28,24,0.9) 100%)",
            willChange: "transform",
          }}
        >
          {/* Muted-amber DOUBLE YELLOW center line running full width */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col gap-[4px] items-center"
            aria-hidden="true"
          >
            <div className="h-[3px] w-full bg-[#C9984F]/90 shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
            <div className="h-[3px] w-full bg-[#C9984F]/90 shadow-[0_1px_2px_rgba(0,0,0,0.3)]" />
          </div>

          {/* GHOST HEADLINE (underneath the trail layer) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <Headline ref={ghostHeadlineRef} variant="ghost" />
          </div>

          {/* MINT TRAIL REVEAL SYSTEM */}
          {/* Outer wrapper: fixed full-width, overflow hidden */}
          <div
            className="pointer-events-none absolute inset-0 overflow-hidden z-20"
            aria-hidden="true"
          >
            {/* Trail Layer: translates -100% -> 0% tied to car progress */}
            <div
              ref={trailRef}
              className="absolute inset-0 w-full h-full bg-[#50EF7E] shadow-[0_0_50px_rgba(80,239,126,0.35)]"
              style={{
                transform: "translateX(-100%)",
                willChange: "transform",
              }}
            >
              {/* Counter-translating solid text layer: translates +100% -> 0% to remain optically stationary */}
              <div
                ref={counterHeadlineRef}
                className="absolute inset-0 flex items-center justify-center w-full h-full"
                style={{
                  transform: "translateX(100%)",
                  willChange: "transform",
                }}
              >
                <Headline variant="solid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Road.displayName = "Road";
export default Road;
