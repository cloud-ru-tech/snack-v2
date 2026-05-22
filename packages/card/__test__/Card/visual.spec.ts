import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, CARD_STORIES, CARD_TEST_ID } from './helpers';

test.describe('Card — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, CARD_STORIES.visualMatrix));
    await waitForFonts();

    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions({ children: 'Card' }));
    await waitForFonts();

    await assertInteractionStatesSnapshot(page, { target: getByTestId(CARD_TEST_ID), layout: 'col' });
  });
});
