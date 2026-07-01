export const CONTENT_STATE = {
  Data: 'data',
  NoData: 'noData',
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
  releaseNotesVideo: 'modal-predefined__release-notes-video',
  releaseNotesError: 'modal-predefined__release-notes-error',
  releaseNotesNoData: 'modal-predefined__release-notes-no-data',
  releaseNotesRetryButton: 'modal-predefined__release-notes-retry-button',
  releaseNotesReadLaterButton: 'modal-predefined__release-notes-read-later-button',
  releaseNotesPrevButton: 'modal-predefined__release-notes-prev-button',
  releaseNotesNextButton: 'modal-predefined__release-notes-next-button',
} as const;
