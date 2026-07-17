import {
  NotifierCriticalFilledSVG,
  NotifierInfoFilledSVG,
  NotifierSuccessFilledSVG,
  NotifierWarningFilledSVG,
} from '@ds/icons/interface/system';

import { APPEARANCE } from '../../constants';
import { Appearance } from '../../types';

export function getAlertAppearanceIcon(appearance: Appearance) {
  switch (appearance) {
    case APPEARANCE.Success:
      return <NotifierSuccessFilledSVG />;
    case APPEARANCE.Error:
      return <NotifierCriticalFilledSVG />;
    case APPEARANCE.Warning:
      return <NotifierWarningFilledSVG />;
    case APPEARANCE.Primary:
    case APPEARANCE.Neutral:
    default:
      return <NotifierInfoFilledSVG />;
  }
}
