import { expect, test } from '../../../playwright/fixtures';
import { buildButtonGroupStoryOptions, BUTTON_GROUP_TEST_ID } from './button-group.helpers';

test.describe('ButtonGroup — layout modifiers', () => {
  test('vertical sets data-vertical and data-filled on container', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildButtonGroupStoryOptions({ vertical: true }));

    const container = getByTestId(BUTTON_GROUP_TEST_ID);
    await expect(container).toHaveAttribute('data-vertical', 'true');
    // При vertical группа ведёт себя как filled (источник: data-filled={vertical || filled})
    await expect(container).toHaveAttribute('data-filled', 'true');
  });

  test('centered sets data-centered', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildButtonGroupStoryOptions({ centered: true }));

    await expect(getByTestId(BUTTON_GROUP_TEST_ID)).toHaveAttribute('data-centered', 'true');
  });

  test('break sets data-break', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildButtonGroupStoryOptions({ break: true }));

    await expect(getByTestId(BUTTON_GROUP_TEST_ID)).toHaveAttribute('data-break', 'true');
  });

  test('filled sets data-filled', async ({ gotoStory, getByTestId }) => {
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
