"use client";

import { forwardRef } from "react";

const HEADLINE_TEXT = "WELCOME ITZFIZZ";

interface HeadlineProps {
  className?: string;
  variant?: "ghost" | "solid";
  ariaHidden?: boolean;
}

export const Headline = forwardRef<HTMLHeadingElement, HeadlineProps>(
  ({ className = "", variant = "ghost", ariaHidden }, ref) => {
    const isGhost = variant === "ghost";

    return (
      <h1
        ref={ref}
        aria-hidden={ariaHidden ?? isGhost}
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
              className="inline-block overflow-hidden py-1 leading-none"
              style={{ verticalAlign: "middle" }}
            >
              <span
                data-ghost-letter={isGhost ? "true" : undefined}
                className="inline-block"
                style={{
                  willChange: "transform, opacity",
                  transform: isGhost ? "translateY(110%)" : "translateY(0%)",
                  color: isGhost ? "transparent" : "#010200",
                  WebkitTextStroke: isGhost
                    ? "1.5px rgba(255, 255, 255, 0.28)"
                    : "none",
                }}
              >
                {char}
              </span>
            </span>
          );
        })}
      </h1>
    );
  }
);

Headline.displayName = "Headline";
export default Headline;
