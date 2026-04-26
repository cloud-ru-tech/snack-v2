import { expect, test } from '../../../../playwright/fixtures';
import { buildStoryOptions, CHEVRON_TEST_ID, COLLAPSE_BLOCK_TEST_ID, CONTENT_TEST_ID, TITLE_TEST_ID } from './helpers';

test.describe('CollapseBlockPrimary — interaction', () => {
  test('expands when title is clicked', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ children: 'Expanded content' }));

    const block = getByTestId(COLLAPSE_BLOCK_TEST_ID);
    await expect(block).toHaveAttribute('data-expanded', 'false');

    await getByTestId(TITLE_TEST_ID).click();

    await expect(block).toHaveAttribute('data-expanded', 'true');
    await expect(getByTestId(CONTENT_TEST_ID)).toContainText('Expanded content');
  });

  test('collapses on second title click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const block = getByTestId(COLLAPSE_BLOCK_TEST_ID);
    const title = getByTestId(TITLE_TEST_ID);

    await title.click();
    await expect(block).toHaveAttribute('data-expanded', 'true');

    await title.click();
    await expect(block).toHaveAttribute('data-expanded', 'false');
  });

  test('chevron icon is visible and clickable', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    const chevron = getByTestId(CHEVRON_TEST_ID);
    await expect(chevron).toBeVisible();
    await chevron.click();

    await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-expanded', 'true');
  });
});
