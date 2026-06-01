import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('ConfigSelector — rendering', () => {
  test.describe('render', () => {
    test('renders root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('renders label text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'Hello config' }));

      await expect(getByTestId(TEST_IDS.root)).toContainText('Hello config');
    });
  });

  test.describe('states', () => {
    test('checked=true → data-checked=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ checked: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-checked', 'true');
    });

    test('available=true → data-available=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ available: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-available', 'true');
    });

    test('disabled=true → data-disabled=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-disabled', 'true');
    });

    test('disabled=true → input is disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(TEST_IDS.input)).toBeDisabled();
    });
  });
});
