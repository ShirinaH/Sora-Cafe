import { useState } from 'react';
import './CafeExterior.css';
import { LEVELS } from '../data/levels';
import { isLevelUnlocked, resetProgress } from '../utils/progressStorage';
import MomoCharacter from './MomoCharacter';

function ExteriorSVG() {
  return (
    <svg
      viewBox="0 0 800 520"
      className="exterior-svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* ── Sky gradient ── */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#c8e6f5" />
          <stop offset="100%" stopColor="#e8f6ff" />
        </linearGradient>
        <linearGradient id="groundGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#d4e8c2" />
          <stop offset="100%" stopColor="#b8d4a0" />
        </linearGradient>
        <linearGradient id="awningGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#5a7fa0" />
          <stop offset="100%" stopColor="#4a6d8c" />
        </linearGradient>
        <filter id="softShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#4a6d8c" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="800" height="520" fill="url(#skyGrad)" />

      {/* Clouds */}
      <ellipse cx="120" cy="60" rx="55" ry="22" fill="white" opacity="0.7" />
      <ellipse cx="155" cy="50" rx="40" ry="18" fill="white" opacity="0.7" />
      <ellipse cx="90"  cy="55" rx="30" ry="15" fill="white" opacity="0.7" />
      <ellipse cx="620" cy="75" rx="60" ry="22" fill="white" opacity="0.6" />
      <ellipse cx="660" cy="65" rx="42" ry="18" fill="white" opacity="0.6" />
      <ellipse cx="590" cy="70" rx="32" ry="15" fill="white" opacity="0.6" />

      {/* Ground / pavement */}
      <rect x="0" y="420" width="800" height="100" fill="url(#groundGrad)" />
      {/* pavement tiles */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={i*100} y="422" width="98" height="20" rx="2" fill="#c5dba8" opacity="0.5" />
      ))}

      {/* ── Main building ── */}
      {/* Building body */}
      <rect x="140" y="150" width="520" height="270" rx="6" fill="#f5f0e8" filter="url(#softShadow)" />
      {/* Blue facade trim */}
      <rect x="140" y="150" width="520" height="12" rx="3" fill="#6b8cae" />
      <rect x="140" y="408" width="520" height="12" rx="3" fill="#6b8cae" />

      {/* ── Awning ── */}
      <path d="M 120 152 Q 400 128 680 152 L 680 185 Q 400 165 120 185 Z" fill="url(#awningGrad)" />
      {/* Awning scalloped hem */}
      {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
        <ellipse key={i} cx={128 + i*52} cy="185" rx="26" ry="10" fill="#4a6d8c" />
      ))}
      {/* Awning stripes */}
      {[0,1,2,3,4,5,6,7,8,9].map(i => (
        <line key={i} x1={130 + i*54} y1="154" x2={126 + i*54} y2="183"
              stroke="rgba(255,255,255,0.18)" strokeWidth="12" />
      ))}

      {/* ── Sign board ── */}
      <rect x="270" y="118" width="260" height="46" rx="10" fill="#4a6d8c" filter="url(#softShadow)" />
      <rect x="274" y="122" width="252" height="38" rx="8" fill="#3a5d7c" />
      <text x="400" y="136" textAnchor="middle" fill="#e8f4ff" fontSize="11" fontWeight="600" letterSpacing="3">空 SORA CAFÉ</text>
      <text x="400" y="150" textAnchor="middle" fill="#b8d4e8" fontSize="9" letterSpacing="2">ももカフェ · EST. 2024</text>
      {/* sign brackets */}
      <rect x="306" y="113" width="6" height="12" rx="3" fill="#4a6d8c" />
      <rect x="488" y="113" width="6" height="12" rx="3" fill="#4a6d8c" />

      {/* ── Left window ── */}
      <rect x="168" y="210" width="140" height="155" rx="70" fill="#d4eaf5" stroke="#6b8cae" strokeWidth="4" />
      <rect x="175" y="217" width="126" height="141" rx="63" fill="#c8e4f2" opacity="0.6" />
      {/* window cross */}
      <line x1="238" y1="217" x2="238" y2="358" stroke="#6b8cae" strokeWidth="3" opacity="0.5" />
      <line x1="168" y1="288" x2="308" y2="288" stroke="#6b8cae" strokeWidth="3" opacity="0.5" />
      {/* plants visible in left window */}
      <ellipse cx="200" cy="340" rx="16" ry="20" fill="#8fc98f" opacity="0.7" />
      <ellipse cx="215" cy="330" rx="12" ry="16" fill="#72b872" opacity="0.7" />
      <rect x="205" y="353" width="8" height="10" rx="3" fill="#c8a87a" opacity="0.8" />

      {/* ── Right window (Momo's window) ── */}
      <rect x="492" y="210" width="140" height="155" rx="70" fill="#d4eaf5" stroke="#6b8cae" strokeWidth="4" />
      <rect x="499" y="217" width="126" height="141" rx="63" fill="#c8e4f2" opacity="0.6" />
      <line x1="562" y1="217" x2="562" y2="358" stroke="#6b8cae" strokeWidth="3" opacity="0.5" />
      <line x1="492" y1="288" x2="632" y2="288" stroke="#6b8cae" strokeWidth="3" opacity="0.5" />

      {/* Flower boxes */}
      <rect x="158" y="360" width="160" height="18" rx="8" fill="#6b8cae" />
      <ellipse cx="178" cy="358" rx="10" ry="10" fill="#f5a0b0" />
      <ellipse cx="200" cy="354" rx="10" ry="10" fill="#f5c0d0" />
      <ellipse cx="222" cy="358" rx="10" ry="10" fill="#f5a0b0" />
      <ellipse cx="244" cy="355" rx="8"  ry="8"  fill="#e8d0f0" />
      <ellipse cx="264" cy="358" rx="9"  ry="9"  fill="#f5b0c0" />

      <rect x="482" y="360" width="160" height="18" rx="8" fill="#6b8cae" />
      <ellipse cx="502" cy="358" rx="10" ry="10" fill="#f5c0d0" />
      <ellipse cx="524" cy="354" rx="10" ry="10" fill="#e8d0f0" />
      <ellipse cx="546" cy="358" rx="10" ry="10" fill="#f5a0b0" />
      <ellipse cx="568" cy="355" rx="8"  ry="8"  fill="#f5c0d0" />
      <ellipse cx="588" cy="358" rx="9"  ry="9"  fill="#e8d0f0" />

      {/* ── Door ── */}
      <rect x="342" y="265" width="116" height="155" rx="58" fill="#d4eaf5" stroke="#6b8cae" strokeWidth="4" />
      <rect x="349" y="272" width="102" height="141" rx="51" fill="#c2ddf0" />
      {/* door handle */}
      <circle cx="390" cy="365" r="5" fill="#6b8cae" />
      <circle cx="410" cy="365" r="5" fill="#6b8cae" />
      {/* door step */}
      <rect x="330" y="416" width="140" height="8" rx="4" fill="#6b8cae" />
      {/* door center line */}
      <line x1="400" y1="272" x2="400" y2="413" stroke="#6b8cae" strokeWidth="2" opacity="0.4" />

      {/* ── Chalkboard (far left) ── */}
      <rect x="30" y="260" width="96" height="120" rx="6" fill="#2d4a3e" filter="url(#softShadow)" />
      <rect x="35" y="265" width="86" height="110" rx="4" fill="#334d42" />
      {/* chalk border */}
      <rect x="37" y="267" width="82" height="106" rx="3" fill="none" stroke="#8fbeaa" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* chalk text */}
      <text x="78" y="285" textAnchor="middle" fill="#c8f0dc" fontSize="8" fontWeight="600">Today&apos;s</text>
      <text x="78" y="295" textAnchor="middle" fill="#c8f0dc" fontSize="8" fontWeight="600">Specials</text>
      <line x1="45" y1="300" x2="111" y2="300" stroke="#8fbeaa" strokeWidth="1" />
      <text x="78" y="313" textAnchor="middle" fill="#e8f8f0" fontSize="7.5">🍵 Matcha</text>
      <text x="78" y="327" textAnchor="middle" fill="#e8f8f0" fontSize="7.5">🌸 Sakura Latte</text>
      <text x="78" y="341" textAnchor="middle" fill="#e8f8f0" fontSize="7.5">🍡 Mochi Set</text>
      <text x="78" y="355" textAnchor="middle" fill="#e8f8f0" fontSize="7.5">☁️ Blue Mug</text>
      {/* chalkboard legs */}
      <line x1="48"  y1="380" x2="38"  y2="420" stroke="#2d4a3e" strokeWidth="5" strokeLinecap="round" />
      <line x1="108" y1="380" x2="118" y2="420" stroke="#2d4a3e" strokeWidth="5" strokeLinecap="round" />

      {/* ── Outdoor bistro table + chairs ── */}
      {/* table */}
      <ellipse cx="680" cy="385" rx="52" ry="16" fill="#e8d8c0" stroke="#c8b090" strokeWidth="2" />
      <rect x="676" y="384" width="8" height="38" rx="4" fill="#c8b090" />
      {/* chairs */}
      <rect x="626" y="370" width="38" height="32" rx="8" fill="#6b8cae" opacity="0.9" />
      <rect x="626" y="360" width="38" height="14" rx="6" fill="#5a7fa0" />
      <line x1="632" y1="402" x2="628" y2="420" stroke="#5a7fa0" strokeWidth="4" strokeLinecap="round" />
      <line x1="658" y1="402" x2="662" y2="420" stroke="#5a7fa0" strokeWidth="4" strokeLinecap="round" />

      <rect x="716" y="370" width="38" height="32" rx="8" fill="#6b8cae" opacity="0.9" />
      <rect x="716" y="360" width="38" height="14" rx="6" fill="#5a7fa0" />
      <line x1="722" y1="402" x2="718" y2="420" stroke="#5a7fa0" strokeWidth="4" strokeLinecap="round" />
      <line x1="748" y1="402" x2="752" y2="420" stroke="#5a7fa0" strokeWidth="4" strokeLinecap="round" />
      {/* cups on table */}
      <rect x="665" y="368" width="12" height="14" rx="2" fill="#fff8f0" />
      <ellipse cx="671" cy="368" rx="7" ry="3" fill="#e8ddd0" />
      <rect x="683" y="370" width="10" height="12" rx="2" fill="#b8d4e8" />
      <ellipse cx="688" cy="370" rx="6" ry="2.5" fill="#9ec4d8" />

      {/* ── Potted plant (right side) ── */}
      <ellipse cx="744" cy="322" rx="22" ry="28" fill="#5aaa5a" opacity="0.8" />
      <ellipse cx="730" cy="312" rx="16" ry="20" fill="#4d9a4d" opacity="0.8" />
      <ellipse cx="755" cy="308" rx="14" ry="18" fill="#5aaa5a" opacity="0.7" />
      <rect x="732" y="345" width="24" height="22" rx="8" fill="#b8956a" />
      <ellipse cx="744" cy="345" rx="14" ry="5" fill="#c8a87a" />

      {/* ── Hanging lanterns ── */}
      <line x1="220" y1="130" x2="220" y2="148" stroke="#6b8cae" strokeWidth="2" />
      <ellipse cx="220" cy="154" rx="10" ry="14" fill="#fff0b0" stroke="#e8c840" strokeWidth="1.5" />
      <ellipse cx="220" cy="148" rx="6"  ry="3"  fill="#e8c840" />

      <line x1="580" y1="130" x2="580" y2="148" stroke="#6b8cae" strokeWidth="2" />
      <ellipse cx="580" cy="154" rx="10" ry="14" fill="#ffd0d8" stroke="#f0a0b0" strokeWidth="1.5" />
      <ellipse cx="580" cy="148" rx="6"  ry="3"  fill="#f0a0b0" />
    </svg>
  );
}

