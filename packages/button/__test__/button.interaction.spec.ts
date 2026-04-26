import { expect, test } from '../../../playwright/fixtures';
import { buildStoryOptions, BUTTON_TEST_ID } from './helpers';

test.describe('Button — interaction', () => {
  test('is clickable when enabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const button = getByTestId(BUTTON_TEST_ID);
    await expect(button).toBeEnabled();
    await button.click();
    await expect(button).toBeVisible();
  });

  test('is not clickable when disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));

    await expect(getByTestId(BUTTON_TEST_ID)).toBeDisabled();
  });

  test('disabled button does not receive focus on click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));

    const button = getByTestId(BUTTON_TEST_ID);
    await button.click({ force: true });

    const isFocused = await button.evaluate(el => el === document.activeElement);
    expect(isFocused).toBe(false);
  });

  test('loading button renders visibly', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ loading: true }));

    await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();
  });
});
