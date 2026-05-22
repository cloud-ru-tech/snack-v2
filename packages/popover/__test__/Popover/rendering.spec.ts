import { STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, POPOVER_KEY_COMBOS, POPOVER_STORIES, TEST_IDS } from './helpers';

test.describe('Popover — rendering', () => {
  test('playground renders trigger', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.triggerOpen)).toBeVisible();
  });

  test('visual-matrix renders', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions(undefined, POPOVER_STORIES.visualMatrix));
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toBeVisible();
  });

  test.describe('props propagation', () => {
    // Только click-trigger используем для ассерта data-placement —
    // открытие через клик стабильно и не зависит от hover/focus-таймингов.
    const clickCombos = POPOVER_KEY_COMBOS.filter(c => c.trigger === 'click');
    for (const { trigger, placement } of clickCombos) {
      test(`trigger=${trigger} + placement=${placement}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ trigger, placement }));
        await getByTestId(TEST_IDS.triggerOpen).click();
        const content = getByTestId(TEST_IDS.root);
        await expect(content).toBeVisible();
        await expect(content).toHaveAttribute('data-placement', placement);
      });
    }
  });
});
