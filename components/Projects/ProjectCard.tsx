"use client";

import { BrandIcon } from "../Skills/BrandIcon";
import Image from "next/image";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

export type Project = {
  title: string;
  company?: string;
  period?: string;
  description: string;
  href?: string;
  repo?: string;
  image?: string;
  tech?: string[];
  highlights?: string[];
  subProjects?: {
    name: string;
    description: string;
  }[];
};

type Props = {
  project: Project;
  tabIndex?: number;
  className?: string;
};

export default function ProjectCard({ project }: Props) {
  const { title, company, period, description, href, repo, image, tech = [], highlights = [], subProjects = [] } = project;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card">
      {/* Thumbnail placeholder */}
      <div className="card-image" aria-label="Project thumbnail">
        {image ? (
          <Image
            src={image}
            alt={`${title} project thumbnail`}
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
        ) : (
          <div className="bg-gray-700 border border-gray-600 rounded-lg w-full h-48 flex items-center justify-center">
            <span className="text-gray-400">Project Image</span>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="card-title">{title}</h3>
        {period && (
          <span className="text-netflix-red text-sm font-medium whitespace-nowrap ml-2">
            {period}
          </span>
        )}
      </div>
      
      {company && <div className="card-subtitle">{company}</div>}
      <p className="card-description">{description}</p>

      {/* Highlights */}
      {highlights.length > 0 && (
        <div className="mt-4">
          <h4 className="text-white font-semibold mb-2">Key Highlights:</h4>
          <ul className="text-gray-300 text-sm space-y-1">
            {highlights.slice(0, 3).map((highlight, index) => (
              <li key={index} className="flex items-start">
                <span className="w-1.5 h-1.5 bg-netflix-red rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sub-projects toggle */}
      {subProjects.length > 0 && (
        <div className="mt-4">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center text-netflix-red hover:text-white transition-colors duration-200 font-medium"
          >
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4 mr-1" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 mr-1" />
            )}
            {isExpanded ? 'Hide Details' : 'View Details'} ({subProjects.length})
          </button>
          
          {isExpanded && (
            <div className="mt-3 space-y-3 animate-in slide-in-from-top duration-200">
              {subProjects.map((subProject, index) => (
                <div key={index} className="pl-4 border-l-2 border-netflix-red/30 bg-gray-800/30 p-3 rounded-r-lg">
                  <h5 className="font-medium text-white mb-1">{subProject.name}</h5>
                  <p className="text-sm text-gray-400 leading-relaxed">{subProject.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tech icons */}
      {tech.length > 0 && (
        <div className="card-tech">
          {tech.map((t) => (
            <span key={t} className="tech-tag">
              <BrandIcon name={t} className="inline mr-1" size={12} />
              {readableTech(t)}
            </span>
          ))}
        </div>
      )}

      {/* Links */}
      {(href || repo) && (
        <div className="mt-4 flex gap-2">
          {href && (
            <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-xs">
              Live
            </a>
          )}
          {repo && (
            <a href={repo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-xs">
              Code
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function readableTech(slug: string) {
  // Map simple slugs to readable names if needed
  const map: Record<string, string> = {
    ts: "TypeScript",
    js: "JavaScript",
    node: "Node.js",
    react: "React",
    nextjs: "Next.js",
    tailwind: "Tailwind",
    framer: "Framer Motion",
    vercel: "Vercel",
  };
  return map[slug] || slug.replace(/-/g, " ");
}
