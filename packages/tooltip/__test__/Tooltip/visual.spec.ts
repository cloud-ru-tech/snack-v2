import { MATCH_SNAPSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { composeScreenshots, ScreenshotCell, screenshotRegion } from '#playwright-tooling/utils';

import { buildStoryOptions, TEST_IDS, TOOLTIP_STORIES } from './helpers';

test.describe('Tooltip — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // Tooltip — портал, hover-driven. Закрытое состояние и набор `placement` покрываются
  // VisualMatrix-сторёй. Здесь — один open-снимок и composite text-стратегий.

  test('open (after hover)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, TOOLTIP_STORIES.playground));
    await waitForFonts();
    const trigger = getByTestId(TEST_IDS.tooltip.triggerOpen);
    await trigger.hover();
    const content = getByTestId(TEST_IDS.tooltip.content);
    await expect(content).toBeVisible();
    const png = await screenshotRegion(page, [trigger, content], 24);
    expect(png).toMatchSnapshot('open.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('text strategies — composite', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    const stories = [
      { label: 'default max-width (long text wraps)', story: TOOLTIP_STORIES.longTextDefault },
      { label: 'disableMaxWidth (long text fits)', story: TOOLTIP_STORIES.longTextNoMaxWidth },
      { label: 'disableMaxWidth (short text = max-content)', story: TOOLTIP_STORIES.noMaxWidthShort },
    ] as const;

    const cells: ScreenshotCell[] = [];
    for (const { label, story } of stories) {
      await gotoStory(buildStoryOptions(undefined, story));
      await waitForFonts();
      const trigger = getByTestId(TEST_IDS.tooltip.triggerOpen);
      await trigger.hover();
      const content = getByTestId(TEST_IDS.tooltip.content);
      await expect(content).toBeVisible();
      cells.push({ label, png: await screenshotRegion(page, [trigger, content], 24) });
    }
    const composite = await composeScreenshots(cells, { layout: 'col' });
    expect(composite).toMatchSnapshot('text-strategies.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
