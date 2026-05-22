export const SIZE = {
  Xs: 'xs',
  S: 's',
  M: 'm',
} as const;

export const APPEARANCE = {
  Neutral: 'neutral',
  Primary: 'primary',
  Red: 'red',
  Orange: 'orange',
  Yellow: 'yellow',
  Green: 'green',
  Blue: 'blue',
  Violet: 'violet',
  Pink: 'pink',
} as const;

/**
 * Канонические `data-test-id` слотов, которые компонент ставит на свои внутренние
 * элементы (не получаются от потребителя через `...rest`). Реэкспортируются
 * из `src/index.ts`, чтобы потребитель и e2e helpers брали строки из одного
 * источника.
 */
export const TEST_IDS = {
  tag: {
    removeButton: 'tag-remove-button',
  },
  tagRow: {
    moreButton: 'tag-row__more-button',
    visibleTagsWrapper: 'tag-row__visible-row',
    droplistTagsWrapper: 'tag-row__droplist-contents',
  },
} as const;
