import { expect, test } from '#playwright-tooling/fixtures';

import { AI_FIELD_BANNER_STORIES, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiFieldBanner — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('renders description text', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ content: 'Field hint' }));
    await expect(getByTestId(TEST_IDS.content)).toHaveText('Field hint');
  });

  test('renders icon slot when icon is passed', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_BANNER_STORIES.interactionTest));
    await expect(getByTestId(TEST_IDS.icon)).toBeVisible();
  });

  test('omits icon when icon is not passed', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_BANNER_STORIES.withoutIcon));
    await expect(getByTestId(TEST_IDS.icon)).toHaveCount(0);
  });

  test('omits action when actionLabel is not set', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_BANNER_STORIES.withoutAction));
    await expect(getByTestId(TEST_IDS.action)).toHaveCount(0);
  });

  test('renders action label', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ content: 'Description', actionLabel: 'Details' }));
    await expect(getByTestId(TEST_IDS.action)).toHaveText('Details');
  });

  test('type propagates to data-type', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ variant: 'critical' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-type', 'critical');
  });

  test('size propagates to data-size', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ size: 'm' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-size', 'm');
  });

  test('renders additional slot', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        children: 'Extra',
        content: 'Description',
      }),
    );
    await expect(getByTestId(TEST_IDS.additional)).toHaveText('Extra');
  });
});
