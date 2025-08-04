"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <span style={{
            background: "linear-gradient(90deg, #e50914 0%, #ff6b6b 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 900,
            fontSize: "2rem",
            letterSpacing: "2px"
          }}>
            UMC
          </span>
        </div>
        <nav className="nav">
          <Link href="#hero" className="nav-link active">Home</Link>
          <Link href="#projects" className="nav-link">Projects</Link>
          <Link href="#experience" className="nav-link">Experience</Link>
          <Link href="#skills" className="nav-link">Skills</Link>
          <Link href="#contact" className="nav-link">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
