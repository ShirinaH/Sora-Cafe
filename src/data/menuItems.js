const ALL_SWEET_IDS = [
  'strawberry-parfait',
  'strawberry-shortcake',
  'mitarashi-dango-trio',
  'cookie-box',
  'mitarashi-dango',
  'fruit-parfait-tall',
  'citrus-parfait',
  'custard-purin',
  'ube-soft-serve',
  'taiyaki-duo',
  'taiyaki-trio',
  'deluxe-parfait',
  'anmitsu',
  'checkered-cake',
  'melon-pan',
  'daifuku-mochi',
  'macaron-pair',
  'dorayaki-duo',
];

export const MENU_SETS = {
  parfaits: {
    id: 'parfaits',
    label: 'Parfaits & Bowls',
    itemIds: [
      'strawberry-parfait',
      'fruit-parfait-tall',
      'citrus-parfait',
      'deluxe-parfait',
      'ube-soft-serve',
      'anmitsu',
    ],
  },
  traditional: {
    id: 'traditional',
    label: 'Traditional',
    itemIds: [
      'mitarashi-dango-trio',
      'mitarashi-dango',
      'taiyaki-duo',
      'taiyaki-trio',
      'dorayaki-duo',
      'daifuku-mochi',
    ],
  },
  baked: {
    id: 'baked',
    label: 'Bakes & Pastries',
    itemIds: [
      'strawberry-shortcake',
      'cookie-box',
      'custard-purin',
      'checkered-cake',
      'melon-pan',
      'macaron-pair',
    ],
  },
  all: {
    id: 'all',
    label: 'All Treats',
    itemIds: ALL_SWEET_IDS,
  },
};

export const MENU_ITEMS = {
  'strawberry-parfait': {
    id: 'strawberry-parfait',
    name: 'Berry Parfait',
    emoji: '🍨',
    image: '/menu/strawberry-parfait.png',
    color: '#fde8ef',
  },
  'strawberry-shortcake': {
    id: 'strawberry-shortcake',
    name: 'Strawberry Shortcake',
    emoji: '🍰',
    image: '/menu/strawberry-shortcake.png',
    color: '#fff0f4',
  },
  'mitarashi-dango-trio': {
    id: 'mitarashi-dango-trio',
    name: 'Mitarashi Dango',
    emoji: '🍡',
    image: '/menu/mitarashi-dango-trio.png',
    color: '#f8ebe2',
  },
  'cookie-box': {
    id: 'cookie-box',
    name: 'Cookie Gift Box',
    emoji: '🍪',
    image: '/menu/cookie-box.png',
    color: '#fce8ef',
  },
  'mitarashi-dango': {
    id: 'mitarashi-dango',
    name: 'Dango Skewer',
    emoji: '🍢',
    image: '/menu/mitarashi-dango.png',
    color: '#f5ebe3',
  },
  'fruit-parfait-tall': {
    id: 'fruit-parfait-tall',
    name: 'Rainbow Parfait',
    emoji: '🍧',
    image: '/menu/fruit-parfait-tall.png',
    color: '#e8f8ef',
  },
  'citrus-parfait': {
    id: 'citrus-parfait',
    name: 'Citrus Parfait',
    emoji: '🍊',
    image: '/menu/citrus-parfait.png',
    color: '#fdeef0',
  },
  'custard-purin': {
    id: 'custard-purin',
    name: 'Caramel Purin',
    emoji: '🍮',
    image: '/menu/custard-purin.png',
    color: '#fff4dc',
  },
  'ube-soft-serve': {
    id: 'ube-soft-serve',
    name: 'Taro Soft Serve',
    emoji: '🍦',
    image: '/menu/ube-soft-serve.png',
    color: '#efe4ff',
  },
  'taiyaki-duo': {
    id: 'taiyaki-duo',
    name: 'Taiyaki Pair',
    emoji: '🐟',
    image: '/menu/taiyaki-duo.png',
    color: '#ffe8cc',
  },
  'taiyaki-trio': {
    id: 'taiyaki-trio',
    name: 'Taiyaki Platter',
    emoji: '🐟',
    image: '/menu/taiyaki-trio.png',
    color: '#ffe3c4',
  },
  'deluxe-parfait': {
    id: 'deluxe-parfait',
    name: 'Fruit Parfait Bowl',
    emoji: '🍨',
    image: '/menu/deluxe-parfait.png',
    color: '#fdeef2',
  },
  anmitsu: {
    id: 'anmitsu',
    name: 'Mixed Anmitsu',
    emoji: '🍓',
    image: '/menu/anmitsu.png',
    color: '#fce8ee',
  },
  'checkered-cake': {
    id: 'checkered-cake',
    name: 'Checkered Slice',
    emoji: '🍰',
    image: '/menu/checkered-cake.png',
    color: '#fff0f5',
  },
  'melon-pan': {
    id: 'melon-pan',
    name: 'Melon Pan Duo',
    emoji: '🍞',
    image: '/menu/melon-pan.png',
    color: '#fff0d8',
  },
  'daifuku-mochi': {
    id: 'daifuku-mochi',
    name: 'Daifuku Mochi',
    emoji: '🍡',
    image: '/menu/daifuku-mochi.png',
    color: '#e8f4ff',
  },
  'macaron-pair': {
    id: 'macaron-pair',
    name: 'Macaron Duo',
    emoji: '🧁',
    image: '/menu/macaron-pair.png',
    color: '#f0ffe8',
  },
  'dorayaki-duo': {
    id: 'dorayaki-duo',
    name: 'Dorayaki Pair',
    emoji: '🥞',
    image: '/menu/dorayaki-duo.png',
    color: '#fff0d4',
  },
};

const LEGACY_MENU_SET_MAP = {
  sweets: 'all',
  teaware: 'traditional',
  full: 'all',
};

export function getMenuPool(menuSetId) {
  const resolvedId = LEGACY_MENU_SET_MAP[menuSetId] ?? menuSetId;
  const set = MENU_SETS[resolvedId] ?? MENU_SETS.all;
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
