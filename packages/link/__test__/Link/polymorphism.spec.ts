import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Link — polymorphism', () => {
  test('default renders as anchor', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ href: '#' }));

    const tag = await getByTestId(TEST_IDS.root).evaluate(el => el.tagName.toLowerCase());
    expect(tag).toBe('a');
  });

  test('as="button" renders as button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ as: 'button', type: 'button' }));

    const tag = await getByTestId(TEST_IDS.root).evaluate(el => el.tagName.toLowerCase());
    expect(tag).toBe('button');
  });

  test('target="_blank" sets rel containing noopener', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ href: 'https://example.com', target: '_blank' }));

    const rel = await getByTestId(TEST_IDS.root).getAttribute('rel');
    expect(rel).toContain('noopener');
  });
});
