import { expect, test } from '../../../../playwright/fixtures';
import { CHEVRON } from '../../src/constants';
import { buildStoryOptions, COLLAPSE_BLOCK_TEST_ID, CONTENT_TEST_ID, TITLE_TEST_ID } from './helpers';

test.describe('CollapseBlockTertiary — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toBeVisible();
    await expect(getByTestId(TITLE_TEST_ID)).toBeVisible();
  });

  test('data-component=accordionTertiary', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-component', 'accordionTertiary');
  });

  for (const chevron of Object.values(CHEVRON)) {
    test(`chevron=${chevron}`, async ({ gotoStory, page }) => {
      await gotoStory(buildStoryOptions({ chevron }));

      await expect(page.locator(`[data-chevron="${chevron}"]`)).toBeVisible();
    });
  }

  test('expands on title click', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ children: 'Tertiary content' }));

    await getByTestId(TITLE_TEST_ID).click();

    await expect(getByTestId(COLLAPSE_BLOCK_TEST_ID)).toHaveAttribute('data-expanded', 'true');
    await expect(getByTestId(CONTENT_TEST_ID)).toContainText('Tertiary content');
  });
});
