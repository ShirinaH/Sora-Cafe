import { useCallback, useEffect, useReducer, useRef } from 'react';
import { getMenuPool, pickRandomSequence, MENU_ITEMS } from '../data/menuItems';
import { getResolvedLevelConfig } from '../data/levels';
import { playCorrectSound, playFlashSound, playWrongSound, playWinSound } from '../utils/sounds';

const initialState = {
  phase: 'idle',
  sequence: [],
  playerInput: [],
  lives: 2,
  studyIndex: -1,
  replayUsed: false,
  feedback: null,
  momoMood: 'idle',
  shake: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return {
        ...initialState,
        phase: 'study',
        sequence: action.sequence,
        lives: action.lives,
        momoMood: 'thinking',
      };
    case 'STUDY_INDEX':
      return { ...state, studyIndex: action.index, momoMood: 'thinking' };
    case 'STUDY_DONE':
      return { ...state, phase: 'recall', studyIndex: -1, momoMood: 'thinking' };
    case 'CORRECT_TAP':
      return {
        ...state,
        playerInput: action.playerInput,
        feedback: 'correct',
        momoMood: 'happy',
        shake: false,
      };
    case 'WRONG_TAP':
      return {
        ...state,
        lives: action.lives,
        playerInput: [],
        feedback: 'wrong',
        momoMood: 'sad',
        shake: true,
      };
    case 'CLEAR_FEEDBACK':
      return { ...state, feedback: null, shake: false, momoMood: 'thinking' };
    case 'WON':
      return { ...state, phase: 'won', momoMood: 'celebrate', feedback: 'won' };
    case 'LOST':
      return { ...state, phase: 'lost', momoMood: 'sad', feedback: 'lost' };
    case 'REPLAY_STUDY':
      return {
        ...state,
        phase: 'study',
        playerInput: [],
        studyIndex: -1,
        replayUsed: true,
        feedback: null,
        momoMood: 'thinking',
      };
    default:
      return state;
  }
}

export function useGameState({ levelId, config, onWin, gameKey = 0 }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const levelConfig = getResolvedLevelConfig(levelId, config.difficulty);
  const menuPool = getMenuPool(config.menuSet);
  const studyTimerRef = useRef(null);
  const feedbackTimerRef = useRef(null);

  const clearTimers = useCallback(() => {
    if (studyTimerRef.current) {
      clearTimeout(studyTimerRef.current);
      studyTimerRef.current = null;
    }
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
      feedbackTimerRef.current = null;
    }
  }, []);

  const runStudyPhase = useCallback(
    (sequence) => {
      clearTimers();
      let index = 0;

      const showNext = () => {
        if (index < sequence.length) {
          dispatch({ type: 'STUDY_INDEX', index });
          if (config.sound) playFlashSound();
          index += 1;
          studyTimerRef.current = setTimeout(showNext, levelConfig.showTimeMs);
        } else {
          dispatch({ type: 'STUDY_DONE' });
        }
      };

      studyTimerRef.current = setTimeout(showNext, 400);
    },
    [clearTimers, config.sound, levelConfig.showTimeMs],
  );

  const startGame = useCallback(() => {
    clearTimers();
    const sequence = pickRandomSequence(menuPool, levelConfig.sequenceLength);
    dispatch({
      type: 'INIT',
      sequence,
      lives: levelConfig.lives,
    });
    runStudyPhase(sequence);
  }, [clearTimers, menuPool, levelConfig.sequenceLength, levelConfig.lives, runStudyPhase]);

  useEffect(() => {
    startGame();
    return clearTimers;
  }, [gameKey, startGame, clearTimers]);

  const handleItemTap = useCallback(
    (itemId) => {
      if (state.phase !== 'recall' || state.feedback) return;

      const expectedIndex = state.playerInput.length;
      const expected = state.sequence[expectedIndex];

      if (itemId === expected) {
        const newInput = [...state.playerInput, itemId];
        dispatch({ type: 'CORRECT_TAP', playerInput: newInput });
        if (config.sound) playCorrectSound();

        if (newInput.length === state.sequence.length) {
          if (config.sound) playWinSound();
          dispatch({ type: 'WON' });
          onWin?.();
        } else {
          feedbackTimerRef.current = setTimeout(() => {
            dispatch({ type: 'CLEAR_FEEDBACK' });
          }, 300);
        }
      } else {
        const newLives = state.lives - 1;
        if (config.sound) playWrongSound();
        dispatch({ type: 'WRONG_TAP', lives: newLives });

        if (newLives <= 0) {
          feedbackTimerRef.current = setTimeout(() => {
            dispatch({ type: 'LOST' });
          }, 600);
        } else {
          feedbackTimerRef.current = setTimeout(() => {
            dispatch({ type: 'CLEAR_FEEDBACK' });
          }, 600);
        }
      }
    },
    [state, config.sound, onWin],
  );

  const replayStudy = useCallback(() => {
    if (
      state.phase !== 'recall' ||
      state.replayUsed ||
      !levelConfig.allowReplayHint
    ) {
      return;
    }
    dispatch({ type: 'REPLAY_STUDY' });
    runStudyPhase(state.sequence);
  }, [state, levelConfig.allowReplayHint, runStudyPhase]);

  const sequenceItems = state.sequence.map((id) => MENU_ITEMS[id]);
  const filledItems = state.playerInput.map((id) => MENU_ITEMS[id]);

  return {
    state,
    levelConfig,
    menuPool,
    sequenceItems,
    filledItems,
    handleItemTap,
    replayStudy,
    canReplay: state.phase === 'recall' && !state.replayUsed && levelConfig.allowReplayHint,
  };
}
