import { expect, test } from '#playwright-tooling/fixtures';

import { GAP, ORIENTATION } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('ToggleGroup — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.group)).toBeVisible();
    });

    test('renders child toggle cards', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.group)).toContainText('Тариф Pro');
    });
  });

  test.describe('props propagation', () => {
    for (const orientation of Object.values(ORIENTATION)) {
      test(`orientation=${orientation} → data-orientation`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ orientation }));

        await expect(getByTestId(TEST_IDS.group)).toHaveAttribute('data-orientation', orientation);
      });
    }

    for (const gap of Object.values(GAP)) {
      test(`gap=${gap} → data-gap`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ gap }));

        await expect(getByTestId(TEST_IDS.group)).toHaveAttribute('data-gap', gap);
      });
    }
  });
});
