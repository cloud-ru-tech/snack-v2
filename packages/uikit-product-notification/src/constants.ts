export const APPEARANCE = {
  Default: 'default',
  Error: 'error',
  Warning: 'warning',
  Success: 'success',
} as const;

export const TEST_IDS = {
  card: {
    root: 'notification-card',
    label: 'notification-card__label',
    title: 'notification-card__title',
    content: 'notification-card__content',
    link: 'notification-card__link',
    date: 'notification-card__date',
    statusIndicator: 'notification-card__status-indicator',
    skeleton: 'notification-card__skeleton',
    actions: {
      wrapper: 'notification-card__actions',
      droplist: 'notification-card__droplist',
      droplistTrigger: 'notification-card__droplist-trigger',
      droplistAction: 'notification-card__droplist-action',
    },
    primaryButton: 'notification-card__primary-button',
    secondaryButton: 'notification-card__secondary-button',
  },
  panel: {
    root: 'notification-panel',
    title: 'notification-panel__title',
    segments: 'notification-panel__segments',
    chipToggle: 'notification-panel__chip-toggle',
    settings: {
      droplist: 'notification-panel__settings__droplist',
      droplistTrigger: 'notification-panel__settings__droplist-trigger',
      droplistAction: 'notification-panel__settings__droplist-action',
    },
    readAll: 'notification-panel__read-all',
    footerButton: 'notification-panel__footer-button',
    blank: 'notification-panel__blank',
    error: 'notification-panel__error',
    group: {
      root: 'notification-panel__group',
      title: 'notification-panel__group__title',
    },
    cardStack: {
      headline: 'notification-panel__card-stack__headline',
      wrapper: 'notification-panel__card-stack__wrapper',
      title: 'notification-panel__card-stack__title',
      openButton: 'notification-panel__card-stack__open-button',
      actions: {
        wrapper: 'notification-panel__card-stack__actions',
        droplist: 'notification-panel__card-stack__droplist',
        droplistTrigger: 'notification-panel__card-stack__droplist-trigger',
        droplistAction: 'notification-panel__card-stack__droplist-action',
      },
    },
  },
} as const;
