import { loadResume } from "../../lib/resume";
import ProjectsCarousel from "./ProjectsCarousel";
import type { Resume } from "../../types/resume";
import type { Project } from "./ProjectCard";

interface ResumeProject {
  title: string;
  company?: string;
  description: string;
  tech?: string[];
  highlights?: string[];
  href?: string;
  link?: string;
  live?: string;
  repo?: string;
  source?: string;
  summary?: string;
}

function fallbackProjects(): ResumeProject[] {
  return [
    {
      title: "Agentic Portfolio",
      description:
        "Next.js 14 migration of a Netflix-style portfolio with Tailwind, shadcn/ui, Framer Motion, and accessible patterns.",
      href: "https://example.com",
      repo: "https://github.com/example/portfolio",
      tech: ["nextjs", "react", "tailwind", "ts", "framer"],
    },
    {
      title: "MCP Tools Showcase",
      description:
        "Demonstrates Model Context Protocol integrations with browser automation and research workflows.",
      href: "https://example.com",
      repo: "https://github.com/example/mcp-showcase",
      tech: ["node", "ts"],
    },
    {
      title: "AI Toolkit",
      description:
        "Collection of AI agents and utilities for code analysis, UI generation, and data extraction.",
      repo: "https://github.com/example/ai-toolkit",
      tech: ["ts", "node"],
    },
  ];
}

export default async function ProjectsSection() {
  const resume: Resume = await loadResume();
  
  // Get projects from resume.projects or provide fallback
  const projects: ResumeProject[] = resume.projects && resume.projects.length > 0 
    ? resume.projects.map(project => ({
        title: project.title,
        company: project.company,
        description: project.description,
        tech: project.tech || [],
        highlights: project.highlights || [],
      }))
    : fallbackProjects().map(project => ({
        title: project.title,
        description: project.description,
        tech: project.tech || [],
      }));

  // Transform projects to match the expected format for ProjectsCarousel
  const carouselProjects: Project[] = projects.map((project) => ({
    title: project.title,
    company: project.company,
    description: project.description || project.summary || "No description available",
    tech: project.tech || [],
    href: project.href || project.link || project.live,
    repo: project.repo || project.source,
  }));

  return (
    <section id="projects" className="section">
      <div className="section-header">
        <h2 className="section-title">Featured Projects</h2>
        <div className="carousel-controls">
          <button className="carousel-btn prev-btn" aria-label="Previous projects">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button className="carousel-btn next-btn" aria-label="Next projects">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="carousel-container">
        <ProjectsCarousel projects={carouselProjects} />
      </div>
    </section>
  );
}
