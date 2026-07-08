import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertVisualMatrixSnapshot,
  composeScreenshots,
  ScreenshotCell,
  waitForStableBbox,
} from '#playwright-tooling/utils';

import { CHIP_CHOICE_TEST_IDS } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';
import { buildChipChoiceVariantStory, CHIP_STORIES } from '../_shared/helpers';

const VARIANTS = ['single', 'multiple', 'date', 'daterange', 'time', 'custom'] as const;

// Внутренние id мобильной поверхности @ds/calendar (BottomSheet). Дублируем строками локально:
// прямой импорт из @ds/calendar/@ds/chips тянет CSS-modules и ломает playwright-compile.
// CalendarDropdown строит id ячейки как `item-<data-test-id>`; ChipChoiceDate передаёт `chip-choice__droplist`.
const DAY_ITEM_TEST_ID = `item-${CHIP_CHOICE_TEST_IDS.droplist}`;
const MOBILE_APPLY_TEST_ID = 'calendar-mobile-apply';

test.describe('ChipChoice — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  for (const variant of VARIANTS) {
    test(`visual matrix: ${variant}`, async ({ page, gotoStory, waitForFonts }) => {
      await gotoStory(buildChipChoiceVariantStory(variant, undefined, CHIP_STORIES.visualMatrix));
      await waitForFonts();
      await assertVisualMatrixSnapshot(page);
    });
  }

  // Mobile: календарь date ChipChoice открывается в BottomSheet (адаптивный @ds/calendar),
  // full-viewport overlay. Форсим раскладку тулбар-глобалом `layoutType='mobile'` + mobile viewport;
  // снимок — весь viewport. date-range покрыт полным сценарием ниже.
  test('date: open calendar (mobile bottom sheet)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildChipChoiceVariantStory('date', undefined, CHIP_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();
    await getByTestId(TEST_IDS.chipChoice.root).click();
    // На mobile CalendarDropdown уезжает в BottomSheet; лист получает `data-test-id` дроплиста напрямую.
    await expect(getByTestId(CHIP_CHOICE_TEST_IDS.droplist)).toBeVisible();
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile-date.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });

  // Полный мобильный сценарий выбора диапазона: чип закрыт → тап → выбор начала → выбор конца → Apply.
  // Календарь без value скроллится к текущему месяцу (сегодня 2026-07). Список бесконечный и держит
  // в DOM месяцы выше вьюпорта, поэтому берём именно ВИДИМУЮ ячейку (`visible: true`) — это июль.
  test('date-range: mobile selection scenario', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(
      buildChipChoiceVariantStory('daterange', undefined, CHIP_STORIES.playground, { layoutType: 'mobile' }),
    );
    await waitForFonts();

    // Клик по видимой ячейке дня. Список бесконечный: одинаковый номер есть в каждом месяце, а месяцы
    // выше вьюпорта остаются в DOM (у них есть bbox → `.first()`/`:visible` их не отсеивают). Поэтому
    // выбираем ячейку по реальному попаданию во вьюпорт (между шапкой и футером) — это текущий месяц (июль).
    const clickVisibleDay = (n: string) =>
      page.evaluate(
        ({ testId, num }) => {
          const cell = [...document.querySelectorAll(`[data-test-id="${testId}"]`)].find(el => {
            if (el.textContent?.trim() !== num) return false;
            const r = el.getBoundingClientRect();
            return r.top > 90 && r.bottom < window.innerHeight - 100;
          });
          (cell as HTMLElement | undefined)?.click();
        },
        { testId: DAY_ITEM_TEST_ID, num: n },
      );

    const cells: ScreenshotCell[] = [];
    const frame = async (label: string) => {
      cells.push({ label, png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS) });
    };

    // 1. Чип в закрытом состоянии — то, что видит пользователь.
    await frame('1. chip closed');

    // 2. Тап по чипу — открывается BottomSheet с календарём.
    await getByTestId(TEST_IDS.chipChoice.root).click();
    await expect(getByTestId(CHIP_CHOICE_TEST_IDS.droplist)).toBeVisible();
    // Календарь после открытия автоскроллится к текущему месяцу (JS-скролл, не CSS — `animations:disabled`
    // его не замораживает). Ждём стабилизации bbox ячейки дня, иначе клики/снимок ловят кадр прокрутки.
    await waitForStableBbox(getByTestId(DAY_ITEM_TEST_ID).first());
    await frame('2. open');

    // 3. Выбор начала диапазона (10 июля) — подсветка старта (Apply ещё неактивен, выбран один конец).
    // `.click()` из evaluate обновляет React-состояние асинхронно — ЖДЁМ появления выбранной ячейки,
    // иначе снимок ловит кадр до подсветки (флак).
    await clickVisibleDay('10');
    await expect(page.locator(`[data-test-id="${DAY_ITEM_TEST_ID}"][data-checked="true"]`).first()).toBeVisible();
    await frame('3. range start');

    // 4. Выбор конца (20 июля) — залитый диапазон, футер со значением, активный Apply.
    // Ждём, пока футер покажет полный диапазон (рендер выбора асинхронный), иначе снимок ловит
    // промежуточный кадр.
    await clickVisibleDay('20');
    await expect(getByTestId('selected-chip-choice__droplist')).toContainText('10.07.2026');
    await expect(getByTestId(MOBILE_APPLY_TEST_ID)).toBeEnabled();
    await frame('4. range selected');

    // 5. Apply — значение коммитится, шит закрывается. Значение на чипе появляется синхронно, а
    // закрытие BottomSheet — JS-motion анимация: на throttled-CPU в CI она укладывается за ~3–4с,
    // что перебивает дефолтный 5с `toBeHidden` (на Mac закрывается быстрее). Ждём коммит значения
    // (детерминированный сигнал, что Apply отработал), затем закрытие с увеличенным таймаутом.
    await getByTestId(MOBILE_APPLY_TEST_ID).click();
    await expect(getByTestId(CHIP_CHOICE_TEST_IDS.value)).toContainText('10.07.2026');
    await expect(getByTestId(CHIP_CHOICE_TEST_IDS.droplist)).toBeHidden({ timeout: 15000 });
    await frame('5. chip applied');

    // Сшиваем все шаги в один снимок — так сценарий читается слева направо одним кадром.
    const composite = await composeScreenshots(cells, { layout: 'row' });
    expect(composite).toMatchSnapshot('scenario-mobile-range.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
