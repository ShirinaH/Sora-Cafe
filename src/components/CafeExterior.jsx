import { useState } from 'react';
import './CafeExterior.css';
import { LEVELS } from '../data/levels';
import { isLevelUnlocked, resetProgress } from '../utils/progressStorage';

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

  let menuIndex = 0;

  return (
    <div className="cafe-exterior">
      <img
        src="/scenes/cafe-exterior.png"
        alt=""
        className="scene-bg"
        aria-hidden="true"
      />
      <div className="exterior-scrim" aria-hidden="true" />
      <div className="exterior-sparkles" aria-hidden="true">
        <span className="sparkle s1">✦</span>
        <span className="sparkle s2">♡</span>
        <span className="sparkle s3">✦</span>
      </div>

      <div className="exterior-menu">
        <header
          className="exterior-title-block"
          style={{ '--i': menuIndex++ }}
        >
          <p className="exterior-subtitle">空カフェ</p>
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
          <p className="exterior-tagline">空カフェ · A cozy café sequence memorization game</p>
        </header>

        <nav className="exterior-nav" aria-label="Main menu">
          {hasProgress ? (
            <button
              type="button"
              className="exterior-menu-item primary"
              style={{ '--i': menuIndex++ }}
              onClick={() => onSelectLevel(highestUnlocked)}
            >
              <span className="menu-arrow" aria-hidden="true">›</span>
              Continue Shift
            </button>
          ) : (
            <button
              type="button"
              className="exterior-menu-item primary"
              style={{ '--i': menuIndex++ }}
              onClick={() => onSelectLevel(1)}
            >
              <span className="menu-arrow" aria-hidden="true">›</span>
              Start New Game
            </button>
          )}

          {hasProgress && (
            <button
              type="button"
              className="exterior-menu-item"
              style={{ '--i': menuIndex++ }}
              onClick={() => onSelectLevel(1)}
            >
              New Game
            </button>
          )}

          <div className="exterior-nav-divider" style={{ '--i': menuIndex++ }} />

          <div className="exterior-level-list" role="list" aria-label="Shift levels">
            {LEVELS.map((level) => {
              const locked = !isLevelUnlocked(level.id);
              const isCurrent = level.id === highestUnlocked && !locked;
              return (
                <button
                  key={level.id}
                  type="button"
                  role="listitem"
                  className={`exterior-menu-item level ${locked ? 'locked' : ''} ${isCurrent ? 'current' : ''}`}
                  style={{ '--i': menuIndex++ }}
                  onClick={() => !locked && onSelectLevel(level.id)}
                  disabled={locked}
                  aria-label={`${level.name}${locked ? ', locked' : ''}`}
                >
                  <span className="level-num">{level.id}</span>
                  <span className="level-name">{level.name}</span>
                  {locked
                    ? <span className="level-icon" aria-hidden="true">🔒</span>
                    : <span className="level-icon" aria-hidden="true">›</span>
                  }
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="exterior-menu-item subtle reset"
            style={{ '--i': menuIndex++ }}
            onClick={handleReset}
          >
            Reset Progress
          </button>
        </nav>
      </div>
    </div>
  );
}
