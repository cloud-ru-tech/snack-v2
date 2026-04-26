import type { Page } from '@playwright/test';

/**
 * Текстовый снимок сетки календаря (логика как в migration/calendar/__test__/utils.ts),
 * с привязкой к фактическому `data-test-id` корня (`calendar-playground`).
 */
export async function getCalendarTextSnapshot(page: Page, rootTestId: string) {
  return page.evaluate((tid: string) => {
    const ITEM = `item-${tid}`;
    const HEADER_ITEM = `header-item-${tid}`;
    const PERIOD_LEVEL = `period-level-${tid}`;
    const HOURS_ITEM = `hours-${tid}`;
    const MINUTES_ITEM = `minutes-${tid}`;
    const SECONDS_ITEM = `seconds-${tid}`;

    const dataTestIdSelector = (testId: string) => `*[data-test-id="${testId}"]`;

    const getItemsText = (selector: string) => {
      const elements = document.querySelectorAll<HTMLElement>(dataTestIdSelector(selector));
      const items: string[] = [];

      for (const element of elements) {
        let text = element.textContent || '';
        const isSelected = element.getAttribute('data-is-selected') || element.getAttribute('data-checked');
        const isCurrent = element.getAttribute('data-is-current');
        const inRangePosition = element.getAttribute('data-in-range-position');
        text = isCurrent ? `!${text}` : text;
        text = isSelected ? `[${text}]` : text;
        if (inRangePosition === 'start') {
          text = `${text}_`;
        } else if (inRangePosition === 'in') {
          text = `_${text}_`;
        } else if (inRangePosition === 'end') {
          text = `_${text}`;
        }
        items.push(text);
      }

      return items;
    };

    const items = getItemsText(ITEM);
    const header = getItemsText(HEADER_ITEM);
    const hours = getItemsText(HOURS_ITEM);
    const minutes = getItemsText(MINUTES_ITEM);
    const seconds = getItemsText(SECONDS_ITEM);
    const periodLevelName = document.querySelector<HTMLElement>(dataTestIdSelector(PERIOD_LEVEL))?.textContent;

    return {
      ...(periodLevelName ? { periodLevelName } : {}),
      ...(items.length > 0 ? { items: items.join(',') } : {}),
      ...(header.length > 0 ? { header: header.join(',') } : {}),
      ...(hours.length > 0 ? { hours: hours.join(',') } : {}),
      ...(minutes.length > 0 ? { minutes: minutes.join(',') } : {}),
      ...(seconds.length > 0 ? { seconds: seconds.join(',') } : {}),
    };
  }, rootTestId);
}
