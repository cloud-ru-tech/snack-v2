import { MATCH_SNAPSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { composeScreenshots, screenshotRegion } from '#playwright-tooling/utils';

import { QUOTA_WIDGET_MATRIX } from '../../stories/testIds';
import { buildStoryOptions, QUOTA_WIDGET_STORIES } from './helpers';

test.describe('QuotaWidget — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // visual-matrix — composite открытых dropdown'ов (data / loading / error).
  // Click-loop: открыть → snap union(trigger, content) → Escape → следующий.
  test('visual matrix', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, QUOTA_WIDGET_STORIES.visualMatrix));
    await waitForFonts();

    const cells = [];
    for (const { state, triggerTestId, contentTestId } of QUOTA_WIDGET_MATRIX) {
      const trigger = getByTestId(triggerTestId);
      await trigger.click();
      const content = getByTestId(contentTestId);
      await expect(content).toBeVisible();
      const png = await screenshotRegion(page, [trigger, content], 16);
      cells.push({ label: state, png });
      await page.keyboard.press('Escape');
      await expect(content).toHaveCount(0);
    }

    const composite = await composeScreenshots(cells, { layout: 'grid', columns: 1 });
    expect(composite).toMatchSnapshot('visual-matrix.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
