import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import { buildStoryOptions, CODE_EDITOR_COPY_BUTTON_TEST_ID, CODE_EDITOR_STORIES } from './helpers';

// monaco-editor токенизирует синтаксис асинхронно — небольшая пиксельная
// jitter между прогонами неизбежна. Допускаем ~0.1% площади под скриншот.
// Используется на всех снимках, потому что #storybook-root всегда включает
// monaco-body, а не только header.
const MONACO_SCREENSHOT_OPTS = { ...SCREENSHOT_DEFAULT_OPTS, maxDiffPixelRatio: 0.001 } as const;

test.describe('CodeEditor — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, CODE_EDITOR_STORIES.visualMatrix));
    await waitForFonts(page);
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', MONACO_SCREENSHOT_OPTS);
  });

  test.describe('interaction (copy button)', () => {
    test('hover', async ({ page, gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ hasHeader: true, language: 'json' }));
      await waitForFonts(page);
      await getByTestId(CODE_EDITOR_COPY_BUTTON_TEST_ID).hover();
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'interaction-hover.png',
        MONACO_SCREENSHOT_OPTS,
      );
    });

    test('focus', async ({ page, gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ hasHeader: true, language: 'json' }));
      await waitForFonts(page);
      await page.keyboard.press('Tab');
      await expect(getByTestId(CODE_EDITOR_COPY_BUTTON_TEST_ID)).toBeFocused();
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'interaction-focus.png',
        MONACO_SCREENSHOT_OPTS,
      );
    });
  });
});
