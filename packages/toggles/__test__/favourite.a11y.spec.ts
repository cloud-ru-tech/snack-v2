import AxeBuilder from '@axe-core/playwright';

import { expect, test } from '../../../playwright/fixtures';
import { FAVOURITE_ICON } from '../src/constants';
import { A11Y_DISABLED_RULES, buildFavouriteStory, ROOT_SELECTOR } from './helpers';

const CASES = [
  { label: 'star', props: { icon: FAVOURITE_ICON.Star } },
  { label: 'heart-checked', props: { icon: FAVOURITE_ICON.Heart, defaultChecked: true } },
  { label: 'disabled', props: { disabled: true } },
];

test.describe('Favourite — accessibility', () => {
  for (const { label, props } of CASES) {
    test(`no axe violations — ${label}`, async ({ page, gotoStory }) => {
      await gotoStory(buildFavouriteStory(props));
      await expect(page.locator(ROOT_SELECTOR)).toBeVisible();
      const results = await new AxeBuilder({ page }).include(ROOT_SELECTOR).disableRules(A11Y_DISABLED_RULES).analyze();
      expect(results.violations).toEqual([]);
    });
  }
});
