"use client";

import { forwardRef } from "react";
import { TOP_VERGE_DATA, BOTTOM_VERGE_DATA } from "@/lib/foliage";

export const Scene = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {/* Ground Base (z-index: 0, #1F2316 flat tone) */}
        <div className="absolute inset-0 bg-[#1F2316]" style={{ zIndex: 0 }} />

        {/* TOP VERGE (z-index: 1, ONE inline SVG, deterministic seeded ~120 circles/ellipses + #45342F leaf litter) */}
        <div
          className="absolute top-0 inset-x-0 h-[calc(50svh-13.5svh+2px)] max-sm:h-[calc(50svh-11svh+2px)] overflow-hidden"
          style={{ zIndex: 1 }}
        >
          <svg
            viewBox="0 0 1440 360"
            preserveAspectRatio="none"
            className="w-full h-full block"
            aria-hidden="true"
          >
            {/* Layer 1: Base dark foliage blobs (#1F2316) */}
            <g>
              {TOP_VERGE_DATA.baseShapes.map((s) => (
                <ellipse
                  key={s.id}
                  cx={s.cx}
                  cy={s.cy}
                  rx={s.rx}
                  ry={s.ry}
                  fill={s.fill}
                  opacity={s.opacity}
                />
              ))}
            </g>

            {/* Layer 2: Mid-tone foliage clusters (#2F311A) */}
            <g>
              {TOP_VERGE_DATA.midShapes.map((s) => (
                <ellipse
                  key={s.id}
                  cx={s.cx}
                  cy={s.cy}
                  rx={s.rx}
                  ry={s.ry}
                  fill={s.fill}
                  opacity={s.opacity}
                />
              ))}
            </g>

            {/* Reddish leaf-litter strip along road edge (#45342F, ~3svh tall, irregular edge) */}
            <path d={TOP_VERGE_DATA.leafLitterPath} fill="#45342F" opacity="0.95" />

            {/* Layer 3: Highlight speckles (#5C6B2A at 35% opacity, calmer behind cards) */}
            <g>
              {TOP_VERGE_DATA.highlightShapes.map((s) => (
                <ellipse
                  key={s.id}
                  cx={s.cx}
                  cy={s.cy}
                  rx={s.rx}
                  ry={s.ry}
                  fill={s.fill}
                  opacity={s.opacity}
                />
              ))}
            </g>
          </svg>
        </div>

        {/* BOTTOM VERGE (z-index: 1, ONE inline SVG, deterministic seeded ~120 circles/ellipses + #45342F leaf litter) */}
        <div
          className="absolute bottom-0 inset-x-0 h-[calc(50svh-13.5svh+2px)] max-sm:h-[calc(50svh-11svh+2px)] overflow-hidden"
          style={{ zIndex: 1 }}
        >
          <svg
            viewBox="0 0 1440 360"
            preserveAspectRatio="none"
            className="w-full h-full block"
            aria-hidden="true"
          >
            {/* Layer 1: Base dark foliage blobs (#1F2316) */}
            <g>
              {BOTTOM_VERGE_DATA.baseShapes.map((s) => (
                <ellipse
                  key={s.id}
                  cx={s.cx}
                  cy={s.cy}
                  rx={s.rx}
                  ry={s.ry}
                  fill={s.fill}
                  opacity={s.opacity}
                />
              ))}
            </g>

            {/* Layer 2: Mid-tone foliage clusters (#2F311A) */}
            <g>
              {BOTTOM_VERGE_DATA.midShapes.map((s) => (
                <ellipse
                  key={s.id}
                  cx={s.cx}
                  cy={s.cy}
                  rx={s.rx}
                  ry={s.ry}
                  fill={s.fill}
                  opacity={s.opacity}
                />
              ))}
            </g>

            {/* Reddish leaf-litter strip along road edge (#45342F, ~3svh tall, irregular edge) */}
            <path d={BOTTOM_VERGE_DATA.leafLitterPath} fill="#45342F" opacity="0.95" />

            {/* Layer 3: Highlight speckles (#5C6B2A at 35% opacity, calmer behind cards) */}
            <g>
              {BOTTOM_VERGE_DATA.highlightShapes.map((s) => (
                <ellipse
                  key={s.id}
                  cx={s.cx}
                  cy={s.cy}
                  rx={s.rx}
                  ry={s.ry}
                  fill={s.fill}
                  opacity={s.opacity}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>
    );
  }
);

Scene.displayName = "Scene";
export default Scene;
