import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { screenshotRegion, waitForStableBbox } from '#playwright-tooling/utils';

import { buildStoryOptions, DROPDOWN_STORIES, TEST_IDS } from './helpers';

test.describe('Dropdown — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // Dropdown — портал, контент рендерится вне #storybook-root. Снимаем всю страницу,
  // чтобы захватить panels с placement/states/content-shape — все они теперь живут в
  // VisualMatrix как StoryTable секции (desktop-ось, см. adaptive-components.md).
  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, DROPDOWN_STORIES.visualMatrix));
    await waitForFonts();
    await expect(page).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });

  // Desktop-поверхность: открытый popover. Кадр — union триггера и контента (портал рендерится
  // далеко от триггера), чтобы было видно позиционирование относительно кнопки.
  test('open-desktop (popover surface)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await getByTestId(TEST_IDS.triggerOpen).click();
    const content = getByTestId(TEST_IDS.root);
    await expect(content).toBeVisible();
    const png = await screenshotRegion(page, [getByTestId(TEST_IDS.triggerOpen), content], 24, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('open-desktop.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile-поверхность: тот же Dropdown открывается как BottomSheet. Нужны обе вещи одновременно —
  // форс layoutType='mobile' через тулбар-глобал И mobile-viewport (иначе sheet
  // рендерится на desktop-ширине). Sheet — full-viewport overlay → снимаем page.screenshot()
  // (см. visual-regression-standard.md). Mobile-baseline = ground truth DS (Figma-parity не применим).
  test('open-mobile (bottom sheet surface)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions(undefined, DROPDOWN_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();
    await getByTestId(TEST_IDS.triggerOpen).click();
    // На mobile потребительский `data-test-id` (TEST_IDS.root) оседает на корне BottomSheet'а.
    const sheet = getByTestId(TEST_IDS.root);
    await expect(sheet).toBeVisible();
    // JS-motion (slide-up): ждём стабилизацию bbox вместо document.getAnimations.
    await waitForStableBbox(sheet);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
