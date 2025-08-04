import { loadResume } from "../../lib/resume";
import { ExperienceSectionClient } from "./ExperienceSectionClient";

type ExperienceItem = {
  role: string;
  company: string;
  location?: string;
  period?: string;
  bullets: string[];
  detailedInfo?: {
    responsibilities: string[];
    achievements: string[];
    technologies: string[];
  };
};

function fallbackExperience(): ExperienceItem[] {
  return [
    {
      role: "Senior Software Engineer",
      company: "Independent",
      period: "2022 — Present",
      bullets: [
        "Built Netflix-style portfolio in Next.js 14 with Tailwind and shadcn/ui.",
        "Implemented accessible UI primitives and motion-safe micro-interactions.",
        "Integrated resume data validation with Zod and resilient loaders.",
      ],
    },
  ];
}

export default async function ExperienceSection() {
  const resume = await loadResume();

  type InputExperience = {
    role?: string;
    position?: string;
    title?: string;
    company?: string;
    organization?: string;
    location?: string;
    period?: string;
    date?: string;
    start?: string;
    end?: string;
    bullets?: string[];
    highlights?: string[];
    summary?: string;
  };

  const raw =
    (resume as { experience?: InputExperience[] })?.experience ??
    (resume as { work?: InputExperience[] })?.work;

  const items: ExperienceItem[] =
    raw?.map((e) => {
      const period =
        e.period ??
        e.date ??
        ([e.start, e.end].filter(Boolean).join(" — ") || undefined);

      const bullets =
        (Array.isArray(e.bullets) && e.bullets.length > 0
          ? e.bullets
          : Array.isArray(e.highlights) && e.highlights.length > 0
          ? e.highlights
          : e.summary
          ? [e.summary]
          : []
        ).slice(0, 4);

      return {
        role: String(e.role ?? e.position ?? e.title ?? "Role"),
        company: String(e.company ?? e.organization ?? "Company"),
        location: e.location,
        period,
        bullets,
      };
    }) ?? fallbackExperience();

  return <ExperienceSectionClient experienceData={items} />;
}

export type { ExperienceItem };
