import { TEST_IDS as COMPONENT_TEST_IDS } from '../src/constants';

/**
 * Единый объект test-id для stories и e2e-хелперов пакета.
 * Слоты компонента приходят из `src/constants`, story-level слоты (триггеры,
 * которые ставит сама story, а не компонент) добавляются здесь.
 */
export const TEST_IDS = {
  ...COMPONENT_TEST_IDS,
  drawer: {
    triggerOpen: 'notification-panel-drawer__trigger',
  },
} as const;
