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

  test('ArrowRight auto-selects (aria-checked moves)', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'one' }));

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');

    await expect(getByTestId(segmentTestId('two'))).toHaveAttribute('aria-checked', 'true');
    await expect(getByTestId(segmentTestId('one'))).toHaveAttribute('aria-checked', 'false');
  });

  test('ArrowDown alias for ArrowRight', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'one' }));

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');

    await expect(getByTestId(segmentTestId('two'))).toBeFocused();
    await expect(getByTestId(segmentTestId('two'))).toHaveAttribute('aria-checked', 'true');
  });

  test('ArrowUp alias for ArrowLeft', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'two' }));

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp');

    await expect(getByTestId(segmentTestId('one'))).toBeFocused();
    await expect(getByTestId(segmentTestId('one'))).toHaveAttribute('aria-checked', 'true');
  });

  test('ArrowRight wraps from last to first', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'three' }));

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');

    await expect(getByTestId(segmentTestId('one'))).toBeFocused();
    await expect(getByTestId(segmentTestId('one'))).toHaveAttribute('aria-checked', 'true');
  });

  test('ArrowLeft wraps from first to last', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'one' }));

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowLeft');

    await expect(getByTestId(segmentTestId('three'))).toBeFocused();
    await expect(getByTestId(segmentTestId('three'))).toHaveAttribute('aria-checked', 'true');
  });

  test('Home selects first non-disabled', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'three' }));

    await page.keyboard.press('Tab');
    await page.keyboard.press('Home');

    await expect(getByTestId(segmentTestId('one'))).toBeFocused();
    await expect(getByTestId(segmentTestId('one'))).toHaveAttribute('aria-checked', 'true');
  });

  test('End selects last non-disabled', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'one' }));

    await page.keyboard.press('Tab');
    await page.keyboard.press('End');

    await expect(getByTestId(segmentTestId('three'))).toBeFocused();
    await expect(getByTestId(segmentTestId('three'))).toHaveAttribute('aria-checked', 'true');
  });

  test('Tab focuses first non-disabled when nothing selected', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS }));

    await page.keyboard.press('Tab');

    await expect(getByTestId(segmentTestId('one'))).toBeFocused();
  });

  test('Enter selects focused segment', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'one' }));

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await expect(getByTestId(segmentTestId('two'))).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(getByTestId(segmentTestId('two'))).toHaveAttribute('aria-checked', 'true');
  });

  test('Space selects focused segment', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ items: ITEMS, defaultValue: 'one' }));

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowRight');
    await expect(getByTestId(segmentTestId('two'))).toBeFocused();
    await page.keyboard.press('Space');

    await expect(getByTestId(segmentTestId('two'))).toHaveAttribute('aria-checked', 'true');
  });
});
