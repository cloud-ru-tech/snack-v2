import { VISUAL_BASELINE_PROJECT } from '../../../playwright/constants/projects';
import { expect, test } from '../../../playwright/fixtures';
import { waitForFonts } from '../../../playwright/utils';
import {
  buildStoryOptions,
  DIVIDER_ROOT_SELECTOR,
  DIVIDER_SCREENSHOT_OPTS,
  DIVIDER_STATIC_VISUAL_CASES,
} from './helpers';

/**
 * Baselines — только `chrome`. Остальные движки имеют неустранимые
 * попиксельные расхождения и не дают сигнала.
 */
test.describe('Divider — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test.describe('static', () => {
    for (const { story, name } of DIVIDER_STATIC_VISUAL_CASES) {
      test(`static — ${name}`, async ({ page, gotoStory }) => {
        await gotoStory(buildStoryOptions(undefined, story));
        await waitForFonts(page);

        await expect(page.locator(DIVIDER_ROOT_SELECTOR)).toHaveScreenshot(name, DIVIDER_SCREENSHOT_OPTS);
      });
    }
  });
});
