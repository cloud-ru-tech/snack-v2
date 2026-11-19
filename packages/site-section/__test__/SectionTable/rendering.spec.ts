import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('SectionTable — rendering', () => {
  test('renders the table inside the section', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ id: 'tariffs' }));

    const root = getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();
    await expect(root).toHaveAttribute('id', 'tariffs');
    await expect(getByTestId(TEST_IDS.table)).toBeVisible();
  });

  test('container propagates to data-container', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.root);

    for (const container of ['new', 'old']) {
      await test.step(container, async () => {
        await setStoryArgs({ container });
        await expect(root).toHaveAttribute('data-container', container);
      });
    }
  });
});
