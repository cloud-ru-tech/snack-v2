// Слоты popup-private сами проставляют `data-test-id` из `src/constants.ts::TEST_IDS`
// (реэкспортится ниже как `SLOT_TEST_IDS`), поэтому здесь заводим только story-level id
// оборачивающих демо-контейнеров.
export { TEST_IDS as SLOT_TEST_IDS } from '@ds/popup-private';

export const TEST_IDS = {
  header: { surface: 'popup-header-surface' },
  footer: { surface: 'popup-footer-surface' },
  body: { surface: 'popup-body-surface' },
  media: { surface: 'popup-media-surface' },
  closeButton: { surface: 'popup-close-button-surface' },
} as const;
