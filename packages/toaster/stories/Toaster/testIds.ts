import { TEST_IDS } from '@ds/toaster';

export const TOASTER_CONTAINER_TEST_ID = TEST_IDS.toasterContainer;
export const TOASTER_MAIN_BLOCK_TEST_ID = TEST_IDS.mainBlock;
export const TOASTER_UPLOAD_BLOCK_TEST_ID = TEST_IDS.uploadBlock;
export const TOASTER_TOAST_SLOT_TEST_ID = TEST_IDS.toastSlot;
export const TOASTER_BUTTON_CLOSE_ALL_TEST_ID = TEST_IDS.buttonCloseAll;
export const TOASTER_BUTTON_COLLAPSE_TEST_ID = TEST_IDS.buttonCollapse;

// Stories-level (фигурируют в нескольких файлах stories Toaster)
export const TRIGGER_SPAWN_TEST_ID = 'toaster-trigger-spawn';
export const TRIGGER_DISMISS_TEST_ID = 'toaster-trigger-dismiss';
export const TRIGGER_DISMISS_ALL_TEST_ID = 'toaster-trigger-dismiss-all';

// VisualMatrix (бывш. Stacking) — id живут также в e2e helpers, сохраняются для обратной совместимости тестов.
export const stackingSpawnTestId = (position: string) => `toaster-stacking-${position}-spawn`;
export const TOASTER_STACKING_DISMISS_ALL_TEST_ID = 'toaster-stacking-dismiss-all';

// ImperativeApi (бывш. Triggers).
export const systemEventTriggerTestId = (appearance: string) => `toaster-trigger-system-event-${appearance}`;
export const userActionTriggerTestId = (appearance: string) => `toaster-trigger-user-action-${appearance}`;
export const uploadTriggerTestId = (status: string) => `toaster-trigger-upload-${status}`;
export const TOASTER_TRIGGER_DISMISS_ALL_TEST_ID = 'toaster-trigger-dismiss-all';

// InteractionTest (бывш. UpdateFlow).
export const TRIGGER_UPDATE_SYSTEM_SUCCESS_TEST_ID = 'update-flow-system-success';
export const TRIGGER_UPDATE_SYSTEM_ERROR_TEST_ID = 'update-flow-system-error';
export const TRIGGER_UPDATE_USER_ACTION_TEST_ID = 'update-flow-user-action';
export const TRIGGER_UPDATE_UPLOAD_TEST_ID = 'update-flow-upload';
export const TOASTER_UPDATE_FLOW_DISMISS_ALL_TEST_ID = 'toaster-update-flow-dismiss-all';

// Composition (бывш. Mobile).
export const TOASTER_MOBILE_SIZE_TEST_ID = 'toaster-mobile-size';
export const TOASTER_MOBILE_SYSTEM_EVENT_TEST_ID = 'toaster-mobile-system-event';
export const TOASTER_MOBILE_UPLOAD_TEST_ID = 'toaster-mobile-upload';
export const TOASTER_MOBILE_USER_ACTION_TEST_ID = 'toaster-mobile-user-action';
export const TOASTER_MOBILE_DISMISS_ALL_TEST_ID = 'toaster-mobile-dismiss-all';
