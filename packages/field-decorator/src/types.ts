import { QuestionTooltipProps } from '@ds/tooltip';
import { ValueOf, WithSupportProps } from '@ds/utils';
import { ReactNode, Ref } from 'react';

import { SIZE, VALIDATION_STATE } from './constants';

export type Size = ValueOf<typeof SIZE>;
export type ValidationState = ValueOf<typeof VALIDATION_STATE>;

export type FieldLength = {
  /** Текущая длина текста */
  current: number;
  /** Максимально допустимая длина */
  max?: number;
};

export type LabelProps = WithSupportProps<{
  /** CSS-класс */
  className?: string;
  /** Ref на корневой DOM-элемент */
  innerRef?: Ref<HTMLDivElement>;
  /** Заголовок */
  label?: string;
  /** Подсказка (question-tooltip) у заголовка */
  labelTooltip?: QuestionTooltipProps;
  /** Вторичная подпись справа */
  caption?: string;
  /** Показать знак обязательности `*` */
  required?: boolean;
  /** Размер */
  size?: Size;
  /** HTML-атрибут `for` для `<label>` */
  labelFor?: string;
  /** Поле выключено */
  disabled?: boolean;
}>;

export type HintProps = WithSupportProps<{
  /** CSS-класс */
  className?: string;
  /** Ref на корневой DOM-элемент */
  innerRef?: Ref<HTMLDivElement>;
  /** Подсказка */
  hint?: string;
  /** Ошибка (приоритетнее `hint`; форсит `validationState=error`) */
  error?: string;
  /** Состояние валидации */
  validationState?: ValidationState;
  /** Отображение статус-иконки у подсказки */
  showHintIcon?: boolean;
  /** Счётчик длины `current/max` */
  length?: FieldLength;
  /**
   * Обрезать подсказку до N строк многоточием (через `TruncateString`, с тултипом
   * полного текста на ховере). Без значения подсказка переносится без ограничения
   * (дефолт поля). Нужно для карточек фиксированной высоты (`@ds/attachment`), где
   * длинный текст ошибки иначе выходит за границы.
   */
  maxLines?: number;
  /** Размер */
  size?: Size;
  /** Поле выключено */
  disabled?: boolean;
  /** Только для чтения */
  readonly?: boolean;
}>;

export type FieldDecoratorProps = WithSupportProps<{
  /** CSS-класс */
  className?: string;
  /** Ref на корневой DOM-элемент */
  innerRef?: Ref<HTMLDivElement>;
  /** Содержимое (декорируемое поле) */
  children: ReactNode;
  /** Заголовок */
  label?: string;
  /** Подсказка (question-tooltip) у заголовка */
  labelTooltip?: QuestionTooltipProps;
  /** Вторичная подпись справа */
  caption?: string;
  /** Показать знак обязательности `*` */
  required?: boolean;
  /** HTML-атрибут `for` для `<label>` */
  labelFor?: string;
  /** Подсказка */
  hint?: string;
  /** Ошибка (приоритетнее `hint`; форсит `validationState=error`) */
  error?: string;
  /** Состояние валидации */
  validationState?: ValidationState;
  /** Отображение статус-иконки у подсказки */
  showHintIcon?: boolean;
  /** Счётчик длины `current/max` */
  length?: FieldLength;
  /** Размер */
  size?: Size;
  /** Поле выключено */
  disabled?: boolean;
  /** Только для чтения */
  readonly?: boolean;
}>;
