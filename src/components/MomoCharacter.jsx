import './MomoCharacter.css';

function MomoFace({ mood }) {
  const mouth =
    mood === 'sad'       ? 'M 52 68 Q 60 62 68 68' :
    mood === 'happy' || mood === 'celebrate' ? 'M 50 65 Q 60 76 70 65' :
    'M 54 68 Q 60 73 66 68';

  return (
    <>
      {/* ears */}
      <polygon points="30,35 22,15 38,28" fill="#b8d4e8" />
      <polygon points="90,35 98,15 82,28" fill="#b8d4e8" />
      <polygon points="30,35 26,20 36,30" fill="#f5d0d0" />
      <polygon points="90,35 94,20 84,30" fill="#f5d0d0" />
      {/* head */}
      <ellipse cx="60" cy="55" rx="32" ry="28" fill="#b8d4e8" />
      {/* eyes */}
      <circle cx="48" cy="52" r="4" fill="#3d4f5f" />
      <circle cx="72" cy="52" r="4" fill="#3d4f5f" />
      <circle cx="49.5" cy="50.5" r="1.5" fill="white" />
      <circle cx="73.5" cy="50.5" r="1.5" fill="white" />
      {/* nose */}
      <ellipse cx="60" cy="60" rx="4" ry="3" fill="#f5d0d0" />
      {/* mouth */}
      <path d={mouth} fill="none" stroke="#3d4f5f" strokeWidth="2" strokeLinecap="round" />
      {/* cheeks */}
      <ellipse cx="38" cy="62" rx="8" ry="5" fill="#f5d0d0" opacity="0.5" />
      <ellipse cx="82" cy="62" rx="8" ry="5" fill="#f5d0d0" opacity="0.5" />
    </>
  );
}

/* ── Small sidebar pose (original) ── */
function MomoSmall({ mood }) {
  return (
    <svg viewBox="0 0 120 140" className="momo-svg" aria-label="Momo the cat barista">
      <ellipse cx="60" cy="95" rx="35" ry="30" fill="#6b8cae" />
      <rect x="52" y="80" width="16" height="8" rx="2" fill="#fff8f0" />
      <MomoFace mood={mood} />
      {mood === 'celebrate' && (
        <>
          <text x="8"  y="28" fontSize="18">✨</text>
          <text x="92" y="24" fontSize="14">🌸</text>
        </>
      )}
      {mood === 'thinking' && (
        <text x="88" y="38" fontSize="14" className="momo-thought">💭</text>
      )}
    </svg>
  );
}

