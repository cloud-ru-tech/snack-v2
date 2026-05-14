import { LinkProps } from '@ds/link';
import { ValueOf } from '@ds/utils';

export const TOAST_SYSTEM_EVENT_APPEARANCE = {
  Neutral: 'neutral',
  Error: 'error',
  ErrorCritical: 'errorCritical',
  Warning: 'warning',
  Success: 'success',
} as const;

export const APPEARANCE_TO_LINK_APPEARANCE: Record<
  ValueOf<typeof TOAST_SYSTEM_EVENT_APPEARANCE>,
  LinkProps['appearance']
> = {
  [TOAST_SYSTEM_EVENT_APPEARANCE.Neutral]: 'invertNeutral',
  [TOAST_SYSTEM_EVENT_APPEARANCE.Error]: 'invertNeutral',
  [TOAST_SYSTEM_EVENT_APPEARANCE.ErrorCritical]: 'red',
  [TOAST_SYSTEM_EVENT_APPEARANCE.Warning]: 'invertNeutral',
  [TOAST_SYSTEM_EVENT_APPEARANCE.Success]: 'invertNeutral',
};
