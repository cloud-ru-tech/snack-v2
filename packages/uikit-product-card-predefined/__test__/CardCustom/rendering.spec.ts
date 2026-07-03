import { expect, test } from '#playwright-tooling/fixtures';

import { RADIUS } from '../../../card/src/constants';
import { buildStoryOptions, CARD_CUSTOM_TEST_ID, TEST_IDS } from './helpers';

const KEY_RADII = [RADIUS.S, RADIUS.M, RADIUS.L] as const;

test.describe('CardCustom — rendering', () => {
  test.describe('render', () => {
    test('renders card root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(CARD_CUSTOM_TEST_ID)).toBeVisible();
    });

    test('renders header title slot', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.title)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const radius of KEY_RADII) {
      test(`radius=${radius}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ radius }));

        await expect(getByTestId(CARD_CUSTOM_TEST_ID)).toHaveAttribute('data-radius', radius);
      });
    }

    test('disabled dims the card and removes the function badge', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(CARD_CUSTOM_TEST_ID)).toHaveAttribute('data-disabled', 'true');
      // FunctionBadge возвращает `null`, когда карточка disabled — узла в DOM нет.
      await expect(getByTestId(TEST_IDS.functionBadge)).toHaveCount(0);
    });
  });
});
