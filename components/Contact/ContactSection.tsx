"use client";

import { useState, useEffect } from "react";
import { ContactBand } from "./ContactBand";
import { ContactModal } from "./ContactModal";
import type { Resume } from "../../types/resume";

interface ContactSectionProps {
  resumeData: Resume;
}

export function ContactSection({ resumeData }: ContactSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenModal = () => setModalOpen(true);
    window.addEventListener('openContactModal', handleOpenModal);
    
    return () => {
      window.removeEventListener('openContactModal', handleOpenModal);
    };
  }, []);

  return (
    <>
      <ContactBand />
      <ContactModal open={modalOpen} onOpenChange={setModalOpen} resumeData={resumeData} />
    </>
  );
}
