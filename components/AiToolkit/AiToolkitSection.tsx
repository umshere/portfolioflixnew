"use client";

import { BrandIcon } from "../Skills/BrandIcon";

interface AiTool {
  name: string;
  category: string;
  description: string;
}

interface AiToolkitSectionProps {
  tools: AiTool[];
}

export function AiToolkitSection({ tools }: AiToolkitSectionProps) {
  return (
    <section id="ai-toolkit" className="section">
      <div className="section-header">
        <h2 className="section-title">AI & Agentic Development Toolkit</h2>
      </div>
      <div className="highlights-grid">
        {tools.map((tool, index) => (
          <div 
            key={index} 
            className="highlight-card ai-tool-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="ai-tool-header">
              <div className="highlight-icon">
                <BrandIcon name={tool.name.toLowerCase().replace(/\s+/g, '-')} size={28} />
              </div>
              <div className="ai-tool-info">
                <h3 className="highlight-title">{tool.name}</h3>
                <span className="ai-tool-category">{tool.category}</span>
              </div>
            </div>
            <p className="highlight-description">{tool.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
