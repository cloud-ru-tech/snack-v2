export const SIZE = {
  XS: 'xs',
  S: 's',
} as const;

/** Стабильные `data-test-id` на внутренних слотах, которые компонент ставит сам. */
export const TEST_IDS = {
  questionTooltip: {
    triggerOpen: 'question-tooltip-trigger',
  },
} as const;
