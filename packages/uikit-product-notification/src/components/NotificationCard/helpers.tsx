import {
  NotifierCriticalFilledSVG,
  NotifierInfoFilledSVG,
  NotifierSuccessFilledSVG,
  NotifierWarningFilledSVG,
} from '@ds/icons/interface/system';

import { APPEARANCE } from '../../constants';
import { Appearance } from '../../types';

export function getIcon(appearance: Appearance) {
  switch (appearance) {
    case APPEARANCE.Success:
      return <NotifierSuccessFilledSVG size={16} />;
    case APPEARANCE.Error:
      return <NotifierCriticalFilledSVG size={16} />;
    case APPEARANCE.Warning:
      return <NotifierWarningFilledSVG size={16} />;
    case APPEARANCE.Default:
    default: {
      return <NotifierInfoFilledSVG size={16} />;
    }
  }
}

const APPEARANCE_LABEL: Record<Appearance, string> = {
  [APPEARANCE.Default]: 'Информация',
  [APPEARANCE.Error]: 'Ошибка',
  [APPEARANCE.Warning]: 'Предупреждение',
  [APPEARANCE.Success]: 'Успешно',
};

/** Текстовое описание типа уведомления для скринридера (иконка severity не озвучивается). */
export function getAppearanceLabel(appearance: Appearance) {
  return APPEARANCE_LABEL[appearance];
}
