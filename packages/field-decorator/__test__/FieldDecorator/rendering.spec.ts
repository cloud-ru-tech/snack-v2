import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, SLOT_TEST_IDS, TEST_IDS } from './helpers';

test.describe('FieldDecorator — rendering', () => {
  test.describe('render', () => {
    test('renders root with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.fieldDecorator.root)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const size of ['s', 'm', 'l'] as const) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));

        await expect(getByTestId(TEST_IDS.fieldDecorator.root)).toHaveAttribute('data-size', size);
      });
    }

    test('error forces validation state', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ error: 'Something went wrong' }));

      await expect(getByTestId(TEST_IDS.fieldDecorator.root)).toHaveAttribute('data-validation-state', 'error');
    });
  });

  test.describe('slots', () => {
    test('composes Label and Hint slots', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          label: 'Title',
          required: true,
          caption: 'Caption',
          labelTooltip: { tip: 'Tip' },
          hint: 'Hint text',
          length: { current: 5, max: 20 },
        }),
      );

      await expect(getByTestId(SLOT_TEST_IDS.label)).toContainText('Title');
      await expect(getByTestId(SLOT_TEST_IDS.required)).toBeVisible();
      await expect(getByTestId(SLOT_TEST_IDS.caption)).toBeVisible();
      await expect(getByTestId(SLOT_TEST_IDS.labelTooltip)).toBeVisible();
      await expect(getByTestId(SLOT_TEST_IDS.hint)).toContainText('Hint text');
      await expect(getByTestId(SLOT_TEST_IDS.counter)).toBeVisible();
    });
  });
});
