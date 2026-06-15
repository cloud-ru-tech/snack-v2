import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, itemTestId, TEST_IDS } from './helpers';

test.describe('Droplist — rendering', () => {
  test('renders trigger (closed by default)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.droplist.triggerOpen)).toBeVisible();
  });

  // size попадает на открытый popover, а не на триггер: проверяем data-size на item'е
  // после открытия. Ключевая выборка (s / l), не весь enum — все размеры покрыты
  // визуально в open-sizes composite (visual.spec.ts).
  test.describe('size prop propagates to the open list', () => {
    for (const size of ['s', 'l'] as const) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await getByTestId(TEST_IDS.droplist.triggerOpen).click();
        await expect(getByTestId(itemTestId('overview'))).toHaveAttribute('data-size', size);
      });
    }
  });
});
