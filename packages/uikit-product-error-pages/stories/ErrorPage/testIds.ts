import { TEST_IDS as PACKAGE_TEST_IDS } from '../../src/constants';

/**
 * Source-of-truth для test-id'ов stories ErrorPage. Слоты, которые компонент ставит
 * сам, берутся из публичного `src/constants::TEST_IDS`; stories-level — это уникальные
 * id для ячеек VisualMatrix (root каждого инстанса задаётся через `data-test-id`).
 */
export const TEST_IDS = {
  ...PACKAGE_TEST_IDS,
  matrix: (errorType: string, key: string) => `error-page-matrix-${errorType}-${key}`,
} as const;
