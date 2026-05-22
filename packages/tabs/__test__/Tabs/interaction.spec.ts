import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TABS_STORIES, TEST_IDS } from './helpers';

test.describe('Tabs — interaction', () => {
  // Browser-only: Playwright `click({ force: true })` обходит pointer-events:none /
  // aria-disabled и проверяет, что компонент сам игнорирует выбор отключённой вкладки.
  // Эквивалента в Storybook play (userEvent) нет — userEvent уважает disabled и
  // не дойдёт до обработчика клика.
  test('forced click on disabled tab does not switch selection', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, TABS_STORIES.disabledTab));
    const overviewTab = getByTestId(TEST_IDS.tab.overview);
    await expect(overviewTab).toHaveAttribute('aria-selected', 'true');
    await getByTestId(TEST_IDS.tab.billing).click({ force: true });
    await expect(overviewTab).toHaveAttribute('aria-selected', 'true');
  });
});
