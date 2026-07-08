import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { CHIP_CHOICE_TEST_IDS } from '../../../chips/src/constants';
import { getPageNumberTestId } from '../../../pagination/src/constants';
import { PRIVATE_SEARCH_TEST_IDS } from '../../../search-private/src/constants';
import { TEST_IDS } from '../../stories/testIds';

export { getPageNumberTestId, TEST_IDS };

export const CHIP_CHOICE_VALUE_TEST_ID = CHIP_CHOICE_TEST_IDS.value;

export const SEARCH_LOADING_SPINNER_TEST_ID = PRIVATE_SEARCH_TEST_IDS.iconSun;

/**
 * Story id'ы: title `Components/Table/ServerTable[/...]` кебабится Storybook'ом
 * посегментно, PascalCase-сегменты lowercased целиком без дефисов
 * (`ServerTable` → `servertable`). Канонический источник —
 * `http://localhost:6006/index.json`.
 */
export const SERVER_TABLE_STORIES = {
  playground: { name: 'table-servertable', story: 'playground' },
  visualMatrix: { name: 'table-servertable', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

/** Storybook global `density` — mobile-сценарии рендерятся в comfort-плотности. */
export const COMFORT_DENSITY_GLOBALS = { density: 'comfort' } as const;

/**
 * Ключевая выборка по осям Playground — не декартово произведение. Вид задаём
 * controlled-пропом `view`: mobile-дефолт — cards (TABLE_LAYOUT_PRESETS.mobile),
 * bare `defaultView` его не перебивает, а controlled `view` форсит детерминированно.
 */
export const SERVER_TABLE_KEY_COMBOS = [
  { layoutType: 'desktop', view: 'table' },
  { layoutType: 'desktop', view: 'cards' },
  { layoutType: 'mobile', view: 'table' },
  { layoutType: 'mobile', view: 'cards' },
] as const satisfies ReadonlyArray<Record<string, unknown>>;

export type ServerTableStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: ServerTableStoryProps,
  ref: StoryRef = SERVER_TABLE_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  const { layoutType, ...storyProps } = props ?? {};

  return {
    ...ref,
    props: {
      'data-test-id': TEST_IDS.serverTable.root,
      ...storyProps,
    },
    globals: {
      ...(layoutType !== undefined ? { layoutType } : {}),
      ...globals,
    },
  };
}
