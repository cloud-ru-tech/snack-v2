import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, STEPPER_STORIES, TEST_IDS } from './helpers';

const STEP_BUTTON_TEST_ID = `${TEST_IDS.root}_element-step`;

test.describe('Stepper — interaction', () => {
  test('free navigation toggles clickability for non-adjacent steps', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.interactionTest));

    const stepButtons = page.getByTestId(STEP_BUTTON_TEST_ID);
    await expect(stepButtons.nth(0)).toBeEnabled();
    await expect(stepButtons.nth(1)).toBeEnabled();
    await expect(stepButtons.nth(2)).toBeDisabled();

    await gotoStory(buildStoryOptions({ allowFreeNavigation: true }, STEPPER_STORIES.interactionTest));

    await expect(stepButtons.nth(0)).toBeEnabled();
    await expect(stepButtons.nth(1)).toBeEnabled();
    await expect(stepButtons.nth(2)).toBeEnabled();

    await stepButtons.nth(2).click();

    await expect(stepButtons.nth(0)).toHaveAttribute('data-state', 'completed');
    await expect(stepButtons.nth(1)).toHaveAttribute('data-state', 'completed');
    await expect(stepButtons.nth(2)).toHaveAttribute('data-state', 'current');
    await expect(getByTestId(TEST_IDS.next)).toBeDisabled();
  });
});
