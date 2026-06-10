import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, FLEX_TEST_ID } from './helpers';

test.describe('Flex — polymorphism (as)', () => {
  test('as="a" renders an anchor with href', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ as: 'a', href: 'test' }));
    const root = getByTestId(FLEX_TEST_ID);
    expect(await root.evaluate(node => node.tagName.toLowerCase())).toBe('a');
    await expect(root).toHaveAttribute('href', 'test');
  });

  test('as="section" renders a section element', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ as: 'section' }));
    const root = getByTestId(FLEX_TEST_ID);
    expect(await root.evaluate(node => node.tagName.toLowerCase())).toBe('section');
  });
});
