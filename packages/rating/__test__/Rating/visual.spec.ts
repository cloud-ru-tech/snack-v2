import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, RATING_STORIES, TEST_IDS } from './helpers';

test.describe('Rating — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, RATING_STORIES.visualMatrix));
    await waitForFonts();

    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions({ defaultValue: 0 }));
    await waitForFonts();

    // Корень Rating растягивается на всю ширину родителя — кадрируем по union звёзд.
    // Hover на 3-й звезде — заливаются первые три; focus по Tab уходит на 1-ю.
    const star1 = getByTestId(`${TEST_IDS.star}-1`);
    const star5 = getByTestId(`${TEST_IDS.star}-5`);
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.root),
      frame: [star1, star5],
      hoverTarget: getByTestId(`${TEST_IDS.star}-3`),
      layout: 'col',
    });
  });
});
