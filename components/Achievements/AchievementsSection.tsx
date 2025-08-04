import { Section } from '../UI/Section';

interface Achievement {
  title: string;
  description: string;
}

interface AchievementsSectionProps {
  achievements: Achievement[];
}

export function AchievementsSection({ achievements }: AchievementsSectionProps) {
  if (!achievements || achievements.length === 0) {
    return null;
  }

  return (
    <Section id="achievements">
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Professional Achievements</h2>
        </div>
        <div className="highlights-grid">
          {achievements.map((achievement, index) => (
            <div 
              key={index} 
              className="highlight-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="highlight-icon">🏆</div>
              <h3 className="highlight-title">{achievement.title}</h3>
              <p className="highlight-description">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
