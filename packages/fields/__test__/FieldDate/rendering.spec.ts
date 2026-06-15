import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('FieldDate — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldDate)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const size of ['s', 'l'] as const) {
      test(`size=${size} → data-size`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await expect(getByTestId(TEST_IDS.fieldDate)).toHaveAttribute('data-size', size);
      });
    }

    for (const validationState of ['error', 'warning'] as const) {
      test(`validationState=${validationState} → data-validation-state`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ validationState }));
        await expect(getByTestId(TEST_IDS.fieldDate)).toHaveAttribute('data-validation-state', validationState);
      });
    }
  });

  test('mode=date-range renders two masked inputs (from / to)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: 'date-range' }));
    const root = getByTestId(TEST_IDS.fieldDate);
    await expect(root.getByTestId(TEST_IDS.fieldDateInputFrom)).toBeVisible();
    await expect(root.getByTestId(TEST_IDS.fieldDateInputTo)).toBeVisible();
  });

  test('mode=date-time exposes the RU time mask in the placeholder (чч:мм:сс)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: 'date-time' }));
    // showSeconds=true по умолчанию в Playground → маска включает секунды.
    await expect(getByTestId(TEST_IDS.fieldDateInput)).toHaveAttribute('placeholder', /чч:мм:сс/);
  });
});
