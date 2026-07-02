// Корень мобильного BottomSheet, в который адаптивный `@ds/list` Droplist выносит контент.
// Синхронизировать с `@ds/list` src/constants.ts::TEST_IDS.mobileDroplistRoot — кросс-пакетный
// value-import в specs запрещён (тянет CSS-модули в playwright-compile), поэтому литерал продублирован.
export const LIST_MOBILE_DROPLIST_ROOT = 'list__mobile-droplist-root';
