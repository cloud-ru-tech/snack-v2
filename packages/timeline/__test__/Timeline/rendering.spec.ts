import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Timeline — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.timeline.root)).toBeVisible();
    });

    test('renders requested number of items', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ itemsCount: 3 }));

      await expect(getByTestId(TEST_IDS.timelineItem.root)).toHaveCount(3);
    });
  });

  test.describe('props propagation', () => {
    test('fullWidth=true renders timeline', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ fullWidth: true }));

      await expect(getByTestId(TEST_IDS.timeline.root)).toBeVisible();
    });

    test('alternate=true renders timeline', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ alternate: true }));

      await expect(getByTestId(TEST_IDS.timeline.root)).toBeVisible();
    });
  });
});
