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
        {/* Cluster 1: Foliage cluster overlapping TOP road edge only (never headline zone) */}
        <div
          data-canopy="1"
          className="absolute left-[14%] w-[320px] max-sm:w-[200px] h-[90px] max-sm:h-[65px]"
          style={{
            top: "calc(50% - 13.5svh - 45px)",
            willChange: "transform",
          }}
        >
          <svg viewBox="0 0 320 90" className="w-full h-full block overflow-visible">
            {/* Organic dark canopy leaves overlapping the top road edge */}
            <ellipse cx="60" cy="40" rx="65" ry="32" fill="#181A0E" opacity="0.96" />
            <ellipse cx="140" cy="45" rx="75" ry="38" fill="#1F2316" opacity="0.94" />
            <ellipse cx="230" cy="42" rx="70" ry="34" fill="#181A0E" opacity="0.95" />
            <ellipse cx="100" cy="55" rx="55" ry="26" fill="#252A15" opacity="0.9" />
            <ellipse cx="180" cy="58" rx="60" ry="28" fill="#2F311A" opacity="0.88" />
            <ellipse cx="150" cy="68" rx="35" ry="18" fill="#232815" opacity="0.92" />
            <circle cx="85" cy="62" r="8" fill="#5C6B2A" opacity="0.35" />
            <circle cx="210" cy="60" r="7" fill="#5C6B2A" opacity="0.35" />
          </svg>
        </div>

        {/* Cluster 2: Foliage cluster overlapping BOTTOM road edge only (never headline zone) */}
        <div
          data-canopy="2"
          className="absolute left-[54%] w-[340px] max-sm:w-[220px] h-[95px] max-sm:h-[70px]"
          style={{
            top: "calc(50% + 13.5svh - 45px)",
            willChange: "transform",
          }}
        >
          <svg viewBox="0 0 340 95" className="w-full h-full block overflow-visible">
            {/* Organic dark canopy leaves overlapping the bottom road edge */}
            <ellipse cx="80" cy="50" rx="75" ry="36" fill="#181A0E" opacity="0.96" />
            <ellipse cx="170" cy="45" rx="80" ry="38" fill="#1F2316" opacity="0.94" />
            <ellipse cx="260" cy="52" rx="68" ry="34" fill="#181A0E" opacity="0.95" />
            <ellipse cx="130" cy="35" rx="58" ry="26" fill="#252A15" opacity="0.9" />
            <ellipse cx="210" cy="32" rx="62" ry="28" fill="#2F311A" opacity="0.88" />
            <ellipse cx="160" cy="24" rx="38" ry="16" fill="#232815" opacity="0.92" />
            <circle cx="120" cy="30" r="8" fill="#5C6B2A" opacity="0.35" />
            <circle cx="230" cy="32" r="7" fill="#5C6B2A" opacity="0.35" />
          </svg>
        </div>

        {/* Cluster 3: Subtle accent foliage on far right TOP road edge */}
        <div
          data-canopy="3"
          className="absolute left-[78%] w-[260px] max-sm:w-[170px] h-[80px] max-sm:h-[55px]"
          style={{
            top: "calc(50% - 13.5svh - 40px)",
            willChange: "transform",
          }}
        >
          <svg viewBox="0 0 260 80" className="w-full h-full block overflow-visible">
            <ellipse cx="70" cy="35" rx="60" ry="30" fill="#181A0E" opacity="0.96" />
            <ellipse cx="150" cy="40" rx="65" ry="32" fill="#1F2316" opacity="0.94" />
            <ellipse cx="205" cy="36" rx="50" ry="26" fill="#181A0E" opacity="0.95" />
            <ellipse cx="115" cy="50" rx="45" ry="22" fill="#252A15" opacity="0.88" />
            <ellipse cx="170" cy="52" rx="40" ry="20" fill="#2F311A" opacity="0.86" />
            <circle cx="140" cy="55" r="6" fill="#5C6B2A" opacity="0.35" />
          </svg>
        </div>
      </div>
    );
  }
);

Canopy.displayName = "Canopy";
export default Canopy;
