import { ToasterContainerDefaults, ToasterType } from './types';

export const TOASTER_TYPE = {
  SystemEvent: 'system-event',
  UserAction: 'user-action',
  Upload: 'upload',
} as const;

export const POSITION_SYSTEM_EVENT = {
  TopLeft: 'top-left',
  TopCenter: 'top-center',
  TopRight: 'top-right',
  BottomLeft: 'bottom-left',
  BottomCenter: 'bottom-center',
  BottomRight: 'bottom-right',
} as const;

export const POSITION_USER_ACTION = {
  TopCenter: 'top-center',
  BottomCenter: 'bottom-center',
} as const;

export const TOASTER_WIDTH = {
  Auto: 'auto',
  Full: 'full',
} as const;

export const DRAGGABLE_DIRECTION = {
  X: 'x',
  Y: 'y',
} as const;

export const TOASTER_ROOT_ID = 'toaster-root';
export const TOASTER_CONTAINER_PREFIX = 'toaster-container__';

// Дефолтный id одиночного upload-тоста, который заводит `toaster.upload.startOrUpdate`
// при отсутствии явного `options.id`. Один upload-тост на контейнер — оптимальный
// UX-инвариант (limit=1, см. TOASTER_CONTAINER_DEFAULTS[Upload]).
export const DEFAULT_UPLOAD_TOAST_ID = 'upload';

export const AUTO_CLOSE_TIME: Record<ToasterType, number | false> = {
  [TOASTER_TYPE.SystemEvent]: 5000,
  [TOASTER_TYPE.UserAction]: 2000,
  [TOASTER_TYPE.Upload]: false,
};

export const TOASTER_CONTAINER_DEFAULTS: Record<ToasterType, ToasterContainerDefaults> = {
  [TOASTER_TYPE.SystemEvent]: {
    type: TOASTER_TYPE.SystemEvent,
    position: POSITION_SYSTEM_EVENT.BottomRight,
    limit: 5,
    displayCloseAllButton: true,
    width: TOASTER_WIDTH.Auto,
  },
  [TOASTER_TYPE.UserAction]: {
    type: TOASTER_TYPE.UserAction,
    position: POSITION_USER_ACTION.BottomCenter,
    limit: 2,
    displayCloseAllButton: false,
    width: TOASTER_WIDTH.Auto,
  },
  [TOASTER_TYPE.Upload]: {
    type: TOASTER_TYPE.Upload,
    position: POSITION_SYSTEM_EVENT.BottomRight,
    limit: 1,
    displayCloseAllButton: false,
    width: TOASTER_WIDTH.Auto,
  },
};

export const STACK_VISIBLE_LIMIT = 3;
export const CLOSE_ALL_THRESHOLD = 2;

// Must equal `$toast-duration` in Toaster/styles.module.scss.
export const LEAVE_ANIMATION_MS = 280;
// Длительность анимации разворачивания/сворачивания стека (transitions transform).
export const STACK_TRANSITION_MS = 200;

export const TEST_IDS = {
  toasterContainer: 'toaster-container',
  mainBlock: 'toaster-container__main-block',
  uploadBlock: 'toaster-container__upload-block',
  toastSlot: 'toaster-container__toast-slot',
  buttonCloseAll: 'toaster-container__button-close-all',
  buttonCollapse: 'toaster-container__button-collapse',

  systemEventRoot: 'toast-system-event',
  systemEventIcon: 'toast-system-event__icon',
  systemEventTitle: 'toast-system-event__title',
  systemEventDescription: 'toast-system-event__description',
  systemEventButtonClose: 'toast-system-event__button-close',
  systemEventButtonAction: 'toast-system-event__button-action',
  systemEventLink: 'toast-system-event__link',
  systemEventProgressBar: 'toast-system-event__progressbar',

  userActionRoot: 'toast-user-action',
  userActionLabel: 'toast-user-action__label',
  userActionIcon: 'toast-user-action__icon',
  userActionLoader: 'toast-user-action__loader',
  userActionTimer: 'toast-user-action__timer',
  userActionLink: 'toast-user-action__link',

  uploadRoot: 'toast-upload',
  uploadClose: 'toast-upload__close',
  uploadCollapseButton: 'toast-upload__collapse-button',
  uploadTitle: 'toast-upload__title',
  uploadDescription: 'toast-upload__description',
  uploadCounter: 'toast-upload__counter',
  uploadProgress: 'toast-upload__progress',
  uploadProgressBar: 'toast-upload__progressbar',
  uploadList: 'toast-upload__list',
  uploadFileItem: 'toast-upload__file-item',
  uploadFileItemLink: 'toast-upload__file-item-link',
  uploadFileItemCancel: 'toast-upload__file-item-cancel',
  uploadStatusPause: 'toast-upload__status-pause',
  uploadStatusPlay: 'toast-upload__status-play',
  uploadStatusRetry: 'toast-upload__status-retry',
  uploadCancelButton: 'toast-upload__cancel-button',
} as const;
