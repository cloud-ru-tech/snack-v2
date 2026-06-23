import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

const SIZE_TO_RADIUS = [
  { size: SIZE.S, radius: 's' },
  { size: SIZE.M, radius: 'm' },
  { size: SIZE.L, radius: 'l' },
] as const;

test.describe('ToggleCard — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.card)).toBeVisible();
    });

    test('renders title text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ title: 'Hello plan' }));

      await expect(getByTestId(TEST_IDS.cardTitle)).toContainText('Hello plan');
    });

    test('renders description when provided', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ description: 'Some description' }));

      await expect(getByTestId(TEST_IDS.cardDescription)).toContainText('Some description');
    });

    test('renders promoBadge when provided', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ promoBadge: 'SALE' }));

      await expect(getByTestId(TEST_IDS.promoBadge)).toBeVisible();
      await expect(getByTestId(TEST_IDS.promoBadge)).toContainText('SALE');
    });

    test('root has role=radio in single-selection group', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.card)).toHaveAttribute('role', 'radio');
    });
  });

  test.describe('props propagation', () => {
    for (const { size, radius } of SIZE_TO_RADIUS) {
      test(`size=${size} → data-radius=${radius}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));

        await expect(getByTestId(TEST_IDS.card)).toHaveAttribute('data-radius', radius);
      });
    }
  });

  test.describe('states', () => {
    test('card is selected when value matches group defaultValue', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ value: 'card' }));

      await expect(getByTestId(TEST_IDS.card)).toHaveAttribute('aria-checked', 'true');
      await expect(getByTestId(TEST_IDS.card)).toHaveAttribute('data-checked', 'true');
    });

    test('disabled → data-disabled=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(TEST_IDS.card)).toHaveAttribute('data-disabled', 'true');
    });
  });
});
