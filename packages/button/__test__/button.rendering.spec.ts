import { expect, test } from '../../../playwright/fixtures';
import { APPEARANCE, SIZE, VIEW } from '../src/Button/constants';
import { buildStoryOptions, BUTTON_TEST_ID } from './helpers';

test.describe('Button — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();
  });

  test('renders label text', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ label: 'Click me' }));

    await expect(getByTestId(BUTTON_TEST_ID)).toContainText('Click me');
  });

  test('applies custom className', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ className: 'custom-btn' }));

    await expect(getByTestId(BUTTON_TEST_ID)).toHaveClass(/custom-btn/);
  });

  test.describe('Sizes', () => {
    for (const size of Object.values(SIZE)) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));

        await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('Appearances', () => {
    for (const appearance of Object.values(APPEARANCE)) {
      test(`appearance=${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ appearance }));

        await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-appearance', appearance);
      });
    }
  });

  test.describe('Views', () => {
    for (const view of Object.values(VIEW)) {
      test(`view=${view}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ view }));

        await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-view', view);
      });
    }
  });
});
