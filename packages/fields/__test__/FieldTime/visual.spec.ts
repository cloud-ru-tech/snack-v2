import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, Page, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  composeScreenshots,
  ScreenshotCell,
  screenshotRegion,
} from '#playwright-tooling/utils';

import { buildStoryOptions, FIELD_TIME_STORIES, TEST_IDS, TIME_PICKER_CONTENT_TEST_ID } from './helpers';

// Внутренние id мобильной поверхности @ds/calendar (BottomSheet + барабан). Дублируем строками:
// прямой импорт из @ds/calendar тянет CSS-modules и ломает playwright-compile.
// FieldTime передаёт пикеру `data-test-id={`${root}__picker`}` → на mobile это id самого шита.
const MOBILE_PICKER_TEST_ID = 'field-time__picker';
const DRUM_HOURS_TEST_ID = 'time-picker-drum__hours';
const MOBILE_APPLY_TEST_ID = 'time-picker-mobile-apply';

// Прокрутка барабана. Pointer-drag гейтится `setPointerCapture` (Playwright-мышью не ставится),
// зато у колонки есть нативный `wheel`-хендлер — крутим реальным `page.mouse.wheel`. Накопление
// детерминировано: для часов deltaY = -9·itemHeight стабильно сдвигает значение на +3.
async function wheelDrum(page: Page, columnTestId: string, deltaRows: number) {
  const box = await page.getByTestId(columnTestId).boundingBox();
  if (!box) throw new Error(`drum column ${columnTestId} has no bounding box`);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.wheel(0, (deltaRows * box.height) / 5);
}

test.describe('FieldTime — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_TIME_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // showClearButton=false убирает clear из таб-порядка, чтобы Tab фокусировал input; hover — на input.
  test('interaction states (default × hover × focus)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showClearButton: false }));
    await waitForFonts();
    // Текстовое поле — без pressed.
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.fieldTime),
      hoverTarget: getByTestId(TEST_IDS.fieldTimeInput),
    });
  });

  // Открытый time-picker — портальный overlay, в VisualMatrix не собирается: отдельный снимок
  // триггера + контента (барабаны часов/минут/секунд, футер Apply/Current).
  test('open-picker', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    const root = getByTestId(TEST_IDS.fieldTime);
    // Иконка часов декоративна; клик по ней доходит до триггера Dropdown и открывает picker.
    await root.getByTestId(TEST_IDS.fieldTimeIcon).click();
    const content = getByTestId(TIME_PICKER_CONTENT_TEST_ID);
    await expect(content).toBeVisible();
    const png = await screenshotRegion(page, [root, content], 16, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('open-picker.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile-сценарий одним снимком: поле → тап → барабан времени → прокрутка часов → Apply → поле.
  test('mobile time selection scenario', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions(undefined, FIELD_TIME_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();

    const cells: ScreenshotCell[] = [];
    const frame = async (label: string) => {
      cells.push({ label, png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS) });
    };

    // 1. Поле в закрытом состоянии (дефолт 09:30:00).
    await frame('1. field closed');

    // 2. Тап по полю — BottomSheet с барабаном часов/минут/секунд.
    await getByTestId(TEST_IDS.fieldTimeInput).click();
    await expect(getByTestId(MOBILE_PICKER_TEST_ID)).toBeVisible();
    await expect(getByTestId(DRUM_HOURS_TEST_ID)).toBeVisible();
    await frame('2. open drum');

    // 3. Прокрутка барабана часов — значение времени меняется.
    //    Wheel-хендлер вешается в useEffect после маунта — даём привязаться, затем крутим один раз.
    //    onChange барабана дебаунсится, поэтому ЖДЁМ реальной смены значения, иначе снимок/Apply
    //    поймают старое время. Точную величину не хардкодим (в разных средах шаг накопления разный) —
    //    проверяем только факт изменения относительно дефолта.
    const drumTime = getByTestId('time-picker-drum__selected-time');
    const initialTime = await drumTime.textContent();
    await page.waitForTimeout(400);
    await wheelDrum(page, DRUM_HOURS_TEST_ID, -9);
    await expect(drumTime).not.toHaveText(initialTime ?? '');
    await frame('3. time picked');

    // 4. Apply — шит закрывается, поле показывает выбранное время.
    await getByTestId(MOBILE_APPLY_TEST_ID).click();
    await expect(getByTestId(MOBILE_PICKER_TEST_ID)).toBeHidden();
    await frame('4. field applied');

    const composite = await composeScreenshots(cells, { layout: 'row' });
    expect(composite).toMatchSnapshot('scenario-mobile-time.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
