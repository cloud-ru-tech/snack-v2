import { CrossSVG, NotifierInfoFilledSVG, NotifierWarningFilledSVG, QuestionSVG } from '@ds/icons/interface/system';

import { APPEARANCE_STATE } from '../constants';
import { AppearanceState } from '../types';

export function getAppearanceIcon(appearance: AppearanceState, className?: string) {
  let Component: typeof NotifierInfoFilledSVG;

  switch (appearance) {
    case APPEARANCE_STATE.Warning:
      Component = NotifierWarningFilledSVG;
      break;
    case APPEARANCE_STATE.UserError:
      Component = CrossSVG;
      break;
    case APPEARANCE_STATE.SystemError:
      Component = QuestionSVG;
      break;
    case APPEARANCE_STATE.Default:
    default:
      Component = NotifierInfoFilledSVG;
      break;
  }

  return <Component size={16} data-appearance={appearance} className={className} />;
}
