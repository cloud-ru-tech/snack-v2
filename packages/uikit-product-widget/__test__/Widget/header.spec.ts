import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions } from './helpers';

const story = { name: 'widget', story: 'header-compatibility' };

test('header renders simple title and icon', async ({ gotoStory, page }) => {
  await gotoStory(buildStoryOptions(undefined, story));
  const widget = page.getByTestId('widget-simple');
  const link = widget.getByRole('link');
  await expect(link).toHaveAttribute('href', '#project');
  await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(link.getByRole('heading', { level: 2 })).toHaveText('Project');
  await expect(link.getByTestId('title-clickable__icon')).toBeVisible();
});

test('header children render after simple title', async ({ gotoStory, page }) => {
  await gotoStory(buildStoryOptions(undefined, story));
  const link = page.getByTestId('widget-custom').getByRole('link');
  await expect(link.getByRole('heading', { level: 2 })).toHaveText('Project');
  await expect(link.getByTestId('title-clickable__icon')).toBeVisible();
  await expect(link.getByTestId('custom-header')).toHaveText('Custom header');
  expect(
    await link.evaluate(element => {
      const title = element.querySelector('h2');
      const children = element.querySelector('[data-test-id="custom-header"]');
      return Boolean(title && children && title.compareDocumentPosition(children) & Node.DOCUMENT_POSITION_FOLLOWING);
    }),
  ).toBe(true);
});

test('false header children preserve simple title and icon', async ({ gotoStory, page }) => {
  await gotoStory(buildStoryOptions(undefined, story));
  const link = page.getByTestId('widget-empty').getByRole('link');
  await expect(link.getByRole('heading', { level: 2 })).toHaveText('Project');
  await expect(link.getByTestId('title-clickable__icon')).toBeVisible();
  await expect(link.getByTestId('custom-header')).toHaveCount(0);
});
