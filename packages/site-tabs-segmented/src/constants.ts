/** Размер вкладок. */
export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

/** Оформление вкладок. */
export const APPEARANCE = {
  /** Для светлого и тёмного фона по теме: выбранная вкладка инвертирована. */
  Default: 'default',
  /** Для тёмного акцентного фона: ряд в тёмной теме, выбранная вкладка — акцентная. */
  OnAccent: 'onAccent',
} as const;

export const TEST_IDS = {
  root: 'tabs-segmented',
} as const;
