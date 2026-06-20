import { useEffect, useState } from 'react';
import './OrderingScene.css';
import MomoCharacter from './MomoCharacter';

/* ── Customer chibi SVG ── */
function Customer({ currentItem }) {
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setVisible(true);
      setKey((k) => k + 1);
    }, 80);
    return () => clearTimeout(t);
  }, [currentItem?.id]);

  return (
    <div className="customer-wrap">
      {/* Speech bubble */}
      {currentItem && visible && (
        <div className="speech-bubble" key={key}>
          <span className="speech-emoji">{currentItem.emoji}</span>
          <span className="speech-name">{currentItem.name}</span>
        </div>
      )}

      {/* Customer SVG */}
      <svg viewBox="0 0 100 160" className="customer-svg" aria-hidden="true">
        {/* body */}
        <ellipse cx="50" cy="115" rx="28" ry="32" fill="#f5d8cc" />
        {/* arms */}
        <ellipse cx="22" cy="105" rx="10" ry="18" fill="#f5d8cc" transform="rotate(-10 22 105)" />
        <ellipse cx="78" cy="105" rx="10" ry="18" fill="#f5d8cc" transform="rotate(10 78 105)" />
        {/* collar */}
        <rect x="36" y="92" width="28" height="16" rx="8" fill="#b8d4f0" />
        {/* head */}
        <ellipse cx="50" cy="62" rx="26" ry="24" fill="#f5d8cc" />
        {/* hair */}
        <ellipse cx="50" cy="42" rx="26" ry="14" fill="#5a3a2a" />
        <ellipse cx="28" cy="58" rx="8"  ry="14" fill="#5a3a2a" />
        <ellipse cx="72" cy="58" rx="8"  ry="14" fill="#5a3a2a" />
        {/* eyes */}
        <ellipse cx="42" cy="63" rx="4" ry="5" fill="#3d4f5f" />
        <ellipse cx="58" cy="63" rx="4" ry="5" fill="#3d4f5f" />
        <circle  cx="43" cy="61" r="1.5" fill="white" />
        <circle  cx="59" cy="61" r="1.5" fill="white" />
        {/* smile */}
        <path d="M 43 73 Q 50 79 57 73" fill="none" stroke="#c4886a" strokeWidth="2" strokeLinecap="round" />
        {/* cheeks */}
        <ellipse cx="35" cy="70" rx="7" ry="4" fill="#f5a0a0" opacity="0.5" />
        <ellipse cx="65" cy="70" rx="7" ry="4" fill="#f5a0a0" opacity="0.5" />
        {/* legs */}
        <rect x="36" y="142" width="12" height="18" rx="6" fill="#7090c0" />
        <rect x="52" y="142" width="12" height="18" rx="6" fill="#7090c0" />
      </svg>
    </div>
  );
}

