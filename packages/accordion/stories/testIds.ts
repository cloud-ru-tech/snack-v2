import { TEST_IDS as COMPONENT_TEST_IDS } from '../src/constants';

/**
 * Единый объект stories-level test-id для пакета accordion.
 *
 * `TEST_IDS.accordion.root` — story-уровневый id корня Accordion-обёртки (сам компонент
 * на корне id не ставит). `TEST_IDS.accordion.block1/block2` — id для вложенных
 * CollapseBlock'ов в test/example stories. Component-level slot ids (`chevron`,
 * `title`, `subTitle`, `content`, `afterTitle`, `collapseBlock`) реэкспортируются
 * из `src/constants.ts` через `TEST_IDS.collapseBlock`.
 */
export const TEST_IDS = {
  accordion: {
    root: 'accordion',
    block1: 'accordion-block-1',
    block2: 'accordion-block-2',
  },
  collapseBlock: COMPONENT_TEST_IDS,
} as const;
