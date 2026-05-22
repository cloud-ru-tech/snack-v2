// Multi-component пакет: один источник истины для всех `data-test-id`,
// используемых в stories и e2e. Слоты компонентов берутся из публичного
// `TEST_IDS` пакета, чтобы рассинхрон с реализацией был невозможен.
import {
  getPageMoreTestId,
  getPageNumberTestId,
  getSliderItemTestId,
  TEST_IDS as PACKAGE_TEST_IDS,
} from '../src/constants';

export const TEST_IDS = {
  pagination: {
    root: PACKAGE_TEST_IDS.root,
    prev: PACKAGE_TEST_IDS.prev,
    next: PACKAGE_TEST_IDS.next,
    pageNumberPrefix: PACKAGE_TEST_IDS.pageNumberPrefix,
    pageMorePrefix: PACKAGE_TEST_IDS.pageMorePrefix,
  },
  paginationSlider: {
    root: PACKAGE_TEST_IDS.sliderRoot,
    itemPrefix: PACKAGE_TEST_IDS.sliderItemPrefix,
  },
} as const;

export { getPageNumberTestId, getPageMoreTestId, getSliderItemTestId };
