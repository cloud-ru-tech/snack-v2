import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS } from './helpers';

for (const suppressToolbar of [false, true]) {
  test(`sessionStorage restores search after reload, suppressToolbar=${suppressToolbar}`, async ({
    page,
    gotoStory,
  }) => {
    await gotoStory({
      name: 'table-table-examples-savedstate',
      story: 'session-state',
      props: { suppressToolbar },
    });
    await expect(page.getByTestId(TEST_IDS.table.root)).toBeVisible();
    await page.evaluate(() => {
      sessionStorage.setItem('table-session-state_filter', JSON.stringify({ search: 'Анна', filter: {} }));
    });
    await page.reload();
    await expect(page.getByTestId(TEST_IDS.table.root)).toBeVisible();
    await expect(page.getByTestId(TEST_IDS.table.root).getByText('Анна Иванова', { exact: true })).toBeVisible();
    await expect(page.getByTestId(TEST_IDS.table.root).getByText('Борис Петров', { exact: true })).toHaveCount(0);
    expect(
      await page.evaluate(() => JSON.parse(sessionStorage.getItem('table-session-state_filter') || '{}').search),
    ).toBe('Анна');
    expect(await page.evaluate(() => localStorage.getItem('table-session-state_filter'))).toBeNull();
    expect(new URL(page.url()).searchParams.has('tableState')).toBe(false);
  });
}
