import {
  NotifierCriticalFilledSVG,
  NotifierInfoFilledSVG,
  NotifierSuccessFilledSVG,
  NotifierWarningFilledSVG,
} from '@ds/icons';

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
