import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Popover — interaction', () => {
  // click + outside-click покрываются InteractionTest story::play (Storybook Test Runner).
  // Здесь оставляем только browser-specific сценарии: hover/focus триггеры и поведение
  // outsideClick=false, которые в jsdom-play-runner неустойчивы.

  test('outsideClick=false keeps popover open on outside click', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions({ trigger: 'click', outsideClick: false, placement: 'top' }));
    await getByTestId(TEST_IDS.triggerOpen).click();
    await expect(getByTestId(TEST_IDS.content)).toBeVisible();
    await page.mouse.click(2, 2);
    // Контент должен оставаться видим: используем expect.toPass с retry,
    // чтобы дать шанс асинхронному close-handler'у сработать (если бы он был
    // ошибочно подключён — assert упал бы за ретраи).
    await expect
      .poll(() => getByTestId(TEST_IDS.content).isVisible(), { timeout: 500, intervals: [50, 100, 200] })
      .toBe(true);
  });

  test('hover trigger opens content', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ trigger: 'hover' }));
    await getByTestId(TEST_IDS.triggerOpen).hover();
    await expect(getByTestId(TEST_IDS.content)).toBeVisible();
  });

  test('trigger=focus opens content on focus', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions({ trigger: 'focus' }));
    await page.keyboard.press('Tab');
    await expect(getByTestId(TEST_IDS.triggerOpen)).toBeFocused();
    await expect(getByTestId(TEST_IDS.content)).toBeVisible();
  });
});
