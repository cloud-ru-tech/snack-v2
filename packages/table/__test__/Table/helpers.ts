import { Locator, Page } from '@playwright/test';

import { dataTestIdSelector, StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { getPageNumberTestId } from '../../../pagination/src/constants';
import { TEST_IDS as SKELETON_TEST_IDS } from '../../../skeleton/src/constants';
import { DEFAULT_PAGE_SIZE } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';

export { DEFAULT_PAGE_SIZE, getPageNumberTestId, TEST_IDS };

export const SKELETON_TEXT_LINE_TEST_ID = SKELETON_TEST_IDS.skeletonText.line;

/** Storybook global `density` — mobile-сценарии рендерятся в comfort-плотности. */
export const COMFORT_DENSITY_GLOBALS = { density: 'comfort' } as const;

/** Mobile visual baseline: layoutType + comfort density. */
export const MOBILE_COMFORT_GLOBALS = { layoutType: 'mobile', density: 'comfort' } as const;

/** Ключевая выборка по осям Playground — не декартово произведение. */
export const TABLE_KEY_COMBOS = [
  { layoutType: 'desktop', view: 'table' },
  { layoutType: 'desktop', view: 'cards' },
  { layoutType: 'mobile', view: 'table' },
  { layoutType: 'mobile', view: 'cards' },
] as const satisfies ReadonlyArray<Record<string, unknown>>;

/**
 * Header-cell конкретной колонки. `data-header-id` — публичный data-атрибут
 * HeaderCell (= id колонки из API); это уточнение TEST_IDS-локатора по
 * runtime-атрибуту, а не ad-hoc CSS-селектор (аналогично исключению для
 * атрибутных assertion'ов в polymorphism.spec).
 */
export function headerCellById(page: Page, columnId: string): Locator {
  return page
    .locator(dataTestIdSelector(TEST_IDS.component.headerCell))
    .and(page.locator(`[data-header-id="${columnId}"]`));
}

/**
 * Story id'ы пакета: title `Components/Table/Table[/...]` кебабится
 * Storybook'ом посегментно, PascalCase-сегменты lowercased целиком без
 * дефисов (`RowActions` → `rowactions`); story-часть — kebab-case имени
 * экспорта. Канонический источник — `http://localhost:6006/index.json`.
 */
export const TABLE_STORIES = {
  playground: { name: 'table-table', story: 'playground' },
  visualMatrix: { name: 'table-table', story: 'visual-matrix' },
  sorting: { name: 'table-table-examples-sorting', story: 'sorting' },
  selection: { name: 'table-table-examples-selection', story: 'selection' },
  selectionAllRows: { name: 'table-table-examples-selection', story: 'selection-all-rows' },
  rowActions: { name: 'table-table-examples-rowactions', story: 'row-actions' },
  statusColumn: { name: 'table-table-examples-statuscolumn', story: 'status-column' },
  tree: { name: 'table-table-examples-tree', story: 'tree' },
  cardView: { name: 'table-table-examples-cardview', story: 'card-view' },
  mobileLayout: { name: 'table-table-examples-mobilelayout', story: 'mobile-layout' },
  filters: { name: 'table-table-examples-filters', story: 'filters' },
  columnsSettings: { name: 'table-table-examples-columnssettings', story: 'columns-settings' },
  infiniteScroll: { name: 'table-table-examples-infinitescroll', story: 'infinite-scroll' },
  interactionTest: { name: 'table-table-tests-interaction', story: 'interaction' },
  savedState: { name: 'table-table-examples-savedstate', story: 'saved-state' },
  stickyControlsOffset: { name: 'table-table-examples-stickycontrolsoffset', story: 'sticky-controls-offset' },
  fullWidth: { name: 'table-table-examples-fullwidth', story: 'full-width' },
} as const satisfies Record<string, StoryRef>;

export type TableStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: TableStoryProps,
  ref: StoryRef = TABLE_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  const { layoutType, ...storyProps } = props ?? {};

  return {
    ...ref,
    props: {
      'data-test-id': TEST_IDS.table.root,
      ...storyProps,
    },
    globals: {
      ...(layoutType !== undefined ? { layoutType } : {}),
      ...globals,
    },
  };
}
