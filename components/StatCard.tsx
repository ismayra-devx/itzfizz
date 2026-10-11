"use client";

import { forwardRef } from "react";

export interface StatCardData {
  id: string;
  target: number;
  suffix: string;
  caption: string;
  bgColor: string;
  textColor: string;
  subtextColor: string;
  threshold: number; // 0.28, 0.44, 0.61, 0.78
  positionClass: string;
}

export const STAT_CARDS_DATA: StatCardData[] = [
  {
    id: "stat-1",
    target: 58,
    suffix: "%",
    caption: "Increase in pick-up point use",
    bgColor: "#DEFF53",
    textColor: "#0C1003",
    subtextColor: "#1F2808",
    threshold: 0.28,
    // Top row, left of center (in diagonal layout)
    positionClass: "top-[10%] left-[22%] max-md:top-[6%] max-md:left-[5%]",
  },
  {
    id: "stat-2",
    target: 23,
    suffix: "%",
    caption: "Decrease in customer phone calls",
    bgColor: "#73CDFA",
    textColor: "#061520",
    subtextColor: "#0C2333",
    threshold: 0.44,
    // Bottom row, left of top row
    positionClass: "bottom-[9%] left-[16%] max-md:bottom-[6%] max-md:left-[5%]",
  },
  {
    id: "stat-3",
    target: 27,
    suffix: "%",
    caption: "Faster order handovers",
    bgColor: "#F2F2EE",
    textColor: "#12140F",
    subtextColor: "#282B22",
    threshold: 0.61,
    // Top row, right of center
    positionClass: "top-[10%] right-[19%] max-md:top-[6%] max-md:right-[5%]",
  },
  {
    id: "stat-4",
    target: 40,
    suffix: "%",
    caption: "Fewer support tickets",
    bgColor: "#EC6A27",
    textColor: "#FFFFFF",
    subtextColor: "#FFE6D8",
    threshold: 0.78,
    // Bottom row, right
    positionClass: "bottom-[9%] right-[24%] max-md:bottom-[6%] max-md:right-[5%]",
  },
];

interface StatCardProps {
  card: StatCardData;
  className?: string;
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ card, className = "" }, ref) => {
    return (
      <div
        ref={ref}
        data-card-id={card.id}
        data-card-target={card.target}
        data-card-threshold={card.threshold}
        className={`pointer-events-auto absolute z-25 w-[clamp(190px,18vw,260px)] select-none rounded-[8px] p-[18px] border border-white/25 overflow-hidden shadow-xl ${card.positionClass} ${className}`}
        style={{
          fontFamily: "var(--font-archivo), sans-serif",
          willChange: "transform, opacity",
          backgroundColor: "rgba(18, 20, 14, 0.45)",
          backdropFilter: "blur(4px)",
        }}
      >
        {/* Animated Color Fill layer (scaleX 0 -> 1 on trigger) */}
        <div
          data-card-fill
          className="pointer-events-none absolute inset-0 -z-10 origin-left"
          style={{
            backgroundColor: card.bgColor,
            transform: "scaleX(0)",
            willChange: "transform",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-1.5">
          <div
            data-card-number
            className="text-[clamp(2.4rem,3vw,52px)] font-extrabold leading-none tracking-tight text-white/90 transition-colors"
            style={{ willChange: "transform, color" }}
          >
            0{card.suffix}
          </div>
          <div
            data-card-caption
            className="text-[13px] leading-snug font-medium text-white/70 transition-colors line-clamp-2"
            style={{ willChange: "color" }}
          >
            {card.caption}
          </div>
        </div>
      </div>
    );
  }
);

StatCard.displayName = "StatCard";
export default StatCard;
