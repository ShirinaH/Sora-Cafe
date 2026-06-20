import { useState, useCallback } from 'react';
import './AssemblyScene.css';
import MomoCharacter from './MomoCharacter';

/* ── Order ticket clipboard (right panel) ── */
function OrderTicket({ sequenceItems, filledItems }) {
  return (
    <div className="ticket-wrap">
      <svg viewBox="0 0 150 40" className="ticket-header-svg" aria-hidden="true">
        <rect x="5" y="5" width="140" height="30" rx="6" fill="#fff8f0" stroke="#c5d9ea" strokeWidth="1.5" />
        <rect x="50" y="2" width="50" height="16" rx="6" fill="#6b8cae" />
        <rect x="60" y="0" width="30" height="8"  rx="4" fill="#4a6d8c" />
        <text x="75" y="15" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">ORDER</text>
      </svg>
      <ul className="ticket-list" aria-label="Order to pack">
        {sequenceItems.map((item, i) => {
          const done = i < filledItems.length;
          return (
            <li
              key={i}
              className={`ticket-item ${done ? 'done' : ''} ${i === filledItems.length ? 'active' : ''}`}
              aria-label={`${item.name}${done ? ', packed' : i === filledItems.length ? ', next' : ''}`}
            >
              <span className="ti-num">{i + 1}</span>
              <span className="ti-emoji">{item.emoji}</span>
              <span className="ti-name">{item.name}</span>
              <span className="ti-check" aria-hidden="true">{done ? '✓' : '·'}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Packed bag ── */
function PackedBag({ filledItems, shake }) {
  return (
    <div className={`bag-wrap ${shake ? 'shake' : ''}`} aria-label={`${filledItems.length} items packed`}>
      <svg viewBox="0 0 120 160" className="bag-svg" aria-hidden="true">
        {/* bag body */}
        <path d="M 20 60 Q 18 150 60 155 Q 102 150 100 60 Z" fill="#d4eaf8" stroke="#9ec4d8" strokeWidth="2.5" />
        {/* bag handle */}
        <path d="M 38 60 Q 38 30 60 28 Q 82 30 82 60"
              fill="none" stroke="#6b8cae" strokeWidth="5" strokeLinecap="round" />
        {/* bag fold */}
        <path d="M 20 60 Q 60 70 100 60" fill="none" stroke="#9ec4d8" strokeWidth="2" />
        {/* bag logo */}
        <text x="60" y="100" textAnchor="middle" fontSize="11" fill="#6b8cae" fontWeight="700">空</text>
        <text x="60" y="113" textAnchor="middle" fontSize="8"  fill="#8ab0cc">SORA</text>
      </svg>

      {/* stacked items in bag */}
      <div className="bag-items">
        {filledItems.map((item, i) => (
          <span
            key={i}
            className="bag-item-icon"
            style={{ animationDelay: `${i * 40}ms` }}
            aria-hidden="true"
          >
            {item.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Display case background ── */
function DisplayCaseBackground() {
  return (
    <svg
      viewBox="0 0 900 480"
      className="display-bg-svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="asmWallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#d8eef8" />
          <stop offset="100%" stopColor="#e8f6ff" />
        </linearGradient>
        <linearGradient id="caseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#f0f8ff" />
          <stop offset="60%"  stopColor="#e0f0fc" />
          <stop offset="100%" stopColor="#c8dff0" />
        </linearGradient>
        <linearGradient id="shelfGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#f5f0e8" />
          <stop offset="100%" stopColor="#ede5d8" />
        </linearGradient>
      </defs>

      {/* Wall */}
      <rect width="900" height="480" fill="url(#asmWallGrad)" />

      {/* Wall décor */}
      <rect x="0" y="0" width="900" height="60" fill="#c8dff0" opacity="0.4" />
      <rect x="0" y="56" width="900" height="6"  rx="2" fill="#a0c4e0" opacity="0.5" />

      {/* Hanging lights */}
      {[160, 380, 600, 780].map((x, i) => (
        <g key={i}>
          <line x1={x} y1="0" x2={x} y2="40" stroke="#8ab8d8" strokeWidth="1.5" />
          <ellipse cx={x} cy="43" rx="14" ry="6"  fill="#d0e8f8" />
          <ellipse cx={x} cy="50" rx="12" ry="18" fill="#f5ffff" stroke="#c0d8f0" strokeWidth="1.5" />
        </g>
      ))}

      {/* Display case frame */}
      <rect x="60" y="180" width="680" height="200" rx="10" fill="url(#caseGrad)"
            stroke="#8ab8d8" strokeWidth="3" />
      {/* Glass tint */}
      <rect x="63" y="183" width="674" height="194" rx="8" fill="rgba(200,230,250,0.25)" />
      {/* Shelf inside case */}
      <rect x="70" y="320" width="664" height="12" rx="4" fill="url(#shelfGrad)" />
      {/* Dividers */}
      {[0,1,2,3,4,5].map(i => (
        <line key={i} x1={148 + i * 112} y1="183" x2={148 + i * 112} y2="370"
              stroke="#a0c4e0" strokeWidth="1" opacity="0.5" />
      ))}
      {/* Case top label */}
      <rect x="280" y="168" width="240" height="18" rx="8" fill="#6b8cae" />
      <text x="400" y="181" textAnchor="middle" fill="white" fontSize="9" fontWeight="600" letterSpacing="1">
        DISPLAY CASE
      </text>

      {/* Case base / counter */}
      <rect x="50"  y="375" width="700" height="60" rx="6" fill="#c8a87a" />
      <rect x="50"  y="372" width="700" height="10" rx="4" fill="#b8956a" />

      {/* Floor */}
      <rect x="0" y="430" width="900" height="50" fill="#e8ddd0" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={i * 100} y="432" width="97" height="20" rx="1"
              fill={(i % 2 === 0) ? '#e0d5c8' : '#d8ccbe'} opacity="0.7" />
      ))}

      {/* Wall plants */}
      <ellipse cx="22"  cy="200" rx="18" ry="22" fill="#6ab06a" opacity="0.75" />
      <ellipse cx="10"  cy="192" rx="12" ry="16" fill="#5aa05a" opacity="0.75" />
      <rect    x="10"   y="218"  width="18" height="14" rx="6" fill="#c8956a" />

      <ellipse cx="878" cy="200" rx="18" ry="22" fill="#6ab06a" opacity="0.75" />
      <ellipse cx="890" cy="192" rx="12" ry="16" fill="#5aa05a" opacity="0.75" />
      <rect    x="872"  y="218"  width="18" height="14" rx="6" fill="#c8956a" />
    </svg>
  );
}

export default function AssemblyScene({ menuPool, filledItems, sequenceItems, onItemTap, disabled, shake }) {
  const [popKey, setPopKey] = useState({});

  const handleTap = useCallback((itemId) => {
    if (disabled) return;
    setPopKey((prev) => ({ ...prev, [itemId]: (prev[itemId] ?? 0) + 1 }));
    onItemTap(itemId);
  }, [disabled, onItemTap]);

  return (
    <div className="assembly-scene">
      <DisplayCaseBackground />

      <div className="assembly-stage">
        {/* Momo (left) */}
        <div className="assembly-momo">
          <MomoCharacter
            mood={shake ? 'sad' : filledItems.length > 0 ? 'happy' : 'thinking'}
            pose="counter"
          />
        </div>

        {/* Display case items (centre) */}
        <div className="case-grid-wrap">
          <div
            className="case-grid"
            role="group"
            aria-label="Display case — tap items to pack in order"
          >
            {menuPool.map((item) => (
              <button
                key={item.id}
                type="button"
                className="case-item"
                style={{ backgroundColor: item.color }}
                onClick={() => handleTap(item.id)}
                disabled={disabled}
                aria-label={item.name}
                data-pop={popKey[item.id] ?? 0}
              >
                <span
                  className="case-emoji"
                  key={popKey[item.id]}
                  style={{ animation: popKey[item.id] ? 'popIn 300ms ease-out both' : 'none' }}
                  aria-hidden="true"
                >
                  {item.emoji}
                </span>
                <span className="case-name">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right panel: ticket + bag */}
        <div className="assembly-right">
          <PackedBag filledItems={filledItems} shake={shake} />
          <OrderTicket sequenceItems={sequenceItems} filledItems={filledItems} />
        </div>
      </div>

      {/* ARIA live */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`${filledItems.length} of ${sequenceItems.length} items packed`}
      </div>
    </div>
  );
}
