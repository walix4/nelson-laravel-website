"use client";

// Animated 3D-style toll gate (cabinet-projection SVG) with a lifting boom barrier.
export default function TollGate() {
  return (
    <div className="tg-wrap">
      <svg viewBox="0 0 360 320" width="100%" style={{ maxWidth: 440, overflow: "visible" }} role="img" aria-label="Toll gate">
        <defs>
          <linearGradient id="tgNavy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1B4E9B" /><stop offset="1" stopColor="#0B2D5C" /></linearGradient>
          <linearGradient id="tgNavyDark" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#0B2D5C" /><stop offset="1" stopColor="#061A38" /></linearGradient>
          <linearGradient id="tgOrange" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffe45c" /><stop offset="1" stopColor="#ffde01" /></linearGradient>
          <linearGradient id="tgOrangeDark" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#d9a800" /><stop offset="1" stopColor="#d9a800" /></linearGradient>
          <radialGradient id="tgGlow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stopColor="#ffde01" stopOpacity="0.5" /><stop offset="1" stopColor="#ffde01" stopOpacity="0" /></radialGradient>
          <pattern id="tgStripes" width="22" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(20)"><rect width="22" height="14" fill="#ffde01" /><rect width="11" height="14" fill="#FFFFFF" /></pattern>
        </defs>

        {/* ground glow */}
        <ellipse cx="178" cy="292" rx="140" ry="20" fill="url(#tgGlow)" />

        {/* left post */}
        <polygon points="102,110 118,101 118,251 102,260" fill="url(#tgNavyDark)" />
        <rect x="78" y="110" width="24" height="150" fill="url(#tgNavy)" />
        {/* right post */}
        <polygon points="268,110 284,101 284,251 268,260" fill="url(#tgNavyDark)" />
        <rect x="244" y="110" width="24" height="150" fill="url(#tgNavy)" />

        {/* top beam */}
        <polygon points="70,86 86,77 306,77 290,86" fill="#1B4E9B" />
        <polygon points="290,86 306,77 306,103 290,112" fill="url(#tgNavyDark)" />
        <rect x="70" y="86" width="220" height="26" fill="url(#tgNavy)" />
        <rect x="70" y="104" width="220" height="8" fill="#061A38" opacity="0.5" />

        {/* hangers + TOLL sign */}
        <rect x="158" y="112" width="3" height="38" fill="#0B2D5C" />
        <rect x="199" y="112" width="3" height="38" fill="#0B2D5C" />
        <polygon points="148,150 164,141 228,141 212,150" fill="#ffe45c" />
        <polygon points="212,150 228,141 228,185 212,194" fill="url(#tgOrangeDark)" />
        <rect x="148" y="150" width="64" height="44" rx="6" fill="url(#tgOrange)" />
        <text x="180" y="179" textAnchor="middle" fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="20" fill="#fff" letterSpacing="0.5">TOLL</text>

        {/* signal lights on beam */}
        <circle cx="96" cy="99" r="4.5" fill="#16B571" className="tg-led" />
        <circle cx="264" cy="99" r="4.5" fill="#ffde01" />

        {/* boom barrier (lifts) */}
        <g className="tg-boom">
          <rect x="92" y="223" width="160" height="13" rx="6.5" fill="url(#tgStripes)" stroke="#0B2D5C" strokeWidth="1.5" />
          <circle cx="86" cy="229.5" r="5" fill="#fff" stroke="#0B2D5C" strokeWidth="1.5" />
        </g>
        {/* pivot hub on right post */}
        <circle cx="252" cy="229" r="11" fill="#0B2D5C" />
        <circle cx="252" cy="229" r="5" fill="#ffde01" />
      </svg>

      <style jsx>{`
        .tg-wrap { width: 100%; display: flex; justify-content: center; animation: tgFloat 6s ease-in-out infinite; }
        @keyframes tgFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        :global(.tg-boom) { transform-box: view-box; transform-origin: 252px 229px; animation: tgBoom 5s ease-in-out infinite; }
        @keyframes tgBoom { 0%, 26% { transform: rotate(0deg); } 50%, 72% { transform: rotate(-54deg); } 100% { transform: rotate(0deg); } }
        :global(.tg-led) { animation: tgLed 1.8s ease-in-out infinite; }
        @keyframes tgLed { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
      `}</style>
    </div>
  );
}
