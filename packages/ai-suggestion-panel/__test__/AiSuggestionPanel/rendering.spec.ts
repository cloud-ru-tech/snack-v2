import { expect, test } from '#playwright-tooling/fixtures';

import { AI_SUGGESTION_PANEL_STORIES, buildStoryOptions, ITEMS, TEST_IDS } from './helpers';

test.describe('AiSuggestionPanel — rendering', () => {
  test('renders panel and propagates props', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.root);

    await test.step('root, Giga button and questions are rendered', async () => {
      await expect(root).toBeVisible();
      await expect(root).toHaveAttribute('data-size', 's');
      await expect(getByTestId(TEST_IDS.logo)).toBeVisible();
      await expect(getByTestId(TEST_IDS.item).first()).toBeVisible();
    });

    await test.step('size=m', async () => {
      await setStoryArgs({ size: 'm' });
      await expect(root).toHaveAttribute('data-size', 'm');
      await setStoryArgs({ size: 's' });
    });

    await test.step('disabled and loading reach the segment', async () => {
      await setStoryArgs({
        items: [
          { ...ITEMS[0], disabled: true },
          { ...ITEMS[1], loading: true },
        ],
      });
      const [disabledItem, loadingItem] = [getByTestId(TEST_IDS.item).nth(0), getByTestId(TEST_IDS.item).nth(1)];

      await expect(disabledItem).toBeDisabled();
      await expect(loadingItem).toHaveAttribute('data-loading', 'true');
      await expect(loadingItem).toHaveAttribute('aria-busy', 'true');
      await expect(loadingItem.getByTestId(TEST_IDS.itemLoader)).toBeVisible();
    });

    await test.step('all questions fit: no «+N»', async () => {
      await setStoryArgs({ items: ITEMS.slice(0, 1) });
      await expect(getByTestId(TEST_IDS.item)).toHaveCount(1);
      await expect(getByTestId(TEST_IDS.more)).toHaveCount(0);
    });

    await test.step('too many questions: the rest go to «+N»', async () => {
      await setStoryArgs({ items: ITEMS });
      const more = getByTestId(TEST_IDS.more);

      await expect(more).toBeVisible();
      const visible = await getByTestId(TEST_IDS.item).count();
      await expect(more).toHaveText(`+${ITEMS.length - visible}`);
    });

    await test.step('without onClose there is no close button', async () => {
      await expect(getByTestId(TEST_IDS.close)).toHaveCount(1);
      await setStoryArgs({ onClose: undefined });
      await expect(getByTestId(TEST_IDS.close)).toHaveCount(0);
    });
  });

  test('mobile layout uses size m preset', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, AI_SUGGESTION_PANEL_STORIES.playground, { layoutType: 'mobile' }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-size', 'm');
  });

  test('visual matrix renders', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, AI_SUGGESTION_PANEL_STORIES.visualMatrix));
    await expect(getByTestId(TEST_IDS.root).first()).toBeVisible();
  });
});
