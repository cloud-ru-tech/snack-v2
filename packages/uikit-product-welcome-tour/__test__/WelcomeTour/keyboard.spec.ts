import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

// Закрытый список keyboard-сценариев (e2e-testing-standard.md §keyboard.spec):
// п.2 focus-trap внутри портала и п.3 Escape поверх открытого портала. Tab/Enter
// по конкретной кнопке подсказки покрыты play-функцией InteractionTest.

test.describe('WelcomeTour — keyboard', () => {
  test('focus trap keeps Tab inside the hint', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.hint)).toBeVisible();

    for (let i = 0; i < 8; i += 1) {
      await page.keyboard.press('Tab');
      const inside = await page.evaluate(testId => {
        const hint = document.querySelector(`[data-test-id='${testId}']`);
        const active = document.activeElement;

        return Boolean(hint && active && (hint === active || hint.contains(active)));
      }, TEST_IDS.hint);

      expect(inside, `focus escaped the hint on Tab #${i + 1}`).toBe(true);
    }
  });

  test('Escape ends the tour', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.triggerOpen).click();

    const hint = getByTestId(TEST_IDS.hint);
    await expect(hint).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(hint).not.toBeAttached();
  });
});
