import { BaseGigaButtonProps, Size } from '../types';

export type AiButtonGigaFunctionProps = BaseGigaButtonProps & {
  /** Однострочная подпись. Без подписи показывается квадратная кнопка с цветным глобусом. */
  label?: string;
  /** Размер: xs = 24, s = 32, m = 40, l = 48 px по высоте. По умолчанию s. */
  size?: Size;
};
