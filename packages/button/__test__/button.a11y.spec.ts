import AxeBuilder from '@axe-core/playwright';

import { expect, test } from '../../../playwright/fixtures';
import { buildStoryOptions, BUTTON_A11Y_CASES, BUTTON_ROOT_SELECTOR } from './helpers';

test.describe('Button — accessibility', () => {
  for (const { story, label, props } of BUTTON_A11Y_CASES) {
    test(`no axe violations — ${label}`, async ({ page, gotoStory }) => {
      await gotoStory(buildStoryOptions(props, story));

      await expect(page.locator(BUTTON_ROOT_SELECTOR)).toBeVisible();

      const results = await new AxeBuilder({ page })
        .include(BUTTON_ROOT_SELECTOR)
        .disableRules(['color-contrast'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
