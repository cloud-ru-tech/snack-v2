import { VISUAL_BASELINE_PROJECT } from '../../../../playwright/constants/projects';
import { expect, test } from '../../../../playwright/fixtures';
import { waitForFonts } from '../../../../playwright/utils';
import {
  buildStoryOptions,
  BUTTON_INTERACTION_VISUAL_CASES,
  BUTTON_ROOT_SELECTOR,
  BUTTON_SCREENSHOT_OPTS,
  BUTTON_STORIES,
  BUTTON_TEST_ID,
  KEY_VIEWS,
} from './helpers';

test.describe('Button — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, BUTTON_STORIES.visualMatrix));
    await waitForFonts(page);

    await expect(page.locator(BUTTON_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', BUTTON_SCREENSHOT_OPTS);
  });

  test.describe('interaction states', () => {
    for (const { name, action } of BUTTON_INTERACTION_VISUAL_CASES) {
      test(`interaction — ${name}`, async ({ page, gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ label: 'Button' }));
        await waitForFonts(page);

        const button = getByTestId(BUTTON_TEST_ID);

        if (action === 'hover') {
          await button.hover();
        } else if (action === 'focus') {
          await page.keyboard.press('Tab');
          await expect(button).toBeFocused();
        } else if (action === 'pressed') {
          const box = await button.boundingBox();
          if (box) {
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
          }
        }

        try {
          await expect(page.locator(BUTTON_ROOT_SELECTOR)).toHaveScreenshot(name, BUTTON_SCREENSHOT_OPTS);
        } finally {
          if (action === 'pressed') {
            await page.mouse.up();
          }
        }
      });
    }
  });

  test.describe('per-view hover', () => {
    for (const view of KEY_VIEWS) {
      test(`hover — view=${view}`, async ({ page, gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ label: 'Button', view }));
        await waitForFonts(page);

        await getByTestId(BUTTON_TEST_ID).hover();

        await expect(page.locator(BUTTON_ROOT_SELECTOR)).toHaveScreenshot(`hover-${view}.png`, BUTTON_SCREENSHOT_OPTS);
      });
    }
  });
});
