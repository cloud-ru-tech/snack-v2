import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, composeScreenshots, ScreenshotCell } from '#playwright-tooling/utils';

import { buildStoryOptions, INTERNAL_TEST_IDS, PAGE_SIDEBAR_STORIES } from './helpers';

// Ширина кадра ≥ ширины сайдбара (256px) + запас под collapse-кнопку и границу.
const SCENARIO_CLIP = { x: 0, y: 0, width: 272, height: 620 } as const;

// Ре-рендер отфильтрованного списка синхронный (React state), но у пунктов нет
// собственного test-id, чтобы дождаться конкретного узла — короткая пауза на коммит DOM.
const RENDER_SETTLE_MS = 200;

test.describe('PageSidebar — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // VisualMatrix: заголовок с поиском (свёрнут) × «back»-заголовок.
  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, PAGE_SIDEBAR_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Сценарий состояний сайдбара одной лентой кадров: дефолт → поиск открыт (focus-outline
  // не обрезан) → фильтрация по совпадению → пустой результат → свёрнутый сайдбар.
  test('sidebar states scenario', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize({ width: 900, height: SCENARIO_CLIP.height });
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    const searchTrigger = getByTestId(INTERNAL_TEST_IDS.sidebarSearch.trigger);
    const collapse = getByTestId(INTERNAL_TEST_IDS.sidebarToggle.collapse);
    const expand = getByTestId(INTERNAL_TEST_IDS.sidebarToggle.expand);

    const shot = async (label: string): Promise<ScreenshotCell> => ({
      label,
      png: await page.screenshot({ ...SCREENSHOT_DEFAULT_OPTS, clip: SCENARIO_CLIP }),
    });

    const cells: ScreenshotCell[] = [];

    cells.push(await shot('Default'));

    // Поиск открывается по триггеру и авто-фокусирует поле (виден зелёный focus-outline).
    await searchTrigger.click();
    cells.push(await shot('Search open'));

    // Поле в фокусе — печатаем прямо с клавиатуры, без селектора на @ds/search input.
    await page.keyboard.type('сеть');
    await page.waitForTimeout(RENDER_SETTLE_MS);
    cells.push(await shot('Filtered'));

    await page.keyboard.press('ControlOrMeta+a');
    await page.keyboard.type('zzzqqq');
    await page.waitForTimeout(RENDER_SETTLE_MS);
    cells.push(await shot('No results'));

    // Закрываем поиск и сворачиваем сайдбар: панель уезжает off-canvas, остаётся expand-кнопка.
    await searchTrigger.click();
    await collapse.click();
    await expand.waitFor();
    cells.push(await shot('Collapsed'));

    const composite = await composeScreenshots(cells, { layout: 'row' });
    expect(composite).toMatchSnapshot('states.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
