import { expect, test } from '../../../playwright/fixtures';
import { buildStoryOptions, STEPPER_STORIES } from './helpers';

test.describe('Stepper — states', () => {
  test('completed story shows last step as completed', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.completed));
    // Previous steps should render with data-state='completed'
    await expect(page.locator('[data-state="completed"]').first()).toBeVisible();
  });

  test('basic-flow shows current state on step 1 by default', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.basicFlow));
    await expect(page.locator('[data-state="current"]').first()).toBeVisible();
  });

  test('waiting state present for steps beyond current', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.basicFlow));
    await expect(page.locator('[data-state="waiting"]').first()).toBeVisible();
  });
});
