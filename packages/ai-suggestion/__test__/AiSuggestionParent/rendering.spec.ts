import { expect, test } from '#playwright-tooling/fixtures';

import { AI_SUGGESTION_PARENT_STORIES, buildStoryOptions, KEY_SIZES, TEST_IDS } from './helpers';

test.describe('AiSuggestionParent — rendering', () => {
  test.describe('render', () => {
    test(`story ${AI_SUGGESTION_PARENT_STORIES.playground.story} renders`, async ({ page, gotoStory }) => {
      await gotoStory(buildStoryOptions(undefined, AI_SUGGESTION_PARENT_STORIES.playground));
      const root = page.getByTestId(TEST_IDS.root).first();
      await expect(root).toBeVisible();
      await expect(root.locator(`[data-test-id="${TEST_IDS.trigger}"]`).first()).toBeVisible();
    });

    test(`story ${AI_SUGGESTION_PARENT_STORIES.visualMatrix.story} renders`, async ({ page, gotoStory }) => {
      await gotoStory(buildStoryOptions(undefined, AI_SUGGESTION_PARENT_STORIES.visualMatrix));
      await expect(page.getByTestId(`${TEST_IDS.root}-s-collapsed`)).toBeVisible();
      await expect(page.getByTestId(`${TEST_IDS.root}-m-expanded`)).toBeVisible();
    });

    for (const [key, ref] of Object.entries(AI_SUGGESTION_PARENT_STORIES)) {
      if (key === 'playground' || key === 'visualMatrix') {
        continue;
      }

      test(`story ${ref.story} renders`, async ({ page, gotoStory }) => {
        await gotoStory(buildStoryOptions(undefined, ref));
        const root =
          key === 'visualSummary'
            ? page.getByTestId(`${TEST_IDS.root}-visual-summary-interaction-test`).first()
            : page.getByTestId(TEST_IDS.root).first();
        await expect(root).toBeVisible();
        await expect(root.locator(`[data-test-id="${TEST_IDS.trigger}"]`).first()).toBeVisible();
      });
    }
  });

  test.describe('props propagation', () => {
    for (const size of KEY_SIZES) {
      test(`data-size=${size}`, async ({ page, gotoStory }) => {
        await gotoStory(buildStoryOptions({ size }));
        const trigger = page.getByTestId(TEST_IDS.trigger).first();
        await expect(trigger).toBeVisible();
        await expect(trigger).toHaveAttribute('data-size', size);
      });
    }
  });
});
