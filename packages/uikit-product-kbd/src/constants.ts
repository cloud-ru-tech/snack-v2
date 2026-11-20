/** Предопределённая клавиша: символ и доступное название берутся из карты. */
export const KBD_KEY_NAME = {
  Mod: 'mod',
  Ctrl: 'ctrl',
  Alt: 'alt',
  Meta: 'meta',
  Shift: 'shift',
  Up: 'up',
  Down: 'down',
  Left: 'left',
  Right: 'right',
  Enter: 'enter',
  Esc: 'esc',
} as const;

/** Платформа, под которую рисуются модификаторы. */
export const KBD_PLATFORM = {
  Mac: 'mac',
  Other: 'other',
} as const;

/** Видимый символ клавиши по платформе. Доступные названия — в `kbdLocale`. */
export const KBD_SYMBOLS = {
  mod: { mac: '⌘', other: 'Ctrl' },
  ctrl: { mac: '⌃', other: 'Ctrl' },
  alt: { mac: '⌥', other: 'Alt' },
  meta: { mac: '⌘', other: 'Win' },
  shift: { mac: 'Shift', other: 'Shift' },
  up: { mac: '↑', other: '↑' },
  down: { mac: '↓', other: '↓' },
  left: { mac: '←', other: '←' },
  right: { mac: '→', other: '→' },
  enter: { mac: '↵', other: '↵' },
  esc: { mac: 'Esc', other: 'Esc' },
} as const;

/** Разделитель клавиш в сочетании: `⌘ + K`. */
export const KBD_SHORTCUT_SEPARATOR = '+';
