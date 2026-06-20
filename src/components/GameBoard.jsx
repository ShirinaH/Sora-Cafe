import { useEffect, useCallback, useState } from 'react';
import './GameBoard.css';
import { getLevelById, LEVELS } from '../data/levels';
import { useGameState } from '../hooks/useGameState';
import { unlockLevel } from '../utils/progressStorage';
import OrderingScene from './OrderingScene';
import AssemblyScene from './AssemblyScene';
import ProgressBar from './ProgressBar';
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
      {/* Floating top bar */}
      <div className="game-topbar">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <p className="breadcrumb">
          Sora Café &gt; <strong>{level.zone}</strong> &gt; {level.name}
        </p>
        <ProgressBar lives={state.lives} maxLives={levelConfig.lives} phase={state.phase} />
      </div>

      {/* Scene area */}
      <div className="game-scene">
        {state.phase === 'study' && (
          <OrderingScene
            sequenceItems={sequenceItems}
            studyIndex={state.studyIndex}
          />
        )}

        {state.phase === 'recall' && (
          <AssemblyScene
            menuPool={menuPool}
            filledItems={filledItems}
            sequenceItems={sequenceItems}
            onItemTap={handleItemTap}
            disabled={!!state.feedback}
            shake={state.shake}
          />
        )}

        {/* Replay hint */}
        {state.phase === 'recall' && canReplay && (
          <div className="replay-bar">
            <button type="button" className="btn-secondary replay-btn" onClick={replayStudy}>
              Replay Order (1×)
            </button>
          </div>
        )}
      </div>

      {/* ARIA live region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {state.feedback === 'correct' && 'Correct!'}
        {state.feedback === 'wrong' && 'Wrong order. Try again.'}
        {state.phase === 'study' && state.studyIndex >= 0 &&
          `Showing item ${state.studyIndex + 1} of ${levelConfig.sequenceLength}`}
      </div>
    </div>
  );
}
