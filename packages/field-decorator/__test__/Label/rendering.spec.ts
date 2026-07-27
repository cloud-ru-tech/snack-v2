import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, SLOT_TEST_IDS, TEST_IDS } from './helpers';

test.describe('Label — rendering', () => {
  test.describe('render', () => {
    test('renders root with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.label.root)).toBeVisible();
    });

    test('label text is rendered', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'My label' }));

      await expect(getByTestId(SLOT_TEST_IDS.label)).toContainText('My label');
    });
  });

  test.describe('props propagation', () => {
    for (const size of ['s', 'm', 'l'] as const) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));

        await expect(getByTestId(TEST_IDS.label.root)).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('slots', () => {
    test('required sign, caption and tooltip render', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildStoryOptions({
          required: true,
          caption: 'Caption',
          labelTooltip: { tip: 'Tip' },
        }),
      );

      await expect(getByTestId(SLOT_TEST_IDS.required)).toBeVisible();
      await expect(getByTestId(SLOT_TEST_IDS.caption)).toBeVisible();
      await expect(getByTestId(SLOT_TEST_IDS.labelTooltip)).toBeVisible();
    });
  });
});
