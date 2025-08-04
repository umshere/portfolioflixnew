"use client";

import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react';

export function ContactBand() {
  const handleContactClick = () => {
    // Dispatch a custom event that the parent client component can listen to
    window.dispatchEvent(new CustomEvent('openContactModal'));
  };

  return (
    <section id="contact" className="contact-section">
      <p className="contact-text">
        Let&apos;s connect and discuss how we can work together. I&apos;m always open to new opportunities and interesting conversations.
      </p>
      <div className="contact-links">
        <div className="contact-button-container">
          <div className="contact-main-button" onClick={handleContactClick}>
            <MessageCircle size={20} />
            Get In Touch
          </div>
          <div className="contact-options">
            <a href="mailto:umshere@gmail.com" className="contact-option" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href="https://www.linkedin.com/in/umesh-muzhayil-chathoth-a086a446/" className="contact-option" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
            </a>
            <a href="https://github.com/umshere/" className="contact-option" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <Github size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