/* ── Counter pose — waist-up behind counter bar ── */
function MomoCounter({ mood }) {
  const armPath =
    mood === 'thinking' ? 'M 60 110 Q 40 120 30 115' :
    mood === 'happy' || mood === 'celebrate' ? 'M 60 110 Q 80 105 95 100' :
    'M 60 110 Q 45 118 35 115';

  return (
    <svg viewBox="0 0 160 200" className="momo-counter-svg" aria-label="Momo behind the counter">
      {/* apron body */}
      <ellipse cx="80" cy="148" rx="48" ry="45" fill="#6b8cae" />
      {/* apron bib */}
      <rect x="62" y="108" width="36" height="28" rx="6" fill="#fff8f0" />
      <rect x="68" y="112" width="24" height="4" rx="2" fill="#c5d9ea" />
      <rect x="68" y="119" width="18" height="3" rx="1.5" fill="#c5d9ea" />
      {/* arms */}
      <path d={armPath} stroke="#6b8cae" strokeWidth="16" strokeLinecap="round" fill="none" />
      {/* hands */}
      <circle cx="30" cy="115" r="9" fill="#b8d4e8" />
      {/* counter top overlap */}
      <rect x="0" y="168" width="160" height="32" rx="6" fill="#c8a87a" opacity="0.9" />
      <rect x="0" y="164" width="160" height="8" rx="3" fill="#b8956a" />
      {/* head group (on top) */}
      <g transform="translate(0, -8)">
        <polygon points="56,38 48,18 64,31"  fill="#b8d4e8" />
        <polygon points="104,38 112,18 96,31" fill="#b8d4e8" />
        <polygon points="56,38 52,23 62,33"  fill="#f5d0d0" />
        <polygon points="104,38 108,23 98,33" fill="#f5d0d0" />
        <ellipse cx="80" cy="58" rx="34" ry="30" fill="#b8d4e8" />
        <circle cx="66" cy="54" r="4.5" fill="#3d4f5f" />
        <circle cx="94" cy="54" r="4.5" fill="#3d4f5f" />
        <circle cx="67.5" cy="52.5" r="1.8" fill="white" />
        <circle cx="95.5" cy="52.5" r="1.8" fill="white" />
        <ellipse cx="80" cy="63" rx="4.5" ry="3.5" fill="#f5d0d0" />
        <path
          d={
            mood === 'sad'       ? 'M 70 72 Q 80 65 90 72' :
            mood === 'happy' || mood === 'celebrate' ? 'M 68 69 Q 80 80 92 69' :
            'M 72 71 Q 80 77 88 71'
          }
          fill="none" stroke="#3d4f5f" strokeWidth="2.5" strokeLinecap="round"
        />
        <ellipse cx="55" cy="66" rx="9" ry="6" fill="#f5d0d0" opacity="0.5" />
        <ellipse cx="105" cy="66" rx="9" ry="6" fill="#f5d0d0" opacity="0.5" />
        {mood === 'celebrate' && (
          <>
            <text x="10" y="25" fontSize="20">✨</text>
            <text x="118" y="20" fontSize="16">🌸</text>
          </>
        )}
        {mood === 'thinking' && (
          <text x="112" y="38" fontSize="16" className="momo-thought">💭</text>
        )}
      </g>
    </svg>
  );
}

/* ── Window peek pose — just head + paws visible ── */
function MomoWindow({ mood }) {
  return (
    <svg viewBox="0 0 100 90" className="momo-window-svg" aria-label="Momo waving from window">
      <ellipse cx="50" cy="52" rx="28" ry="24" fill="#b8d4e8" />
      <polygon points="30,36 23,18 37,29" fill="#b8d4e8" />
      <polygon points="70,36 77,18 63,29" fill="#b8d4e8" />
      <polygon points="30,36 26,22 35,31" fill="#f5d0d0" />
      <polygon points="70,36 74,22 65,31" fill="#f5d0d0" />
      <circle cx="41" cy="48" r="3.5" fill="#3d4f5f" />
      <circle cx="59" cy="48" r="3.5" fill="#3d4f5f" />
      <circle cx="42.2" cy="46.8" r="1.4" fill="white" />
      <circle cx="60.2" cy="46.8" r="1.4" fill="white" />
      <ellipse cx="50" cy="55" rx="3.5" ry="2.5" fill="#f5d0d0" />
      <path d="M 44 61 Q 50 66 56 61" fill="none" stroke="#3d4f5f" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="35" cy="62" rx="6" ry="4" fill="#f5d0d0" opacity="0.5" />
      <ellipse cx="65" cy="62" rx="6" ry="4" fill="#f5d0d0" opacity="0.5" />
      {/* paws on windowsill */}
      <ellipse cx="30" cy="80" rx="12" ry="7" fill="#b8d4e8" />
      <ellipse cx="70" cy="80" rx="12" ry="7" fill="#b8d4e8" />
      {/* raised paw waving */}
      <ellipse cx="82" cy="62" rx="10" ry="7" fill="#b8d4e8" transform="rotate(-20 82 62)" />
    </svg>
  );
}

export default function MomoCharacter({ mood = 'idle', pose = 'side' }) {
  return (
    <div className={`momo-character momo-${mood} momo-pose-${pose}`} aria-hidden="true">
      {pose === 'counter' && <MomoCounter mood={mood} />}
      {pose === 'window'  && <MomoWindow  mood={mood} />}
      {pose === 'side'    && <MomoSmall   mood={mood} />}
      {pose === 'side' && <span className="momo-name">Momo</span>}
    </div>
  );
}
