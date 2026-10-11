"use client";

import { forwardRef } from "react";

export const Canopy = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
        style={{ zIndex: 8 }}
        aria-hidden="true"
      >
        {/* Cluster 1: Top road edge canopy (overlapping top road edge only, never headline zone) */}
        <div
          data-canopy="1"
          className="absolute -top-12 left-[12%] h-[240px] w-[340px]"
          style={{
            background: `
              radial-gradient(circle 120px at 45% 35%, #181A0E 0%, transparent 80%),
              radial-gradient(circle 100px at 70% 55%, #232815 0%, transparent 75%),
              radial-gradient(circle 80px at 25% 65%, #2F311A 0%, transparent 70%)
            `,
            opacity: 0.95,
            willChange: "transform",
          }}
        />

        {/* Cluster 2: Bottom road edge canopy (overlapping bottom road edge only) */}
        <div
          data-canopy="2"
          className="absolute -bottom-16 left-[56%] h-[260px] w-[380px]"
          style={{
            background: `
              radial-gradient(circle 140px at 50% 65%, #181A0E 0%, transparent 80%),
              radial-gradient(circle 110px at 25% 45%, #232815 0%, transparent 75%),
              radial-gradient(circle 90px at 75% 40%, #2F311A 0%, transparent 70%)
            `,
            opacity: 0.95,
            willChange: "transform",
          }}
        />

        {/* Cluster 3: Subtle accent foliage on far right road edge */}
        <div
          data-canopy="3"
          className="absolute -top-10 right-[6%] h-[200px] w-[280px]"
          style={{
            background: `
              radial-gradient(circle 100px at 40% 40%, #1A1D10 0%, transparent 80%),
              radial-gradient(circle 80px at 70% 60%, #252A16 0%, transparent 75%)
            `,
            opacity: 0.92,
            willChange: "transform",
          }}
        />
      </div>
    );
  }
);

Canopy.displayName = "Canopy";
export default Canopy;
