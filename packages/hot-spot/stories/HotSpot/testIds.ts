// Pure-const файл, без entry — иначе SCSS-модули ломают playwright-compile в e2e.
import { TEST_IDS as PACKAGE_TEST_IDS } from '../../src/components/testIds';

export const TEST_IDS = {
  ...PACKAGE_TEST_IDS,
  anchor: 'hot-spot-anchor',
} as const;
