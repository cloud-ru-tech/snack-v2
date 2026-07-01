import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, screenshotRegion } from '#playwright-tooling/utils';

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

  test('open-tooltip', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        variant: VARIANTS.Preview,
        context: PREVIEW_CONTEXT.Service,
        tooltip: { trigger: 'click', open: true },
      }),
    );
    await waitForFonts();

    const promoTag = getByTestId(TEST_IDS.promoTag);
    const tooltipContent = getByTestId(TEST_IDS.tooltipContent);
    await expect(promoTag).toBeVisible();
    await expect(tooltipContent).toBeVisible();

    // Кадр = union триггера и контента тултипа, без пустого вьюпорта вокруг.
    const png = await screenshotRegion(page, [promoTag, tooltipContent], 16, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('open-tooltip.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
