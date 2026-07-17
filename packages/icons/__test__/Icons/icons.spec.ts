import { expect, test } from '#playwright-tooling/fixtures';

const CATALOG_TEST_ID = 'icons-catalog';
const ICON_CARD_SELECTOR = '[data-test-id^="icon-card-"]';
const ICON_ROW_SELECTOR = '[data-test-id^="icons-row-"]';
const NOT_FOUND_WARNING = '[@design-system/icons] Symbol';

test.describe('Icons', () => {
  test('Standalone variant renders icon rows', async ({ gotoStory, getByTestId }) => {
    await gotoStory({
      category: 'components',
      group: 'icons',
      name: 'interfaces-visual-matrix',
      story: 'interfaces-visual-matrix',
      props: {
        variant: 'standalone',
        size: 24,
      },
    });

    const wrapper = getByTestId(CATALOG_TEST_ID);
    await expect(wrapper).toBeVisible();

    const rows = wrapper.locator(ICON_ROW_SELECTOR);
    await expect(rows.first()).toBeVisible({ timeout: 5000 });
    expect(await rows.count()).toBeGreaterThan(0);

    const icons = wrapper.locator(ICON_CARD_SELECTOR);
    await expect(icons.first()).toBeVisible();
    expect(await icons.count()).toBeGreaterThan(10);
  });

  test('Sprite variant renders icon rows without missing symbol warnings', async ({ gotoStory, getByTestId, page }) => {
    const warnings: string[] = [];
    page.on('console', msg => {
      if (msg.type() !== 'warning') return;
      const text = msg.text();
      if (text.includes(NOT_FOUND_WARNING) && text.includes('not found on page')) {
        warnings.push(text);
      }
    });

    await gotoStory({
      category: 'components',
      group: 'icons',
      name: 'interfaces-visual-matrix',
      story: 'interfaces-visual-matrix',
      props: {
        variant: 'sprite',
        size: 24,
      },
    });

    const wrapper = getByTestId(CATALOG_TEST_ID);
    await expect(wrapper).toBeVisible();

    const rows = wrapper.locator(ICON_ROW_SELECTOR);
    await expect(rows.first()).toBeVisible({ timeout: 5000 });
    expect(await rows.count()).toBeGreaterThan(0);

    const icons = wrapper.locator(ICON_CARD_SELECTOR);
    await expect(icons.first()).toBeVisible();
    expect(await icons.count()).toBeGreaterThan(10);

    await expect.poll(() => warnings.length).toBe(0);
  });
});
