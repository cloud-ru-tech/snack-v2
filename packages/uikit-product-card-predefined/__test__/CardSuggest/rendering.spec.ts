import { expect, test } from '#playwright-tooling/fixtures';

import { CARD_SIZE } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

const CARD_SUGGEST_SIZE_COMBOS = [{ size: CARD_SIZE.S }, { size: CARD_SIZE.M }] as const;

test.describe('CardSuggest — rendering', () => {
  for (const { size } of CARD_SUGGEST_SIZE_COMBOS) {
    test(`size="${size}" → data-size="${size}"`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ size }));
      await expect(getByTestId(TEST_IDS.cardSuggest)).toHaveAttribute('data-size', size);
    });
  }
});
