import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS, TIME_PICKER_CONTENT_TEST_ID } from './helpers';

test('FieldTime preserves manual scroll until a new hour is selected', async ({ page, gotoStory, getByTestId }) => {
  await gotoStory(buildStoryOptions(undefined, undefined, { layoutType: 'desktop' }));

  const input = getByTestId(TEST_IDS.fieldTimeInput);
  await input.click();
  await expect(getByTestId(TIME_PICKER_CONTENT_TEST_ID)).toBeVisible();
  await expect(input).toBeFocused();

  const nextHour = getByTestId(`hours-${TEST_IDS.fieldTime}__picker-18`);
  const viewport = nextHour.locator('xpath=ancestor::*[@data-overlayscrollbars-viewport][1]');
  await nextHour.evaluate(item => {
    const container = item.closest<HTMLElement>('[data-overlayscrollbars-viewport]');
    if (!container) throw new Error('Missing hours scroll viewport');
    container.scrollTop +=
      item.getBoundingClientRect().top -
      container.getBoundingClientRect().top -
      (container.clientHeight - item.getBoundingClientRect().height) / 2;
  });

  const scrollTop = await viewport.evaluate(element => element.scrollTop);
  expect(scrollTop).toBeGreaterThan(0);
  await nextHour.hover();
  await page.mouse.down();
  await expect(input).not.toBeFocused();
  await expect.poll(() => viewport.evaluate(element => element.scrollTop)).toBe(scrollTop);
  await page.mouse.up();
  await expect(input).toHaveValue('18:30:00');

  await viewport.evaluate(element => {
    element.scrollTop = 0;
  });
  await getByTestId(`hours-${TEST_IDS.fieldTime}__picker-0`).click();
  await expect(input).toHaveValue('00:30:00');
  await expect.poll(() => viewport.evaluate(element => element.scrollTop)).toBe(0);
});
