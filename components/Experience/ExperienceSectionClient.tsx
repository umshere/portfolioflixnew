"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon, CalendarIcon, BuildingIcon } from "lucide-react";
import type { ExperienceItem } from "./ExperienceSection";

interface DetailedExperienceData {
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

const detailedExperienceData: Record<string, DetailedExperienceData> = {
  "App Development Associate Manager": {
    responsibilities: [
      "Application Development Specialist: Drive the Mileage Redemption Project for Delta Airlines and Allianz Insurance, enabling customers to purchase travel insurance using accumulated mileage points",
      "Core Systems Development: Leverage Java Servlet technologies and serverless Node.js frameworks to build scalable, high‑performance services",
      "CRM Integration: Integrate solutions with PeopleSoft CRM to streamline customer relationship management and data synchronization",
      "Digital Payment Solutions: Implement Apple Pay and Google Pay via cryptogram‑based secure payment architectures"
    ],
    achievements: [
      "Distributed Team Leadership: Lead and mentor onsite and Brazil‑based offshore teams, ensuring cohesive collaboration and delivery quality",
      "Solution Architecture & Presentation: Design end‑to‑end solution architectures, produce sequential diagrams, and present technical designs to clients",
      "QA & Deployment Coordination: Oversee SIT and UAT cycles, coordinate with stakeholders, and facilitate smooth production deployments through cross‑functional teamwork"
    ],
    technologies: ["Java Servlet", "Node.js", "PeopleSoft CRM", "Apple Pay", "Google Pay", "Azure", "Cryptogram APIs"]
  },
  "Team Lead - CHUBB": {
    responsibilities: [
      "UI Development Leadership: Spearhead requirement gathering with Business Analysts to design, document, develop, and deploy sophisticated UI components",
      "Complex Problem Resolution: Serve as an escalation point for technical issues, debugging complex code problems, conducting root-cause analysis, and implementing performance or security improvements",
      "Project Oversight: Manage a support web portfolio for a major insurance client"
    ],
    achievements: [
      "Oversee daily support tasks, direct story creation in Jira, and handle end-to-end release management",
      "Coordinate deployments in UAT environments, ensuring prompt bug fixes and enhancements",
      "Conduct technical discussions with SMEs and cross-functional teams, providing hands-on development support"
    ],
    technologies: ["Angular", "React", "Jira", "UAT", "Performance Optimization", "Security Enhancements"]
  },
  "Team Lead - ULINE": {
    responsibilities: [
      "Full-Stack Solutions: Built Java microservices and Node.js modules to handle data integration, service orchestration, and business logic",
      "SDLC Ownership: Created an NPM package for business analytics, establishing patterns for unit testing, CI/CD, and automated deployments",
      "ETL Pipelines: Constructed Azure Data Flow pipelines for large-scale data ingestion and transformation, supporting an enterprise-grade DB Violation dashboard"
    ],
    achievements: [
      "Partnered with stakeholders to prototype, refine, test, and debug solutions",
      "Delivered architecture documentation and code reviews",
      "Established CI/CD patterns for consistent delivery workflows"
    ],
    technologies: ["Java Microservices", "Node.js", "Azure Data Factory", "NPM", "CI/CD", "ETL", "Business Analytics"]
  },
  "Application Development Specialist": {
    responsibilities: [
      "Full-Stack Solutions: Built Java microservices and Node.js modules to handle data integration, service orchestration, and business logic",
      "SDLC Ownership: Created an NPM package for business analytics, establishing patterns for unit testing, CI/CD, and automated deployments",
      "ETL Pipelines: Constructed Azure Data Flow pipelines for large-scale data ingestion and transformation"
    ],
    achievements: [
      "Partnered with stakeholders to prototype, refine, test, and debug solutions",
      "Delivered architecture documentation and code reviews",
      "Supported enterprise analytics with large-scale data transformation capabilities"
    ],
    technologies: ["Java Microservices", "Node.js", "Azure Data Factory", "T-Mobile Systems", "Business Analytics", "ETL Pipelines"]
  }
};

interface ExperienceCardProps {
  item: ExperienceItem;
  index: number;
}

function ExperienceCard({ item, index }: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getDetailedInfo = (role: string, company: string) => {
    const key = company.includes("CHUBB") ? "Team Lead - CHUBB" :
               company.includes("ULINE") ? "Team Lead - ULINE" :
               role;
    return detailedExperienceData[key];
  };

  const detailedInfo = getDetailedInfo(item.role, item.company);

  return (
    <div 
      className="experience-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="experience-card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="experience-card-main">
          <div className="experience-card-title-section">
            <h3 className="experience-card-title">{item.role}</h3>
            <div className="experience-card-company">
              <BuildingIcon className="w-4 h-4" />
              {item.company}
            </div>
            {item.location && (
              <div className="experience-card-location">
                📍 {item.location}
              </div>
            )}
          </div>
          
          {item.period && (
            <div className="experience-card-period">
              <CalendarIcon className="w-4 h-4" />
              {item.period}
            </div>
          )}
        </div>
        
        <button className="experience-expand-btn">
          {isExpanded ? (
            <ChevronDownIcon className="w-5 h-5" />
          ) : (
            <ChevronRightIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Basic highlights - always visible */}
      {item.bullets.length > 0 && (
        <div className="experience-bullets">
          {item.bullets.slice(0, 3).map((bullet, i) => (
            <div key={i} className="experience-bullet">
              <span className="experience-bullet-dot"></span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      )}

      {/* Detailed information - expandable */}
      {isExpanded && detailedInfo && (
        <div className="experience-details">
          {detailedInfo.responsibilities && (
            <div className="experience-detail-section">
              <h4 className="experience-detail-title">🎯 Key Responsibilities</h4>
              <ul className="experience-detail-list">
                {detailedInfo.responsibilities.map((resp: string, i: number) => (
                  <li key={i} className="experience-detail-item">
                    <span className="experience-detail-dot"></span>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {detailedInfo.achievements && (
            <div className="experience-detail-section">
              <h4 className="experience-detail-title">🏆 Major Achievements</h4>
              <ul className="experience-detail-list">
                {detailedInfo.achievements.map((achievement: string, i: number) => (
                  <li key={i} className="experience-detail-item">
                    <span className="experience-detail-dot"></span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {detailedInfo.technologies && (
            <div className="experience-detail-section">
              <h4 className="experience-detail-title">⚡ Technologies & Tools</h4>
              <div className="experience-tech-grid">
                {detailedInfo.technologies.map((tech: string, i: number) => (
                  <span key={i} className="experience-tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface ExperienceSectionClientProps {
  experienceData: ExperienceItem[];
}

export function ExperienceSectionClient({ experienceData }: ExperienceSectionClientProps) {
  return (
    <section id="experience" className="section">
      <div className="section-header">
        <h2 className="section-title">Experience Highlights</h2>
      </div>
      <div className="experience-grid-modern">
        {experienceData.length === 0 ? (
          <p className="text-neutral-400">No experience to show.</p>
        ) : (
          experienceData.map((item, idx) => (
            <ExperienceCard 
              key={`${item.company}-${item.role}-${idx}`} 
              item={item} 
              index={idx}
            />
          ))
        )}
      </div>
    </section>
  );
}
