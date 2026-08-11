import { TEST_IDS as PACKAGE_TEST_IDS } from '../../src/constants';

/**
 * TEST_IDS пакета плюс story-level id для содержимого слота `afterContent`:
 * сам слот наполняет потребитель, поэтому id кнопки живёт в stories.
 */
export const TEST_IDS = {
  ...PACKAGE_TEST_IDS,
  afterContentButton: 'search__after-content-button',
} as const;
