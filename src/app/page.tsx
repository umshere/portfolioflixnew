import { loadResume } from "../../lib/resume";
import type { Resume } from "../../types/resume";

import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import HighlightsSection from "../../components/Highlights/HighlightsSection";
import ProjectsSection from "../../components/Projects/ProjectsSection";
import ExperienceSection from "../../components/Experience/ExperienceSection";
import SkillsSection from "../../components/Skills/SkillsSection";
import { ContactSection } from "../../components/Contact/ContactSection";
import { Footer } from "../../components/Footer/Footer";
import { AiToolkitSection } from "../../components/AiToolkit/AiToolkitSection";
import { CertificationsSection } from "../../components/Certifications/CertificationsSection";
import { AchievementsSection } from "../../components/Achievements/AchievementsSection";

export default async function Page() {
  const resume: Resume = await loadResume();
  return (
    <main className="min-h-dvh bg-background text-foreground antialiased">
      <Header />
      <Hero />
      <HighlightsSection />
      <ProjectsSection />
      <ExperienceSection />
      <SkillsSection />
      <AchievementsSection achievements={resume.achievements ?? []} />
      <CertificationsSection certifications={resume.certifications ?? []} />
      <AiToolkitSection tools={resume.extras?.aiToolkit ?? []} />
      
      <ContactSection resumeData={resume} />
      
      <Footer />
    </main>
  );
}
