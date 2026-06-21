import './ShiftSetup.css';
import { getLevelById, DIFFICULTY_PRESETS } from '../data/levels';
import { MENU_SETS } from '../data/menuItems';
import CafeInterior from './CafeInterior';
import SetupDecorations from './SetupDecorations';

const DEFAULT_CONFIG = {
  menuSet: 'all',
  difficulty: 'beginner',
  sound: true,
};

export { DEFAULT_CONFIG };

export default function ShiftSetup({ levelId, config, onConfigChange, onStart, onBack }) {
  const level = getLevelById(levelId);

  return (
    <CafeInterior>
      <SetupDecorations />

      <div className="shift-setup-layout">
        <div className="shift-setup-main">
          <header className="page-header setup-header">
            <button type="button" className="back-btn" onClick={onBack}>
              ← Back
            </button>
            <p className="breadcrumb">
              Sora Café &gt; <strong>{level.zone}</strong> &gt; Setup
            </p>
          </header>

          <div className="card setup-card">
          <div className="setup-card-top">
            <span className="setup-zone-badge">{level.zone}</span>
            <h1>Shift Setup</h1>
            <p className="setup-level-name">{level.name}</p>
            <p className="setup-desc">Configure your shift before the orders start coming in.</p>
          </div>

          <fieldset className="setup-field">
            <legend>Menu Set</legend>
            <div className="chip-group" role="radiogroup" aria-label="Menu set">
              {Object.values(MENU_SETS).map((set) => (
                <button
                  key={set.id}
                  type="button"
                  role="radio"
                  aria-checked={config.menuSet === set.id}
                  className={`chip ${config.menuSet === set.id ? 'active' : ''}`}
                  onClick={() => onConfigChange({ ...config, menuSet: set.id })}
                >
                  {set.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="setup-field">
            <legend>Difficulty</legend>
            <div className="chip-group" role="radiogroup" aria-label="Difficulty">
              {Object.values(DIFFICULTY_PRESETS).map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  role="radio"
                  aria-checked={config.difficulty === preset.id}
                  className={`chip ${config.difficulty === preset.id ? 'active' : ''}`}
                  onClick={() => onConfigChange({ ...config, difficulty: preset.id })}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="setup-field">
            <legend>Sound</legend>
            <div className="chip-group" role="radiogroup" aria-label="Sound">
              <button
                type="button"
                role="radio"
                aria-checked={config.sound}
                className={`chip ${config.sound ? 'active' : ''}`}
                onClick={() => onConfigChange({ ...config, sound: true })}
              >
                On
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={!config.sound}
                className={`chip ${!config.sound ? 'active' : ''}`}
                onClick={() => onConfigChange({ ...config, sound: false })}
              >
                Off
              </button>
            </div>
          </fieldset>

            <button type="button" className="btn-primary setup-start" onClick={onStart}>
              Start Shift →
            </button>
          </div>
        </div>
      </div>
    </CafeInterior>
  );
}
