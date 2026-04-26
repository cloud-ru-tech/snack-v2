import { VISUAL_BASELINE_PROJECT } from '../../../playwright/constants/projects';
import { expect, test } from '../../../playwright/fixtures';
import { waitForFonts } from '../../../playwright/utils';
import {
  AVATAR_EDGE_VISUAL_CASES,
  AVATAR_ROOT_SELECTOR,
  AVATAR_SCREENSHOT_OPTS,
  AVATAR_STATIC_VISUAL_CASES,
  AVATAR_STORIES,
  AVATAR_TEST_ID,
  buildStoryOptions,
  getAbbreviation,
  getImage,
} from './helpers';

/**
 * Baselines — только `chrome`. Остальные движки имеют неустранимые
 * попиксельные расхождения и не дают сигнала.
 */
test.describe('Avatar — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test.describe('static', () => {
    for (const { story, name } of AVATAR_STATIC_VISUAL_CASES) {
      test(`static — ${name}`, async ({ page, gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions(undefined, story));
        await waitForFonts(page);

        if (story === AVATAR_STORIES.withImage) {
          const image = getImage(getByTestId(AVATAR_TEST_ID));
          await image.waitFor({ state: 'visible' });
          await expect
            .poll(async () => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0))
            .toBe(true);
        }

        await expect(page.locator(AVATAR_ROOT_SELECTOR)).toHaveScreenshot(name, AVATAR_SCREENSHOT_OPTS);
      });
    }
  });

  test.describe('edge cases', () => {
    for (const { name, props } of AVATAR_EDGE_VISUAL_CASES) {
      test(`edge — ${name}`, async ({ page, gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions(props));
        await waitForFonts(page);

        if (typeof props.src === 'string' && props.src.includes('invalid-url')) {
          const abbreviation = getAbbreviation(getByTestId(AVATAR_TEST_ID));
          await abbreviation.waitFor({ state: 'visible' });
        }

        await expect(page.locator(AVATAR_ROOT_SELECTOR)).toHaveScreenshot(name, AVATAR_SCREENSHOT_OPTS);
      });
    }
  });
});
