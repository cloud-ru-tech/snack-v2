import { expect, test } from '#playwright-tooling/fixtures';

import { getPageNumberTestId } from '../../../pagination/src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('SectionMedia — rendering', () => {
  test('renders section and video poster', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.section)).toBeVisible();
    await expect(getByTestId(TEST_IDS.poster)).toBeVisible();
  });
  test('image props propagate and replace the player', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mediaType: 'image', alt: 'Example image' }));
    await expect(getByTestId(TEST_IDS.image)).toHaveAttribute('alt', 'Example image');
    await expect(getByTestId(TEST_IDS.image)).toHaveAttribute('loading', 'lazy');
    await expect(getByTestId(TEST_IDS.root)).toHaveCount(0);
  });
  test.describe('props propagation', () => {
    for (const container of ['new', 'old']) {
      test('container=' + container, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ container }));
        await expect(getByTestId(TEST_IDS.section)).toHaveAttribute('data-container', container);
      });
    }
  });
  test('section supports id and aria attributes', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ id: 'presentation', 'aria-label': 'Media section' }));
    await expect(getByTestId(TEST_IDS.section)).toHaveAttribute('id', 'presentation');
    await expect(getByTestId(TEST_IDS.section)).toHaveAttribute('aria-label', 'Media section');
  });
  test('section controls work with image media', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        mediaType: 'image',
        showTabs: true,
        showFilters: true,
        showPagination: true,
        showMoreButton: true,
      }),
    );
    await expect(getByTestId(TEST_IDS.image)).toBeVisible();
    await expect(getByTestId(TEST_IDS.filters)).toBeVisible();
    await expect(getByTestId(TEST_IDS.moreButton)).toBeVisible();

    const tab = getByTestId(`${TEST_IDS.tabPrefix}-data`);
    await tab.click();
    await expect(tab).toHaveAttribute('aria-selected', 'true');

    const secondPage = getByTestId(getPageNumberTestId(2));
    await secondPage.click();
    await expect(secondPage).toHaveAttribute('aria-current', 'page');
  });
});
