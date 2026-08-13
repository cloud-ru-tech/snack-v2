// Единый source-of-truth для test-id'ов всех компонентов пакета `@ds/toaster`.
// Multi-component пакет → один общий testIds.ts на уровне stories/, а не четыре
// раздельных файла. Внутренние слоты компонентов берутся из публичного API пакета
// (`src/constants::TEST_IDS`, плоская форма); stories-level scenario триггеры
// (spawn/dismiss/scenario-specific demo-кнопки) живут здесь же.

import { TEST_IDS as SRC_TEST_IDS } from '../src/constants';

/**
 * Единый объект `data-test-id` пакета `@ds/toaster`.
 *
 * Слоты компонентов сохраняют плоскую форму из `src/constants` (исторический
 * формат — миграция в nested сломает много e2e-кода). Story-level триггеры
 * сгруппированы в подсекциях по story (`playground` / `visualMatrix` /
 * `imperativeApi` / `interactionTest` / `composition`).
 */
export const TEST_IDS = {
  ...SRC_TEST_IDS,

  // Playground.
  playground: {
    triggerOpen: 'toaster-trigger-spawn',
    triggerReset: 'toaster-trigger-dismiss-all',
    triggerDismiss: 'toaster-trigger-dismiss',
  },
  // VisualMatrix (бывш. Stacking).
  visualMatrix: {
    spawnAt: (position: string) => `toaster-stacking-${position}-spawn`,
    triggerReset: 'toaster-stacking-dismiss-all',
  },
  // ImperativeApi (бывш. Triggers).
  imperativeApi: {
    systemEvent: (appearance: string) => `toaster-trigger-system-event-${appearance}`,
    userAction: (appearance: string) => `toaster-trigger-user-action-${appearance}`,
    upload: (status: string) => `toaster-trigger-upload-${status}`,
    triggerReset: 'toaster-trigger-dismiss-all',
  },
  // InteractionTest (бывш. UpdateFlow).
  interactionTest: {
    systemSuccess: 'update-flow-system-success',
    systemError: 'update-flow-system-error',
    userAction: 'update-flow-user-action',
    upload: 'update-flow-upload',
    triggerReset: 'toaster-update-flow-dismiss-all',
  },
  // TimerPhase — демонстрация промежуточной фазы кольца отсчёта.
  timerPhase: {
    triggerOpen: 'toaster-timer-phase-spawn',
  },
  // Composition (бывш. Mobile).
  composition: {
    size: 'toaster-mobile-size',
    systemEvent: 'toaster-mobile-system-event',
    upload: 'toaster-mobile-upload',
    userAction: 'toaster-mobile-user-action',
    triggerReset: 'toaster-mobile-dismiss-all',
  },
} as const;
