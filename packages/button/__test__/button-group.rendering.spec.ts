import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/Button/constants';
import {
  buildButtonGroupStoryOptions,
  BUTTON_GROUP_PRIMARY_TEST_ID,
  BUTTON_GROUP_SECONDARY_TEST_ID,
  BUTTON_GROUP_STORIES,
  BUTTON_GROUP_TEST_ID,
} from './button-group.helpers';

test.describe('ButtonGroup — rendering', () => {
  test('renders container with data-test-id', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildButtonGroupStoryOptions());

    await expect(getByTestId(BUTTON_GROUP_TEST_ID)).toBeVisible();
  });

  test('renders primary + secondary actions', async ({ page, gotoStory }) => {
    await gotoStory(buildButtonGroupStoryOptions(undefined, BUTTON_GROUP_STORIES.actions));

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

  test.describe('Sizes', () => {
    for (const size of Object.values(SIZE)) {
      test(`size=${size} applies to all child buttons`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildButtonGroupStoryOptions({ size }));

        await expect(getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID)).toHaveAttribute('data-size', size);
        await expect(getByTestId(BUTTON_GROUP_SECONDARY_TEST_ID)).toHaveAttribute('data-size', size);
      });
    }
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
