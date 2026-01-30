"use client";

import { useEffect } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fadeIn" />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-4xl h-[90vh] mx-4 bg-white rounded-sm shadow-2xl animate-fadeInScale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - always inside and on top of iframe */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-[9999] w-10 h-10 rounded-full bg-warm-gray hover:bg-warm-gray flex items-center justify-center transition-all duration-300 group shadow-lg"
          aria-label="Close booking"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-white group-hover:rotate-90 transition-transform duration-300"
          >
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Phorest Iframe */}
        <iframe
          src="https://www.phorest.com/salon/saloncare/book/services?staffId=qTL_0TSJlXX2mqTfJ0LylA"
          className="w-full h-full rounded-sm"
          title="Book an Appointment with Morvarid"
          allow="payment"
        />
      </div>
    </div>
  );
}
