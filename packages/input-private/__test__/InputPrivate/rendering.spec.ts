import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('InputPrivate — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test.describe('props propagation', () => {
    test('autoComplete=true → autocomplete="on"', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ autoComplete: true }));
      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('autocomplete', 'on');
    });

    // autoComplete=false — это дефолт пропа, покрывается Playground.play.

    test('autoComplete="email" → autocomplete="email"', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ autoComplete: 'email' }));
      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('autocomplete', 'email');
    });

    test('disabled=true → disabled attribute set', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));
      await expect(getByTestId(TEST_IDS.root)).toBeDisabled();
    });

    test('readonly=true → readonly attribute set', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ readonly: true }));
      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('readonly', '');
    });
  });
});
