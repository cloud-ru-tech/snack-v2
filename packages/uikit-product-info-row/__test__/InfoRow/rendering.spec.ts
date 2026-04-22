import { expect, test } from '../../../../playwright/fixtures';
import { buildInfoRowStoryOptions, INFO_ROW_STORIES } from './helpers';

test.describe('InfoRow — rendering', () => {
  test.describe('render', () => {
    test('playground', async ({ page, gotoStory }) => {
      await gotoStory(buildInfoRowStoryOptions());
      await expect(page.getByTestId('info-row')).toBeVisible();
    });

    test('visual matrix', async ({ page, gotoStory }) => {
      await gotoStory(buildInfoRowStoryOptions(undefined, INFO_ROW_STORIES.visualMatrix));
      await expect(page.getByTestId('info-row-matrix-fixed-false')).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    test('loading', async ({ page, gotoStory }) => {
      await gotoStory(buildInfoRowStoryOptions({ loading: true }));
      await expect(page.getByTestId('info-row')).toBeVisible();
    });
  });
});
