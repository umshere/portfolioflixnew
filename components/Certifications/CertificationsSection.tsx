import { Section } from '../UI/Section';

interface Certification {
  name: string;
  issuer: string;
  year: string;
  description?: string;
}

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <Section id="certifications">
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Certifications & Recognition</h2>
        </div>
        <div className="highlights-grid">
          {certifications.map((cert, index) => (
            <div 
              key={index} 
              className="highlight-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="highlight-icon">🎓</div>
              <div className="flex items-start justify-between mb-3">
                <h3 className="highlight-title">{cert.name}</h3>
                <span className="text-netflix-red font-medium text-sm whitespace-nowrap ml-4">
                  {cert.year}
                </span>
              </div>
              <p className="text-netflix-red font-medium mb-2">{cert.issuer}</p>
              {cert.description && (
                <p className="highlight-description">{cert.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
