import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, CODE_EDITOR_STORIES, TEST_IDS } from './helpers';

// monaco-editor токенизирует синтаксис асинхронно — небольшая пиксельная jitter неизбежна.
const MONACO_SCREENSHOT_OPTS = { ...SCREENSHOT_DEFAULT_OPTS, maxDiffPixelRatio: 0.001 } as const;

test.describe('CodeEditor — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, CODE_EDITOR_STORIES.visualMatrix));
    await waitForFonts();
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', MONACO_SCREENSHOT_OPTS);
  });

  test('interaction states (copy button) — default × hover × focus', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions({ hasHeader: true, language: 'json' }));
    await waitForFonts();

    // Снимаем весь редактор (виден header + monaco-body) — state-изменения
    // целимся в copy-кнопку, и в кадре виден её контекст.
    const copyButton = getByTestId(TEST_IDS.copyButton);
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.root),
      hoverTarget: copyButton,
      focusAction: async () => {
        await copyButton.evaluate((el: HTMLElement) => el.focus({ focusVisible: true } as FocusOptions));
      },
      snapshotName: 'interaction-states.png',
      layout: 'col',
    });
  });
});
