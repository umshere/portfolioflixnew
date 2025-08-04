import { loadResume } from "../../lib/resume";

export async function Footer() {
  const resume = await loadResume();
  
  const currentYear = new Date().getFullYear();
  const name = resume.profile?.name || "Umesh Muzhayil Chathoth";

  return (
    <footer className="footer">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm text-neutral-500">
          © {currentYear} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
