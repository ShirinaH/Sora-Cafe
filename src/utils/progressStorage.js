const STORAGE_KEY = 'momo-cafe-unlocked-levels';

export function getUnlockedLevels() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* ignore */
  }
  return [1];
}

export function unlockLevel(levelId) {
  const unlocked = getUnlockedLevels();
  if (!unlocked.includes(levelId)) {
    const next = [...unlocked, levelId].sort((a, b) => a - b);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  }
  return unlocked;
}

export function isLevelUnlocked(levelId) {
  return getUnlockedLevels().includes(levelId);
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
