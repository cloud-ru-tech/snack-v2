import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from '../../src/testIds';
import { buildStoryOptions, BUTTON_COMBO_TEST_ID } from './helpers';

const KEY_COMBOS = [
  { view: 'filled', appearance: 'primary', size: 's' },
  { view: 'outline', appearance: 'neutral', size: 'm' },
  { view: 'tonal', appearance: 'critical', size: 'l' },
] as const;

test.describe('ButtonCombo — rendering', () => {
  test('renders both parts', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(BUTTON_COMBO_TEST_ID)).toBeVisible();
    await expect(getByTestId(TEST_IDS.option)).toBeVisible();
    await expect(getByTestId(TEST_IDS.dropdownTrigger)).toBeVisible();
  });

  for (const { view, appearance, size } of KEY_COMBOS) {
    test(`props propagate to both buttons: ${view}/${appearance}/${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ view, appearance, size }));

      for (const id of [TEST_IDS.option, TEST_IDS.dropdownTrigger]) {
        const el = getByTestId(id);
        await expect(el).toHaveAttribute('data-view', view);
        await expect(el).toHaveAttribute('data-appearance', appearance);
        await expect(el).toHaveAttribute('data-size', size);
      }
    });
  }

  test('disabled propagates to both buttons', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.option)).toHaveAttribute('data-disabled', 'true');
    await expect(getByTestId(TEST_IDS.dropdownTrigger)).toHaveAttribute('data-disabled', 'true');
  });

  test('loading propagates to both buttons', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ loading: true }));
    await expect(getByTestId(TEST_IDS.option)).toHaveAttribute('data-loading', 'true');
    await expect(getByTestId(TEST_IDS.dropdownTrigger)).toHaveAttribute('data-loading', 'true');
  });
});
