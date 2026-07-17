import {
  NotifierCriticalFilledSVG,
  NotifierSuccessFilledSVG,
  NotifierWarningFilledSVG,
} from '@ds/icons/interface/system';

import { TOAST_USER_ACTION_APPEARANCE } from './constants';
import { ToastUserActionAppearance } from './types';

export function getIcon(appearance: ToastUserActionAppearance) {
  switch (appearance) {
    case TOAST_USER_ACTION_APPEARANCE.Success:
      return <NotifierSuccessFilledSVG />;
    case TOAST_USER_ACTION_APPEARANCE.Error:
      return <NotifierCriticalFilledSVG />;
    case TOAST_USER_ACTION_APPEARANCE.Warning:
      return <NotifierWarningFilledSVG />;
    case TOAST_USER_ACTION_APPEARANCE.Neutral:
    default:
      return null;
  }
}
