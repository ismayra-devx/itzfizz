"use client";

import { forwardRef } from "react";

const HEADLINE_TEXT = "WELCOME ITZFIZZ";

interface HeadlineProps {
  className?: string;
  variant?: "ghost" | "solid";
  ariaHidden?: boolean;
}

export const Headline = forwardRef<HTMLDivElement, HeadlineProps>(
  ({ className = "", variant = "ghost", ariaHidden }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden={ariaHidden ?? (variant === "ghost")}
        className={`pointer-events-none select-none flex items-center justify-center w-[85%] max-w-[1400px] mx-auto text-center font-extrabold uppercase tracking-[0.08em] ${className}`}
        style={{
          fontFamily: "var(--font-archivo), sans-serif",
          fontSize: "clamp(2rem, 7.5vw, 6.8rem)",
          lineHeight: 1,
          willChange: "transform",
        }}
      >
        {HEADLINE_TEXT.split("").map((char, index) => {
          if (char === " ") {
            return (
              <span key={index} className="inline-block w-[0.3em]">
                &nbsp;
              </span>
            );
          }

          return (
            <span
              key={index}
              data-letter-index={index}
              className={`inline-block ${
                variant === "ghost" ? "ghost-headline" : "solid-headline text-[#010200]"
              }`}
              style={{
                willChange: "transform, opacity",
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    );
  }
);

Headline.displayName = "Headline";
export default Headline;
