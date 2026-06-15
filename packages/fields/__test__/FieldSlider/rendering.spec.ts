import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('FieldSlider — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldSlider)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const size of ['s', 'l'] as const) {
      test(`size=${size} → data-size on the inner field wrapper`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await expect(getByTestId(TEST_IDS.fieldSliderField)).toHaveAttribute('data-size', size);
      });
    }

    // data-validation-state / disabled / readonly / withbackground живут на внутренней
    // оболочке (fieldWrapper = fieldSliderField), а не на корне с публичным data-test-id.
    for (const validationState of ['error', 'warning', 'success'] as const) {
      test(`validationState=${validationState} → data-validation-state on the field wrapper`, async ({
        gotoStory,
        getByTestId,
      }) => {
        await gotoStory(buildStoryOptions({ validationState }));
        await expect(getByTestId(TEST_IDS.fieldSliderField)).toHaveAttribute('data-validation-state', validationState);
      });
    }

    test('disabled → data-disabled on the field wrapper', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));
      await expect(getByTestId(TEST_IDS.fieldSliderField)).toHaveAttribute('data-disabled', 'true');
    });

    test('readonly → data-readonly on the field wrapper', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ readonly: true }));
      await expect(getByTestId(TEST_IDS.fieldSliderField)).toHaveAttribute('data-readonly', 'true');
    });

    test('background=false → data-withbackground absent on the field wrapper', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ background: false }));
      await expect(getByTestId(TEST_IDS.fieldSliderField)).not.toHaveAttribute('data-withbackground');
    });
  });
});
