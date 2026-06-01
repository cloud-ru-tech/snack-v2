import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildChipChoiceVariantStory, CHIP_STORIES } from '../_shared/helpers';

const VARIANTS = ['single', 'multiple', 'date', 'daterange', 'time', 'custom'] as const;

test.describe('ChipChoice — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  for (const variant of VARIANTS) {
    test(`visual matrix: ${variant}`, async ({ page, gotoStory, waitForFonts }) => {
      await gotoStory(buildChipChoiceVariantStory(variant, undefined, CHIP_STORIES.visualMatrix));
      await waitForFonts();
      await assertVisualMatrixSnapshot(page);
    });
  }
});
