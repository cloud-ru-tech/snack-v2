import { MATCH_SNAPSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { composeScreenshots, screenshotRegion } from '#playwright-tooling/utils';

import { TIME_PICKER_DROPDOWN_MATRIX } from '../../stories/testIds';
import { buildTimePickerDropdownOptions, TIME_PICKER_DROPDOWN_STORIES } from './helpers';

test.describe('TimePickerDropdown — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // visual-matrix — composite открытых dropdown'ов 2×3 (size × showSeconds).
  // Click-loop по триггерам VM-story: открыть → snap union(trigger, content) → Escape → следующий.
  test('visual-matrix', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildTimePickerDropdownOptions(undefined, TIME_PICKER_DROPDOWN_STORIES.visualMatrix));
    await waitForFonts();

    const cells = [];
    for (const { size, showSeconds, triggerTestId, contentTestId } of TIME_PICKER_DROPDOWN_MATRIX) {
      const trigger = getByTestId(triggerTestId);
      await trigger.click();
      const content = getByTestId(contentTestId);
      await expect(content).toBeVisible();
      const png = await screenshotRegion(page, [trigger, content], 16);
      cells.push({ label: `${size} / ${showSeconds ? 'sec' : 'no-sec'}`, png });
      await page.keyboard.press('Escape');
      await expect(content).toHaveCount(0);
    }

    const composite = await composeScreenshots(cells, { layout: 'grid', columns: 2 });
    expect(composite).toMatchSnapshot('visual-matrix.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
