import { StorybookUrlOptions } from '#playwright-tooling/utils';

/** Сегмент URL: `components-calendar-<ITEM_NAME>--<story>`. */
export const ITEM_GROUP = 'calendar';

export const ITEM_NAME = 'item';

export const ITEM_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

/**
 * URL iframe для сторис Item.
 *
 * @param props аргументы Playground (`size`, `checked`, `disabled`, …)
 * @param story имя экспорта (по умолчанию `playground`)
 */
export function buildItemOptions(
  props?: Record<string, unknown>,
  story: string = ITEM_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ITEM_NAME,
    group: ITEM_GROUP,
    story,
    props,
  };
}
