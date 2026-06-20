import './ResultsScreen.css';
import { getLevelById, LEVELS } from '../data/levels';
import MomoCharacter from './MomoCharacter';

export default function ResultsScreen({ levelId, won, livesLeft, maxLives, onNext, onRetry, onHome }) {
  const level = getLevelById(levelId);
  const hasNextLevel = levelId < LEVELS.length;
  const stars = won ? Math.max(1, Math.ceil((livesLeft / maxLives) * 3)) : 0;

  return (
    <div className="results-screen fade-in">
      <div className="card results-card">
        <MomoCharacter mood={won ? 'celebrate' : 'sad'} />

        {won ? (
          <>
            <h1>Shift Complete!</h1>
            <p className="results-subtitle">{level.name} — {level.zone}</p>
            <div className="stars" aria-label={`${stars} out of 3 stars`}>
              {[1, 2, 3].map((s) => (
                <span key={s} className={`star ${s <= stars ? 'filled' : ''}`}>
                  ★
                </span>
              ))}
            </div>
            <p className="results-message">Momo served every order perfectly. Well done!</p>
            <div className="results-actions">
              {hasNextLevel && (
                <button type="button" className="btn-primary" onClick={onNext}>
                  Next Shift
                </button>
              )}
              <button type="button" className="btn-secondary" onClick={onHome}>
                Back to Map
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>Shift Over</h1>
            <p className="results-subtitle">{level.name} — {level.zone}</p>
            <p className="results-message">
              Don&apos;t worry — even the best baristas need practice. Try again!
            </p>
            <div className="results-actions">
              <button type="button" className="btn-primary" onClick={onRetry}>
                Try Again
              </button>
              <button type="button" className="btn-secondary" onClick={onHome}>
                Back to Map
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