/* ── Clipboard with animated pencil ── */
function Clipboard({ sequenceItems, studyIndex }) {
  const lineH = 36;
  const startY = 68;
  const pencilY = studyIndex >= 0
    ? startY + studyIndex * lineH
    : startY + sequenceItems.length * lineH;

  return (
    <div className="clipboard-wrap">
      <svg viewBox="0 0 160 240" className="clipboard-svg" aria-label="Order clipboard">
        {/* board */}
        <rect x="10" y="18" width="140" height="215" rx="8" fill="#fff8f0"
              stroke="#c5d9ea" strokeWidth="2" />
        <rect x="10" y="18" width="140" height="215" rx="8"
              fill="none" stroke="#e0d0c0" strokeWidth="1" />
        {/* clip */}
        <rect x="50" y="8"  width="60" height="20" rx="8" fill="#6b8cae" />
        <rect x="62" y="5"  width="36" height="10" rx="5" fill="#4a6d8c" />
        {/* header */}
        <text x="80" y="44" textAnchor="middle" fill="#6b8cae"
              fontSize="9" fontWeight="700" letterSpacing="1">ORDER SLIP</text>
        <line x1="20" y1="50" x2="140" y2="50" stroke="#c5d9ea" strokeWidth="1.5" />

        {/* Lines with written items */}
        {sequenceItems.map((item, i) => (
          <g key={i} style={{
            opacity: i <= studyIndex ? 1 : 0.18,
            animation: i === studyIndex && i <= studyIndex
              ? 'writeIn 350ms ease-out both' : 'none',
          }}>
            <line x1="20" y1={startY + 6 + i * lineH}
                  x2="140" y2={startY + 6 + i * lineH}
                  stroke="#e8ddd0" strokeWidth="1" />
            {i <= studyIndex && (
              <>
                <text x="26"  y={startY - 4 + i * lineH} fontSize="16">{item.emoji}</text>
                <text x="50"  y={startY - 4 + i * lineH}
                      fill="#3d4f5f" fontSize="9.5" fontWeight="500">{item.name}</text>
                <text x="136" y={startY - 4 + i * lineH}
                      textAnchor="end" fill="#6b8cae" fontSize="9">#{i + 1}</text>
              </>
            )}
          </g>
        ))}

        {/* Pencil */}
        {studyIndex >= 0 && studyIndex < sequenceItems.length && (
          <g style={{
            transform: `translateY(${pencilY}px)`,
            transition: 'transform 400ms ease-in-out',
            transformOrigin: '0 0',
          }}>
            {/* pencil body */}
            <rect x="120" y="0" width="8" height="32" rx="2" fill="#f5e060"
                  transform="rotate(-25 120 0)" />
            <polygon points="120,30 128,30 124,42" fill="#f5c0a0"
                     transform="rotate(-25 120 0)" />
            {/* eraser */}
            <rect x="120" y="-6" width="8" height="8" rx="2" fill="#f0a0b0"
                  transform="rotate(-25 120 0)" />
            {/* writing motion dots */}
            <circle cx="88" cy="16" r="2" fill="#6b8cae" opacity="0.6"
                    style={{ animation: 'pulse 0.6s ease-in-out infinite' }} />
            <circle cx="96" cy="18" r="1.5" fill="#6b8cae" opacity="0.4"
                    style={{ animation: 'pulse 0.6s 0.1s ease-in-out infinite' }} />
          </g>
        )}
      </svg>
    </div>
  );
}

