import { SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  screenshotRegion,
} from '#playwright-tooling/utils';

import { buildStoryOptions, FIELD_PHONE_STORIES, TEST_IDS } from './helpers';

// У дроплиста @ds/list нет test-id на контейнере; «открыт» детектим по пункту
// страны по умолчанию (Россия). Кадр снимка — весь плавающий контейнер popover'а:
// floating-ui ставит на корень стабильный `data-floating-ui-focusable` (не хеш-класс).
// Прямой импорт id из соседнего пакета в spec ломает playwright-compile — локальные копии.
const RUSSIA_ITEM_TEST_ID = 'list__base-item_russia';
const FLOATING_ROOT_SELECTOR = '[data-floating-ui-focusable]';

test.describe('FieldPhone — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_PHONE_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await assertInteractionStatesSnapshot(page, { target: getByTestId(TEST_IDS.fieldPhone) });
  });

  test('open country droplist', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    const trigger = getByTestId(TEST_IDS.fieldPhoneCountrySelect);
    await trigger.click();

    await expect(page.getByTestId(RUSSIA_ITEM_TEST_ID)).toBeVisible();
    const floatingRoot = page.locator(FLOATING_ROOT_SELECTOR);
    await expect(floatingRoot).toBeVisible();

    // Триггер + весь плавающий контейнер popover'а (полная ширина и высота;
    // вертикальный overflow списка стран допустим — клипится скроллом внутри).
    const png = await screenshotRegion(page, [trigger, floatingRoot], 16, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('open-droplist.png');
  });
});
