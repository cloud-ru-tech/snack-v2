import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PLAYGROUND_DEFAULT_ARGS, TEST_IDS } from './helpers';

test.describe('CollapseBlockPrimary — interaction', () => {
  test('expands when title is clicked', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ ...PLAYGROUND_DEFAULT_ARGS, children: 'Expanded content' }));

    const block = getByTestId(TEST_IDS.collapseBlock);
    await expect(block).toHaveAttribute('data-expanded', 'false');

    await getByTestId(TEST_IDS.title).click();

    await expect(block).toHaveAttribute('data-expanded', 'true');
    await expect(getByTestId(TEST_IDS.content)).toContainText('Expanded content');
  });

  test('collapses on second title click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

    const block = getByTestId(TEST_IDS.collapseBlock);
    const title = getByTestId(TEST_IDS.title);

    await title.click();
    await expect(block).toHaveAttribute('data-expanded', 'true');

    await title.click();
    await expect(block).toHaveAttribute('data-expanded', 'false');
  });

  test('chevron icon is visible and clickable', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(PLAYGROUND_DEFAULT_ARGS));

    const chevron = getByTestId(TEST_IDS.chevron);
    await expect(chevron).toBeVisible();
    await chevron.click();

    await expect(getByTestId(TEST_IDS.collapseBlock)).toHaveAttribute('data-expanded', 'true');
  });
});
