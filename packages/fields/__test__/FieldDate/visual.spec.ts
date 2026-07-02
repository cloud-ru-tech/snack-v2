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
  waitForStableBbox,
} from '#playwright-tooling/utils';

import { buildStoryOptions, CALENDAR_DROPDOWN_CONTENT_TEST_ID, FIELD_DATE_STORIES, TEST_IDS } from './helpers';

// Внутренние id мобильной поверхности @ds/calendar (BottomSheet). Дублируем строками: прямой импорт
// из @ds/calendar тянет CSS-modules и ломает playwright-compile. FieldDate передаёт календарю
// `field-date__calendar-dropdown`; на mobile это id самого шита, ячейка дня — `item-<id>`,
// Apply — общий id мобильного календаря.
const MOBILE_SHEET_TEST_ID = 'field-date__calendar-dropdown';
const DAY_ITEM_TEST_ID = 'item-field-date__calendar-dropdown';
const DRUM_HOURS_TEST_ID = 'time-picker-drum__hours';
const MOBILE_APPLY_TEST_ID = 'calendar-mobile-apply';

// Прокрутка барабана времени. Барабан слушает pointer-жест через `setPointerCapture`, который
// Playwright-мышью не устанавливается (moves гейтятся `hasPointerCapture`), поэтому drag не работает.
// Зато у колонки есть нативный `wheel`-хендлер — крутим реальным `page.mouse.wheel`. Маппинг накопления
// детерминирован: для колонки часов deltaY = -9·itemHeight стабильно даёт сдвиг 00 → 03.
async function wheelDrum(page: Page, columnTestId: string, deltaRows: number) {
  const box = await page.getByTestId(columnTestId).boundingBox();
  if (!box) throw new Error(`drum column ${columnTestId} has no bounding box`);
  const itemHeight = box.height / 5; // колонка рендерит 5 строк
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.wheel(0, deltaRows * itemHeight);
}

// Клик по видимой ячейке дня. Список бесконечный: одинаковый номер есть в каждом месяце, а месяцы выше
// вьюпорта остаются в DOM (`.first()`/`:visible` их не отсеивают). Берём ячейку по попаданию во вьюпорт.
function clickVisibleDay(page: Page, num: string) {
  return page.evaluate(
    ({ testId, value }) => {
      const cell = [...document.querySelectorAll(`[data-test-id="${testId}"]`)].find(el => {
        if (el.textContent?.trim() !== value) return false;
        const r = el.getBoundingClientRect();
        return r.top > 90 && r.bottom < window.innerHeight - 100;
      });
      (cell as HTMLElement | undefined)?.click();
    },
    { testId: DAY_ITEM_TEST_ID, value: num },
  );
}

