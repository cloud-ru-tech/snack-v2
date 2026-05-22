import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/Button/constants';
import { buildButtonGroupStoryOptions, BUTTON_GROUP_LABELS, BUTTON_GROUP_STORIES, TEST_IDS } from './helpers';

// Key representatives — smallest and largest size; mid size is covered by VisualMatrix.
const KEY_SIZES = [SIZE.S, SIZE.L] as const;

test.describe('ButtonGroup — rendering', () => {
  test.describe('render', () => {
    test('renders container with data-test-id', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions());

      await expect(getByTestId(TEST_IDS.buttonGroup.root)).toBeVisible();
    });

    test('renders primary + secondary actions', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions());

      await expect(getByTestId(TEST_IDS.buttonGroup.primary)).toBeVisible();
      await expect(getByTestId(TEST_IDS.buttonGroup.secondary)).toBeVisible();
    });

    test('renders three actions in DOM order: tertiary → secondary → primary', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions(undefined, BUTTON_GROUP_STORIES.threeActionsFixture));

      await expect(getByTestId(TEST_IDS.buttonGroup.tertiary)).toHaveText(BUTTON_GROUP_LABELS.tertiary);
      await expect(getByTestId(TEST_IDS.buttonGroup.secondary)).toHaveText(BUTTON_GROUP_LABELS.secondary);
      await expect(getByTestId(TEST_IDS.buttonGroup.primary)).toHaveText(BUTTON_GROUP_LABELS.primary);
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions({ className: 'custom-group' }));

      await expect(getByTestId(TEST_IDS.buttonGroup.root)).toHaveClass(/custom-group/);
    });

    test('renders nothing when no actions provided', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions({ primaryAction: undefined, secondaryAction: undefined }));

      await expect(getByTestId(TEST_IDS.buttonGroup.primary)).toHaveCount(0);
      await expect(getByTestId(TEST_IDS.buttonGroup.secondary)).toHaveCount(0);
    });
  });

  test.describe('props propagation', () => {
    test(`size propagates to all child buttons (${KEY_SIZES.join(', ')})`, async ({ gotoStory, getByTestId }) => {
      for (const size of KEY_SIZES) {
        await gotoStory(buildButtonGroupStoryOptions({ size }));

        await expect(getByTestId(TEST_IDS.buttonGroup.primary)).toHaveAttribute('data-size', size);
        await expect(getByTestId(TEST_IDS.buttonGroup.secondary)).toHaveAttribute('data-size', size);
      }
    });

    test('action props reach the underlying Button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions(undefined, BUTTON_GROUP_STORIES.criticalPrimaryFixture));

      const primary = getByTestId(TEST_IDS.buttonGroup.primary);
      await expect(primary).toHaveText(BUTTON_GROUP_LABELS.primaryCritical);
      await expect(primary).toHaveAttribute('data-appearance', 'critical');
      await expect(primary).toHaveAttribute('data-view', 'filled');

      const secondary = getByTestId(TEST_IDS.buttonGroup.secondary);
      await expect(secondary).toHaveAttribute('data-appearance', 'neutral');
      await expect(secondary).toHaveAttribute('data-view', 'simple');
    });
  });

  test.describe('states', () => {
    test('vertical → data-vertical and data-filled on container', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions({ vertical: true }));

      const container = getByTestId(TEST_IDS.buttonGroup.root);
      await expect(container).toHaveAttribute('data-vertical', 'true');
      // При vertical группа ведёт себя как filled (источник: data-filled={vertical || filled})
      await expect(container).toHaveAttribute('data-filled', 'true');
    });

    test('centered → data-centered', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions({ centered: true }));

      await expect(getByTestId(TEST_IDS.buttonGroup.root)).toHaveAttribute('data-centered', 'true');
    });

    test('break → data-break', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions({ break: true }));

      await expect(getByTestId(TEST_IDS.buttonGroup.root)).toHaveAttribute('data-break', 'true');
    });

    test('filled → data-filled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions({ filled: true }));

      await expect(getByTestId(TEST_IDS.buttonGroup.root)).toHaveAttribute('data-filled', 'true');
    });

    test('defaults: no data-* modifiers applied', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions());

      const container = getByTestId(TEST_IDS.buttonGroup.root);
      await expect(container).not.toHaveAttribute('data-vertical', /.+/);
      await expect(container).not.toHaveAttribute('data-centered', /.+/);
      await expect(container).not.toHaveAttribute('data-break', /.+/);
      await expect(container).not.toHaveAttribute('data-filled', /.+/);
    });
  });
});
