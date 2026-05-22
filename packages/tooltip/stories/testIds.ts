/**
 * Story-level data-test-id'шники пакета `@ds/tooltip` (multi-component: Tooltip + QuestionTooltip).
 *
 * Компонент сам `data-test-id` на внутренние слоты не ставит — все id выставляются
 * в stories и используются Playwright-спеками. Один источник истины для stories и
 * `__test__/<Comp>/helpers.ts`.
 */
export const TEST_IDS = {
  tooltip: {
    triggerOpen: 'tooltip-trigger',
    content: 'tooltip-content',
    /** VisualMatrix trigger-panel — key per cell. */
    vmTrigger: (key: string) => `tooltip-vm-${key}`,
  },
  questionTooltip: {
    triggerOpen: 'question-tooltip-trigger',
    content: 'question-tooltip-content',
  },
} as const;
