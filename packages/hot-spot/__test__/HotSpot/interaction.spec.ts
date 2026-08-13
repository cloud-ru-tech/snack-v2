import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

// Hit-testing указателя play-функцией не проверить: `userEvent` шлёт событие
// прямо в элемент, минуя слой, который его перекрывает.
test.describe('HotSpot — interaction', () => {
  test('dot over the anchor does not intercept clicks', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ placement: 'center', offsetX: 0, offsetY: 0 }));

    const anchor = getByTestId(TEST_IDS.anchor);
    await expect(getByTestId(TEST_IDS.dot)).toBeVisible();

    // Клик в центр якоря — ровно туда, где лежит точка. Перехват уронит шаг
    // по actionability-таймауту с «intercepts pointer events».
    await anchor.click({ timeout: 5000 });
    await expect(anchor).toBeFocused();
  });
});
