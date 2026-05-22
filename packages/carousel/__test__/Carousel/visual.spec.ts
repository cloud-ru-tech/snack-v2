import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, CAROUSEL_STORIES, TEST_IDS } from './helpers';

test.describe('Carousel — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, CAROUSEL_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus × pressed) — arrow next', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions({ controlsVisibility: 'always' }));
    await waitForFonts();

    const arrow = getByTestId(TEST_IDS.arrowNext);
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.root),
      hoverTarget: arrow,
      pressedTarget: arrow,
      focusAction: async () => {
        await arrow.evaluate((el: HTMLElement) => el.focus({ focusVisible: true } as FocusOptions));
      },
      includePressed: true,
      layout: 'col',
    });
  });
});