export default function CafeExterior({ onSelectLevel }) {
  const [, setTick] = useState(0);
  const unlocked = LEVELS.filter((l) => isLevelUnlocked(l.id));
  const highestUnlocked = Math.max(...unlocked.map((l) => l.id));
  const hasProgress = highestUnlocked > 1;

  const handleReset = () => {
    if (window.confirm('Reset all level progress?')) {
      resetProgress();
      setTick((t) => t + 1);
    }
  };

  return (
    <div className="cafe-exterior">
      <ExteriorSVG />

      {/* Momo in right window */}
      <div className="momo-window-wrap" aria-hidden="true">
        <MomoCharacter mood="idle" pose="window" />
      </div>

      {/* Main overlay panel */}
      <div className="exterior-overlay">
        <div className="exterior-title-card">
          <p className="exterior-subtitle">空カフェ · Sora Café</p>
          <h1>Momo&apos;s Café Memory</h1>
          <p className="exterior-tagline">ももカフェ — Remember every order, one shift at a time.</p>
        </div>

        <div className="exterior-actions">
          {hasProgress ? (
            <button
              type="button"
              className="btn-primary exterior-btn-main"
              onClick={() => onSelectLevel(highestUnlocked)}
            >
              Continue Shift ›
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary exterior-btn-main"
              onClick={() => onSelectLevel(1)}
            >
              Start New Game ›
            </button>
          )}
          {hasProgress && (
            <button
              type="button"
              className="btn-secondary exterior-btn-secondary"
              onClick={() => onSelectLevel(1)}
            >
              New Game
            </button>
          )}
        </div>

        <div className="exterior-levels" role="list" aria-label="Shift levels">
          {LEVELS.map((level) => {
            const locked = !isLevelUnlocked(level.id);
            return (
              <button
                key={level.id}
                type="button"
                role="listitem"
                className={`exterior-level-chip ${locked ? 'locked' : ''} ${level.id === highestUnlocked ? 'current' : ''}`}
                onClick={() => !locked && onSelectLevel(level.id)}
                disabled={locked}
                aria-label={`${level.name}${locked ? ', locked' : ''}`}
              >
                <span className="elc-num">{level.id}</span>
                <span className="elc-name">{level.name}</span>
                {locked
                  ? <span className="elc-icon" aria-hidden="true">🔒</span>
                  : <span className="elc-icon" aria-hidden="true">→</span>
                }
              </button>
            );
          })}
        </div>

        <button type="button" className="reset-progress" onClick={handleReset}>
          Reset progress
        </button>
      </div>
    </div>
  );
}
