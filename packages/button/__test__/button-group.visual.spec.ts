import { VISUAL_BASELINE_PROJECT } from '../../../playwright/constants/projects';
import { expect, test } from '../../../playwright/fixtures';
import { waitForFonts } from '../../../playwright/utils';
import {
  buildButtonGroupStoryOptions,
  BUTTON_GROUP_RESPONSIVE_VIEWPORTS,
  BUTTON_GROUP_ROOT_SELECTOR,
  BUTTON_GROUP_SCREENSHOT_OPTS,
  BUTTON_GROUP_STATIC_VISUAL_CASES,
  BUTTON_GROUP_STORIES,
} from './button-group.helpers';

test.describe('ButtonGroup — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test.describe('static', () => {
    for (const { story, name } of BUTTON_GROUP_STATIC_VISUAL_CASES) {
      test(`static — ${name}`, async ({ page, gotoStory }) => {
        await gotoStory(buildButtonGroupStoryOptions(undefined, story));
        await waitForFonts(page);

        await expect(page.locator(BUTTON_GROUP_ROOT_SELECTOR)).toHaveScreenshot(name, BUTTON_GROUP_SCREENSHOT_OPTS);
      });
    }
  });

  test.describe('responsive', () => {
    for (const { width, height, name } of BUTTON_GROUP_RESPONSIVE_VIEWPORTS) {
      test(`actions at ${name}px`, async ({ page, gotoStory }) => {
        await page.setViewportSize({ width, height });
        await gotoStory(buildButtonGroupStoryOptions(undefined, BUTTON_GROUP_STORIES.actions));
        await waitForFonts(page);

        await expect(page.locator(BUTTON_GROUP_ROOT_SELECTOR)).toHaveScreenshot(
          `button-group-actions-${name}.png`,
          BUTTON_GROUP_SCREENSHOT_OPTS,
        );
      });
    }
  });
});
