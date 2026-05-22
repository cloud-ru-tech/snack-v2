import { expect, test } from '#playwright-tooling/fixtures';

import { APPEARANCE, ICON_POSITION, SIZE, VIEW } from '../../src/Button/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

// Behavioral assertions (click/keyboard/onClick fired) live in
// stories/Button/tests/Button.InteractionTest.stories.tsx::play.
// All-axis visual coverage lives in Button.VisualMatrix story snapshot.

const KEY_COMBOS = [
  { appearance: APPEARANCE.Primary, view: VIEW.Filled, size: SIZE.M },
  { appearance: APPEARANCE.Neutral, view: VIEW.Outline, size: SIZE.S },
  { appearance: APPEARANCE.Critical, view: VIEW.Tonal, size: SIZE.L },
] as const;

const VARIANT_CASES = [
  { label: 'Button', icon: undefined, iconPosition: undefined, expected: 'label-only' },
  { label: 'Button', icon: 'settings', iconPosition: ICON_POSITION.Before, expected: 'icon-before' },
  { label: 'Button', icon: 'settings', iconPosition: ICON_POSITION.After, expected: 'icon-after' },
  { label: undefined, icon: 'settings', iconPosition: undefined, expected: 'icon-only' },
] as const;

test.describe('Button — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.button.root);
    await expect(root).toBeVisible();
    await expect(root).toContainText('Button');
  });

  for (const { appearance, view, size } of KEY_COMBOS) {
    test(`props propagate: ${appearance} + ${view} + ${size}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ appearance, view, size }));
      const root = getByTestId(TEST_IDS.button.root);
      await expect(root).toHaveAttribute('data-appearance', appearance);
      await expect(root).toHaveAttribute('data-view', view);
      await expect(root).toHaveAttribute('data-size', size);
    });
  }

  for (const { label, icon, iconPosition, expected } of VARIANT_CASES) {
    test(`data-variant=${expected}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label, icon, iconPosition }));
      await expect(getByTestId(TEST_IDS.button.root)).toHaveAttribute('data-variant', expected);
    });
  }

  test('disabled propagates to native disabled + data-disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    const root = getByTestId(TEST_IDS.button.root);
    await expect(root).toBeDisabled();
    await expect(root).toHaveAttribute('data-disabled', 'true');
  });

  test('loading propagates to aria-busy + data-loading', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ loading: true }));
    const root = getByTestId(TEST_IDS.button.root);
    await expect(root).toHaveAttribute('aria-busy', 'true');
    await expect(root).toHaveAttribute('data-loading', 'true');
  });

  test('applies custom className', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ className: 'custom-btn' }));
    await expect(getByTestId(TEST_IDS.button.root)).toHaveClass(/custom-btn/);
  });
});
