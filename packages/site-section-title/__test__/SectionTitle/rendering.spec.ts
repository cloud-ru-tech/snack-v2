import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('SectionTitle — rendering', () => {
  test('renders slots and propagates type', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());

    const root = getByTestId(TEST_IDS.root);
    for (const slot of [TEST_IDS.title, TEST_IDS.description]) {
      await expect(getByTestId(slot)).toBeVisible();
    }

    for (const type of ['descriptionRight', 'centered']) {
      await test.step(`type=${type}`, async () => {
        await setStoryArgs({ type });
        await expect(root).toHaveAttribute('data-type', type);
      });
    }
  });

  test('optional slots are not rendered', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());

    await setStoryArgs({ description: undefined });
    await expect(getByTestId(TEST_IDS.description)).toHaveCount(0);
    await expect(getByTestId(TEST_IDS.title)).toBeVisible();
  });

  test('titleTag sets the heading tag without a nested wrapper', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ titleTag: 'h1' }));

    const title = getByTestId(TEST_IDS.title);
    await expect(title).toHaveJSProperty('tagName', 'H1');
    await expect(title.locator('> div')).toHaveCount(0);
  });
});
