import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, HINT_VALIDATION_STATES, SLOT_TEST_IDS, TEST_IDS } from './helpers';

test.describe('Hint — rendering', () => {
  test.describe('render', () => {
    test('renders root with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.hint.root)).toBeVisible();
    });

    test('hint text is rendered', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ hint: 'My hint' }));

      await expect(getByTestId(SLOT_TEST_IDS.hint)).toContainText('My hint');
    });
  });

  test.describe('props propagation', () => {
    for (const validationState of HINT_VALIDATION_STATES) {
      test(`validationState=${validationState}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ hint: 'Hint', validationState }));

        await expect(getByTestId(TEST_IDS.hint.root)).toHaveAttribute('data-validation-state', validationState);
      });
    }

    for (const size of ['s', 'm', 'l'] as const) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));

        await expect(getByTestId(TEST_IDS.hint.root)).toHaveAttribute('data-size', size);
      });
    }
  });

  test.describe('slots', () => {
    test('counter renders and marks limit exceeded', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ length: { current: 30, max: 20 } }));

      const counter = getByTestId(SLOT_TEST_IDS.counter);
      await expect(counter).toBeVisible();
      await expect(counter).toHaveAttribute('data-limit-exceeded', 'true');
    });

    test('counter is hidden on disabled field', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ length: { current: 5, max: 20 }, disabled: true }));

      await expect(getByTestId(SLOT_TEST_IDS.counter)).toHaveCount(0);
    });
  });
});
