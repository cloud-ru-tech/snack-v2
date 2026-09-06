export const CONTENT_STATE = {
  Data: 'data',
  NoData: 'noData',
  Error: 'error',
} as const;

export const SURFACE = {
  Modal: 'modal',
  BottomSheet: 'bottomSheet',
} as const;

/**
 * Дефолтная позиция bottom sheet с новостями — по макету весь вьюпорт. Фиксированная позиция вместо
 * высоты по контенту: иначе sheet меняет размер и на переходе `loading → data`, и при переключении
 * слайдов разной длины. Переопределяется пропом `snapPoint`.
 */
export const DEFAULT_RELEASE_NOTES_SNAP_POINT = 1;

/** Состояние загрузки иллюстрации/видео в карточке новости. */
export const MEDIA_STATUS = {
  Pending: 'pending',
  Ready: 'ready',
  Error: 'error',
} as const;

export const CONFIRM_TEXT_VARIANT = {
  Name: 'name',
  Text: 'text',
} as const;

export const TEST_IDS = {
  deleteModal: 'delete-modal',
  recallModal: 'recall-modal',
  releaseNotes: 'release-notes',
  approveButton: 'modal-predefined__approve-button',
  cancelButton: 'modal-predefined__cancel-button',
  confirmInput: 'modal-predefined__confirm-input',
  confirmCopyButton: 'modal-predefined__confirm-copy-button',
  releaseNotesItem: 'modal-predefined__release-notes-item',
  releaseNotesMedia: 'modal-predefined__release-notes-media',
  releaseNotesImage: 'modal-predefined__release-notes-image',
  releaseNotesMediaFallback: 'modal-predefined__release-notes-media-fallback',
  releaseNotesSkeleton: 'modal-predefined__release-notes-skeleton',
  releaseNotesVideo: 'modal-predefined__release-notes-video',
  releaseNotesError: 'modal-predefined__release-notes-error',
  releaseNotesNoData: 'modal-predefined__release-notes-no-data',
  releaseNotesRetryButton: 'modal-predefined__release-notes-retry-button',
  releaseNotesReadLaterButton: 'modal-predefined__release-notes-read-later-button',
  releaseNotesPaginationSlider: 'modal-predefined__release-notes-pagination-slider',
  releaseNotesPrevButton: 'modal-predefined__release-notes-prev-button',
  releaseNotesNextButton: 'modal-predefined__release-notes-next-button',
} as const;
