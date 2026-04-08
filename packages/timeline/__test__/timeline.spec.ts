import { expect, test } from '../../../playwright/fixtures';
import { E2E_TIMELINE_ROOT_TEST_ID, timelinePlaygroundGotoOptions } from './helpers';

test.describe('Timeline', () => {
  test('should render root and default item titles', async ({ gotoStory, getByTestId }) => {
    await gotoStory(timelinePlaygroundGotoOptions());

    const root = getByTestId(E2E_TIMELINE_ROOT_TEST_ID);
    await expect(root).toBeVisible();
    await expect(root).toContainText('Start');
    await expect(root).toContainText('End');
  });

  test('should render requested number of track items', async ({ gotoStory, page }) => {
    await gotoStory(timelinePlaygroundGotoOptions({ itemsCount: 2 }));

    const items = page.locator('[data-test-id="timeline-track-item"]');
    await expect(items).toHaveCount(2);
  });

  test('should set full width on outer wrapper', async ({ gotoStory, page }) => {
    await gotoStory(timelinePlaygroundGotoOptions({ fullWidth: true }));

    const fullWidthWrapper = page.locator(`[data-test-id="${E2E_TIMELINE_ROOT_TEST_ID}"][data-full-width="true"]`);
    await expect(fullWidthWrapper).toBeVisible();
  });

  test('should not set full width when fullWidth is false', async ({ gotoStory, page }) => {
    await gotoStory(timelinePlaygroundGotoOptions({ fullWidth: false }));

    await expect(page.locator('[data-full-width="true"]')).toHaveCount(0);
  });

  test('should show opposite column when showOpposite is true', async ({ gotoStory, page }) => {
    await gotoStory(timelinePlaygroundGotoOptions({ showOpposite: true, itemsCount: 2 }));

    const opposite = page.locator('[data-test-id="timeline-track-item-opposite"]');
    await expect(opposite).toHaveCount(2);
    await expect(opposite.first()).toBeVisible();
  });

  test('should apply custom className on timeline container', async ({ gotoStory, getByTestId }) => {
    const customClass = 'timeline-e2e-custom-class';

    await gotoStory(timelinePlaygroundGotoOptions({ className: customClass }));

    const root = getByTestId(E2E_TIMELINE_ROOT_TEST_ID);
    await expect(root).toHaveClass(new RegExp(customClass));
  });
});
