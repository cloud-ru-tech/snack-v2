import { expect, test } from '../../../playwright/fixtures';
import { timelineItemPlaygroundGotoOptions } from './helpers';

test.describe('Timeline TrackItem', () => {
  test('should render track item and content', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      timelineItemPlaygroundGotoOptions({
        contentTitle: 'E2E title',
        contentDescription: 'E2E body',
      }),
    );

    const row = getByTestId('timeline-track-item');
    await expect(row).toBeVisible();
    await expect(row).toContainText('E2E title');
    await expect(row).toContainText('E2E body');
  });

  test('should render opposite block when showOpposite is true', async ({ gotoStory, getByTestId }) => {
    await gotoStory(timelineItemPlaygroundGotoOptions({ showOpposite: true }));

    const opposite = getByTestId('timeline-track-item-opposite');
    await expect(opposite).toBeVisible();
    await expect(opposite).toContainText('Opposite');
  });

  test('should not render opposite block when showOpposite is false', async ({ gotoStory, page }) => {
    await gotoStory(timelineItemPlaygroundGotoOptions({ showOpposite: false }));

    await expect(page.locator('[data-test-id="timeline-track-item-opposite"]')).toHaveCount(0);
  });
});
