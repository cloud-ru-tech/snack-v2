import { ReactNode } from 'react';

import { BaseGigaButtonProps, IconPosition, Size } from '../types';

export type AiButtonGigaOutlineProps = BaseGigaButtonProps & {
  /** Однострочная подпись. Без подписи показывается квадратная кнопка с иконкой. */
  label?: string;
  /** Сменная иконка. По умолчанию — цветной глобус; null скрывает иконку. */
  icon?: ReactNode;
  /** Положение иконки относительно подписи. По умолчанию before. */
  iconPosition?: IconPosition;
  /** Размер: xs = 24, s = 32, m = 40, l = 48 px по высоте. По умолчанию s. */
  size?: Size;
};
