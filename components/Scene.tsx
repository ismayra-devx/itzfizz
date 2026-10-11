"use client";

import { forwardRef } from "react";

// 30 tiny leaf specks on the road that drift left at two different speeds
const SPECK_DATA = [
  { id: 1, top: "42%", left: "8%", size: 3, color: "#45342F", speed: "slow" },
  { id: 2, top: "54%", left: "14%", size: 4, color: "#5C6B2A", speed: "fast" },
  { id: 3, top: "48%", left: "19%", size: 3, color: "#45342F", speed: "slow" },
  { id: 4, top: "39%", left: "25%", size: 2.5, color: "#5C6B2A", speed: "fast" },
  { id: 5, top: "57%", left: "29%", size: 4, color: "#45342F", speed: "slow" },
  { id: 6, top: "45%", left: "34%", size: 3, color: "#5C6B2A", speed: "fast" },
  { id: 7, top: "52%", left: "38%", size: 3.5, color: "#45342F", speed: "slow" },
  { id: 8, top: "41%", left: "44%", size: 2, color: "#5C6B2A", speed: "fast" },
  { id: 9, top: "59%", left: "47%", size: 3, color: "#45342F", speed: "slow" },
  { id: 10, top: "46%", left: "53%", size: 4, color: "#5C6B2A", speed: "fast" },
  { id: 11, top: "53%", left: "58%", size: 2.5, color: "#45342F", speed: "slow" },
  { id: 12, top: "43%", left: "62%", size: 3, color: "#5C6B2A", speed: "fast" },
  { id: 13, top: "56%", left: "67%", size: 3.5, color: "#45342F", speed: "slow" },
  { id: 14, top: "47%", left: "72%", size: 2.5, color: "#5C6B2A", speed: "fast" },
  { id: 15, top: "52%", left: "76%", size: 4, color: "#45342F", speed: "slow" },
  { id: 16, top: "40%", left: "81%", size: 3, color: "#5C6B2A", speed: "fast" },
  { id: 17, top: "58%", left: "85%", size: 3.5, color: "#45342F", speed: "slow" },
  { id: 18, top: "49%", left: "91%", size: 2, color: "#5C6B2A", speed: "fast" },
  { id: 19, top: "44%", left: "95%", size: 3, color: "#5C6B2A", speed: "slow" },
  { id: 20, top: "55%", left: "11%", size: 2.5, color: "#5C6B2A", speed: "fast" },
  { id: 21, top: "41%", left: "22%", size: 3.5, color: "#45342F", speed: "slow" },
  { id: 22, top: "58%", left: "33%", size: 3, color: "#5C6B2A", speed: "fast" },
  { id: 23, top: "47%", left: "49%", size: 2.5, color: "#45342F", speed: "slow" },
  { id: 24, top: "54%", left: "64%", size: 3, color: "#5C6B2A", speed: "fast" },
  { id: 25, top: "42%", left: "70%", size: 3.5, color: "#45342F", speed: "slow" },
  { id: 26, top: "56%", left: "83%", size: 2, color: "#5C6B2A", speed: "fast" },
  { id: 27, top: "45%", left: "88%", size: 3, color: "#45342F", speed: "slow" },
  { id: 28, top: "53%", left: "94%", size: 3, color: "#5C6B2A", speed: "fast" },
  { id: 29, top: "48%", left: "16%", size: 4, color: "#45342F", speed: "slow" },
  { id: 30, top: "51%", left: "79%", size: 2.5, color: "#5C6B2A", speed: "fast" },
];

export const Scene = forwardRef<HTMLDivElement, { className?: string }>(
  ({ className = "" }, ref) => {
    return (
      <div
        ref={ref}
        className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
        aria-hidden="true"
      >
        {/* TOP VERGE (Dense foliage #2F311A and #1F2316 with reddish leaf-litter #45342F) */}
        <div className="absolute inset-x-0 top-0 h-[40svh] -z-10">
          {/* Overlapping organic radial gradient blobs (no CSS filter blur) */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle 360px at 10% 5%, #1F2316 0%, transparent 75%),
                radial-gradient(circle 420px at 35% -10%, #2F311A 0%, transparent 70%),
                radial-gradient(circle 280px at 24% 18%, #45342F 0%, transparent 65%),
                radial-gradient(circle 460px at 60% -5%, #1F2316 0%, transparent 75%),
                radial-gradient(circle 320px at 75% 20%, #45342F 0%, transparent 65%),
                radial-gradient(circle 400px at 90% 0%, #2F311A 0%, transparent 70%),
                radial-gradient(circle 500px at 50% -15%, #252814 0%, transparent 80%)
              `,
            }}
          />
        </div>

        {/* BOTTOM VERGE (Dense foliage along bottom screen edge, thinning toward the road) */}
        <div className="absolute inset-x-0 bottom-0 h-[40svh] -z-10">
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle 380px at 15% 95%, #1F2316 0%, transparent 75%),
                radial-gradient(circle 450px at 40% 105%, #2F311A 0%, transparent 70%),
                radial-gradient(circle 300px at 28% 82%, #45342F 0%, transparent 65%),
                radial-gradient(circle 420px at 65% 100%, #1F2316 0%, transparent 75%),
                radial-gradient(circle 310px at 80% 80%, #45342F 0%, transparent 65%),
                radial-gradient(circle 400px at 95% 95%, #2F311A 0%, transparent 70%),
                radial-gradient(circle 520px at 50% 115%, #252814 0%, transparent 80%)
              `,
            }}
          />
        </div>

        {/* GROUND LIFE (~30 tiny leaf specks drifting left during scroll) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {SPECK_DATA.map((speck) => (
            <div
              key={speck.id}
              data-speck={speck.speed}
              className="absolute rounded-full"
              style={{
                top: speck.top,
                left: speck.left,
                width: `${speck.size}px`,
                height: `${speck.size * 0.85}px`,
                backgroundColor: speck.color,
                opacity: 0.75,
                transform: `rotate(${speck.id * 37}deg)`,
                willChange: "transform",
              }}
            />
          ))}
        </div>
      </div>
    );
  }
);

Scene.displayName = "Scene";
export default Scene;
