import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, COLOR_PICKER_TEST_ID, KEY_SIZES, TEST_IDS } from './helpers';

test.describe('ColorPicker — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await expect(getByTestId(COLOR_PICKER_TEST_ID)).toBeVisible();
    });
  });

  test.describe('states', () => {
    for (const autoApply of [true, false] as const) {
      test(`autoApply=${autoApply}: footer ${autoApply ? 'hidden' : 'visible'}`, async ({ gotoStory, page }) => {
        await gotoStory(buildStoryOptions({ autoApply }));
        const expectedCount = autoApply ? 0 : 1;
        await expect(page.getByTestId(TEST_IDS.apply)).toHaveCount(expectedCount);
        await expect(page.getByTestId(TEST_IDS.cancel)).toHaveCount(expectedCount);
      });
    }

    test('withAlpha=false hides alpha field', async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions({ withAlpha: false, availableModes: ['hex'] }));
      await expect(page.getByTestId(TEST_IDS.fieldAlpha)).toHaveCount(0);
    });
  });

  test.describe('props propagation', () => {
    for (const size of KEY_SIZES) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await expect(getByTestId(COLOR_PICKER_TEST_ID)).toHaveAttribute('data-size', size);
      });
    }

    test('availableModes=[hex] shows only HEX field', async ({ gotoStory, getByTestId, page }) => {
      await gotoStory(buildStoryOptions({ availableModes: ['hex'] }));
      await expect(getByTestId(TEST_IDS.fieldHex)).toBeVisible();
      await expect(page.getByTestId(TEST_IDS.fieldR)).toHaveCount(0);
      await expect(page.getByTestId(TEST_IDS.fieldH)).toHaveCount(0);
    });

    test('availableModes=[rgb] shows only RGB fields', async ({ gotoStory, getByTestId, page }) => {
      await gotoStory(buildStoryOptions({ availableModes: ['rgb'] }));
      await expect(getByTestId(TEST_IDS.fieldR)).toBeVisible();
      await expect(getByTestId(TEST_IDS.fieldG)).toBeVisible();
      await expect(getByTestId(TEST_IDS.fieldB)).toBeVisible();
      await expect(page.getByTestId(TEST_IDS.fieldHex)).toHaveCount(0);
      await expect(page.getByTestId(TEST_IDS.fieldH)).toHaveCount(0);
    });

    test('availableModes=[hsv] shows only HSV fields', async ({ gotoStory, getByTestId, page }) => {
      await gotoStory(buildStoryOptions({ availableModes: ['hsv'] }));
      await expect(getByTestId(TEST_IDS.fieldH)).toBeVisible();
      await expect(getByTestId(TEST_IDS.fieldS)).toBeVisible();
      await expect(getByTestId(TEST_IDS.fieldV)).toBeVisible();
      await expect(page.getByTestId(TEST_IDS.fieldHex)).toHaveCount(0);
      await expect(page.getByTestId(TEST_IDS.fieldR)).toHaveCount(0);
    });
  });
});
