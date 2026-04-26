import { expect, test } from '../../../../playwright/fixtures';
import { APPEARANCE, ICON_POSITION, SIZE, VIEW } from '../../src/Button/constants';
import { buildStoryOptions, BUTTON_TEST_ID } from './helpers';

const KEY_COMBOS: Array<{ appearance: string; view: string }> = [
  { appearance: APPEARANCE.Primary, view: VIEW.Filled },
  { appearance: APPEARANCE.Neutral, view: VIEW.Outline },
  { appearance: APPEARANCE.Critical, view: VIEW.Tonal },
];

test.describe('Button — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(BUTTON_TEST_ID)).toBeVisible();
    });

    test('renders label text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'Click me' }));

      await expect(getByTestId(BUTTON_TEST_ID)).toContainText('Click me');
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ className: 'custom-btn' }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveClass(/custom-btn/);
    });
  });

  test.describe('props propagation', () => {
    for (const size of Object.values(SIZE)) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));

        await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-size', size);
      });
    }

    for (const appearance of Object.values(APPEARANCE)) {
      test(`appearance=${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ appearance }));

        await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-appearance', appearance);
      });
    }

    for (const view of Object.values(VIEW)) {
      test(`view=${view}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ view }));

        await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-view', view);
      });
    }

    for (const { appearance, view } of KEY_COMBOS) {
      test(`appearance=${appearance} + view=${view}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ appearance, view }));

        const button = getByTestId(BUTTON_TEST_ID);
        await expect(button).toHaveAttribute('data-appearance', appearance);
        await expect(button).toHaveAttribute('data-view', view);
      });
    }

    test('data-variant=label-only when no icon', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'Button' }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-variant', 'label-only');
    });

    test('data-variant=icon-before when icon + iconPosition=before', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'Button', icon: 'settings', iconPosition: ICON_POSITION.Before }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-variant', 'icon-before');
    });

    test('data-variant=icon-after when icon + iconPosition=after', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'Button', icon: 'settings', iconPosition: ICON_POSITION.After }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-variant', 'icon-after');
    });

    test('data-variant=icon-only when icon without label', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ icon: 'settings', label: undefined }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-variant', 'icon-only');
    });
  });

  test.describe('states', () => {
    test('disabled → native disabled attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(BUTTON_TEST_ID)).toBeDisabled();
    });

    test('disabled → data-disabled attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-disabled', 'true');
    });

    test('loading → aria-busy attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ loading: true }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('aria-busy', 'true');
    });

    test('loading → data-loading attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ loading: true }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-loading', 'true');
    });

    test('fullWidth → data-full-width attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ fullWidth: true }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-full-width', 'true');
    });

    test('counter → data-counter attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ counter: { value: 5 } }));

      await expect(getByTestId(BUTTON_TEST_ID)).toHaveAttribute('data-counter', 'true');
    });
  });
});
