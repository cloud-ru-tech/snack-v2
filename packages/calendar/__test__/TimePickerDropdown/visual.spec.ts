import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { composeScreenshots, screenshotRegion, waitForSettledInViewport } from '#playwright-tooling/utils';

import { TIME_PICKER_DROPDOWN_MATRIX } from '../../stories/testIds';
import { buildTimePickerDropdownOptions, TEST_IDS, TIME_PICKER_DROPDOWN_STORIES } from './helpers';

const MOBILE_GLOBALS = { layoutType: 'mobile' };

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
    for (const { size, showSeconds, triggerTestId, cellTestId, contentTestId } of TIME_PICKER_DROPDOWN_MATRIX) {
      const trigger = getByTestId(triggerTestId);
      await trigger.click();
      const content = getByTestId(contentTestId);
      await expect(content).toBeVisible();
      // Кадр по root дропдауна, а не по content: футер Current/Apply лежит в `bottomBar`
      // сиблингом content'а и в его bbox не входит.
      const png = await screenshotRegion(page, [trigger, getByTestId(cellTestId)], 16);
      cells.push({ label: `${size} / ${showSeconds ? 'sec' : 'no-sec'}`, png });
      await page.keyboard.press('Escape');
      await expect(content).toHaveCount(0);
    }

    const composite = await composeScreenshots(cells, { layout: 'grid', columns: 2 });
    expect(composite).toMatchSnapshot('visual-matrix.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile surface-swap: триггер открывает BottomSheet с барабаном (TimePickerDrum).
  // Sheet по контенту (auto height), но снимаем page целиком — overlay поверх вьюпорта.
  test('open-mobile (bottom sheet drum)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildTimePickerDropdownOptions(undefined, TIME_PICKER_DROPDOWN_STORIES.playground, MOBILE_GLOBALS));
    await waitForFonts();

    await getByTestId(TEST_IDS.timePickerDropdownTrigger).click();
    const drum = getByTestId(TEST_IDS.timePickerDrum);
    await expect(drum).toBeVisible();
    await waitForSettledInViewport(drum);

    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
