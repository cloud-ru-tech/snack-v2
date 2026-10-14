import { BaseGigaButtonProps } from '../types';

export type AiButtonGigaMamaProps = BaseGigaButtonProps & {
  /** Подпись действия. Длинный текст обрезается многоточием с учётом ширины кнопки и отступов. */
  label: string;
};
