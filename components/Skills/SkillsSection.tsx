import { loadResume } from "../../lib/resume";
import { BrandIcon } from "./BrandIcon";

interface Skill {
  name: string;
  icon?: string;
  level?: string;
}

export default async function SkillsSection() {
  const resume = await loadResume();
  
  // Get skills from resume.skills (array of strings) or resume.extras.skills
  const skills: Skill[] = (resume.skills || []).map(skill => 
    typeof skill === 'string' ? { name: skill } : skill
  );
  
  // Enhanced fallback skills with categories
  const fallbackSkills: Skill[] = [
    { name: "JavaScript", icon: "javascript", level: "Expert" },
    { name: "TypeScript", icon: "typescript", level: "Expert" },
    { name: "React", icon: "react", level: "Expert" },
    { name: "Next.js", icon: "nextjs", level: "Advanced" },
    { name: "Node.js", icon: "nodejs", level: "Advanced" },
    { name: "Python", icon: "python", level: "Advanced" },
    { name: "Java", icon: "java", level: "Advanced" },
    { name: "AWS", icon: "aws", level: "Advanced" },
    { name: "Docker", icon: "docker", level: "Intermediate" },
    { name: "Kubernetes", icon: "kubernetes", level: "Intermediate" },
    { name: "Git", icon: "git", level: "Expert" },
    { name: "Tailwind CSS", icon: "tailwindcss", level: "Advanced" },
    { name: "MongoDB", icon: "mongodb", level: "Advanced" },
    { name: "PostgreSQL", icon: "postgresql", level: "Advanced" },
    { name: "Redis", icon: "redis", level: "Intermediate" },
    { name: "GraphQL", icon: "graphql", level: "Intermediate" },
  ];

  const displaySkills = skills.length > 0 ? skills : fallbackSkills;

  return (
    <section id="skills" className="section">
      <div className="section-header">
        <h2 className="section-title">Skills & Expertise</h2>
      </div>
      
      {/* Marquee for larger screens, grid for smaller */}
      <div className="skills-marquee">
        <div className="marquee-content">
          {displaySkills.map((skill, index) => (
            <div key={index} className="skill-chip" title={skill.level ? `${skill.name} - ${skill.level}` : skill.name}>
              <BrandIcon name={skill.icon || skill.name.toLowerCase()} className="skill-icon" size={20} />
              <span>{skill.name}</span>
              {skill.level && <span className="skill-level">{skill.level}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
