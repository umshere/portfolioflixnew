"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  animateOnScroll?: boolean;
  animationType?: "fade" | "slide-up" | "slide-down" | "slide-left" | "slide-right";
  delay?: number;
  threshold?: number; // 0-1, how much of the element must be visible to trigger animation
};

export function Section({
  children,
  className,
  id,
  animateOnScroll = true,
  animationType = "fade",
  delay = 0,
  threshold = 0.1,
}: SectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    amount: threshold 
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const shouldAnimate = animateOnScroll && isInView && !prefersReducedMotion;

  const getAnimationProps = () => {
    if (prefersReducedMotion) {
      return {};
    }

    const baseTransition = {
      duration: 0.6,
      delay,
      ease: [0.4, 0, 0.2, 1] as const
    };

    switch (animationType) {
      case "fade":
        return {
          initial: { opacity: 0 },
          animate: shouldAnimate ? { opacity: 1 } : {},
          transition: baseTransition
        };
      case "slide-up":
        return {
          initial: { opacity: 0, y: 20 },
          animate: shouldAnimate ? { opacity: 1, y: 0 } : {},
          transition: baseTransition
        };
      case "slide-down":
        return {
          initial: { opacity: 0, y: -20 },
          animate: shouldAnimate ? { opacity: 1, y: 0 } : {},
          transition: baseTransition
        };
      case "slide-left":
        return {
          initial: { opacity: 0, x: 20 },
          animate: shouldAnimate ? { opacity: 1, x: 0 } : {},
          transition: baseTransition
        };
      case "slide-right":
        return {
          initial: { opacity: 0, x: -20 },
          animate: shouldAnimate ? { opacity: 1, x: 0 } : {},
          transition: baseTransition
        };
      default:
        return {
          initial: { opacity: 0 },
          animate: shouldAnimate ? { opacity: 1 } : {},
          transition: baseTransition
        };
    }
  };

  return (
    <motion.section
      ref={ref}
      id={id}
      className={cn("container mx-auto px-4 py-8", className)}
      {...getAnimationProps()}
    >
      {children}
    </motion.section>
  );
}
