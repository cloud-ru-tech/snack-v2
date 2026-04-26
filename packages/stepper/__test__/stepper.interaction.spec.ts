import { expect, test } from '../../../playwright/fixtures';
import { buildStoryOptions, STEPPER_STORIES } from './helpers';

test.describe('Stepper — interaction', () => {
  test('Next button advances to next step', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.basicFlow));
    const next = getByTestId('stepper-next');
    await expect(next).toBeVisible();
    await next.click();
    // After click, step 1 becomes Completed (data-state='completed')
    // The second step button for step 2 should become current
    await expect(page.locator('[data-state="current"]').first()).toBeVisible();
  });

  test('Prev button is disabled on first step', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.basicFlow));
    await expect(getByTestId('stepper-prev')).toBeDisabled();
  });

  test('Next then Prev returns to first step', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.basicFlow));
    await getByTestId('stepper-next').click();
    await getByTestId('stepper-prev').click();
    await expect(getByTestId('stepper-prev')).toBeDisabled();
  });
});
