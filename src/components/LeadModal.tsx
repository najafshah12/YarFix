"use client";

import React, { useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import LeadForm from "./LeadForm";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialInterest?: string;
  source?: string;
}

export default function LeadModal({
  isOpen,
  onClose,
  initialInterest = "both",
  source = "modal_trigger",
}: LeadModalProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#071f18] border border-brand-gold/40 rounded-3xl shadow-goldGlow overflow-hidden z-10 my-auto animate-scaleUp">
        {/* Decorative Top Gold Glow Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-brand-goldLight via-brand-gold to-brand-goldDark" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 rounded-full bg-[#051610]/70 hover:bg-[#051610] text-brand-sage hover:text-white border border-brand-border/40 hover:border-brand-gold/50 transition-colors z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Inner Header Accent */}
        <div className="px-6 pt-5 pb-1 flex items-center gap-2 text-brand-gold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Priority Access · Launching in Pakistan</span>
        </div>

        {/* The Form */}
        <LeadForm
          initialInterest={initialInterest}
          source={source}
          isModal={true}
          onSuccess={onClose}
        />
      </div>
    </div>
  );
}
