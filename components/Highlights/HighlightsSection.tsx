import { loadResume } from "../../lib/resume";
import type { Resume } from "../../types/resume";

/**
 * Server component: renders the Professional Highlights section
 * using dark cards with subtle border and hover glow, plus the red underline heading accent.
 */
export default async function HighlightsSection() {
  const resume: Resume = await loadResume();
  const items =
    (resume.extras?.professionalHighlights as { title: string; description: string }[] | undefined) ??
    [];

  return (
    <section className="section highlights-section">
      <div className="section-header">
        <h2 className="section-title">Professional Highlights</h2>
      </div>
      <div className="highlights-grid">
        {items.map((h, i) => (
          <div
            key={i}
            className="highlight-card"
          >
            <div className="highlight-icon">★</div>
            <h3 className="highlight-title">{h.title}</h3>
            <p className="highlight-description">{h.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
