import {
  NotifierCriticalFilledSpriteSVG,
  NotifierInfoFilledSpriteSVG,
  NotifierSuccessFilledSpriteSVG,
  NotifierWarningFilledSpriteSVG,
} from '@design-system/icons';

import { APPEARANCE } from '../../constants';
import type { Appearance } from '../../types';

export function getAlertAppearanceIcon(appearance: Appearance) {
  switch (appearance) {
    case APPEARANCE.Success:
      return <NotifierSuccessFilledSpriteSVG />;
    case APPEARANCE.Error:
      return <NotifierCriticalFilledSpriteSVG />;
    case APPEARANCE.Warning:
      return <NotifierWarningFilledSpriteSVG />;
    case APPEARANCE.Primary:
    case APPEARANCE.Neutral:
    default:
      return <NotifierInfoFilledSpriteSVG />;
  }
}
