import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, FLEX_TEST_ID } from './helpers';

test.describe('Flex — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(FLEX_TEST_ID)).toBeVisible();
  });

  test('CSS layout props apply via computed style', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildStoryOptions({
        direction: 'column',
        justify: 'space-between',
        align: 'center',
        wrap: 'wrap-reverse',
        gap: '3m',
        fullWidth: true,
      }),
    );
    const root = getByTestId(FLEX_TEST_ID);
    await expect(root).toHaveCSS('flex-direction', 'column');
    await expect(root).toHaveCSS('justify-content', 'space-between');
    await expect(root).toHaveCSS('align-items', 'center');
    await expect(root).toHaveCSS('flex-wrap', 'wrap-reverse');
    // gap-токен резолвится через data-* + SCSS в dimension (3m → 24px).
    await expect(root).toHaveAttribute('data-gap', '3m');
    await expect(root).toHaveCSS('gap', '24px');
    await expect(root).toHaveAttribute('data-full-width', 'true');
  });

  test('columnGap / rowGap tokens propagate to data-* and resolve in CSS', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ columnGap: '4m', rowGap: '1m' }));
    const root = getByTestId(FLEX_TEST_ID);
    await expect(root).toHaveAttribute('data-column-gap', '4m');
    await expect(root).toHaveAttribute('data-row-gap', '1m');
    await expect(root).toHaveCSS('column-gap', '32px');
    await expect(root).toHaveCSS('row-gap', '8px');
  });

  test('boolean wrap resolves to nowrap', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ wrap: false }));
    await expect(getByTestId(FLEX_TEST_ID)).toHaveCSS('flex-wrap', 'nowrap');
  });

  test('overflow props apply via computed style', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ overflowX: 'auto', overflowY: 'hidden' }));
    const root = getByTestId(FLEX_TEST_ID);
    await expect(root).toHaveCSS('overflow-x', 'auto');
    await expect(root).toHaveCSS('overflow-y', 'hidden');
  });

  test('width keyword (ElementSize) maps to data-*, numeric height stays inline', async ({
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions({ width: 'max-content', height: 48 }));
    const root = getByTestId(FLEX_TEST_ID);
    // keyword-размер уходит в data-* + SCSS, а не в инлайн-стиль.
    await expect(root).toHaveAttribute('data-width', 'max-content');
    expect(await root.evaluate(el => (el as HTMLElement).style.width)).toBe('');
    // произвольная числовая height — инлайн-стилем (px).
    expect(await root.evaluate(el => (el as HTMLElement).style.height)).toBe('48px');
    await expect(root).toHaveCSS('height', '48px');
  });

  test('flex keyword maps to data-*, arbitrary flex stays inline', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ flex: 'auto' }));
    const root = getByTestId(FLEX_TEST_ID);
    // keyword `auto` → data-flex + SCSS (`flex: auto` = `1 1 auto`), не инлайн.
    await expect(root).toHaveAttribute('data-flex', 'auto');
    expect(await root.evaluate(el => (el as HTMLElement).style.flex)).toBe('');
    await expect(root).toHaveCSS('flex-grow', '1');
  });
});
