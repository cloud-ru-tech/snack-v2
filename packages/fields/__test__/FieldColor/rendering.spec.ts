import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('FieldColor — rendering', () => {
  test('renders root, swatch and input', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldColor)).toBeVisible();
    await expect(getByTestId(TEST_IDS.fieldColorSwatch)).toBeVisible();
    await expect(getByTestId(TEST_IDS.fieldColorInput)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const size of ['s', 'l'] as const) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await expect(getByTestId(TEST_IDS.fieldColor)).toHaveAttribute('data-size', size);
      });
    }

    for (const state of ['error', 'success'] as const) {
      test(`validationState=${state}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ validationState: state }));
        await expect(getByTestId(TEST_IDS.fieldColor)).toHaveAttribute('data-validation-state', state);
      });
    }
  });

  test('disabled state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.fieldColorInput)).toBeDisabled();
  });

  test('background propagates to data-withbackground (present by default, absent when false)', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldColor)).toHaveAttribute('data-withbackground', 'true');

    await gotoStory(buildStoryOptions({ background: false }));
    await expect(getByTestId(TEST_IDS.fieldColor)).not.toHaveAttribute('data-withbackground');
  });

  test('chevron shown by default and in readonly (Figma parity)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldColorChevron)).toBeVisible();

    // Figma readonly-варианты fieldSelectColor показывают chevron-down
    // рядом с copy — в readonly он остаётся видимым.
    await gotoStory(buildStoryOptions({ readonly: true }));
    await expect(getByTestId(TEST_IDS.fieldColorChevron)).toBeVisible();
  });
});
