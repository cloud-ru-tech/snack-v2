import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  SCREENSHOT_DEFAULT_OPTS,
  STORYBOOK_ROOT_SELECTOR,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, Page, test } from '#playwright-tooling/fixtures';
import { composeScreenshots, screenshotWithPadding, StorybookUrlOptions } from '#playwright-tooling/utils';

import { INTERACTION_PADDING } from './helpers';

type BuildStory = (props?: Record<string, unknown>, story?: string) => StorybookUrlOptions;

type SuiteOptions = {
  name: string;
  ids: { root: string; nativeInput: string };
  buildStory: BuildStory;
};

async function resetState(page: Page) {
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.mouse.move(0, 0);
  await page.waitForTimeout(50);
}

export function registerToggleVisualSuite({ name, ids, buildStory }: SuiteOptions) {
  test.describe(`${name} — visual regression`, () => {
    // eslint-disable-next-line no-empty-pattern
    test.beforeEach(({}, testInfo) => {
      test.skip(
        testInfo.project.name !== VISUAL_BASELINE_PROJECT,
        `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
      );
    });

    test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
      await gotoStory(buildStory(undefined, 'visual-matrix'));
      await waitForFonts();
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'visual-matrix.png',
        SCREENSHOT_DEFAULT_OPTS,
      );
    });

    test('interaction states (default × hover × focus)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
      await gotoStory(buildStory());
      await waitForFonts();

      const root = getByTestId(ids.root);
      const nativeInput = getByTestId(ids.nativeInput);

      await resetState(page);
      const defaultPng = await screenshotWithPadding(page, root, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS);

      await root.hover();
      const hoverPng = await screenshotWithPadding(page, root, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS);

      await resetState(page);
      await nativeInput.focus();
      const focusPng = await screenshotWithPadding(page, root, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS);

      const composite = await composeScreenshots(
        [
          { label: 'default', png: defaultPng },
          { label: 'hover', png: hoverPng },
          { label: 'focus', png: focusPng },
        ],
        { layout: 'row' },
      );

      expect(composite).toMatchSnapshot('interaction-states.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
    });
  });
}