test.describe('FieldDate — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_DATE_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    // Текстовое поле — без pressed.
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.fieldDate),
    });
  });

  // Открытый календарь — портальный overlay, в VisualMatrix не собирается: отдельный снимок.
  // date-time режим, чтобы в кадр попала колонка времени календаря.
  test('open-calendar', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: 'date-time' }));
    await waitForFonts();
    const root = getByTestId(TEST_IDS.fieldDate);
    await root.getByTestId(TEST_IDS.fieldDateCalendar).click();
    const content = getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID);
    await expect(content).toBeVisible();
    const png = await screenshotRegion(page, [root, content], 16, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('open-calendar.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile-сценарий выбора одной даты (mode=date): поле → тап → выбор дня (автозакрытие) → поле.
  // Календарь без value скроллится к текущему месяцу (2026-07); берём ВИДИМУЮ ячейку «15» — это июль.
  test('date: mobile selection scenario', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions({ mode: 'date' }, FIELD_DATE_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();

    const cells: ScreenshotCell[] = [];
    const frame = async (label: string) => {
      cells.push({ label, png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS) });
    };

    await frame('1. field closed');

    await getByTestId(TEST_IDS.fieldDate).getByTestId(TEST_IDS.fieldDateCalendar).click();
    await expect(getByTestId(MOBILE_SHEET_TEST_ID)).toBeVisible();
    // Календарь автоскроллится к текущему месяцу (JS-скролл, `animations:disabled` его не замораживает).
    // Ждём стабилизации bbox ячейки дня, иначе клик/снимок ловят кадр прокрутки (флак под нагрузкой).
    await waitForStableBbox(getByTestId(DAY_ITEM_TEST_ID).first());
    await frame('2. open');

    // В mode=date выбор дня сразу закрывает шит и заполняет поле.
    await clickVisibleDay(page, '15');
    await expect(getByTestId(MOBILE_SHEET_TEST_ID)).toBeHidden();
    await frame('3. field applied');

    // Переоткрываем календарь — теперь у поля есть значение, и в сетке видно выбранный день (подсветка).
    // (В mode=date клик по дню сразу закрывает шит, поэтому подсветку показываем повторным открытием.)
    await getByTestId(TEST_IDS.fieldDate).getByTestId(TEST_IDS.fieldDateCalendar).click();
    await expect(getByTestId(MOBILE_SHEET_TEST_ID)).toBeVisible();
    await expect(page.locator(`[data-test-id="${DAY_ITEM_TEST_ID}"][data-checked="true"]`).first()).toBeVisible();
    await waitForStableBbox(getByTestId(DAY_ITEM_TEST_ID).first());
    await frame('4. date selected in calendar');

    const composite = await composeScreenshots(cells, { layout: 'row' });
    expect(composite).toMatchSnapshot('scenario-mobile-date.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile-сценарий date-time: поле → тап → выбор дня → под-экран времени → скролл барабана → Apply → поле.
  test('date-time: mobile selection scenario', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions({ mode: 'date-time' }, FIELD_DATE_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();

    const cells: ScreenshotCell[] = [];
    const frame = async (label: string) => {
      cells.push({ label, png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS) });
    };

    await frame('1. field closed');

    await getByTestId(TEST_IDS.fieldDate).getByTestId(TEST_IDS.fieldDateCalendar).click();
    await expect(getByTestId(MOBILE_SHEET_TEST_ID)).toBeVisible();
    // Календарь автоскроллится к текущему месяцу (JS-скролл) — ждём стабилизации bbox ячейки дня.
    await waitForStableBbox(getByTestId(DAY_ITEM_TEST_ID).first());
    await frame('2. open calendar');

    // Выбор дня в date-time не закрывает шит, а переводит на под-экран выбора времени (барабан).
    await clickVisibleDay(page, '15');
    await expect(getByTestId('time-picker-drum')).toBeVisible();

    // Возвращаемся на календарь (←), чтобы показать выбранный день подсвеченным в сетке. Оттуда
    // же виден переход к времени (кнопка time). Ждём чекнутую ячейку и стабилизацию скролла.
    await getByTestId('bottom-sheet__back-button').click();
    await expect(page.locator(`[data-test-id="${DAY_ITEM_TEST_ID}"][data-checked="true"]`).first()).toBeVisible();
    await waitForStableBbox(getByTestId(DAY_ITEM_TEST_ID).first());
    await frame('3. date selected in calendar');

    // Возвращаемся к выбору времени кнопкой time-переключателя.
    await getByTestId('calendar-mobile-time-button').click();
    await expect(getByTestId('time-picker-drum')).toBeVisible();
    // Apply времени живёт в отдельном (верхнем) BottomSheet — скоупим на него, т.к. под ним ещё
    // смонтирован календарный шит со своим (задизейбленным) Apply.
    const timeApply = getByTestId('bottom-sheet').getByTestId(MOBILE_APPLY_TEST_ID);
    // Wheel-хендлер барабана вешается в useEffect после маунта — даём привязаться, иначе единственное
    // wheel-событие потеряется. onChange барабана дебаунсится, поэтому ЖДЁМ реальной смены значения
    // (иначе снимок/Apply поймают дефолтное 00:00). Величину не хардкодим — только факт изменения.
    const drumTime = getByTestId('time-picker-drum__selected-time');
    const initialTime = await drumTime.textContent();
    await page.waitForTimeout(400);
    await wheelDrum(page, DRUM_HOURS_TEST_ID, -9);
    await expect(drumTime).not.toHaveText(initialTime ?? '');
    await expect(timeApply).toBeEnabled();
    await frame('4. time picked');

    // Apply — шиты закрываются, поле показывает дату и время.
    await timeApply.click();
    await expect(getByTestId(MOBILE_SHEET_TEST_ID)).toBeHidden();
    await frame('5. field applied');

    const composite = await composeScreenshots(cells, { layout: 'row' });
    expect(composite).toMatchSnapshot('scenario-mobile-date-time.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
