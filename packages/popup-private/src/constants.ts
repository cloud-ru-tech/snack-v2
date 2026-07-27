/**
 * Тип media-блока в overlay-шапке.
 *
 * - `Image` — изображение во всю ширину (высота 184px), прижато к шапке (убирается
 *   верхний отступ контент-блока). Горизонтальные паддинги body этим не меняются — они отдельно через `bodyPadding`.
 * - `Icon`  — иконка с `padding-top: 24px`.
 *
 * Соответствие Figma: `bottomSheetMediaImage` (360×184) и `bottomSheetMediaIcon` (360×104).
 */
export const MEDIA_KIND = {
  Image: 'image',
  Icon: 'icon',
} as const;

/**
 * Ориентация кнопок футера, собранных из `approveButton` / `cancelButton` / `additionalButton`.
 * Применяется только при ровно двух кнопках (см. `footerActionsOrientation`).
 *
 * - `Horizontal` — кнопки в ряд через space-between: secondary слева, primary справа, ширина по
 *   контенту. Дефолт — точное соответствие Figma `bottomBar.buttonGroup` (cancel/confirm).
 * - `Vertical`   — кнопки в столбик, full-width (primary сверху).
 */
export const FOOTER_ACTIONS_ORIENTATION = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
} as const;

/**
 * Стабильные `data-test-id` для слотов overlay-chrome (header / body / footer / media / close).
 *
 * Используются для e2e-локаторов в Playwright и Storybook play-функциях. Реэкспортируется из
 * `@ds/bottom-sheet`, чтобы потребитель (приложение) ссылался на те же id, что и наши тесты.
 *
 * Значения намеренно сохраняют префикс `bottom-sheet__` — на фазе выноса слоя из `@ds/bottom-sheet`
 * они переносятся 1:1 без смены поведения; переименование в `popup-private__*` — отдельная фаза.
 *
 * Figma-typo-мост (см. `.claude/rules/figma-integration.md`):
 *   Figma `badgeHandle`          → код `handle` (показывается при `swipeEnabled`)
 *   Figma `blackout`             → код `backdrop` / `showBackdrop`
 *   Figma `topBar`               → код `header` / `onBackButtonClick`
 *   Figma `bottomBar`            → код `footer`
 *   Figma `+ slotMedia`          → код `media`
 *   Figma `+ slotSubtitle`      → код `subtitle` (текст под title)
 *   Figma `+ slotSecondTitle`    → код `slotSecondTitle` (search/segment, только sheet)
 *   Figma `+ slotAfterHeadline`  → код `slotAfterTitle`
 *   Figma `+ slotBottomBar`      → код `footer` (ReactNode)
 *   Figma `buttonBefore` (48×48) → код auto-back-button по `onBackButtonClick`
 *   Figma `buttonAfter`  (48×48) → код `actionButton` (ReactNode)
 */
export const TEST_IDS = {
  root: 'bottom-sheet',
  backdrop: 'bottom-sheet__backdrop',
  handle: 'bottom-sheet__handle',
  header: 'bottom-sheet__header',
  title: 'bottom-sheet__title',
  slotAfterTitle: 'bottom-sheet__slot-after-title',
  subtitle: 'bottom-sheet__subtitle',
  slotSecondTitle: 'bottom-sheet__slot-second-title',
  backButton: 'bottom-sheet__back-button',
  actionButton: 'bottom-sheet__action-button',
  media: 'bottom-sheet__media',
  closeButton: 'popup__close-button',
  body: 'bottom-sheet__body',
  footer: 'bottom-sheet__footer',
  footerApprove: 'bottom-sheet__footer-approve',
  footerCancel: 'bottom-sheet__footer-cancel',
  footerAdditional: 'bottom-sheet__footer-additional',
  // Два разных разделителя (topBar↔body и body↔footer) — разные id, чтобы каждый адресовался
  // однозначно (без strict-mode-коллизии `getByTestId`).
  dividerTop: 'bottom-sheet__divider-top',
  dividerBottom: 'bottom-sheet__divider-bottom',
} as const;
