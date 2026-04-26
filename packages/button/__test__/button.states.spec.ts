import { expect, test } from '../../../playwright/fixtures';
import { buildStoryOptions, BUTTON_TEST_ID } from './helpers';

test.describe('Button — states', () => {
  test.describe('disabled', () => {
    test('has native disabled attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(BUTTON_TEST_ID)).toBeDisabled();
    });

    test('has data-disabled attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-disabled', 'true');
    });
  });

  test.describe('loading', () => {
    test('has aria-busy attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ loading: true }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('aria-busy', 'true');
    });

    test('has data-loading attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ loading: true }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-loading', 'true');
    });
  });

  test.describe('fullWidth', () => {
    test('has data-full-width attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ fullWidth: true }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-full-width', 'true');
    });
  });

  test.describe('counter', () => {
    test('has data-counter attribute when counter prop provided', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ counter: { value: 5 } }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-counter', 'true');
    });
  });
});
