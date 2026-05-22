import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Dropdown — interaction', () => {
  // Open/close via click и Escape живут в Storybook play (tests/Dropdown.InteractionTest).
  // Здесь — только browser-specific: реальный outside-click по координатам страницы,
  // который требует настоящего портала и event-dispatcher'а браузера.
  test('closes on outside click (portal-aware)', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions({ trigger: 'click' }));

    const trigger = getByTestId(TEST_IDS.triggerOpen);
    await trigger.click();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();

    await page.mouse.click(5, 5);
    await expect(getByTestId(TEST_IDS.root)).toBeHidden();
  });
});
