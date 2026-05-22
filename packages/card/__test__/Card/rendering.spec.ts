import { BACKGROUND_PREDEFINED_FILL, backgroundPredefinedFillToAcrylic } from '@ds/materials';

import { expect, test } from '#playwright-tooling/fixtures';

import { RADIUS, VIEW } from '../../src/constants';
import { buildStoryOptions, CARD_TEST_ID, TEST_IDS } from './helpers';

const KEY_COMBOS = [
  { radius: RADIUS.S, view: VIEW.Simple, fill: BACKGROUND_PREDEFINED_FILL.Transparent },
  { radius: RADIUS.M, view: VIEW.Outline, fill: BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level },
  { radius: RADIUS.L, view: VIEW.Shadow, fill: BACKGROUND_PREDEFINED_FILL.PrimaryBackground },
] as const;

test.describe('Card — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(CARD_TEST_ID)).toBeVisible();
    });

    test('renders children text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ children: 'Hello card' }));

      await expect(getByTestId(CARD_TEST_ID)).toContainText('Hello card');
    });
  });

  test.describe('props propagation', () => {
    for (const { radius, view, fill } of KEY_COMBOS) {
      test(`radius=${radius} + view=${view} + fill=${fill}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ radius, view, backgroundPredefined: fill }));

        const card = getByTestId(CARD_TEST_ID);
        const { appearance, level } = backgroundPredefinedFillToAcrylic(fill);
        await expect(card).toHaveAttribute('data-radius', radius);
        await expect(card).toHaveAttribute('data-view', view);
        await expect(card).toHaveAttribute('data-acrylic-appearance', appearance);
        await expect(card).toHaveAttribute('data-acrylic-level', level);
      });
    }

    test('disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(CARD_TEST_ID)).toHaveAttribute('data-disabled', 'true');
    });

    test('checked', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ checked: true }));

      await expect(getByTestId(CARD_TEST_ID)).toHaveAttribute('data-checked', 'true');
    });

    test('multiSelect renders check badge when checked', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ checked: true, multiSelect: true }));

      await expect(getByTestId(CARD_TEST_ID)).toHaveAttribute('data-checked', 'true');
      await expect(getByTestId(TEST_IDS.checkBadge)).toBeVisible();
    });
  });
});
