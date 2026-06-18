import { TEST_IDS as COMPONENT_TEST_IDS } from '../src/constants';

/**
 * Единый объект stories-level test-id для пакета table (multi-component:
 * `Table` + `ServerTable`).
 *
 * `TEST_IDS.table.root` / `TEST_IDS.serverTable.root` — корни компонентов,
 * прокидываются через `data-test-id` пропс (оседает на wrapper-`<div>` Table
 * через `extractSupportProps(rest)`).
 *
 * `TEST_IDS.component` — реэкспорт `TEST_IDS` из `src/constants.ts`
 * (`bodyRow`, `headerCell`, `rowSelect`, `tree.*`, `rowActions.*`, …) —
 * стабильные селекторы внутренних слотов, которые компонент ставит сам.
 *
 * `TEST_IDS.toolbar` — внутренние id slot'ов `@ds/toolbar`
 * (не путать с `TEST_IDS.component.toolbar` — обёрткой, которую ставит Table).
 * Локальные копии вместо импорта намеренно: корневой entry `@ds/toolbar`
 * тянет компоненты с CSS — такой импорт сломает playwright-compile, когда
 * `__test__/<C>/helpers.ts` импортирует этот файл. Синхронизируй значения с
 * `packages/toolbar/src/testIds.ts` (`TEST_IDS`) и
 * `packages/search/src/constants.ts` (`TEST_IDS.input`).
 */
export const TEST_IDS = {
  table: {
    root: 'table',
  },
  serverTable: {
    root: 'server-table',
  },
  component: COMPONENT_TEST_IDS,
  visualMatrix: {
    /** Ячейка VisualMatrix: полный loading (data=[], skeleton body) */
    loadingSection: 'table__visual-matrix-loading',
  },
  /**
   * Test-id'ы из `@ds/list` — локальные копии вместо импорта (см. комментарий
   * к `toolbar`). Синхронизируй с `packages/list/src/constants.ts` (`TEST_IDS`).
   */
  list: {
    /** Кнопка «Show all / Hide all» в группе `group-select` */
    bulkSelectButton: 'list__bulk-select-button',
  },
  toolbar: {
    /** Обёртка сегмент-контрола переключения вида table/cards */
    dataView: 'toolbar__data-view',
    /**
     * Сегмент «карточки» внутри dataView. Id собирает @ds/segment-control:
     * `section-${value}`, где value — `DATA_VIEW_VALUE.Compact` ('compact') из
     * helperComponents/DataView тулбара. Синхронизируй с
     * `packages/segment-control/src/constants.ts` (`segmentTestId`).
     */
    dataViewCardsSegment: 'section-compact',
    /** Корень поля поиска (SearchPrivate) в тулбаре */
    search: 'toolbar__search',
    /** Нативный `<input>` внутри поля поиска (id ставит snack-v2-search-private) */
    searchInput: 'search__field-input',
    /** Кнопка overflow «⋯» на mobile — слоты `after` уезжают в more-actions */
    moreActionsButton: 'toolbar__more-actions-button',
    /** Префикс test-id пункта из слота `after` в mobile overflow (`__${index}`) */
    afterOption: 'toolbar__after-option',
  },
} as const;

export const SAVED_STATE_ID = 'table-tests-saved-state';
