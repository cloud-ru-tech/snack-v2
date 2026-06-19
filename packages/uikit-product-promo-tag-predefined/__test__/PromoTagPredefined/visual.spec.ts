import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { PREVIEW_CONTEXT, VARIANTS } from '../../src/constants';
import { buildStoryOptions, PROMO_TAG_PREDEFINED_STORIES, TEST_IDS } from './helpers';

test.describe('PromoTagPredefined — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, PROMO_TAG_PREDEFINED_STORIES.visualMatrix));
    await waitForFonts();

    await assertVisualMatrixSnapshot(page);
  });

  test('tooltip-open', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        variant: VARIANTS.Preview,
        context: PREVIEW_CONTEXT.Service,
        tooltip: { trigger: 'click', open: true },
      }),
    );
    await waitForFonts();

    await expect(getByTestId(TEST_IDS.promoTag)).toBeVisible();
    await expect(getByTestId(TEST_IDS.tooltipContent)).toBeVisible();

    await expect(page).toHaveScreenshot('tooltip-open.png');
  });
});
