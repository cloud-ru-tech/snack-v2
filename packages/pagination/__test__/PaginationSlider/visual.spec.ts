import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { getSliderItemTestId } from '../../src/constants';
import { buildStoryOptions, PAGINATION_SLIDER_STORIES, PAGINATION_SLIDER_TEST_ID } from './helpers';

test.describe('PaginationSlider — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, PAGINATION_SLIDER_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus × pressed) — page 2', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    const page2 = getByTestId(getSliderItemTestId(2));
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(PAGINATION_SLIDER_TEST_ID),
      hoverTarget: page2,
      pressedTarget: page2,
      focusAction: async () => {
        await page2.evaluate((el: HTMLElement) => el.focus({ focusVisible: true } as FocusOptions));
      },
      includePressed: true,
      layout: 'col',
    });
  });
});
