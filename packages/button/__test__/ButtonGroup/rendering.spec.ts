import { expect, test } from '../../../../playwright/fixtures';
import { SIZE } from '../../src/Button/constants';
import {
  buildButtonGroupStoryOptions,
  BUTTON_GROUP_PRIMARY_TEST_ID,
  BUTTON_GROUP_SECONDARY_TEST_ID,
  BUTTON_GROUP_STORIES,
  BUTTON_GROUP_TEST_ID,
} from './helpers';

test.describe('ButtonGroup — rendering', () => {
  test.describe('render', () => {
    test('renders container with data-test-id', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions());

      await expect(getByTestId(BUTTON_GROUP_TEST_ID)).toBeVisible();
    });

    test('renders primary + secondary actions', async ({ page, gotoStory }) => {
      await gotoStory(buildButtonGroupStoryOptions(undefined, BUTTON_GROUP_STORIES.twoActions));

      await expect(page.getByRole('button', { name: 'Сохранить' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Отмена' })).toBeVisible();
    });

    test('renders three actions in DOM order: tertiary → secondary → primary', async ({ page, gotoStory }) => {
      await gotoStory(buildButtonGroupStoryOptions(undefined, BUTTON_GROUP_STORIES.threeActions));

      const buttons = page.getByRole('button');
      await expect(buttons).toHaveCount(3);
      await expect(buttons.nth(0)).toHaveText('Помощь');
      await expect(buttons.nth(1)).toHaveText('Отмена');
      await expect(buttons.nth(2)).toHaveText('Сохранить');
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions({ className: 'custom-group' }));

      await expect(getByTestId(BUTTON_GROUP_TEST_ID)).toHaveClass(/custom-group/);
    });

    test('renders nothing when no actions provided', async ({ page, gotoStory }) => {
      await gotoStory(buildButtonGroupStoryOptions({ primaryAction: undefined, secondaryAction: undefined }));

      await expect(page.getByRole('button')).toHaveCount(0);
    });
  });

  test.describe('props propagation', () => {
    for (const size of Object.values(SIZE)) {
      test(`size=${size} applies to all child buttons`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildButtonGroupStoryOptions({ size }));

        await expect(getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID)).toHaveAttribute('data-size', size);
        await expect(getByTestId(BUTTON_GROUP_SECONDARY_TEST_ID)).toHaveAttribute('data-size', size);
      });
    }

    test('action props reach the underlying Button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions(undefined, BUTTON_GROUP_STORIES.playgroundCriticalPrimary));

      const primary = getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID);
      await expect(primary).toHaveText('Применить');
      await expect(primary).toHaveAttribute('data-appearance', 'critical');
      await expect(primary).toHaveAttribute('data-view', 'filled');

      const secondary = getByTestId(BUTTON_GROUP_SECONDARY_TEST_ID);
      await expect(secondary).toHaveAttribute('data-appearance', 'neutral');
      await expect(secondary).toHaveAttribute('data-view', 'simple');
    });

    test('action-level size is not settable via ActionProps (group size wins)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions({ size: SIZE.S }));

      await expect(getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID)).toHaveAttribute('data-size', SIZE.S);
    });
  });

  test.describe('states', () => {
    test('vertical → data-vertical and data-filled on container', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions({ vertical: true }));

      const container = getByTestId(BUTTON_GROUP_TEST_ID);
      await expect(container).toHaveAttribute('data-vertical', 'true');
      // При vertical группа ведёт себя как filled (источник: data-filled={vertical || filled})
      await expect(container).toHaveAttribute('data-filled', 'true');
    });

    test('centered → data-centered', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions({ centered: true }));

      await expect(getByTestId(BUTTON_GROUP_TEST_ID)).toHaveAttribute('data-centered', 'true');
    });

    test('break → data-break', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions({ break: true }));

      await expect(getByTestId(BUTTON_GROUP_TEST_ID)).toHaveAttribute('data-break', 'true');
    });

    test('filled → data-filled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions({ filled: true }));

      await expect(getByTestId(BUTTON_GROUP_TEST_ID)).toHaveAttribute('data-filled', 'true');
    });

    test('defaults: no data-* modifiers applied', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildButtonGroupStoryOptions());

      const container = getByTestId(BUTTON_GROUP_TEST_ID);
      await expect(container).not.toHaveAttribute('data-vertical', /.+/);
      await expect(container).not.toHaveAttribute('data-centered', /.+/);
      await expect(container).not.toHaveAttribute('data-break', /.+/);
      await expect(container).not.toHaveAttribute('data-filled', /.+/);
    });
  });
});
