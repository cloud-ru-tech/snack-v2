import AxeBuilder from '@axe-core/playwright';

import { expect, test } from '../../../playwright/fixtures';
import { A11Y_DISABLED_RULES, buildSwitchStory, ROOT_SELECTOR } from './helpers';

const CASES = [
  { label: 'playground', props: undefined },
  { label: 'disabled', props: { disabled: true } },
  { label: 'checked', props: { defaultChecked: true } },
];

test.describe('Switch — accessibility', () => {
  for (const { label, props } of CASES) {
    test(`no axe violations — ${label}`, async ({ page, gotoStory }) => {
      await gotoStory(buildSwitchStory(props));
      await expect(page.locator(ROOT_SELECTOR)).toBeVisible();
      const results = await new AxeBuilder({ page }).include(ROOT_SELECTOR).disableRules(A11Y_DISABLED_RULES).analyze();
      expect(results.violations).toEqual([]);
    });
  }
});
