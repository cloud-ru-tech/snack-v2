import { expect, test } from '#playwright-tooling/fixtures';

import { buildInfoGroupStoryOptions, INFO_GROUP_STORIES } from './helpers';

test.describe('InfoGroup — rendering', () => {
  test('playground', async ({ page, gotoStory }) => {
    await gotoStory(buildInfoGroupStoryOptions());
    await expect(page.getByTestId('info-group')).toBeVisible();
    await expect(page.getByTestId('info-group').getByText('Name', { exact: true })).toBeVisible();
  });

  test('visual matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildInfoGroupStoryOptions(undefined, INFO_GROUP_STORIES.visualMatrix));
    await expect(page.getByTestId('info-group-matrix-single-fixed')).toBeVisible();
  });
});
