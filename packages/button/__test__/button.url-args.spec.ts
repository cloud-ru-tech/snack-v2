import { expect, test } from '../../../playwright/fixtures';
import { APPEARANCE, ICON_POSITION, VIEW } from '../src/Button/constants';
import { buildStoryOptions, BUTTON_TEST_ID } from './helpers';

const KEY_COMBOS: Array<{ appearance: string; view: string }> = [
  { appearance: APPEARANCE.Primary, view: VIEW.Filled },
  { appearance: APPEARANCE.Neutral, view: VIEW.Outline },
  { appearance: APPEARANCE.Critical, view: VIEW.Tonal },
];

test.describe('Button — URL args (parametric)', () => {
  test.describe('data-variant', () => {
    test('label-only when no icon', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'Button' }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-variant', 'label-only');
    });

    test('icon-before when icon + iconPosition=before', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'Button', icon: 'settings', iconPosition: ICON_POSITION.Before }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-variant', 'icon-before');
    });

    test('icon-after when icon + iconPosition=after', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'Button', icon: 'settings', iconPosition: ICON_POSITION.After }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-variant', 'icon-after');
    });

    test('icon-only when icon without label', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ icon: 'settings', label: undefined }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-variant', 'icon-only');
    });
  });

  test.describe('appearance × view combos', () => {
    for (const { appearance, view } of KEY_COMBOS) {
      test(`appearance=${appearance} view=${view}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ appearance, view }));

        const button = getByTestId(BUTTON_TEST_ID);
        await expect(button).toHaveAttribute('data-appearance', appearance);
        await expect(button).toHaveAttribute('data-view', view);
      });
    }
  });
});
