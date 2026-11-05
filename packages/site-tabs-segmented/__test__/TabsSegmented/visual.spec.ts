import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, itemTestId, TABS_SEGMENTED_STORIES, TEST_IDS } from './helpers';

test.describe('TabsSegmented — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, TABS_SEGMENTED_STORIES.visualMatrix));
    await waitForFonts();

    await assertVisualMatrixSnapshot(page);
  });

  // Hover — у невыбранной вкладки. Focus — у выбранной: на её тёмной заливке рамка инверсная (regularInversion).
  // Отдельная ячейка — focus у невыбранной вкладки «Сеть»: обычная рамка regular. У неё есть сосед справа
  // и ряд сверху, поэтому видно, что их линии рамку не перекрывают.
  test('interaction states (default × hover × focus)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions({ wrap: true }));
    await waitForFonts();

    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.root),
      hoverTarget: getByTestId(itemTestId('data')),
      // Tab попадает на выбранную вкладку (первая).
      focusAction: async () => {
        await page.keyboard.press('Tab');
      },
      extraStates: [
        {
          label: 'focus (unselected)',
          activate: async () => {
            // Перед ячейкой утилита только снимает фокус (blur), а Chrome помнит точку старта Tab-навигации —
            // выбранную вкладку из ячейки focus. Без сброса Tab уходит за компонент, и End/← не срабатывают.
            await page.evaluate(() => {
              document.body.setAttribute('tabindex', '-1');
              document.body.focus();
              document.body.removeAttribute('tabindex');
            });
            await page.keyboard.press('Tab');
            await page.keyboard.press('End');
            await page.keyboard.press('ArrowLeft');
          },
        },
      ],
    });
  });
});
