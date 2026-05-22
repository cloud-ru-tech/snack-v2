import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, MODAL_CUSTOM_TRIGGER_TEST_ID } from './helpers';

test.describe('ModalCustom — rendering', () => {
  test('renders trigger and opens composed modal', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions());

    const trigger = getByTestId(MODAL_CUSTOM_TRIGGER_TEST_ID);
    await expect(trigger).toBeVisible();

    await trigger.click();
    await expect(page.getByText('Custom composition')).toBeVisible();
  });

  test('opens via trigger and renders header/body/footer slots', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(MODAL_CUSTOM_TRIGGER_TEST_ID).click();

    await expect(page.getByText('Custom composition')).toBeVisible();
    await expect(page.getByText(/Тело модалки/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
  });
});
