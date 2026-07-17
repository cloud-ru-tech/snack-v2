import {
  NotifierCriticalFilledSVG,
  NotifierInfoFilledSVG,
  NotifierSuccessFilledSVG,
  NotifierWarningFilledSVG,
} from '@ds/icons/interface/system';

import { ToastSystemEventAppearance } from './types';

export function getIcon(appearance: ToastSystemEventAppearance) {
  switch (appearance) {
    case 'success':
      return <NotifierSuccessFilledSVG />;
    case 'error':
    case 'errorCritical':
      return <NotifierCriticalFilledSVG />;
    case 'warning':
      return <NotifierWarningFilledSVG />;
    case 'neutral':
    default:
      return <NotifierInfoFilledSVG />;
  }
}
