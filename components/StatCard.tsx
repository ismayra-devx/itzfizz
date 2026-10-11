"use client";

import { forwardRef } from "react";

export interface StatCardData {
  id: string;
  target: number;
  suffix: string;
  caption: string;
  bgColor: string;
  textColor: string;
  captionColor: string;
  threshold: number;
  desktopPosition: string;
  mobilePosition: string;
}

export const STAT_CARDS_DATA: StatCardData[] = [
  {
    id: "stat-1",
    target: 58,
    suffix: "%",
    caption: "Increase in pick-up point use",
    bgColor: "#DEFF53",
    textColor: "#0A0E02",
    captionColor: "#1A2205",
    threshold: 0.28,
    // Top row, left
    desktopPosition: "top-[8%] left-[16%]",
    mobilePosition: "top-[4%] left-[4%]",
  },
  {
    id: "stat-2",
    target: 23,
    suffix: "%",
    caption: "Decrease in customer phone calls",
    bgColor: "#73CDFA",
    textColor: "#05131C",
    captionColor: "#0D2536",
    threshold: 0.44,
    // Bottom row, left (staggered slightly left of top row)
    desktopPosition: "bottom-[8%] left-[10%]",
    mobilePosition: "bottom-[5%] left-[4%]",
  },
  {
    id: "stat-3",
    target: 27,
    suffix: "%",
    caption: "Faster order handovers",
    bgColor: "#F2F2EE",
    textColor: "#12140F",
    captionColor: "#2A2E22",
    threshold: 0.61,
    // Top row, right of center
    desktopPosition: "top-[8%] right-[16%]",
    mobilePosition: "top-[4%] right-[4%]",
  },
  {
    id: "stat-4",
    target: 40,
    suffix: "%",
    caption: "Fewer support tickets",
    bgColor: "#EC6A27",
    textColor: "#FFFFFF",
    captionColor: "#FFE3D4",
    threshold: 0.78,
    // Bottom row, right
    desktopPosition: "bottom-[8%] right-[22%]",
    mobilePosition: "bottom-[5%] right-[4%]",
  },
];

interface StatCardProps {
  card: StatCardData;
  className?: string;
  /** 'final' = solid color fill & target numbers; 'inactive' = outline 1px & 0% */
  state?: "final" | "inactive";
}

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ card, className = "", state = "inactive" }, ref) => {
    const isFinal = state === "final";

    return (
      <div
        ref={ref}
        data-card-id={card.id}
        data-card-target={card.target}
        data-card-threshold={card.threshold}
        data-card-bg={card.bgColor}
        data-card-text={card.textColor}
        data-card-caption-color={card.captionColor}
        className={`pointer-events-auto absolute z-25 w-[clamp(170px,18vw,255px)] select-none rounded-[8px] p-[18px] max-sm:p-3 overflow-hidden shadow-2xl ${card.desktopPosition} max-md:${card.mobilePosition} ${className}`}
        style={{
          fontFamily: "var(--font-archivo), sans-serif",
          backgroundColor: isFinal ? card.bgColor : "transparent",
          border: isFinal ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255, 255, 255, 0.25)",
          color: isFinal ? card.textColor : "rgba(255, 255, 255, 0.95)",
          willChange: "transform, opacity",
        }}
      >
        {/* Animated Color Fill layer (scaleX 0 -> 1 during scroll trigger) */}
        <div
          data-card-fill
          className="pointer-events-none absolute inset-0 -z-10 origin-left"
          style={{
            backgroundColor: card.bgColor,
            transform: isFinal ? "scaleX(1)" : "scaleX(0)",
            willChange: "transform",
          }}
        />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col gap-1.5 max-sm:gap-1">
          {/* Number (52px / weight 800) */}
          <div
            data-card-number
            className="text-[clamp(32px,3.6vw,52px)] font-extrabold leading-none tracking-tight text-white/95"
            style={{
              willChange: "transform, color",
            }}
          >
            {isFinal ? `${card.target}${card.suffix}` : `0${card.suffix}`}
          </div>

          {/* Caption (13px leading-snug) */}
          <div
            data-card-caption
            className="text-[13px] max-sm:text-[11px] leading-snug font-medium line-clamp-2 text-white/70"
            style={{
              willChange: "color",
            }}
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
