import AxeBuilder from '@axe-core/playwright';

import { expect, test } from '../../../../playwright/fixtures';
import { buildButtonGroupStoryOptions, BUTTON_GROUP_A11Y_CASES, BUTTON_GROUP_ROOT_SELECTOR } from './helpers';

test.describe('ButtonGroup — accessibility', () => {
  for (const { story, label } of BUTTON_GROUP_A11Y_CASES) {
    test(`no axe violations — ${label}`, async ({ page, gotoStory }) => {
      await gotoStory(buildButtonGroupStoryOptions(undefined, story));

      await expect(page.locator(BUTTON_GROUP_ROOT_SELECTOR)).toBeVisible();

      const results = await new AxeBuilder({ page })
        .include(BUTTON_GROUP_ROOT_SELECTOR)
        .disableRules(['color-contrast'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
