export const LEVELS = [
  {
    id: 1,
    name: 'Morning Shift',
    zone: 'Counter',
    description: 'A gentle start, remember 3 items.',
    sequenceLength: 3,
    showTimeMs: 3000,
    baseLives: 2,
    allowReplay: true,
  },
  {
    id: 2,
    name: 'Lunch Rush',
    zone: 'Counter',
    description: 'Orders pick up, 4 items, faster pace.',
    sequenceLength: 4,
    showTimeMs: 2000,
    baseLives: 2,
    allowReplay: true,
  },
  {
    id: 3,
    name: 'Afternoon Patio',
    zone: 'Patio',
    description: 'Outdoor seating, stay focused amid distractions.',
    sequenceLength: 4,
    showTimeMs: 2000,
    baseLives: 2,
    allowReplay: true,
    hasDistractor: true,
  },
  {
    id: 4,
    name: 'Evening Glow',
    zone: 'Patio',
    description: 'Similar items test your attention, 5 items.',
    sequenceLength: 5,
    showTimeMs: 1500,
    baseLives: 2,
    allowReplay: false,
  },
  {
    id: 5,
    name: 'Closing Time',
    zone: 'Rooftop',
    description: 'Final shift on the rooftop, no second chances.',
    sequenceLength: 6,
    showTimeMs: 1500,
    baseLives: 1,
    allowReplay: false,
  },
];

export const DIFFICULTY_PRESETS = {
  beginner: {
    id: 'beginner',
    label: 'Beginner',
    showTimeMultiplier: 1.25,
    livesBonus: 1,
    sequenceAdjust: 0,
    allowReplayHint: true,
  },
  advanced: {
    id: 'advanced',
    label: 'Advanced',
    showTimeMultiplier: 0.75,
    livesBonus: 0,
    sequenceAdjust: 0,
    allowReplayHint: false,
  },
};

export function getLevelById(levelId) {
  return LEVELS.find((l) => l.id === levelId) ?? LEVELS[0];
}

export function getResolvedLevelConfig(levelId, difficultyId) {
  const level = getLevelById(levelId);
  const preset = DIFFICULTY_PRESETS[difficultyId] ?? DIFFICULTY_PRESETS.beginner;

  const sequenceLength = Math.max(
    2,
    level.sequenceLength + preset.sequenceAdjust + (difficultyId === 'advanced' && levelId >= 4 ? 1 : 0),
  );

  return {
    ...level,
    sequenceLength,
    showTimeMs: Math.round(level.showTimeMs * preset.showTimeMultiplier),
    lives: level.baseLives + preset.livesBonus,
    allowReplayHint: preset.allowReplayHint && level.allowReplay,
  };
}

export const ZONES = ['Counter', 'Patio', 'Rooftop'];
