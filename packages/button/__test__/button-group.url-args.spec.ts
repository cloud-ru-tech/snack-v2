import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/Button/constants';
import {
  buildButtonGroupStoryOptions,
  BUTTON_GROUP_PRIMARY_TEST_ID,
  BUTTON_GROUP_SECONDARY_TEST_ID,
  BUTTON_GROUP_STORIES,
} from './button-group.helpers';

test.describe('ButtonGroup — URL args (Playground)', () => {
  test('size propagates from group to all child buttons', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildButtonGroupStoryOptions({ size: SIZE.L }));

    await expect(getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID)).toHaveAttribute('data-size', SIZE.L);
    await expect(getByTestId(BUTTON_GROUP_SECONDARY_TEST_ID)).toHaveAttribute('data-size', SIZE.L);
  });

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
    // `size` отсутствует в ActionProps — TS не даст его выставить на экшене.
    // Контейнер задаёт size единообразно для всех кнопок группы.
    await gotoStory(buildButtonGroupStoryOptions({ size: SIZE.S }));

    await expect(getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID)).toHaveAttribute('data-size', SIZE.S);
  });
});
