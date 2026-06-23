/**
 * Story-level test-id'ы пакета (корневые id, которые story передаёт компонентам
 * через `data-test-id` в `args`/пропсах). Внутренние слоты компонента живут в
 * `src/constants::TEST_IDS`.
 */
export const TEST_IDS = {
  emptyBlock: { root: 'empty-block' },
  noAccess: { root: 'no-access' },
} as const;
