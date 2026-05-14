import { POSITION_SYSTEM_EVENT } from '../../../constants';
import { ToasterPosition } from '../../../types';

/**
 * Карта `position`-проп → имя класса в `styles.module.scss`. Один источник
 * правды для CSS-нейминга позиций — `Toaster.tsx` берёт класс по ключу, а не
 * собирает строку из значения.
 */
export const POSITION_CLASS_NAME: Record<ToasterPosition, string> = {
  [POSITION_SYSTEM_EVENT.TopLeft]: 'positionTopLeft',
  [POSITION_SYSTEM_EVENT.TopCenter]: 'positionTopCenter',
  [POSITION_SYSTEM_EVENT.TopRight]: 'positionTopRight',
  [POSITION_SYSTEM_EVENT.BottomLeft]: 'positionBottomLeft',
  [POSITION_SYSTEM_EVENT.BottomCenter]: 'positionBottomCenter',
  [POSITION_SYSTEM_EVENT.BottomRight]: 'positionBottomRight',
};
