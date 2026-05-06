import { BACKGROUND_PREDEFINED_FILL, backgroundPredefinedFillToAcrylic } from '@ds/materials';

import { expect, test } from '#playwright-tooling/fixtures';

import { RADIUS, VIEW } from '../../src/constants';
import { buildStoryOptions, CARD_TEST_ID } from './helpers';

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
    for (const radius of Object.values(RADIUS)) {
      test(`radius=${radius}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ radius }));

        await expect(getByTestId(CARD_TEST_ID)).toHaveAttribute('data-radius', radius);
      });
    }

    for (const view of Object.values(VIEW)) {
      test(`view=${view}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ view }));

        await expect(getByTestId(CARD_TEST_ID)).toHaveAttribute('data-view', view);
      });
    }

    for (const fill of Object.values(BACKGROUND_PREDEFINED_FILL)) {
      test(`backgroundPredefined=${fill}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ backgroundPredefined: fill }));

        const { appearance, level } = backgroundPredefinedFillToAcrylic(fill);
        await expect(getByTestId(CARD_TEST_ID)).toHaveAttribute('data-acrylic-appearance', appearance);
        await expect(getByTestId(CARD_TEST_ID)).toHaveAttribute('data-acrylic-level', level);
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

    test('multiSelect renders check badge when checked', async ({ gotoStory, page, getByTestId }) => {
      await gotoStory(buildStoryOptions({ checked: true, multiSelect: true }));

      await expect(getByTestId(CARD_TEST_ID)).toHaveAttribute('data-checked', 'true');
      await expect(page.locator('[data-check-badge]')).toBeVisible();
    });
  });
});
