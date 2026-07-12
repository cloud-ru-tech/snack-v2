import { STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, STEPPER_STORIES, TEST_IDS } from './helpers';

test.describe('Stepper — rendering', () => {
  test('renders playground', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toBeVisible();
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('renders mobile layout', async ({ gotoStory, getByTestId }) => {
    // Адаптивная раскладка — тулбар-глобал `layoutType`, форсим mobile через URL-globals.
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.playground, { layoutType: 'mobile' }));

    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });
});
