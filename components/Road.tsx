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
          className="absolute inset-0 origin-left overflow-hidden border-y border-[#38312A]/80"
          style={{
            zIndex: 2,
            backgroundColor: "#4A433C",
            backgroundImage:
              "linear-gradient(180deg, rgba(88,80,72,0.4) 0%, rgba(74,67,60,0.1) 40%, rgba(46,41,36,0.6) 80%, rgba(32,28,24,0.9) 100%)",
            willChange: "transform",
          }}
        >
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
        </div>
      </div>
    );
  }
);

Road.displayName = "Road";
export default Road;
