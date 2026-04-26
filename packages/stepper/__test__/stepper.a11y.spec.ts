import AxeBuilder from '@axe-core/playwright';

import { expect, test } from '../../../playwright/fixtures';
import { buildStoryOptions, STEPPER_A11Y_CASES, STEPPER_ROOT_SELECTOR } from './helpers';

test.describe('Stepper — accessibility', () => {
  for (const { story, label, props } of STEPPER_A11Y_CASES) {
    test(`no axe violations — ${label}`, async ({ page, gotoStory }) => {
      await gotoStory(buildStoryOptions(props, story));

      await expect(page.locator(STEPPER_ROOT_SELECTOR)).toBeVisible();

      const results = await new AxeBuilder({ page })
        .include(STEPPER_ROOT_SELECTOR)
        .disableRules(['color-contrast'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
