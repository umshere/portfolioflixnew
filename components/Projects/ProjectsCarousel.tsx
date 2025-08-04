"use client";

import React from "react";
import ProjectCard, { type Project } from "./ProjectCard";

type Props = {
  projects: Project[];
  className?: string;
};

export default function ProjectsCarousel({ projects, className }: Props) {
  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);

  // Roving tabindex management
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const updateButtons = () => {
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      setCanPrev(el.scrollLeft > 0);
      setCanNext(el.scrollLeft < maxScrollLeft - 1);
      // infer active index by nearest snap
      const children = Array.from(el.children);
      const centers = children.map((c) => {
        const rect = (c as HTMLElement).getBoundingClientRect();
        return Math.abs(rect.left + rect.width / 2 - (window.innerWidth / 2));
      });
      const idx = centers.indexOf(Math.min(...centers));
      if (idx >= 0) setActiveIndex(idx);
    };

    updateButtons();
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, []);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // find width of a single card (assume children have same width roughly)
    const child = el.querySelector(":scope > *") as HTMLElement | null;
    const cardWidth = child ? child.getBoundingClientRect().width : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCard(1);
      focusCard(Math.min(activeIndex + 1, projects.length - 1));
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCard(-1);
      focusCard(Math.max(activeIndex - 1, 0));
    }
  };

  const focusCard = (idx: number) => {
    const node = cardRefs.current[idx];
    if (node) {
      node.focus();
    }
  };

  return (
    <div className="carousel">
      <div
        ref={scrollerRef}
        className="carousel"
        role="listbox"
        aria-label="Projects"
        onKeyDown={onKeyDown}
      >
        {projects.map((p, i) => (
          <div
            key={`${p.title}-${i}`}
            role="option"
            aria-selected={i === activeIndex}
            className="outline-none"
            tabIndex={i === activeIndex ? 0 : -1}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
          >
            <ProjectCard project={p} tabIndex={-1} />
          </div>
        ))}
      </div>
    </div>
  );
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
