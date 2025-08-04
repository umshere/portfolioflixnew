"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode[];
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  gap?: number; // gap between items in pixels
};

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 2,
  gap = 16,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (containerRef.current && contentRef.current) {
      const containerSize = vertical
        ? containerRef.current.offsetHeight
        : containerRef.current.offsetWidth;
      const contentSize = vertical
        ? contentRef.current.offsetHeight
        : contentRef.current.offsetWidth;
      
      if (contentSize > 0) {
        // Calculate duration based on content size for consistent speed
        setDuration(contentSize * 20); // Adjust multiplier for desired speed
      }
    }
  }, [vertical, children.length]);

  const repeatedChildren = Array.from({ length: repeat }, (_, i) =>
    React.Children.map(children, (child, j) => (
      <div 
        key={`${i}-${j}`} 
        className={cn(vertical ? "flex-shrink-0" : "inline-block")}
        style={vertical ? { marginBottom: `${gap}px` } : { marginRight: `${gap}px` }}
      >
        {child}
      </div>
    ))
  ).flat();

  return (
    <div
      ref={containerRef}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        ref={contentRef}
        className={cn(
          "flex items-center justify-center gap-[--gap] [--gap:1rem]",
          {
            "animate-marquee flex-row": !vertical && !reverse,
            "animate-marquee-reverse flex-row": !vertical && reverse,
            "animate-marquee-vertical flex-col": vertical && !reverse,
            "animate-marquee-vertical-reverse flex-col": vertical && reverse,
          }
        )}
        style={
          duration > 0
            ? {
                animationDuration: `${duration}ms`,
                animationPlayState: pauseOnHover ? "paused" : "running",
              }
            : {}
        }
      >
        {repeatedChildren}
      </div>
      <div
        className={cn(
          "flex items-center justify-center gap-[--gap] [--gap:1rem]",
          {
            "animate-marquee flex-row": !vertical && !reverse,
            "animate-marquee-reverse flex-row": !vertical && reverse,
            "animate-marquee-vertical flex-col": vertical && !reverse,
            "animate-marquee-vertical-reverse flex-col": vertical && reverse,
          }
        )}
        style={
          duration > 0
            ? {
                animationDuration: `${duration}ms`,
                animationPlayState: pauseOnHover ? "paused" : "running",
              }
            : {}
        }
      >
        {repeatedChildren}
      </div>
    </div>
  );
}
