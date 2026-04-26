import { expect, test } from '../../../../playwright/fixtures';
import { SELECTION_MODE } from '../../src/constants';
import { buildStoryOptions, COLLAPSE_BLOCK_TEST_ID, TITLE_TEST_ID } from './helpers';

const TOP_LEVEL_SELECTOR = `[data-test-id="${COLLAPSE_BLOCK_TEST_ID}"][data-component="accordionPrimary"]`;
const TITLE_SELECTOR = `[data-test-id="${TITLE_TEST_ID}"]`;

test.describe('Accordion — interaction', () => {
  test('single mode: expanding a second block collapses the first', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions({ selectionMode: SELECTION_MODE.Single }));

    const blocks = page.locator(TOP_LEVEL_SELECTOR);
    const firstTitle = blocks.nth(0).locator(TITLE_SELECTOR).first();
    const secondTitle = blocks.nth(1).locator(TITLE_SELECTOR).first();

    await firstTitle.click();
    await expect(blocks.nth(0)).toHaveAttribute('data-expanded', 'true');

    await secondTitle.click();
    await expect(blocks.nth(1)).toHaveAttribute('data-expanded', 'true');
    await expect(blocks.nth(0)).toHaveAttribute('data-expanded', 'false');
  });

  test('multiple mode: multiple top-level blocks can be open at once', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions({ selectionMode: SELECTION_MODE.Multiple }));

    const blocks = page.locator(TOP_LEVEL_SELECTOR);
    const firstTitle = blocks.nth(0).locator(TITLE_SELECTOR).first();
    const secondTitle = blocks.nth(1).locator(TITLE_SELECTOR).first();

    await firstTitle.click();
    await secondTitle.click();

    await expect(blocks.nth(0)).toHaveAttribute('data-expanded', 'true');
    await expect(blocks.nth(1)).toHaveAttribute('data-expanded', 'true');
  });
});
