import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, waitForSettledInViewport } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';
import { buildMainMenuStoryOptions, MAIN_MENU_STORIES } from './helpers';

test.describe('MainMenu — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildMainMenuStoryOptions(undefined, MAIN_MENU_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Дровер меню — portal-overlay на весь экран, поэтому снимаем viewport целиком.
  test('open drawer (desktop)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildMainMenuStoryOptions());
    await waitForFonts();
    await getByTestId(TEST_IDS.mainMenu.drawerButton).click();
    await waitForSettledInViewport(getByTestId(TEST_IDS.mainMenu.right));
    // Поле поиска получает фокус при открытии (см. MenuDesktop) — курсор уводим,
    // чтобы не поймать hover на карточке под точкой клика.
    await page.mouse.move(0, 0);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot('open.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile: вместо левого дровера открывается bottom sheet (MenuMobile).
  test('open drawer (mobile)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildMainMenuStoryOptions(undefined, MAIN_MENU_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();
    await getByTestId(TEST_IDS.mainMenu.drawerButton).click();
    await waitForSettledInViewport(getByTestId(TEST_IDS.mainMenu.drawerMobile));
    await page.mouse.move(0, 0);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });

  // Поиск: результаты в сетке — отдельный сценарий, в матрице закрытого триггера его не видно.
  test('open drawer with search results', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildMainMenuStoryOptions());
    await waitForFonts();
    await getByTestId(TEST_IDS.mainMenu.drawerButton).click();
    await waitForSettledInViewport(getByTestId(TEST_IDS.mainMenu.right));
    await getByTestId(TEST_IDS.mainMenu.search).locator('input').fill('ml');
    await waitForSettledInViewport(getByTestId(TEST_IDS.mainMenu.right));
    await page.mouse.move(0, 0);
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-search.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
