"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Umesh Muzhayil Chathoth</h1>
        <h2 className="hero-subtitle">Full Stack Engineer</h2>
        <p className="hero-description">
          14+ years of experience in full-stack development, specializing in
          Angular, React, and Vue.js frontend technologies. Adept in cloud
          solutions (AWS, Azure) and backend services with Node.js and Java
          microservices.
        </p>
        <div className="hero-buttons">
          <Link href="#projects" className="btn btn-primary">View Projects</Link>
          <Link href="#contact" className="btn btn-secondary">Get In Touch</Link>
        </div>
      </div>
      <div className="hero-overlay"></div>
    </section>
  );
}
