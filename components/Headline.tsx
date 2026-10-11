"use client";

import { forwardRef } from "react";

const HEADLINE_TEXT = "WELCOME ITZFIZZ";

interface HeadlineProps {
  className?: string;
  variant?: "ghost" | "solid";
}

export const Headline = forwardRef<HTMLDivElement, HeadlineProps>(
  ({ className = "", variant = "ghost" }, ref) => {
    return (
      <div
        ref={ref}
        className={`pointer-events-none select-none flex items-center justify-center w-[85%] max-w-[1440px] mx-auto text-center font-extrabold uppercase tracking-[0.08em] ${className}`}
        style={{
          fontFamily: "var(--font-archivo), sans-serif",
          fontSize: "clamp(2.2rem, 7.8vw, 7.2rem)",
          lineHeight: 1,
          willChange: "transform",
        }}
        aria-hidden={variant === "solid"}
      >
        {HEADLINE_TEXT.split("").map((char, index) => {
          if (char === " ") {
            return (
              <span key={index} className="inline-block w-[0.35em]">
                &nbsp;
              </span>
            );
          }

          return (
            <span
              key={index}
              className="inline-block overflow-hidden py-1 px-[1px]"
            >
              <span
                data-ghost-letter={variant === "ghost" ? "true" : undefined}
                className={`inline-block ${
                  variant === "ghost" ? "ghost-headline" : "solid-headline"
                }`}
                style={{
                  willChange: "transform, opacity",
                  transform: variant === "ghost" ? "translateY(110%)" : "translateY(0%)",
                }}
              >
                {char}
              </span>
            </span>
          );
        })}
      </div>
    );
  }
);

Headline.displayName = "Headline";
export default Headline;
