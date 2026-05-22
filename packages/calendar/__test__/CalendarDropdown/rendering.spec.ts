import { expect, test } from '#playwright-tooling/fixtures';

import { CALENDAR_MODE, SIZE } from '../../src/constants';
import { buildCalendarDropdownOptions, CALENDAR_DROPDOWN_STORIES, TEST_IDS } from './helpers';

/** Ключевая выборка `size × mode`: по одному представителю на каждое значение оси. */
const KEY_COMBOS = [
  { size: SIZE.S, mode: CALENDAR_MODE.Date },
  { size: SIZE.M, mode: CALENDAR_MODE.DateRange },
  { size: SIZE.L, mode: CALENDAR_MODE.DateTime },
] as const;

test.describe('CalendarDropdown — rendering', () => {
  /** Триггер, открытая панель и прокидывание пропов во вложенный `Calendar`. */
  test.describe('render', () => {
    test(`story ${CALENDAR_DROPDOWN_STORIES.playground} renders trigger`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCalendarDropdownOptions(undefined, CALENDAR_DROPDOWN_STORIES.playground));
      await expect(getByTestId(TEST_IDS.calendarDropdownTrigger)).toBeVisible();
    });
  });

  test.describe('states', () => {
    test('dropdown shell has test id when panel is open', async ({ gotoStory, getByTestId, page }) => {
      await gotoStory(buildCalendarDropdownOptions({ mode: CALENDAR_MODE.Date, size: SIZE.M }));
      await getByTestId(TEST_IDS.calendarDropdownTrigger).click();
      await expect(page.locator(`[data-test-id="${TEST_IDS.calendarDropdown}"]`)).toBeVisible();
    });

    test('date-time: showSeconds=false на корне календаря внутри панели', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildCalendarDropdownOptions({
          mode: CALENDAR_MODE.DateTime,
          showSeconds: false,
          size: SIZE.M,
        }),
      );
      await getByTestId(TEST_IDS.calendarDropdownTrigger).click();
      const calendarRoot = getByTestId(TEST_IDS.calendarDropdownContent).locator('[data-mode]').first();
      await expect(calendarRoot).toHaveAttribute('data-mode', CALENDAR_MODE.DateTime);
      await expect(calendarRoot).toHaveAttribute('data-show-seconds', 'false');
    });
  });

  test.describe('props propagation', () => {
    for (const { size, mode } of KEY_COMBOS) {
      test(`opened calendar inherits size=${size}, mode=${mode}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildCalendarDropdownOptions({ mode, size }));
        await getByTestId(TEST_IDS.calendarDropdownTrigger).click();
        await expect(getByTestId(TEST_IDS.calendarDropdownContent)).toBeVisible();

        const calendarRoot = getByTestId(TEST_IDS.calendarDropdownContent).locator('[data-mode]').first();
        await expect(calendarRoot).toHaveAttribute('data-mode', mode);
        await expect(calendarRoot).toHaveAttribute('data-size', size);
      });
    }
  });
});
