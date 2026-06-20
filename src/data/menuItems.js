export const MENU_SETS = {
  sweets: {
    id: 'sweets',
    label: 'Sweets',
    itemIds: ['mochi', 'dorayaki', 'dango', 'castella', 'taiyaki', 'manju'],
  },
  teaware: {
    id: 'teaware',
    label: 'Teaware',
    itemIds: ['matcha', 'hojicha', 'teacup', 'teapot', 'sakura-latte', 'blue-mug'],
  },
  full: {
    id: 'full',
    label: 'Full Café',
    itemIds: [
      'mochi', 'dorayaki', 'dango', 'castella', 'taiyaki', 'manju',
      'matcha', 'hojicha', 'teacup', 'teapot', 'sakura-latte', 'blue-mug',
    ],
  },
};

export const MENU_ITEMS = {
  mochi: { id: 'mochi', name: 'Mochi', emoji: '🍡', color: '#f5d0d0' },
  dorayaki: { id: 'dorayaki', name: 'Dorayaki', emoji: '🥞', color: '#f5e6c8' },
  dango: { id: 'dango', name: 'Dango', emoji: '🍢', color: '#ffe4ec' },
  castella: { id: 'castella', name: 'Castella', emoji: '🍰', color: '#fff0d4' },
  taiyaki: { id: 'taiyaki', name: 'Taiyaki', emoji: '🐟', color: '#ffd4a8' },
  manju: { id: 'manju', name: 'Manju', emoji: '🥮', color: '#e8dcc8' },
  matcha: { id: 'matcha', name: 'Matcha', emoji: '🍵', color: '#a8d5ba' },
  hojicha: { id: 'hojicha', name: 'Hojicha', emoji: '☕', color: '#c4a882' },
  teacup: { id: 'teacup', name: 'Teacup', emoji: '🫖', color: '#b8d4e8' },
  teapot: { id: 'teapot', name: 'Teapot', emoji: '🍶', color: '#9ec4d8' },
  'sakura-latte': { id: 'sakura-latte', name: 'Sakura Latte', emoji: '🌸', color: '#f5d0e8' },
  'blue-mug': { id: 'blue-mug', name: 'Blue Mug', emoji: '☁️', color: '#8eb8d4' },
};

export function getMenuPool(menuSetId) {
  const set = MENU_SETS[menuSetId] ?? MENU_SETS.full;
  return set.itemIds.map((id) => MENU_ITEMS[id]);
}

export function pickRandomSequence(pool, length) {
  const items = [];
  for (let i = 0; i < length; i++) {
    const item = pool[Math.floor(Math.random() * pool.length)];
    items.push(item.id);
  }
  return items;
}