/* ── Counter background SVG ── */
function CounterBackground() {
  return (
    <svg
      viewBox="0 0 900 480"
      className="counter-bg-svg"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="counterWallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#deeef8" />
          <stop offset="100%" stopColor="#e8f4fc" />
        </linearGradient>
        <linearGradient id="counterTopGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#c8a87a" />
          <stop offset="100%" stopColor="#d8b88a" />
        </linearGradient>
      </defs>

      {/* Wall */}
      <rect width="900" height="480" fill="url(#counterWallGrad)" />

      {/* Wall tiles / wainscoting */}
      <rect x="0" y="260" width="900" height="220" fill="#e8f0f8" opacity="0.4" />
      <rect x="0" y="256" width="900" height="8"   rx="3" fill="#a0c4e0" opacity="0.6" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={i * 100} y="266" width="96" height="120"
              rx="4" fill="none" stroke="#b8d4e8" strokeWidth="1.5" opacity="0.4" />
      ))}

      {/* Menu board above counter */}
      <rect x="280" y="30"  width="340" height="150" rx="10" fill="#2d4a3e" />
      <rect x="288" y="38"  width="324" height="134" rx="7"  fill="#334d42" />
      <rect x="292" y="42"  width="316" height="126" rx="5"
            fill="none" stroke="#7abfa0" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="450" y="68"  textAnchor="middle" fill="#c8f0dc" fontSize="13" fontWeight="700" letterSpacing="2">SORA CAFÉ MENU</text>
      <line x1="300" y1="76" x2="600" y2="76" stroke="#7abfa0" strokeWidth="1" />
      <text x="450" y="96"  textAnchor="middle" fill="#e8f8f0" fontSize="12">🍵  Matcha Latte  ·  ¥480</text>
      <text x="450" y="114" textAnchor="middle" fill="#e8f8f0" fontSize="12">🌸  Sakura Latte  ·  ¥520</text>
      <text x="450" y="132" textAnchor="middle" fill="#e8f8f0" fontSize="12">🍡  Mochi Set      ·  ¥380</text>
      <text x="450" y="150" textAnchor="middle" fill="#e8f8f0" fontSize="12">☁️  Blue Mug       ·  ¥450</text>

      {/* Shelves behind counter */}
      <rect x="50"  y="190" width="180" height="8" rx="4" fill="#b8956a" />
      <rect x="670" y="190" width="180" height="8" rx="4" fill="#b8956a" />
      {/* shelf items */}
      <text x="90"  y="185" fontSize="22">🫖</text>
      <text x="130" y="185" fontSize="22">🍶</text>
      <text x="170" y="185" fontSize="22">☕</text>
      <text x="690" y="185" fontSize="22">🌸</text>
      <text x="730" y="185" fontSize="22">🍵</text>
      <text x="770" y="185" fontSize="22">🫙</text>

      {/* Flowers / decoration */}
      <ellipse cx="50"  cy="255" rx="22" ry="12" fill="#f5c0d0" opacity="0.7" />
      <ellipse cx="850" cy="255" rx="22" ry="12" fill="#e8d0f0" opacity="0.7" />

      {/* Counter top */}
      <rect x="0"   y="340" width="900" height="140" rx="0" fill="#c8a87a" />
      <rect x="0"   y="335" width="900" height="12"  rx="4" fill="url(#counterTopGrad)" />
      {/* counter surface pattern */}
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x={i * 100} y="350" width="96" height="128"
              rx="2" fill="rgba(255,255,255,0.06)" stroke="rgba(200,168,122,0.3)" strokeWidth="1" />
      ))}
      {/* Counter items */}
      <rect x="80"  y="318" width="30" height="20" rx="6" fill="#fff8f0" stroke="#c5d9ea" strokeWidth="1.5" />
      <ellipse cx="95" cy="318" rx="15" ry="5" fill="#e8ddd0" />
      <rect x="780" y="318" width="30" height="20" rx="6" fill="#b8d4e8" stroke="#9ec4d8" strokeWidth="1.5" />
      <ellipse cx="795" cy="318" rx="15" ry="5" fill="#9ec4d8" />

      {/* Small flowers on counter */}
      <ellipse cx="440" cy="335" rx="10" ry="5"  fill="#f5d0d0" opacity="0.8" />
      <ellipse cx="460" cy="333" rx="8"  ry="4"  fill="#f5e0e8" opacity="0.8" />
    </svg>
  );
}

export default function OrderingScene({ sequenceItems, studyIndex }) {
  const currentItem = studyIndex >= 0 && studyIndex < sequenceItems.length
    ? sequenceItems[studyIndex]
    : null;

  return (
    <div className="ordering-scene">
      <CounterBackground />

      <div className="scene-stage">
        {/* Customer (left) */}
        <div className="customer-area">
          <Customer currentItem={currentItem} />
        </div>

        {/* Momo behind counter (centre) */}
        <div className="momo-counter-area">
          <MomoCharacter
            mood={currentItem ? 'thinking' : 'idle'}
            pose="counter"
          />
        </div>

        {/* Clipboard (right) */}
        <div className="clipboard-area">
          <Clipboard sequenceItems={sequenceItems} studyIndex={studyIndex} />
        </div>
      </div>

      {/* Status label */}
      <div className="ordering-status">
        {studyIndex >= 0 && studyIndex < sequenceItems.length
          ? `Customer orders item ${studyIndex + 1} of ${sequenceItems.length}…`
          : studyIndex < 0
            ? 'A customer has arrived!'
            : 'Order complete — now you try!'
        }
      </div>
    </div>
  );
}
