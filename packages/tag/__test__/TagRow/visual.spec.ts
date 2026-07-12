import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, screenshotRegion } from '#playwright-tooling/utils';

import { buildStoryOptions, TAG_ROW_STORIES, TEST_IDS } from './helpers';

test.describe('TagRow — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, TAG_ROW_STORIES.visualMatrix));
    await waitForFonts();

    await assertVisualMatrixSnapshot(page);
  });

  test('open dropdown', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    // rowLimit=1 сворачивает лишние теги в «+N»; ховер по кнопке раскрывает дроплист.
    await gotoStory(buildStoryOptions({ size: 'xs', itemCount: 15, rowLimit: 1 }));
    await waitForFonts();

    // Видимый триггер — в visible-row (в hidden-row лежит измерительный дубль).
    const trigger = getByTestId(TEST_IDS.tagRow.visibleTagsWrapper).getByTestId(TEST_IDS.tagRow.moreButton);
    await trigger.hover();

    const droplist = getByTestId(TEST_IDS.tagRow.droplistTagsWrapper);
    await expect(droplist).toBeVisible();

    // Портал-композит: триггер + контент дроплиста в одном кадре.
    const composite = await screenshotRegion(page, [trigger, droplist]);
    expect(composite).toMatchSnapshot('open-dropdown.png');
  });
});
