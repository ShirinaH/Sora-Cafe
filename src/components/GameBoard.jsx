import { useEffect, useCallback, useState } from 'react';
import './GameBoard.css';
import { getLevelById, LEVELS } from '../data/levels';
import { useGameState } from '../hooks/useGameState';
import { unlockLevel } from '../utils/progressStorage';
import OrderDisplay from './OrderDisplay';
import MenuGrid from './MenuGrid';
import ProgressBar from './ProgressBar';
import MomoCharacter from './MomoCharacter';
import ResultsScreen from './ResultsScreen';

export default function GameBoard({ levelId, config, onBack, onHome, onNextLevel }) {
  const level = getLevelById(levelId);
  const [gameKey, setGameKey] = useState(0);

  const handleWin = useCallback(() => {
    if (levelId < LEVELS.length) {
      unlockLevel(levelId + 1);
    }
  }, [levelId]);

  const {
    state,
    levelConfig,
    menuPool,
    sequenceItems,
    filledItems,
    handleItemTap,
    replayStudy,
    canReplay,
  } = useGameState({
    levelId,
    config,
    onWin: handleWin,
    gameKey,
  });

  const handleKeyDown = useCallback(
    (e) => {
      if (state.phase !== 'recall' || state.feedback) return;
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= menuPool.length) {
        handleItemTap(menuPool[num - 1].id);
      }
    },
    [state.phase, state.feedback, menuPool, handleItemTap],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (state.phase === 'won' || state.phase === 'lost') {
    return (
      <ResultsScreen
        levelId={levelId}
        won={state.phase === 'won'}
        livesLeft={state.lives}
        maxLives={levelConfig.lives}
        onNext={() => onNextLevel(levelId + 1)}
        onRetry={() => setGameKey((k) => k + 1)}
        onHome={onHome}
      />
    );
  }

  return (
    <div className="game-board fade-in">
      <header className="page-header">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <p className="breadcrumb">
          Sora Café &gt; <strong>{level.zone}</strong> &gt; {level.name}
        </p>
      </header>

      <ProgressBar lives={state.lives} maxLives={levelConfig.lives} phase={state.phase} />

      <div className="game-main">
        <div className="game-play-area">
          {levelConfig.hasDistractor && state.phase === 'study' && (
            <div className="distractor" aria-hidden="true">
              <span className="steam">☁️</span>
              <span className="bell">🔔</span>
            </div>
          )}

          <OrderDisplay
            phase={state.phase}
            sequenceItems={sequenceItems}
            filledItems={filledItems}
            studyIndex={state.studyIndex}
            totalSlots={levelConfig.sequenceLength}
            shake={state.shake}
          />

          <div aria-live="polite" aria-atomic="true" className="sr-only">
            {state.feedback === 'correct' && 'Correct!'}
            {state.feedback === 'wrong' && 'Wrong order. Try again.'}
            {state.phase === 'study' && state.studyIndex >= 0 &&
              `Showing item ${state.studyIndex + 1} of ${levelConfig.sequenceLength}`}
          </div>

          {state.phase === 'recall' && (
            <>
              <MenuGrid
                items={menuPool}
                onItemTap={handleItemTap}
                disabled={!!state.feedback}
              />
              {canReplay && (
                <button type="button" className="btn-secondary replay-btn" onClick={replayStudy}>
                  Replay Order (1×)
                </button>
              )}
            </>
          )}

          {state.phase === 'study' && (
            <p className="study-hint">Memorize the order Momo receives…</p>
          )}
        </div>

        <aside className="game-sidebar">
          <MomoCharacter mood={state.momoMood} />
        </aside>
      </div>
    </div>
  );
}
