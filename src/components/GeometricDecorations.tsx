import React from "react";

// Top / Hero Left & Right Chevron Corner Accents
export function CornerChevrons({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none select-none text-brand-gold/40 ${className}`}
      width="90"
      height="90"
      viewBox="0 0 90 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer corner angled lines */}
      <path
        d="M5 85 L5 5 L85 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M15 65 L15 15 L65 15"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.6"
        strokeLinecap="round"
      />
      <path
        d="M25 45 L25 25 L45 25"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
      {/* Inward chevron arrow */}
      <path
        d="M8 8 L32 32"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Bottom Coming Soon Chevron Accents (left & right diamond/chevron wings)
export function BottomChevronWings({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      className={`pointer-events-none select-none text-brand-gold/35 ${flip ? "scale-x-[-1]" : ""}`}
      width="70"
      height="90"
      viewBox="0 0 70 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M60 10 L15 45 L60 80"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 20 L22 45 L50 70"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40 30 L28 45 L40 60"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Minar-e-Pakistan & Cityscape Silhouette Line Art (Left Side)
export function PakistanLandmarksLeft({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none select-none text-brand-gold/20 ${className}`}
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Minar-e-Pakistan Tower */}
      {/* Base petal arches */}
      <path
        d="M40 270 Q45 250 55 235 Q65 250 70 270 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M25 270 Q40 240 55 220 Q70 240 85 270 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* Lower Gallery */}
      <path d="M42 220 L68 220" stroke="currentColor" strokeWidth="1.5" />
      <rect x="44" y="215" width="22" height="5" stroke="currentColor" strokeWidth="1" />
      {/* Tower Stem (tapering upward) */}
      <path d="M46 215 L50 120 L60 120 L64 215" stroke="currentColor" strokeWidth="1.2" />
      {/* Flutes / vertical ribs on stem */}
      <line x1="52" y1="215" x2="53" y2="120" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6" />
      <line x1="55" y1="215" x2="55" y2="120" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.8" />
      <line x1="58" y1="215" x2="57" y2="120" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.6" />
      {/* Middle Gallery */}
      <rect x="48" y="115" width="14" height="5" stroke="currentColor" strokeWidth="1.2" />
      {/* Upper Dome & Finial */}
      <path d="M50 115 L52 80 L58 80 L60 115" stroke="currentColor" strokeWidth="1" />
      <path d="M51 80 Q55 70 59 80 Z" stroke="currentColor" strokeWidth="1.2" />
      <line x1="55" y1="70" x2="55" y2="50" stroke="currentColor" strokeWidth="1.2" />
      {/* Crescent & Star at top */}
      <circle cx="55" cy="46" r="3" stroke="currentColor" strokeWidth="1" />

      {/* Karachi / Pakistan City Skyline silhouettes */}
      {/* Modern High Rises & Port Lines */}
      <path
        d="M90 270 L90 210 L105 210 L105 270"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line x1="94" y1="220" x2="101" y2="220" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
      <line x1="94" y1="230" x2="101" y2="230" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
      <line x1="94" y1="240" x2="101" y2="240" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
      <line x1="94" y1="250" x2="101" y2="250" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />

      <path
        d="M110 270 L110 180 L130 180 L130 270"
        stroke="currentColor"
        strokeWidth="1"
      />
      <polygon points="120,165 110,180 130,180" stroke="currentColor" strokeWidth="1" />

      <path
        d="M135 270 L135 225 L150 225 L150 270"
        stroke="currentColor"
        strokeWidth="1"
      />

      <path
        d="M155 270 L155 195 L175 195 L175 270"
        stroke="currentColor"
        strokeWidth="1"
      />

      {/* Subtle Karachi coastal waves / ground line */}
      <path
        d="M10 270 L280 270"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.7"
      />
    </svg>
  );
}

// Cozy Suburban Home & Mosque Domes Line Art (Right Side)
export function HomeAndMosqueRight({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none select-none text-brand-gold/20 ${className}`}
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cozy Suburban House Outline */}
      {/* Pitched Roof */}
      <path
        d="M140 270 L140 180 L200 130 L260 180 L260 270 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      {/* Extended eaves */}
      <path d="M130 185 L200 126 L270 185" stroke="currentColor" strokeWidth="1.5" />
      {/* Chimney */}
      <path d="M235 155 L235 125 L248 125 L248 165" stroke="currentColor" strokeWidth="1.2" />
      {/* Multipane Windows */}
      <rect x="160" y="195" width="28" height="28" stroke="currentColor" strokeWidth="1" />
      <line x1="174" y1="195" x2="174" y2="223" stroke="currentColor" strokeWidth="0.8" />
      <line x1="160" y1="209" x2="188" y2="209" stroke="currentColor" strokeWidth="0.8" />

      <rect x="212" y="195" width="28" height="28" stroke="currentColor" strokeWidth="1" />
      <line x1="226" y1="195" x2="226" y2="223" stroke="currentColor" strokeWidth="0.8" />
      <line x1="212" y1="209" x2="240" y2="209" stroke="currentColor" strokeWidth="0.8" />

      {/* Front Door */}
      <path d="M185 270 L185 240 L215 240 L215 270" stroke="currentColor" strokeWidth="1.2" />

      {/* Surrounding Garden Trees */}
      <path
        d="M110 270 L110 220 Q95 200 110 180 Q125 160 135 185 Q145 210 130 225 L130 270"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.7"
      />
      <path
        d="M275 270 L275 220 Q290 195 280 175 Q265 160 260 185 L260 270"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.7"
      />

      {/* Mosque Dome silhouette behind house */}
      <path
        d="M60 270 L60 220 Q80 170 100 220 L100 270"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      {/* Minaret */}
      <path d="M50 270 L50 160 L56 160 L56 270" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <path d="M48 160 L53 145 L58 160 Z" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />

      {/* Ground line */}
      <line x1="20" y1="270" x2="310" y2="270" stroke="currentColor" strokeWidth="1" strokeOpacity="0.7" />
    </svg>
  );
}

// Mosque & Minaret Vector for Early Access Section (Faisal / Badshahi style)
export function MosqueSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`pointer-events-none select-none text-brand-gold/25 ${className}`}
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grand Central Dome */}
      <path
        d="M80 210 L80 150 Q140 70 200 150 L200 210"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      {/* Crescent Finial */}
      <line x1="140" y1="90" x2="140" y2="60" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="140" cy="56" r="3.5" stroke="currentColor" strokeWidth="1.2" />

      {/* Left Minaret */}
      <path d="M55 210 L62 80 L72 80 L79 210" stroke="currentColor" strokeWidth="1.2" />
      <polygon points="67,60 59,80 75,80" stroke="currentColor" strokeWidth="1.2" />

      {/* Right Minaret */}
      <path d="M201 210 L208 80 L218 80 L225 210" stroke="currentColor" strokeWidth="1.2" />
      <polygon points="213,60 205,80 221,80" stroke="currentColor" strokeWidth="1.2" />

      {/* Islamic Arch Motifs */}
      <path
        d="M110 210 L110 170 Q140 145 170 170 L170 210"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.7"
      />
    </svg>
  );
}
