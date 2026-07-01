import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { screenshotRegion, waitForStableBbox } from '#playwright-tooling/utils';

import { buildStoryOptions, QUESTION_TOOLTIP_STORIES, TEST_IDS } from './helpers';

test.describe('QuestionTooltip — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // QuestionTooltip — портал, hover-driven. Закрытое состояние и ось `size` триггера
  // покрываются VisualMatrix. Здесь — один open-снимок панели + триггера в кадре.

  test('open (after hover)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, QUESTION_TOOLTIP_STORIES.playground));
    await waitForFonts();
    const trigger = getByTestId(TEST_IDS.questionTooltip.triggerOpen);
    await trigger.hover();
    const content = getByTestId(TEST_IDS.questionTooltip.content);
    await expect(content).toBeVisible();
    const png = await screenshotRegion(page, [trigger, content], 24);
    expect(png).toMatchSnapshot('open.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile-поверхность: «?» открывает `tip` в `BottomSheet` (вместо hover-popover) по клику. Нужны обе
  // вещи одновременно — форс layoutType='mobile' через тулбар-глобал И mobile-viewport
  // (иначе sheet рендерится на desktop-ширине). Sheet — full-viewport overlay → снимаем page.screenshot()
  // (см. visual-regression-standard.md). Mobile-baseline = ground truth DS (Figma-parity не применим).
  test('open-mobile (bottom sheet surface)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions(undefined, QUESTION_TOOLTIP_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();
    await getByTestId(TEST_IDS.questionTooltip.triggerOpen).click();
    // `tip` (с вложенным `content`-span) рендерится контентом BottomSheet'а — видимая часть sheet'а.
    const content = getByTestId(TEST_IDS.questionTooltip.content);
    await expect(content).toBeVisible();
    // JS-motion (slide-up): ждём стабилизацию bbox видимой части вместо document.getAnimations.
    await waitForStableBbox(content);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
