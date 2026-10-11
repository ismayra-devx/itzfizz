"use client";

import { forwardRef } from "react";
import Headline from "./Headline";

interface RoadProps {
  className?: string;
  roadRef?: React.RefObject<HTMLDivElement | null>;
  trailRef?: React.RefObject<HTMLDivElement | null>;
  counterHeadlineRef?: React.RefObject<HTMLDivElement | null>;
  ghostHeadlineRef?: React.RefObject<HTMLHeadingElement | null>;
}

// Exactly 30 leaf specks (#45342F / #5C6B2A) scattered on the road surface
const ROAD_LEAF_SPECKS = [
  { id: 1, top: "18%", left: "7%", size: 3.2, color: "#45342F", speed: "slow", rot: 24 },
  { id: 2, top: "74%", left: "11%", size: 4.0, color: "#5C6B2A", speed: "fast", rot: 115 },
  { id: 3, top: "28%", left: "15%", size: 2.8, color: "#45342F", speed: "slow", rot: 48 },
  { id: 4, top: "82%", left: "19%", size: 3.5, color: "#5C6B2A", speed: "fast", rot: 192 },
  { id: 5, top: "14%", left: "24%", size: 3.0, color: "#5C6B2A", speed: "slow", rot: 76 },
  { id: 6, top: "68%", left: "28%", size: 4.2, color: "#45342F", speed: "fast", rot: 230 },
  { id: 7, top: "22%", left: "32%", size: 2.5, color: "#45342F", speed: "slow", rot: 15 },
  { id: 8, top: "86%", left: "36%", size: 3.6, color: "#5C6B2A", speed: "fast", rot: 310 },
  { id: 9, top: "16%", left: "41%", size: 3.4, color: "#45342F", speed: "slow", rot: 88 },
  { id: 10, top: "72%", left: "45%", size: 4.0, color: "#5C6B2A", speed: "fast", rot: 142 },
  { id: 11, top: "26%", left: "49%", size: 2.7, color: "#45342F", speed: "slow", rot: 215 },
  { id: 12, top: "80%", left: "53%", size: 3.2, color: "#5C6B2A", speed: "fast", rot: 65 },
  { id: 13, top: "15%", left: "57%", size: 3.8, color: "#45342F", speed: "slow", rot: 177 },
  { id: 14, top: "70%", left: "61%", size: 2.8, color: "#5C6B2A", speed: "fast", rot: 290 },
  { id: 15, top: "24%", left: "65%", size: 3.5, color: "#45342F", speed: "slow", rot: 42 },
  { id: 16, top: "84%", left: "69%", size: 4.1, color: "#5C6B2A", speed: "fast", rot: 120 },
  { id: 17, top: "19%", left: "73%", size: 2.9, color: "#45342F", speed: "slow", rot: 204 },
  { id: 18, top: "76%", left: "77%", size: 3.3, color: "#5C6B2A", speed: "fast", rot: 335 },
  { id: 19, top: "25%", left: "81%", size: 3.6, color: "#45342F", speed: "slow", rot: 95 },
  { id: 20, top: "83%", left: "85%", size: 4.0, color: "#5C6B2A", speed: "fast", rot: 158 },
  { id: 21, top: "17%", left: "89%", size: 2.6, color: "#45342F", speed: "slow", rot: 28 },
  { id: 22, top: "71%", left: "93%", size: 3.7, color: "#5C6B2A", speed: "fast", rot: 245 },
  { id: 23, top: "29%", left: "97%", size: 3.1, color: "#45342F", speed: "slow", rot: 180 },
  { id: 24, top: "78%", left: "6%", size: 4.2, color: "#5C6B2A", speed: "fast", rot: 312 },
  { id: 25, top: "12%", left: "17%", size: 2.8, color: "#45342F", speed: "slow", rot: 83 },
  { id: 26, top: "85%", left: "40%", size: 3.5, color: "#5C6B2A", speed: "fast", rot: 167 },
  { id: 27, top: "21%", left: "63%", size: 3.0, color: "#45342F", speed: "slow", rot: 52 },
  { id: 28, top: "75%", left: "87%", size: 4.0, color: "#5C6B2A", speed: "fast", rot: 228 },
  { id: 29, top: "15%", left: "51%", size: 2.9, color: "#45342F", speed: "slow", rot: 139 },
  { id: 30, top: "82%", left: "95%", size: 3.4, color: "#5C6B2A", speed: "fast", rot: 274 },
];

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
        style={{ zIndex: 2, willChange: "transform" }}
      >
        {/* Road Strip Container (asphalt #4A433C) */}
        <div
          ref={roadRef}
          className="absolute inset-0 origin-left overflow-hidden"
          style={{
            zIndex: 2,
            backgroundColor: "#4A433C",
            backgroundImage:
              "linear-gradient(180deg, rgba(88,80,72,0.4) 0%, rgba(74,67,60,0.1) 40%, rgba(46,41,36,0.6) 80%, rgba(32,28,24,0.9) 100%)",
            willChange: "transform",
          }}
        >
          {/* Faint road edge lines rgba(216,216,208,.35) */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-[rgba(216,216,208,0.35)]"
            style={{ zIndex: 6 }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-[rgba(216,216,208,0.35)]"
            style={{ zIndex: 6 }}
            aria-hidden="true"
          />

          {/* Double yellow center line running full width */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col gap-[4px] items-center"
            style={{ zIndex: 2 }}
            aria-hidden="true"
          >
            <div className="h-[3px] w-full bg-[#C9984F]/90" />
            <div className="h-[3px] w-full bg-[#C9984F]/90" />
          </div>

          {/* z-3: GHOST HEADLINE COPY (Underneath road trail, transparent fill, -webkit-text-stroke) */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ zIndex: 3 }}
            aria-hidden="true"
          >
            <Headline ref={ghostHeadlineRef} variant="ghost" ariaHidden={true} />
          </div>

          {/* z-4: TRAIL CLIP (position: absolute; inset: 0; overflow: hidden) */}
          <div
            className="trailClip pointer-events-none absolute inset-0 overflow-hidden"
            style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 4 }}
            aria-hidden="true"
          >
            {/* TRAIL (background #50EF7E; width: 100%; height: 100%; will-change: transform) */}
            <div
              ref={trailRef}
              className="trail absolute inset-0 w-full h-full"
              style={{
                backgroundColor: "#50EF7E",
                width: "100%",
                height: "100%",
                willChange: "transform",
              }}
            >
              {/* SOLID HEADLINE (solid #010200 text, centered, same size/position as ghost headline) */}
              <div
                ref={counterHeadlineRef}
                className="solidHeadline absolute inset-0 flex items-center justify-center w-full h-full"
                style={{ willChange: "transform" }}
              >
                <Headline variant="solid" />
              </div>
            </div>
          </div>

          {/* z-5: ROAD LEAF SPECKS (~30 specks, #45342F / #5C6B2A, drifting left with scroll via transform only) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 5 }}>
            {ROAD_LEAF_SPECKS.map((speck) => (
              <div
                key={speck.id}
                data-speck={speck.speed}
                className="absolute rounded-full"
                style={{
                  top: speck.top,
                  left: speck.left,
                  width: `${speck.size}px`,
                  height: `${speck.size * 0.8}px`,
                  backgroundColor: speck.color,
                  opacity: 0.85,
                  transform: `rotate(${speck.rot}deg)`,
                  willChange: "transform",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

Road.displayName = "Road";
export default Road;
