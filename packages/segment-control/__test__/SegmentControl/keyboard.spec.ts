import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, segmentTestId } from './helpers';

const ITEMS = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
  { value: 'three', label: 'Three' },
];

const ITEMS_WITH_DISABLED = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two', disabled: true },
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
];

test.describe('SegmentControl — keyboard', () => {
  test('Tab focuses the selected segment', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'two' }));

    await page.keyboard.press('Tab');

    await expect(getByTestId(segmentTestId('two'))).toBeFocused();
  });

  test('ArrowRight moves focus to next segment', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'one' }));

    await page.keyboard.press('Tab');
    await expect(getByTestId(segmentTestId('one'))).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(getByTestId(segmentTestId('two'))).toBeFocused();
  });

  test('ArrowLeft moves focus to previous segment', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'two' }));

    await page.keyboard.press('Tab');
    await expect(getByTestId(segmentTestId('two'))).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(getByTestId(segmentTestId('one'))).toBeFocused();
  });

  test('ArrowRight skips disabled segment', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS_WITH_DISABLED, defaultValue: 'one' }));

    await page.keyboard.press('Tab');
    await expect(getByTestId(segmentTestId('one'))).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(getByTestId(segmentTestId('three'))).toBeFocused();
  });

  test('Enter selects focused segment', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'one' }));

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');

    await expect(getByTestId(segmentTestId('two'))).toHaveAttribute('aria-checked', 'true');
  });

  test('Space selects focused segment', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'one' }));

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Space');

    await expect(getByTestId(segmentTestId('two'))).toHaveAttribute('aria-checked', 'true');
  });
});
