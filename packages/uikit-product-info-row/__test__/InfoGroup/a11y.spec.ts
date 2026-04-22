import AxeBuilder from '@axe-core/playwright';

import { expect, test } from '../../../../playwright/fixtures';
import { buildInfoGroupStoryOptions } from './helpers';

test.describe('InfoGroup — a11y', () => {
  test('playground — no axe violations', async ({ page, gotoStory }) => {
    await gotoStory(buildInfoGroupStoryOptions());
    const results = await new AxeBuilder({ page }).include('#storybook-root').analyze();
    expect(results.violations).toEqual([]);
  });
});
