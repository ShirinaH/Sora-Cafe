import { useState, useCallback } from 'react';
import VintageFrame from './VintageFrame';
import MenuItemVisual from './MenuItemVisual';
import './AssemblyScene.css';

function PackedBag({ filledItems, totalItems, shake }) {
  return (
    <div
      className={`bag-wrap ${shake ? 'shake' : ''}`}
      aria-label={`${filledItems.length} of ${totalItems} items packed`}
    >
      <svg viewBox="0 0 140 175" className="bag-svg" aria-hidden="true">
        <defs>
          <linearGradient id="canopyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff8f4" />
            <stop offset="100%" stopColor="#fbeae6" />
          </linearGradient>
          <linearGradient id="boxBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fdf6f0" />
            <stop offset="100%" stopColor="#f6e6e0" />
          </linearGradient>
          <linearGradient id="sidePanel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f3ddd6" />
            <stop offset="100%" stopColor="#eccfc6" />
          </linearGradient>
          <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f0bcc0" />
            <stop offset="100%" stopColor="#dd9aa2" />
          </linearGradient>
        </defs>

        {/* finial */}
        <line x1="70" y1="7" x2="70" y2="24" stroke="#d9b88a" strokeWidth="2" strokeLinecap="round" />
        <circle cx="70" cy="7" r="3" fill="#e7c79a" />

        {/* ribbon bow */}
        <path d="M 67 27 Q 61 42 56 50 L 65 46 L 68 31 Z" fill="#e3a6ae" />
        <path d="M 73 27 Q 79 42 84 50 L 75 46 L 72 31 Z" fill="#e3a6ae" />
        <path d="M 70 28 Q 51 17 49 28 Q 49 37 70 31 Z" fill="url(#ribbonGrad)" stroke="#cf8f98" strokeWidth="0.8" />
        <path d="M 70 28 Q 89 17 91 28 Q 91 37 70 31 Z" fill="url(#ribbonGrad)" stroke="#cf8f98" strokeWidth="0.8" />
        <rect x="65" y="25" width="10" height="9" rx="2.5" fill="#d999a1" stroke="#cf8f98" strokeWidth="0.8" />

        {/* canopy / carousel roof */}
        <path d="M 70 33 C 41 33 21 54 19 78 L 121 78 C 119 54 99 33 70 33 Z"
              fill="url(#canopyGrad)" stroke="#caa39a" strokeWidth="1.6" />
        <g stroke="#ecccc4" strokeWidth="1">
          <line x1="70" y1="36" x2="40" y2="77" />
          <line x1="70" y1="36" x2="55" y2="77" />
          <line x1="70" y1="36" x2="70" y2="77" />
          <line x1="70" y1="36" x2="85" y2="77" />
          <line x1="70" y1="36" x2="100" y2="77" />
        </g>
        <path d="M 19 78 q 8.5 8 17 0 q 8.5 8 17 0 q 8.5 8 17 0 q 8.5 8 17 0 q 8.5 8 17 0 q 8.5 8 17 0"
              fill="url(#canopyGrad)" stroke="#caa39a" strokeWidth="1.4" />
        <g fill="#e7c483">
          <path d="M 48 52 l 1 2.4 2.5 .3 -1.8 1.7 .5 2.5-2.2-1.3-2.2 1.3 .5-2.5-1.8-1.7 2.5-.3 Z" />
          <path d="M 70 47 l 1 2.4 2.5 .3 -1.8 1.7 .5 2.5-2.2-1.3-2.2 1.3 .5-2.5-1.8-1.7 2.5-.3 Z" />
          <path d="M 92 52 l 1 2.4 2.5 .3 -1.8 1.7 .5 2.5-2.2-1.3-2.2 1.3 .5-2.5-1.8-1.7 2.5-.3 Z" />
          <circle cx="59" cy="64" r="1" />
          <circle cx="81" cy="64" r="1" />
        </g>

        {/* box body (hexagonal) */}
        <path d="M 24 86 L 40 92 L 40 150 L 24 142 Z" fill="url(#sidePanel)" stroke="#caa39a" strokeWidth="1.2" />
        <path d="M 116 86 L 100 92 L 100 150 L 116 142 Z" fill="url(#sidePanel)" stroke="#caa39a" strokeWidth="1.2" />
        <path d="M 40 92 L 100 92 L 100 150 L 70 158 L 40 150 Z" fill="url(#boxBody)" stroke="#caa39a" strokeWidth="1.5" />

        {/* arched window */}
        <path d="M 50 134 L 50 117 Q 50 102 70 102 Q 90 102 90 117 L 90 134 Z"
              fill="#e9dcef" stroke="#caa39a" strokeWidth="1.2" />
        <path d="M 50 112 q 5 5 10 0 q 5 5 10 0 q 5 5 10 0 q 5 5 10 0" fill="#e7b9c0" />

        {/* carousel horse */}
        <line x1="70" y1="103" x2="70" y2="134" stroke="#e7c483" strokeWidth="2" strokeLinecap="round" />
        <circle cx="70" cy="103" r="2.2" fill="#edd29a" />
        <g stroke="#caa39a" strokeWidth="0.7" strokeLinejoin="round">
          <path d="M 79 114 q 8 3 6 11 q -1 3 -3 4 q 3 -6 -1 -9 q -2 -2 -3 -4 Z" fill="#eeb9c2" />
          <ellipse cx="68" cy="120" rx="10" ry="6" fill="#fbeee8" />
          <path d="M 60 117 Q 55 111 54 106 Q 53 103 56 103 Q 59 104 60 109 L 64 116 Z" fill="#fbeee8" />
          <path d="M 54 106 Q 50 105 49 108 Q 50 110 54 109 Z" fill="#fbeee8" />
          <path d="M 56 103 l 1 -3 2 2 Z" fill="#fbeee8" />
          <path d="M 58 104 Q 62 107 61 112 Q 60 108 57 107 Z" fill="#eeb9c2" stroke="none" />
          <path d="M 64 115 q 5 -2 8 0 l -1 4 q -3 -1 -6 0 Z" fill="#eeb9c2" stroke="none" />
        </g>
        <g stroke="#fbeee8" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M 62 125 l -2 6" />
          <path d="M 67 126 l -1 6" />
          <path d="M 72 126 l 1 6" />
          <path d="M 76 125 l 2 6" />
        </g>

        {/* heart + SUGAR DAY */}
        <path d="M 70 140 l -2.4 -2.4 a 1.7 1.7 0 0 1 2.4 -0.2 a 1.7 1.7 0 0 1 2.4 0.2 Z" fill="#dd9aa2" />
        <text x="70" y="150" textAnchor="middle" fontSize="6" fill="#b07c84"
              fontWeight="700" letterSpacing="1.4">SUGAR DAY</text>
      </svg>

      <div className="bag-progress">
        <span className="bag-count">{filledItems.length}</span>
        <span className="bag-sep">/</span>
        <span className="bag-total">{totalItems}</span>
      </div>

      <div className="bag-stars">
        {Array.from({ length: totalItems }, (_, i) => (
          <span
            key={i}
            className={`bag-star ${i < filledItems.length ? 'filled' : ''}`}
            aria-hidden="true"
          >
            ✦
          </span>
        ))}
      </div>
    </div>
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
      <img
        src="/scenes/assembly-counter.png"
        alt=""
        className="scene-bg"
        aria-hidden="true"
      />

      <div className="assembly-stage">
        <div className="case-grid-wrap">
          <VintageFrame className="interactive-panel">
            <p className="panel-label">Tap items in order</p>
            <div
              className="case-grid"
              role="group"
              aria-label="Display case: tap items to pack in order"
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
                  <div className="case-visual-wrap">
                    <MenuItemVisual
                      item={item}
                      className="case-visual"
                      size="case"
                      key={popKey[item.id]}
                      style={{ animation: popKey[item.id] ? 'popIn 300ms ease-out both' : 'none' }}
                    />
                  </div>
                  <span className="case-name">{item.name}</span>
                </button>
              ))}
            </div>
          </VintageFrame>
        </div>

        <div className="assembly-right">
          <PackedBag filledItems={filledItems} totalItems={sequenceItems.length} shake={shake} />
        </div>
      </div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`${filledItems.length} of ${sequenceItems.length} items packed`}
      </div>
    </div>
  );
}
