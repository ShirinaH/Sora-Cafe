import { SETUP_DECOR_COPIES, SETUP_DECOR_ROWS, SETUP_DECOR_STRIP } from '../data/setupDecor';
import './SetupDecorations.css';

function DecorRow({ duration, delay, opacity }) {
  return (
    <div
      className="setup-decor-row"
      style={{
        '--row-duration': `${duration}s`,
        '--row-delay': `${delay}s`,
        '--row-opacity': opacity,
      }}
    >
      <div className="setup-decor-track">
        {Array.from({ length: SETUP_DECOR_COPIES }, (_, i) => (
          <img
            key={i}
            className="setup-decor-strip"
            src={SETUP_DECOR_STRIP}
            alt=""
            aria-hidden={i > 0}
          />
        ))}
      </div>
    </div>
  );
}

export default function SetupDecorations() {
  return (
    <div className="setup-decor-backdrop" aria-hidden="true">
      {SETUP_DECOR_ROWS.map((row, i) => (
        <DecorRow key={i} {...row} />
      ))}
    </div>
  );
}
