import { expect, test } from '#playwright-tooling/fixtures';

import { AI_TOOL_BADGE_STORIES, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiToolBadge — polymorphism', () => {
  test('as="a" → renders anchor with href and target', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, AI_TOOL_BADGE_STORIES.polymorphic));
    const root = getByTestId(TEST_IDS.root);
    await expect(root).toHaveAttribute('href', '/cloud-resource');
    await expect(root).toHaveAttribute('target', '_blank');
  });
});
