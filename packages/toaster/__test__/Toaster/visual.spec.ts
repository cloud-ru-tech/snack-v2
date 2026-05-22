import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS, TOASTER_STORIES } from './helpers';

// VisualMatrix-стори у Toaster нет — контейнер сам по себе пуст, всё
// интересное возникает после действий. Снимаем только сценарные кадры:
// open-scenario стек и open-scenario сосуществование трёх типов тостов.
test.describe('Toaster — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('open-stacking — 5 тостов в bottom-right (collapsed-стек)', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions(undefined, TOASTER_STORIES.visualMatrix));
    await waitForFonts();
    await getByTestId(TEST_IDS.visualMatrix.spawnAt('bottom-right')).click();
    // Дожидаемся, что все 5 тостов в DOM и stacked-кнопка "Закрыть все" появилась —
    // это маркеры того, что stacked-анимация завершилась. toHaveScreenshot сам
    // ретраит сравнение в пределах своего timeout.
    await expect(getByTestId(TEST_IDS.systemEventRoot)).toHaveCount(5);
    await expect(getByTestId(TEST_IDS.buttonCloseAll).first()).toBeVisible();
    // 5 тостов с autoClose=5000 — за время retry-цикла toHaveScreenshot первый
    // успевает уйти в leaving. Ставим контейнер в hover-pause через синтетический
    // pointerover (React onPointerEnter биндится на pointerover/pointerout).
    await page.evaluate(testId => {
      document.querySelectorAll(`[data-test-id="${testId}"]`).forEach(el => {
        el.dispatchEvent(new PointerEvent('pointerover', { bubbles: true, pointerType: 'mouse' }));
      });
    }, TEST_IDS.toasterContainer);
    // Progress-bar тикает по реальному auto-close таймеру (rAF), маскируем,
    // чтобы попиксельное сравнение не зависело от elapsed-time на момент снимка.
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('open-stacking.png', {
      ...SCREENSHOT_DEFAULT_OPTS,
      mask: [getByTestId(TEST_IDS.systemEventProgressBar)],
    });
  });

  test('open-mixed — SystemEvent success + UserAction success + Upload loading', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions(undefined, TOASTER_STORIES.imperativeApi));
    await waitForFonts();
    await getByTestId(TEST_IDS.imperativeApi.systemEvent('success')).click();
    await getByTestId(TEST_IDS.imperativeApi.userAction('success')).click();
    await getByTestId(TEST_IDS.imperativeApi.upload('loading')).click();
    // Дожидаемся, что три тоста реально появились в DOM перед снимком.
    await expect(getByTestId(TEST_IDS.systemEventRoot).first()).toBeVisible();
    await expect(getByTestId(TEST_IDS.userActionRoot).first()).toBeVisible();
    await expect(getByTestId(TEST_IDS.uploadRoot).first()).toBeVisible();
    // Контейнеры сконфигурированы с autoClose 5000/3000ms — без паузы тосты
    // успевают уйти в leaving за время retry-цикла toHaveScreenshot. Курсором
    // двух контейнеров сразу не удержать (BottomRight и BottomCenter
    // не пересекаются), поэтому диспатчим синтетический pointerenter на оба
    // .container — uiReducer'у безразлично, реальный это hover или нет.
    await page.evaluate(testId => {
      // React реализует onPointerEnter через pointerover/pointerout, а не через
      // нативный pointerenter (тот не bubble'ит). Диспатчим pointerover —
      // тогда onPointerEnter сработает.
      document.querySelectorAll(`[data-test-id="${testId}"]`).forEach(el => {
        el.dispatchEvent(new PointerEvent('pointerover', { bubbles: true, pointerType: 'mouse' }));
      });
    }, TEST_IDS.toasterContainer);
    // Маскируем тикающие индикаторы авто-close у SystemEvent + UserAction —
    // их scaleX/stroke-dashoffset тикает в rAF, а маски заменяют их пятном и
    // выводят из попиксельного сравнения. maxDiffPixelRatio оставляет
    // 0.5% запас на 1-px колебание границы маски progress-bar между запусками.
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('open-mixed.png', {
      ...SCREENSHOT_DEFAULT_OPTS,
      mask: [getByTestId(TEST_IDS.systemEventProgressBar), getByTestId(TEST_IDS.userActionTimer)],
      maxDiffPixelRatio: 0.005,
    });
  });
});
