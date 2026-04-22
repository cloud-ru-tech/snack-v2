import AxeBuilder from '@axe-core/playwright';

import { expect, test } from '../../../../playwright/fixtures';
import { buildInfoRowStoryOptions } from './helpers';

test.describe('InfoRow — a11y', () => {
  test('playground — no axe violations', async ({ page, gotoStory }) => {
    await gotoStory(buildInfoRowStoryOptions());
    const results = await new AxeBuilder({ page }).include('#storybook-root').analyze();
    expect(results.violations).toEqual([]);
  });
});
