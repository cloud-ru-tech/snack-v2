import { SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, screenshotRegion } from '#playwright-tooling/utils';

import { buildStoryOptions, FIELD_SELECT_CREATE_STORIES, TEST_IDS } from './helpers';

// id'ы из @ds/fields / @ds/list. Прямой импорт из соседних пакетов в spec ломает
// playwright-compile (тянет CSS-модули) — держим локальные копии. У дроплиста нет
// test-id на контейнере; «открыт» детектим по первому пункту (playground: items 1..3),
// а кадр снимка — весь плавающий контейнер popover'а (floating-ui ставит на корень
// стабильный `data-floating-ui-focusable`, не хеш-класс).
const FIELD_SELECT_TEST_ID = 'field-select';
const FIRST_ITEM_TEST_ID = 'list__base-item_1';
const FLOATING_ROOT_SELECTOR = '[data-floating-ui-focusable]';

test.describe('FieldSelectCreate — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_SELECT_CREATE_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('open droplist', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    const field = getByTestId(FIELD_SELECT_TEST_ID);
    await field.click();

    await expect(page.getByTestId(FIRST_ITEM_TEST_ID)).toBeVisible();
    const floatingRoot = page.locator(FLOATING_ROOT_SELECTOR);
    await expect(floatingRoot).toBeVisible();

    // Поле + весь плавающий контейнер открытого списка (полная ширина и высота).
    const png = await screenshotRegion(
      page,
      [getByTestId(TEST_IDS.fieldSelectCreate), floatingRoot],
      16,
      SCREENSHOT_DEFAULT_OPTS,
    );
    expect(png).toMatchSnapshot('open-droplist.png');
  });
});
