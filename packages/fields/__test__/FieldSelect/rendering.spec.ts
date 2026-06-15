import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, FIELD_SELECT_STORIES, TEST_IDS } from './helpers';

test.describe('FieldSelect — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldSelect)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const size of ['s', 'l'] as const) {
      test(`size=${size} → data-size`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await expect(getByTestId(TEST_IDS.fieldSelect)).toHaveAttribute('data-size', size);
      });
    }

    for (const validationState of ['error', 'warning'] as const) {
      test(`validationState=${validationState} → data-validation-state`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ validationState }));
        await expect(getByTestId(TEST_IDS.fieldSelect)).toHaveAttribute('data-validation-state', validationState);
      });
    }

    test('disabled → data-disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));
      await expect(getByTestId(TEST_IDS.fieldSelect)).toHaveAttribute('data-disabled', 'true');
    });

    test('readonly → data-readonly', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ readonly: true }));
      await expect(getByTestId(TEST_IDS.fieldSelect)).toHaveAttribute('data-readonly', 'true');
    });

    // chips-row рендерится только при multiple + chips + непустом значении (FieldSelect.tsx:
    // `chips && selectedPairs.length > 0`). Через URL-args Playground'а это не собрать: Storybook
    // приводит array `defaultValue` к строке (тип arg'а выведен из строкового дефолта), `Array.isArray`
    // ложно, value пустой — чипов нет. Берём render-time story с multiple + defaultValue.
    test('selection=multiple with value → renders chips container', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, FIELD_SELECT_STORIES.openMultiple));
      await expect(getByTestId(TEST_IDS.fieldSelectChips)).toBeVisible();
    });

    test('searchable=false → input is readonly', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ searchable: false }));
      await expect(getByTestId(TEST_IDS.fieldSelectInput)).toHaveAttribute('readonly', '');
    });
  });
});
