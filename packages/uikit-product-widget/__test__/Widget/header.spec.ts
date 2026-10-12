import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions } from './helpers';

const story = { name: 'widget', story: 'header-compatibility' };

test('legacy header renders title, icon and avatar in order', async ({ gotoStory, page }) => {
  await gotoStory(buildStoryOptions(undefined, story));
  const widget = page.getByTestId('widget-avatar');
  const link = widget.getByRole('link');
  await expect(link).toHaveAttribute('href', '#project');
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(link.getByRole('heading', { level: 2 })).toHaveText('Project');
  await expect(link.getByTestId('title-clickable__icon')).toBeVisible();
  await expect(link.getByTestId('title-clickable__avatar-label')).toHaveText('John Doe');
  await expect(link.getByTestId('title-clickable__avatar-subtitle')).toHaveText('Administrator');
  expect(
    await link.evaluate(element => {
      const title = element.querySelector('h2');
      const avatar = element.querySelector('[data-test-id="title-clickable__avatar"]');
      return Boolean(title && avatar && title.compareDocumentPosition(avatar) & Node.DOCUMENT_POSITION_FOLLOWING);
    }),
  ).toBe(true);
});

test('children replace avatar including false', async ({ gotoStory, page }) => {
  await gotoStory(buildStoryOptions(undefined, story));
  const custom = page.getByTestId('widget-custom');
  await expect(custom.getByTestId('custom-header')).toHaveText('Custom header');
  await expect(custom.getByTestId('title-clickable__avatar')).toHaveCount(0);
  await expect(page.getByTestId('widget-empty').getByTestId('title-clickable__avatar')).toHaveCount(0);
});
