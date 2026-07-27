import { CalendarDropdownProps } from '@ds/calendar';
import { FieldDecoratorProps, Size, ValidationState } from '@ds/field-decorator';
import { ValueOf, WithSupportProps } from '@ds/utils';
import { FocusEvent, ReactNode } from 'react';

import { FieldLayoutPresets } from '../../hooks';
import { DATE_MODE } from './constants';

export type DateMode = ValueOf<typeof DATE_MODE>;

/** Значение одиночной даты/даты-времени. */
export type DateValue = Date | undefined;

/** Значение периода (`[from, to]`). */
export type DateRangeValue = [DateValue, DateValue];

type FieldDateDecoratorProps = Omit<FieldDecoratorProps, 'children' | 'validationState' | 'size'>;

type CalendarPassthrough = Pick<
  CalendarDropdownProps,
  | 'today'
  | 'showHolidays'
  | 'buildCellProps'
  | 'locale'
  | 'presets'
  | 'placement'
  | 'closeOnApply'
  | 'closeOnPopstate'
  | 'open'
  | 'onOpenChange'
>;

type CommonFieldDateProps = WithSupportProps<
  FieldDateDecoratorProps &
    CalendarPassthrough & {
      /** Размер */
      size?: Size;
      /** Состояние валидации */
      validationState?: ValidationState;
      /** CSS-класс корня `FieldDecorator` */
      className?: string;
      /** CSS-класс оболочки поля */
      fieldClassName?: string;
      /** Placeholder в триггере, когда нет значения */
      placeholder?: string;
      /**
       * `aria-label` поля начала периода (режим `date-range`).
       * @default 'Начало периода'
       */
      labelFrom?: string;
      /**
       * `aria-label` поля конца периода (режим `date-range`).
       * @default 'Конец периода'
       */
      labelTo?: string;
      /** Иконка перед текстом (если не задано — `CalendarSVG`) */
      iconBefore?: ReactNode;
      /** Деактивировано */
      disabled?: boolean;
      /** Read-only режим */
      readonly?: boolean;
      /**
       * Фон поля (acrylic)
       * @default true
       */
      background?: boolean;
      /**
       * Показывать кнопку очистки значения (✕). Активна, когда есть значение и поле не disabled/readonly.
       * @default true
       */
      showClearButton?: boolean;
      /**
       * Показывать кнопку копирования значения (только при `readonly` и непустом значении).
       * @default true
       */
      showCopyButton?: boolean;
      /** Колбек после копирования значения в буфер */
      onCopyButtonClick?(): void;
      /**
       * Показывать секунды в режиме `date-time` (в маске и в выпадающем календаре).
       * @default true
       */
      showSeconds?: boolean;
      /** HTML-атрибут `id` для input (и `for` у label) */
      id?: string;
      /** HTML-атрибут `name` для input */
      name?: string;
      /** Автофокус input при монтировании. На mobile выключается адаптивно (см. `layoutPresets`) */
      autoFocus?: boolean;
      /**
       * Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен
       * (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`.
       */
      layoutPresets?: FieldLayoutPresets;
      /** Колбек фокуса input */
      onFocus?(event: FocusEvent<HTMLInputElement>): void;
      /** Колбек блюра input */
      onBlur?(event: FocusEvent<HTMLInputElement>): void;
    }
>;

export type FieldDateSingleProps = CommonFieldDateProps & {
  /** Режим выбора даты. По умолчанию `'date'`. */
  mode?: typeof DATE_MODE.Date | typeof DATE_MODE.DateTime;
  /** Управляемое значение */
  value?: DateValue;
  /** Неуправляемое значение по умолчанию */
  defaultValue?: DateValue;
  /** Колбек смены значения */
  onChange?(value: DateValue): void;
};

export type FieldDateRangeProps = CommonFieldDateProps & {
  /** Режим выбора периода */
  mode: typeof DATE_MODE.DateRange;
  /** Управляемое значение */
  value?: DateRangeValue;
  /** Неуправляемое значение по умолчанию */
  defaultValue?: DateRangeValue;
  /** Колбек смены значения */
  onChange?(value: DateRangeValue): void;
};

export type FieldDateProps = FieldDateSingleProps | FieldDateRangeProps;
