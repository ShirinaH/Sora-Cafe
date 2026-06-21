import './LevelMap.css';
import { useState } from 'react';
import { LEVELS, ZONES } from '../data/levels';
import { isLevelUnlocked, resetProgress } from '../utils/progressStorage';

export default function LevelMap({ onSelectLevel }) {
  const unlocked = LEVELS.filter((l) => isLevelUnlocked(l.id));
  const highestUnlocked = Math.max(...unlocked.map((l) => l.id));
  const [, setTick] = useState(0);

  const handleReset = () => {
    if (window.confirm('Reset all level progress?')) {
      resetProgress();
      setTick((t) => t + 1);
    }
  };

  return (
    <div className="level-map fade-in">
      <header className="level-map-header">
        <div>
          <p className="level-map-subtitle">空カフェ</p>
          <h1>
            <a
              href="https://shirinah.github.io/My-Personal-Portfolio/#sora-cafe-memory"
              className="site-title-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sora Café
            </a>
          </h1>
          <p className="level-map-tagline">空カフェ · A cozy café sequence memorization game</p>
        </div>
      </header>

      <div className="zone-path" aria-label="Café zones progress path">
        {ZONES.map((zone, i) => (
          <div key={zone} className="zone-step">
            <div
              className={`zone-dot ${LEVELS.some((l) => l.zone === zone && isLevelUnlocked(l.id)) ? 'unlocked' : ''}`}
            />
            <span className="zone-label">{zone}</span>
            {i < ZONES.length - 1 && <div className="zone-line" />}
          </div>
        ))}
      </div>

      <div className="level-cards" role="list">
        {LEVELS.map((level) => {
          const locked = !isLevelUnlocked(level.id);
          return (
            <button
              key={level.id}
              type="button"
              role="listitem"
              className={`level-card ${locked ? 'locked' : ''} ${level.id === highestUnlocked ? 'current' : ''}`}
              onClick={() => !locked && onSelectLevel(level.id)}
              disabled={locked}
              aria-label={`${level.name}, ${level.zone}${locked ? ', locked' : ''}`}
            >
              <span className="level-number">{level.id}</span>
              <div className="level-info">
                <h2>{level.name}</h2>
                <p className="level-zone">{level.zone}</p>
                <p className="level-desc">{level.description}</p>
              </div>
              {locked ? (
                <span className="level-lock" aria-hidden="true">🔒</span>
              ) : (
                <span className="level-play" aria-hidden="true">→</span>
              )}
            </button>
          );
        })}
      </div>

      <button type="button" className="reset-progress" onClick={handleReset}>
        Reset progress
      </button>
    </div>
  );
}
