import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot } from '#playwright-tooling/utils';

import { CODE_JSON } from '../../stories/CodeEditor/constants';
import { buildStoryOptions, CODE_EDITOR_STORIES, TEST_IDS, waitForMonacoTokenization } from './helpers';

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
    await waitForMonacoTokenization(page);
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });

  test('interaction states (copy button) — default × hover × focus', async ({
    page,
    gotoStory,
    getByTestId,
    setStoryArgs,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions({ hasHeader: true, language: 'json' }));
    await setStoryArgs({ value: CODE_JSON });
    await expect(getByTestId(TEST_IDS.root).locator('.view-lines')).toContainText('newsletter');
    await waitForFonts();
    await waitForMonacoTokenization(page);

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
