import { useEffect, useState } from 'react';
import VintageFrame from './VintageFrame';
import MenuItemVisual from './MenuItemVisual';
import './OrderingScene.css';

function OrderSpeechBubble({ currentItem }) {
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
    <div className="speech-bubble-area">
      {currentItem && visible && (
        <div className="order-speech-bubble-wrap" key={key}>
          <div className="order-speech-bubble">
            <span className="order-speech-tail" aria-hidden="true" />
            <div className="order-speech-bubble-content">
              <MenuItemVisual item={currentItem} size="lg" className="order-speech-visual" />
              <span className="order-speech-name">{currentItem.name}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Clipboard({ sequenceItems, studyIndex }) {
  const lineH = 27;
  const startY = 64;
  const pencilY = studyIndex >= 0
    ? startY + studyIndex * lineH
    : startY + sequenceItems.length * lineH;

  return (
    <VintageFrame className="clipboard-wrap">
      <svg viewBox="0 0 160 240" className="clipboard-svg" aria-label="Order clipboard">
        <defs>
          <linearGradient id="paperGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fdf8f0" />
            <stop offset="100%" stopColor="#f5ebe0" />
          </linearGradient>
        </defs>

        <rect x="14" y="22" width="132" height="207" rx="2" fill="url(#paperGrad)"
              stroke="#c4a882" strokeWidth="1.5" />
        <rect x="18" y="26" width="124" height="199" rx="1"
              fill="none" stroke="#dcc4b0" strokeWidth="0.8" />

        <g className="clipboard-flourish" opacity="0.7">
          <circle cx="22" cy="30" r="2.5" fill="#d4a8a0" opacity="0.8" />
          <circle cx="138" cy="30" r="2.5" fill="#d4a8a0" opacity="0.8" />
        </g>

        <rect x="48" y="10" width="64" height="18" rx="2" fill="#a89078" stroke="#8b7355" strokeWidth="1" />
        <rect x="58" y="6" width="44" height="8" rx="2" fill="#8b7355" />
        <rect x="72" y="4" width="16" height="4" rx="1" fill="#c4a882" opacity="0.6" />

        <text x="80" y="44" textAnchor="middle" fill="#8b6558"
              fontSize="8.5" fontWeight="700" letterSpacing="2.5">ORDER SLIP</text>
        <line x1="24" y1="50" x2="136" y2="50" stroke="#dcc4b0" strokeWidth="1" />
        <line x1="24" y1="51.5" x2="136" y2="51.5" stroke="#c9a090" strokeWidth="0.5" opacity="0.5" />

        {sequenceItems.map((item, i) => (
          <g key={i} style={{
            opacity: i <= studyIndex ? 1 : 0.2,
            animation: i === studyIndex && i <= studyIndex
              ? 'writeIn 350ms ease-out both' : 'none',
          }}>
            <line x1="24" y1={startY + 8 + i * lineH}
                  x2="136" y2={startY + 8 + i * lineH}
                  stroke="#e8d8c8" strokeWidth="0.8" strokeDasharray="2 2" />
            {i <= studyIndex && (
              <>
                {item.image ? (
                  <image href={item.image} x="20" y={startY - 16 + i * lineH} width="22" height="22"
                         preserveAspectRatio="xMidYMid meet" />
                ) : (
                  <text x="31" y={startY - 3 + i * lineH} fontSize="16" textAnchor="middle"
                        dominantBaseline="middle">{item.emoji}</text>
                )}
                <text x="86" y={startY - 3 + i * lineH}
                      textAnchor="middle" fill="#5c4338" fontSize="8.5" fontWeight="500">{item.name}</text>
                <text x="136" y={startY - 3 + i * lineH}
                      textAnchor="end" fill="#a87868" fontSize="8" fontStyle="italic">#{i + 1}</text>
              </>
            )}
          </g>
        ))}

        {studyIndex >= 0 && studyIndex < sequenceItems.length && (
          <g style={{
            transform: `translateY(${pencilY}px)`,
            transition: 'transform 400ms ease-in-out',
            transformOrigin: '0 0',
          }}>
            <g className="writing-pencil">
              <rect x="118" y="0" width="7" height="30" rx="1" fill="#d4c090"
                    transform="rotate(-25 118 0)" stroke="#a89078" strokeWidth="0.5" />
              <polygon points="118,28 125,28 121.5,38" fill="#8b7355"
                       transform="rotate(-25 118 0)" />
              <rect x="118" y="-5" width="7" height="7" rx="1" fill="#c49090"
                    transform="rotate(-25 118 0)" />
            </g>
          </g>
        )}
      </svg>
    </VintageFrame>
  );
}

export default function OrderingScene({ sequenceItems, studyIndex }) {
  const currentItem = studyIndex >= 0 && studyIndex < sequenceItems.length
    ? sequenceItems[studyIndex]
    : null;

  return (
    <div className="ordering-scene">
      <img
        src="/scenes/order-scene.png"
        alt=""
        className="scene-bg"
        aria-hidden="true"
      />

      <div className="scene-stage">
        <OrderSpeechBubble currentItem={currentItem} />

        <div className="clipboard-area">
          <Clipboard sequenceItems={sequenceItems} studyIndex={studyIndex} />
        </div>
      </div>
    </div>
  );
}
