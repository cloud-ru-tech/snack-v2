import AxeBuilder from '@axe-core/playwright';

import { expect, test } from '../../../../playwright/fixtures';
import { A11Y_DISABLED_RULES, buildToggleGroupStory, ROOT_SELECTOR } from '../_shared/helpers';

const CASES = [
  { label: 'single', props: { selectionMode: 'single' } },
  { label: 'multiple', props: { selectionMode: 'multiple' } },
];

test.describe('ToggleGroup — accessibility', () => {
  for (const { label, props } of CASES) {
    test(`no axe violations — ${label}`, async ({ page, gotoStory }) => {
      await gotoStory(buildToggleGroupStory(props));
      await expect(page.locator(ROOT_SELECTOR)).toBeVisible();
      const results = await new AxeBuilder({ page }).include(ROOT_SELECTOR).disableRules(A11Y_DISABLED_RULES).analyze();
      expect(results.violations).toEqual([]);
    });
  }
});
