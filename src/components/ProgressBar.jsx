import './ProgressBar.css';

export default function ProgressBar({ lives, maxLives, phase }) {
  return (
    <div className="progress-bar" role="status" aria-label={`${lives} of ${maxLives} lives remaining`}>
      <span className="progress-label">Lives</span>
      <div className="hearts">
        {Array.from({ length: maxLives }, (_, i) => (
          <span
            key={i}
            className={`heart ${i < lives ? 'full' : 'empty'}`}
            aria-hidden="true"
          >
            {i < lives ? '♥' : '♡'}
          </span>
        ))}
      </div>
      <span className="phase-badge">{phase === 'study' ? 'Memorize' : phase === 'recall' ? 'Recall' : phase}</span>
    </div>
  );
}
