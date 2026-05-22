import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, LINK_STORIES, TEST_IDS } from './helpers';

// Link — мелкий inline-элемент (~30×16 px). Большой padding делает цвет и focus-ring читаемыми.
const INTERACTION_PADDING = 24;

test.describe('Link — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, LINK_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus × pressed)', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions({ href: '#' }));
    await waitForFonts();
    const link = getByTestId(TEST_IDS.root);
    await expect(link).toBeVisible();
    await assertInteractionStatesSnapshot(page, {
      target: link,
      includePressed: true,
      padding: INTERACTION_PADDING,
    });
  });
});
