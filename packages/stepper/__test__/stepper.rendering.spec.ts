import { expect, test } from '../../../playwright/fixtures';
import { buildStoryOptions, STEPPER_ROOT_SELECTOR, STEPPER_STORIES, STEPPER_TEST_ID } from './helpers';

test.describe('Stepper — rendering', () => {
  test('renders playground', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(page.locator(STEPPER_ROOT_SELECTOR)).toBeVisible();
    await expect(getByTestId(STEPPER_TEST_ID)).toBeVisible();
  });

  test('renders basic-flow story', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.basicFlow));
    await expect(page.getByText('Шаг 1')).toBeVisible();
    await expect(page.getByText('Шаг 2')).toBeVisible();
    await expect(page.getByText('Шаг 3')).toBeVisible();
  });

  test('renders completed story at final step', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.completed));
    await expect(page.locator(STEPPER_ROOT_SELECTOR)).toBeVisible();
  });

  test('renders mobile story', async ({ page, gotoStory }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.mobile));
    await expect(page.locator(STEPPER_ROOT_SELECTOR)).toBeVisible();
    await expect(page.getByText('Заполните данные')).toBeVisible();
  });
});
