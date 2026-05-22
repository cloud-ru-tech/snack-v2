import { STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, STEPPER_STORIES, TEST_IDS } from './helpers';

test.describe('Stepper — rendering', () => {
  test('renders playground', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toBeVisible();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('renders basic-flow story', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.basicFlow));

    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('renders mobile story', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.mobile));

    await expect(getByTestId(TEST_IDS.mobile)).toBeVisible();
  });
});
