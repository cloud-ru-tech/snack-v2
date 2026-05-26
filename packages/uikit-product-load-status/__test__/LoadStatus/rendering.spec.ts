import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('LoadStatus — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('renders percent in header when valueType=percent', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          valueType: 'percent',
          progress: 42,
          label: 'Progress',
        }),
      );

      await expect(getByTestId(TEST_IDS.header)).toContainText('42%');
    });

    test('renders hint when provided', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ hint: 'Something went wrong' }));

      await expect(getByTestId(TEST_IDS.hint)).toContainText('Something went wrong');
    });

    test('renders label and value in header', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'Status', value: 'OK' }));

      const header = getByTestId(TEST_IDS.header);
      await expect(header).toContainText('Status');
      await expect(header).toContainText('OK');
    });

    test('applies custom className on root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ className: 'custom-load-status' }));

      await expect(getByTestId(TEST_IDS.root)).toHaveClass(/custom-load-status/);
    });
  });

  test.describe('props propagation', () => {
    test('showError paints progress bar red', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showError: true, hint: 'Error hint' }));

      await expect(getByTestId(TEST_IDS.root).locator('[data-appearance="red"]')).toBeVisible();
    });

    test('showErrorIcon shows error icon in hint', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showErrorIcon: true, hint: 'Error hint' }));

      await expect(getByTestId(TEST_IDS.errorIcon)).toBeVisible();
    });

    test('showError + showErrorIcon — red bar and icon', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showError: true, showErrorIcon: true, hint: 'Error hint' }));

      await expect(getByTestId(TEST_IDS.root).locator('[data-appearance="red"]')).toBeVisible();
      await expect(getByTestId(TEST_IDS.errorIcon)).toBeVisible();
    });

    test('bar only — no header', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          label: undefined,
          value: undefined,
          valueType: 'none',
          hint: undefined,
          progress: 50,
        }),
      );

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
      await expect(getByTestId(TEST_IDS.header)).toHaveCount(0);
    });

    test('appearanceByProgress sets bar data-appearance', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          progress: 40,
          label: 'Load',
          valueType: 'none',
          appearanceByProgress: [
            { condition: 'lte', limit: 70, appearance: 'green' },
            { condition: 'lte', limit: 90, appearance: 'yellow' },
            { condition: 'lte', limit: 100, appearance: 'red' },
          ],
        }),
      );

      await expect(getByTestId(TEST_IDS.root).locator('[data-appearance="green"]')).toBeVisible();
    });

    test('fixed bar color via single appearanceByProgress rule', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          progress: 65,
          appearanceByProgress: [{ condition: 'lte', limit: 100, appearance: 'green' }],
        }),
      );

      await expect(getByTestId(TEST_IDS.root).locator('[data-appearance="green"]')).toBeVisible();
    });

    test('showErrorIcon off — no error icon', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ showErrorIcon: false, hint: 'Note' }));

      await expect(getByTestId(TEST_IDS.errorIcon)).toHaveCount(0);
    });
  });
});
