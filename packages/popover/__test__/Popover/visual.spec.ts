import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { composeScreenshots, ScreenshotCell, screenshotRegion } from '#playwright-tooling/utils';

import { buildStoryOptions, TEST_IDS } from './helpers';

const PLACEMENTS = ['top', 'bottom', 'left', 'right'] as const;
const WIDTH_STRATEGIES = ['eq', 'auto'] as const;

test.describe('Popover — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // Снимаем page целиком (а не только content), чтобы был виден триггер и взаимное
  // расположение panel'а относительно него — main visual signal popover'а.
  test('placements — composite', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    const cells: ScreenshotCell[] = [];
    for (const placement of PLACEMENTS) {
      await gotoStory(buildStoryOptions({ placement, trigger: 'click' }));
      await waitForFonts();
      await getByTestId(TEST_IDS.triggerOpen).click();
      const content = getByTestId(TEST_IDS.content);
      await expect(content).toBeVisible();
      const png = await screenshotRegion(
        page,
        [getByTestId(TEST_IDS.triggerOpen), content],
        32,
        SCREENSHOT_DEFAULT_OPTS,
      );
      cells.push({ label: placement, png });
    }
    const composite = await composeScreenshots(cells, { layout: 'grid', columns: 2, gap: 32, padding: 24 });
    expect(composite).toMatchSnapshot('placements.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('widths — composite (eq × auto)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    const cells: ScreenshotCell[] = [];
    for (const widthStrategy of WIDTH_STRATEGIES) {
      await gotoStory(buildStoryOptions({ widthStrategy, trigger: 'click' }));
      await waitForFonts();
      await getByTestId(TEST_IDS.triggerOpen).click();
      const content = getByTestId(TEST_IDS.content);
      await expect(content).toBeVisible();
      const png = await screenshotRegion(
        page,
        [getByTestId(TEST_IDS.triggerOpen), content],
        32,
        SCREENSHOT_DEFAULT_OPTS,
      );
      cells.push({ label: widthStrategy, png });
    }
    const composite = await composeScreenshots(cells, { layout: 'col', gap: 32, padding: 24 });
    expect(composite).toMatchSnapshot('widths.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('open — long content (wrap + max-width)', async ({ gotoStory, getByTestId, page, waitForFonts }) => {
    await gotoStory(
      buildStoryOptions({
        trigger: 'click',
        // Только буквы/цифры/пробелы — Storybook отбрасывает URL-args со спецсимволами
        // и пунктуацией (значение целиком выкидывается санитайзером, content откатывается
        // к дефолтному слоту). Длина строки здесь демонстрирует wrap и max-width.
        content:
          'Long popover content used for visual regression to check wrap and max width of the container Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      }),
    );
    await waitForFonts();
    await getByTestId(TEST_IDS.triggerOpen).click();
    const content = getByTestId(TEST_IDS.content);
    await expect(content).toBeVisible();
    const png = await screenshotRegion(page, [getByTestId(TEST_IDS.triggerOpen), content], 32, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('open-long-content.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
