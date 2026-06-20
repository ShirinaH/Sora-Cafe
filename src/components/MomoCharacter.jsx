import './MomoCharacter.css';

export default function MomoCharacter({ mood = 'idle' }) {
  return (
    <div className={`momo-character momo-${mood}`} aria-hidden="true">
      <svg viewBox="0 0 120 140" className="momo-svg" role="img" aria-label="Momo the cat barista">
        <ellipse cx="60" cy="95" rx="35" ry="30" fill="#b8d4e8" />
        <ellipse cx="60" cy="55" rx="32" ry="28" fill="#b8d4e8" />
        <polygon points="30,35 22,15 38,28" fill="#b8d4e8" />
        <polygon points="90,35 98,15 82,28" fill="#b8d4e8" />
        <polygon points="30,35 26,20 36,30" fill="#f5d0d0" />
        <polygon points="90,35 94,20 84,30" fill="#f5d0d0" />
        <circle cx="48" cy="52" r="4" fill="#3d4f5f" />
        <circle cx="72" cy="52" r="4" fill="#3d4f5f" />
        <ellipse cx="60" cy="60" rx="4" ry="3" fill="#f5d0d0" />
        <path
          d={mood === 'sad' ? 'M 52 68 Q 60 62 68 68' : mood === 'happy' || mood === 'celebrate' ? 'M 50 65 Q 60 75 70 65' : 'M 54 68 Q 60 72 66 68'}
          fill="none"
          stroke="#3d4f5f"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M 35 80 L 85 80 L 80 110 L 40 110 Z" fill="#6b8cae" />
        <rect x="52" y="80" width="16" height="8" rx="2" fill="#fff8f0" />
        {mood === 'celebrate' && (
          <>
            <text x="15" y="30" fontSize="16">✨</text>
            <text x="95" y="25" fontSize="14">🌸</text>
          </>
        )}
        {mood === 'thinking' && (
          <text x="88" y="40" fontSize="14" className="momo-thought">💭</text>
        )}
      </svg>
      <span className="momo-name">Momo</span>
    </div>
  );
}
