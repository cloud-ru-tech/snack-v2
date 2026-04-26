import { VISUAL_BASELINE_PROJECT } from '../../../playwright/constants/projects';
import { expect, test } from '../../../playwright/fixtures';
import { waitForFonts } from '../../../playwright/utils';
import {
  buildStoryOptions,
  STEPPER_ROOT_SELECTOR,
  STEPPER_SCREENSHOT_OPTS,
  STEPPER_STATIC_VISUAL_CASES,
} from './helpers';

test.describe('Stepper — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test.describe('static', () => {
    for (const { story, name } of STEPPER_STATIC_VISUAL_CASES) {
      test(`static — ${name}`, async ({ page, gotoStory }) => {
        await gotoStory(buildStoryOptions(undefined, story));
        await waitForFonts(page);

        await expect(page.locator(STEPPER_ROOT_SELECTOR)).toHaveScreenshot(name, STEPPER_SCREENSHOT_OPTS);
      });
    }
  });
});
