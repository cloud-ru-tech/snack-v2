import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('SectionAccordion — rendering', () => {
  test('renders the section and accordion items', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.item0)).toBeVisible();
    await expect(getByTestId(TEST_IDS.item1)).toBeVisible();
  });
});
