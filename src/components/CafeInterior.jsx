import './CafeInterior.css';

export default function CafeInterior({ children }) {
  return (
    <div className="cafe-interior">
      <svg
        viewBox="0 0 900 560"
        className="interior-svg"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ceilGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#d8eef8" />
            <stop offset="100%" stopColor="#e8f4fb" />
          </linearGradient>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#eef6fc" />
            <stop offset="100%" stopColor="#e0eff8" />
          </linearGradient>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f5f0e8" />
            <stop offset="100%" stopColor="#ede5d8" />
          </linearGradient>
          <linearGradient id="skyWin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#b0d8f5" />
            <stop offset="100%" stopColor="#d0ecfa" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ceiling */}
        <rect width="900" height="560" fill="url(#wallGrad)" />
        <rect width="900" height="80"  fill="url(#ceilGrad)" />

        {/* Ceiling cornice */}
        <path d="M 0 80 Q 450 95 900 80 L 900 90 Q 450 105 0 90 Z" fill="#c8dff0" opacity="0.5" />

        {/* ── Arched windows ── */}
        {[80, 310, 540, 770].map((x, i) => (
          <g key={i}>
            {/* Window reveal / arch */}
            <path
              d={`M ${x} 280 L ${x} 110 Q ${x+90} 55 ${x+180} 110 L ${x+180} 280 Z`}
              fill="#c0dff5"
              stroke="#8ab8d8"
              strokeWidth="4"
            />
            {/* Sky outside */}
            <path
              d={`M ${x+6} 278 L ${x+6} 112 Q ${x+90} 60 ${x+174} 112 L ${x+174} 278 Z`}
              fill="url(#skyWin)"
            />
            {/* window glow */}
            <path
              d={`M ${x+6} 278 L ${x+6} 112 Q ${x+90} 60 ${x+174} 112 L ${x+174} 278 Z`}
              fill="white"
              opacity="0.15"
              filter="url(#glow)"
            />
            {/* Window frame divider */}
            <line x1={x+90} y1="60" x2={x+90} y2="280"
                  stroke="#8ab8d8" strokeWidth="3" opacity="0.6" />
            <line x1={x+6} y1="180" x2={x+174} y2="180"
                  stroke="#8ab8d8" strokeWidth="3" opacity="0.6" />
            {/* Window sill */}
            <rect x={x-4} y="276" width="188" height="10" rx="4" fill="#a0c4e0" />
          </g>
        ))}

        {/* Light wash from windows on floor */}
        {[80, 310, 540, 770].map((x, i) => (
          <ellipse key={i} cx={x+90} cy="430" rx="70" ry="40"
                   fill="#c8e8f8" opacity="0.25" />
        ))}

        {/* ── Floor ── */}
        <rect x="0" y="440" width="900" height="120" fill="url(#floorGrad)" />
        {/* Floor tiles — alternating */}
        {Array.from({ length: 10 }, (_, col) =>
          Array.from({ length: 3 }, (_, row) => (
            <rect
              key={`${col}-${row}`}
              x={col * 90}
              y={440 + row * 40}
              width="88"
              height="38"
              rx="2"
              fill={(col + row) % 2 === 0 ? '#f0e8da' : '#e8ddd0'}
              opacity="0.8"
            />
          ))
        )}
        {/* Floor baseboards */}
        <rect x="0" y="438" width="900" height="6" rx="2" fill="#c8b090" />

        {/* ── Wall wainscoting ── */}
        <rect x="0" y="290" width="900" height="8"  rx="2" fill="#a8cce0" opacity="0.5" />
        <rect x="0" y="290" width="900" height="150" fill="#e8f2f8" opacity="0.2" />

        {/* ── Pendant lights ── */}
        {[150, 380, 610].map((x, i) => (
          <g key={i}>
            <line x1={x} y1="0" x2={x} y2="55" stroke="#8ab8d8" strokeWidth="2" />
            <ellipse cx={x} cy="58"  rx="18" ry="8"  fill="#d8e8f0" />
            <ellipse cx={x} cy="65"  rx="16" ry="22" fill="#f0f8ff" stroke="#c8dff0" strokeWidth="1.5" />
            <ellipse cx={x} cy="65"  rx="12" ry="18" fill="#fffff8" opacity="0.6" />
            {/* glow */}
            <ellipse cx={x} cy="80"  rx="30" ry="15" fill="#fffde0" opacity="0.3" filter="url(#glow)" />
          </g>
        ))}

        {/* ── Counter / bar in background ── */}
        <rect x="160" y="340" width="580" height="100" rx="8" fill="#c8a87a" opacity="0.85" />
        <rect x="155" y="335" width="590" height="14"  rx="6" fill="#b8956a" />
        {/* counter tiles */}
        {Array.from({ length: 10 }, (_, i) => (
          <rect key={i} x={163 + i*57} y="342" width="54" height="90"
                rx="2" fill="rgba(255,255,255,0.08)" stroke="rgba(200,168,122,0.4)" strokeWidth="1" />
        ))}
        {/* items on counter */}
        <ellipse cx="250" cy="334" rx="18" ry="8" fill="#88b888" />
        <rect    cx="250" cy="334" x="244" y="334" width="12" height="2" rx="1" fill="#6a9a6a" />
        <ellipse cx="400" cy="334" rx="14" ry="6" fill="#f5d0d0" />
        <ellipse cx="560" cy="334" rx="18" ry="8" fill="#b8d4e8" />

        {/* ── Plants ── */}
        {/* Left corner plant */}
        <ellipse cx="32"  cy="400" rx="28" ry="36" fill="#6ab06a" opacity="0.85" />
        <ellipse cx="15"  cy="390" rx="20" ry="26" fill="#5aa05a" opacity="0.85" />
        <ellipse cx="50"  cy="385" rx="18" ry="24" fill="#6ab06a" opacity="0.75" />
        <rect    x="20"   y="430"  width="24" height="20" rx="8"  fill="#c8956a" />
        <ellipse cx="32"  cy="430" rx="14" ry="5" fill="#b8856a" />

        {/* Right corner plant */}
        <ellipse cx="868" cy="400" rx="28" ry="36" fill="#6ab06a" opacity="0.85" />
        <ellipse cx="850" cy="390" rx="18" ry="24" fill="#5aa05a" opacity="0.85" />
        <ellipse cx="882" cy="385" rx="20" ry="26" fill="#6ab06a" opacity="0.75" />
        <rect    x="856"  y="430"  width="24" height="20" rx="8"  fill="#c8956a" />
        <ellipse cx="868" cy="430" rx="14" ry="5" fill="#b8856a" />

        {/* ── Hanging floral decoration ── */}
        <line x1="200" y1="0"  x2="200" y2="30"  stroke="#8ab8d8" strokeWidth="1.5" />
        <ellipse cx="200" cy="36" rx="12" ry="8" fill="#f5c0d0" opacity="0.7" />
        <line x1="700" y1="0"  x2="700" y2="30"  stroke="#8ab8d8" strokeWidth="1.5" />
        <ellipse cx="700" cy="36" rx="12" ry="8" fill="#e8d0f0" opacity="0.7" />

        {/* ── Wall art / frames ── */}
        <rect x="20"  y="100" width="50" height="60" rx="4" fill="white" stroke="#8ab8d8" strokeWidth="2" />
        <text x="45"  y="137" textAnchor="middle" fontSize="22">🌸</text>
        <rect x="830" y="100" width="50" height="60" rx="4" fill="white" stroke="#8ab8d8" strokeWidth="2" />
        <text x="855" y="137" textAnchor="middle" fontSize="22">🍵</text>
      </svg>

      {/* Children (ShiftSetup card etc.) */}
      <div className="interior-content">
        {children}
      </div>
    </div>
  );
}
