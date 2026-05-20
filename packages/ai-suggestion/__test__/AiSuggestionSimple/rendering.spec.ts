import { expect, test } from '#playwright-tooling/fixtures';

import { AI_SUGGESTION_SIMPLE_STORIES, buildStoryOptions, KEY_APPEARANCES, KEY_SIZES, TEST_IDS } from './helpers';

test.describe('AiSuggestionSimple — rendering', () => {
  test.describe('render', () => {
    test(`story ${AI_SUGGESTION_SIMPLE_STORIES.playground.story} renders`, async ({ page, gotoStory }) => {
      await gotoStory(buildStoryOptions(undefined, AI_SUGGESTION_SIMPLE_STORIES.playground));
      await expect(page.getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test(`story ${AI_SUGGESTION_SIMPLE_STORIES.visualMatrix.story} renders`, async ({ page, gotoStory }) => {
      await gotoStory(buildStoryOptions(undefined, AI_SUGGESTION_SIMPLE_STORIES.visualMatrix));
      await expect(page.getByTestId(`${TEST_IDS.root}-neutral-s`)).toBeVisible();
      await expect(page.getByTestId(`${TEST_IDS.root}-primary-m`)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const appearance of KEY_APPEARANCES) {
      test(`data-appearance=${appearance}`, async ({ page, gotoStory }) => {
        await gotoStory(buildStoryOptions({ appearance }));
        const chip = page.getByTestId(TEST_IDS.root);
        await expect(chip).toBeVisible();
        await expect(chip).toHaveAttribute('data-appearance', appearance);
      });
    }

    for (const size of KEY_SIZES) {
      test(`data-size=${size}`, async ({ page, gotoStory }) => {
        await gotoStory(buildStoryOptions({ size }));
        const chip = page.getByTestId(TEST_IDS.root);
        await expect(chip).toBeVisible();
        await expect(chip).toHaveAttribute('data-size', size);
      });
    }
  });
});
