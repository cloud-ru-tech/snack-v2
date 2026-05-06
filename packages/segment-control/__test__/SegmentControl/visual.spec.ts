import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import {
  buildStoryOptions,
  SEGMENT_CONTROL_INTERACTION_VISUAL_CASES,
  SEGMENT_CONTROL_STORIES,
  segmentTestId,
} from './helpers';

test.describe('SegmentControl — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, SEGMENT_CONTROL_STORIES.visualMatrix));
    await waitForFonts(page);

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });

  test('width-full — selection stretches across active segment', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions({ width: 'full' }));
    await waitForFonts(page);

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('width-full.png', SCREENSHOT_DEFAULT_OPTS);
  });

  test.describe('interaction states', () => {
    for (const { name, action } of SEGMENT_CONTROL_INTERACTION_VISUAL_CASES) {
      test(`interaction — ${name}`, async ({ page, gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions());
        await waitForFonts(page);

        // Hover/focus/press the second (non-selected) segment to surface the effect.
        const target = getByTestId(segmentTestId('analytics'));

        if (action === 'hover') {
          await target.hover();
        } else if (action === 'focus') {
          await page.keyboard.press('Tab');
          await page.keyboard.press('ArrowRight');
          await expect(target).toBeFocused();
        } else if (action === 'pressed') {
          const box = await target.boundingBox();
          if (box) {
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.down();
          }
        }

        try {
          await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(name, SCREENSHOT_DEFAULT_OPTS);
        } finally {
          if (action === 'pressed') {
            await page.mouse.up();
          }
        }
      });
    }
  });
});
