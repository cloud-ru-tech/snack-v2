import { Page } from '@playwright/test';

import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForStableRender } from '#playwright-tooling/utils';

import { buildStoryOptions, TEST_IDS, TOASTER_STORIES } from './helpers';

/** Въезд тоста плюс раскрытие стопки; после паузы по hover ничего меняться не должно. */
const TOAST_SETTLE_MS = 500;

/** Фаза, на которой замораживаем полосу авто-close. Середина — видно и заполнение, и остаток. */
const FROZEN_PROGRESS_SCALE = 0.5;

/**
 * Замораживает полосы авто-close на фиксированной фазе.
 *
 * Полоса тикает в rAF через `transform: scaleX(...)`, а маска Playwright'а клипится по
 * трансформированному bbox — прямоугольник маски меняет ширину вместе с полосой, и из-под
 * него каждый раз вылезает разный кусок тоста. Пауза по hover останавливает тик, но на
 * произвольном значении, поэтому фазу задаём явно: кадр становится детерминированным, а
 * полоса остаётся в снимке вместо маски.
 *
 * Работает только после паузы: пока таймер идёт, React перерисовывает `style` каждый тик
 * и затирает выставленный transform.
 */
async function freezeAutoCloseProgress(page: Page): Promise<void> {
  await page.evaluate(
    ({ testId, scale }) => {
      document.querySelectorAll<HTMLElement>(`[data-test-id="${testId}"]`).forEach(el => {
        el.style.transform = `scaleX(${scale})`;
      });
    },
    { testId: TEST_IDS.systemEventProgressBar, scale: FROZEN_PROGRESS_SCALE },
  );
}

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
    await waitForStableRender(page.locator(STORYBOOK_ROOT_SELECTOR), { stableForMs: TOAST_SETTLE_MS });
    await freezeAutoCloseProgress(page);
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('open-stacking.png', SCREENSHOT_DEFAULT_OPTS);
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
    await waitForStableRender(page.locator(STORYBOOK_ROOT_SELECTOR), { stableForMs: TOAST_SETTLE_MS });
    await freezeAutoCloseProgress(page);
    // Таймер UserAction тикает `stroke-dashoffset`'ом внутри SVG фиксированного размера —
    // его bbox не плывёт, поэтому маска здесь стабильна и остаётся.
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('open-mixed.png', {
      ...SCREENSHOT_DEFAULT_OPTS,
      mask: [getByTestId(TEST_IDS.userActionTimer)],
    });
  });
});
