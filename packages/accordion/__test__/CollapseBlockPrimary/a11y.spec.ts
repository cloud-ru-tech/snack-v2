import AxeBuilder from '@axe-core/playwright';

import { expect, test } from '../../../../playwright/fixtures';
import { buildStoryOptions, ROOT_SELECTOR, STORIES } from './helpers';

const CASES: ReadonlyArray<{ story: string; label: string; props?: Record<string, unknown> }> = [
  { story: STORIES.playground, label: 'playground' },
  { story: STORIES.playground, label: 'with-subtitle-and-after', props: { showAfterTitleSlot: true } },
  { story: STORIES.visualMatrix, label: 'visual-matrix' },
];

test.describe('CollapseBlockPrimary — accessibility', () => {
  for (const { story, label, props } of CASES) {
    test(`no axe violations — ${label}`, async ({ page, gotoStory }) => {
      await gotoStory(buildStoryOptions(props, story));

      await expect(page.locator(ROOT_SELECTOR)).toBeVisible();

      const results = await new AxeBuilder({ page }).include(ROOT_SELECTOR).disableRules(['color-contrast']).analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
