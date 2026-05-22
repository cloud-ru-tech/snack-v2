import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, SEGMENT_CONTROL_KEY_COMBOS, segmentTestId, TEST_IDS } from './helpers';

const ITEMS = [
  { value: 'overview', label: 'Overview' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'reports', label: 'Reports' },
];

test.describe('SegmentControl — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('renders all segments', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'overview' }));

      for (const item of ITEMS) {
        await expect(getByTestId(segmentTestId(item.value))).toBeVisible();
      }
    });

    test('selected segment has aria-checked=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'analytics' }));

      await expect(getByTestId(segmentTestId('analytics'))).toHaveAttribute('aria-checked', 'true');
      await expect(getByTestId(segmentTestId('overview'))).toHaveAttribute('aria-checked', 'false');
    });
  });

  test.describe('props propagation', () => {
    for (const { size, width } of SEGMENT_CONTROL_KEY_COMBOS) {
      test(`size=${size} + width=${width}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, width }));

        const root = getByTestId(TEST_IDS.root);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-width', width);
      });
    }

    test('outline=true → data-outline', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ outline: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-outline', 'true');
    });
  });

  test.describe('states', () => {
    test('all segments disabled → each has data-disabled', async ({ gotoStory, getByTestId }) => {
      const disabledItems = ITEMS.map(item => ({ ...item, disabled: true }));
      await gotoStory(buildStoryOptions({ items: disabledItems, defaultValue: 'overview' }));

      for (const item of ITEMS) {
        await expect(getByTestId(segmentTestId(item.value))).toHaveAttribute('data-disabled', 'true');
      }
    });

    test('per-segment disabled → only that segment data-disabled', async ({ gotoStory, getByTestId }) => {
      const items = [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B', disabled: true },
        { value: 'c', label: 'C' },
      ];
      await gotoStory(buildStoryOptions({ items, defaultValue: 'a' }));

      await expect(getByTestId(segmentTestId('b'))).toHaveAttribute('data-disabled', 'true');
      await expect(getByTestId(segmentTestId('a'))).not.toHaveAttribute('data-disabled', 'true');
      await expect(getByTestId(segmentTestId('c'))).not.toHaveAttribute('data-disabled', 'true');
    });
  });
});
