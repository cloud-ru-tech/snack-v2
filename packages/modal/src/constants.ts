export const TEST_IDS = {
  closeButton: 'modal__close-button',
  header: 'modal__header',
  title: 'modal__title',
  subtitle: 'modal__subtitle',
  backButton: 'modal__back-button',
  slotAfterHeadline: 'modal__slot-after-headline',
  body: 'modal__body',
  footer: 'modal__footer',
  footerApprove: 'modal__footer-approve',
  footerCancel: 'modal__footer-cancel',
  footerAdditional: 'modal__footer-additional',
  footerDisclaimer: 'modal__footer-disclaimer',
  loadingSpinner: 'modal__loading-spinner',
  overlay: 'modal__overlay',
} as const;

export const WIDTH = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const MODE = {
  Regular: 'regular',
  Aggressive: 'aggressive',
  Forced: 'forced',
} as const;
