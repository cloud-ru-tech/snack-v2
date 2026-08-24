import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  composeScreenshots,
  ScreenshotCell,
  screenshotRegion,
  waitForStableBbox,
} from '#playwright-tooling/utils';

import { buildStoryOptions, TEST_IDS, WELCOME_TOUR_STORIES } from './helpers';

// Композиции слотов × placement — оси VisualMatrix-стори. Full-viewport оверлей не
// даёт собрать матрицу в StoryTable (подсказки перекрыли бы соседние ячейки), поэтому
// снимок собирается click-loop'ом по триггерам — см. visual-regression-standard.md.
const COMPOSITIONS = ['full', 'no-subtitle', 'content-only'] as const;
const PLACEMENTS = ['top', 'bottom', 'left', 'right'] as const;

test.describe('WelcomeTour — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix (composition × placement)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, WELCOME_TOUR_STORIES.visualMatrix));
    await waitForFonts();

    const hint = getByTestId(TEST_IDS.hint);
    const target = getByTestId(TEST_IDS.vm.target);
    const cells: ScreenshotCell[] = [];

    for (const composition of COMPOSITIONS) {
      for (const placement of PLACEMENTS) {
        await getByTestId(TEST_IDS.vm.trigger(`${composition}-${placement}`)).click();
        await expect(hint).toBeVisible();
        // Подсказку позиционирует floating-ui одним кадром после монтирования —
        // ждём покоя bbox, а не `document.getAnimations()`.
        await waitForStableBbox(hint);

        cells.push({
          label: `${composition} / ${placement}`,
          png: await screenshotRegion(page, [hint, target], 16),
        });

        await getByTestId(TEST_IDS.closeIcon).click();
        await expect(hint).not.toBeAttached();
      }
    }

    const composite = await composeScreenshots(cells, { layout: 'grid', columns: PLACEMENTS.length });
    expect(composite).toMatchSnapshot('visual-matrix.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('open (overlay + spotlight + hint)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.triggerOpen).click();

    const hint = getByTestId(TEST_IDS.hint);
    await expect(hint).toBeVisible();
    await waitForFonts();
    await waitForStableBbox(hint);

    // Оверлей во весь экран: кадр по `#storybook-root` захватил бы demo-обёртку под
    // затемнением, viewport-снимок режет ровно по экрану (visual-regression-standard.md).
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-default.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });

  test('interaction states of the hint actions', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.triggerOpen).click();

    const hint = getByTestId(TEST_IDS.hint);
    await expect(hint).toBeVisible();
    await waitForFonts();
    await waitForStableBbox(hint);

    const nextButton = getByTestId(TEST_IDS.nextButton);

    // Кадр — подсказка целиком: hover и фокус ложатся на кнопку «Далее», поэтому оба
    // состояния видны в одном кадре. Сколько Tab'ов до неё — зависит от того, где фокус
    // оказался после сброса состояния (фокус-трап движка перехватывает переходы), поэтому
    // жмём Tab до попадания на кнопку. Программный `.focus()` не подходит: без
    // клавиатурного жеста браузер не ставит `:focus-visible` и DS-outline не появляется.
    await assertInteractionStatesSnapshot(page, {
      target: hint,
      hoverTarget: nextButton,
      focusAction: async keyboardPage => {
        for (let attempt = 0; attempt < 5; attempt += 1) {
          await keyboardPage.keyboard.press('Tab');

          if (await nextButton.evaluate(node => node === document.activeElement)) return;
        }

        throw new Error('focusAction: «Далее» не получила фокус за 5 нажатий Tab');
      },
    });
  });
});
