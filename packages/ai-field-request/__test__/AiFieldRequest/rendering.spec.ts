import { expect, test } from '#playwright-tooling/fixtures';

import { AI_FIELD_REQUEST_STORIES, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiFieldRequest — rendering', () => {
  test('playground rendering and props propagation', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        appearance: 'destructive',
      }),
    );
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.title)).toContainText('Удалить виртуальную машину');
    await expect(getByTestId(TEST_IDS.hint)).toBeVisible();
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-appearance', 'destructive');
    await expect(getByTestId(TEST_IDS.primaryAction)).toHaveText('Подтвердить');
    await expect(getByTestId(TEST_IDS.secondaryAction)).toHaveText('Отмена');
  });

  test('hides expand for short content', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_REQUEST_STORIES.shortContent));
    await expect(getByTestId(TEST_IDS.expand)).toHaveAttribute('aria-hidden', 'true');
  });

  test('loading sets data-loading', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_REQUEST_STORIES.loading));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-loading', 'true');
  });

  test('applies collapsed maxHeight from props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ maxHeight: 44 }, AI_FIELD_REQUEST_STORIES.loading));

    const maxHeight = await getByTestId(TEST_IDS.content).evaluate(el => getComputedStyle(el).maxHeight);
    const heightPx = parseFloat(maxHeight);

    expect(heightPx).toBeGreaterThan(0);
    expect(heightPx).toBeLessThanOrEqual(44);
  });

  test('fits constrained parent height', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, AI_FIELD_REQUEST_STORIES.constrainedHeight));

    const parent = getByTestId(TEST_IDS.constrainedParent);
    const root = getByTestId(TEST_IDS.root);

    await expect(parent).toBeVisible();
    await expect(root).toBeVisible();

    const parentBox = await parent.boundingBox();
    const rootBox = await root.boundingBox();

    if (!parentBox || !rootBox) {
      throw new Error('Expected parent and root bounding boxes');
    }

    expect(rootBox.height).toBeLessThanOrEqual(parentBox.height + 1);
  });
});
