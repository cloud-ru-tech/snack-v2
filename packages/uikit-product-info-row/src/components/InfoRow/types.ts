import { Button } from '@ds/button';
import { QuestionTooltipProps, TooltipProps } from '@ds/tooltip';
import { WithSupportProps } from '@ds/utils';
import { ComponentProps, ReactNode } from 'react';

type ButtonProps = ComponentProps<typeof Button>;

export type RowActionButton = {
  tip?: Pick<TooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'> | string;
} & Omit<ButtonProps, 'size' | 'appearance' | 'view'>;

export type RowActionsPair = {
  first: RowActionButton;
  second?: RowActionButton;
};

/** Ось Figma: одна или две колонки значений в одной строке */
export type InfoRowColumn = '1' | '2';

/**
 * Пропы `InfoRow`. Подмножество, совпадающее с `@cloud-ru/uikit-product-info-row@1.1.6`:
 * `label`, `labelTruncate`, `labelTooltip`, `topDivider`, `bottomDivider`,
 * `className`, `labelClassName`, `rowClassName`, `content`, `rowActions` (до двух кнопок с `tip`),
 * `loading`, `width`, `labelWidth` и поддержка `WithSupportProps` на корневом `div`.
 * Расширения под Figma: `column`, `maxWidth`, вторая колонка (`secondary*`), слоты `rowActionsSlot` / `secondaryRowActionsSlot`.
 */
export type InfoRowPropsBase = {
  /** Текст метки */
  label: string;
  /** Максимальное число строк метки (TruncateString) */
  labelTruncate?: number;
  /** Подсказка у метки: строка или пропсы QuestionTooltip */
  labelTooltip?:
    | Pick<QuestionTooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'>
    | string;
  /** Вторая метка слева от второго значения (только при `column="2"`) */
  secondaryLabel?: string;
  /** Макс. строк второй метки при `column="2"` */
  secondaryLabelTruncate?: number;
  /** Подсказка у второй метки */
  secondaryLabelTooltip?:
    | Pick<QuestionTooltipProps, 'trigger' | 'tip' | 'placement' | 'disableMaxWidth' | 'open' | 'onOpenChange'>
    | string;
  /** Разделитель над строкой */
  topDivider?: boolean;
  /** Разделитель под строкой */
  bottomDivider?: boolean;
  className?: string;
  labelClassName?: string;
  /** Класс блока второй метки при `column="2"` */
  secondaryLabelClassName?: string;
  rowClassName?: string;
  /** Первая колонка значений (ось Figma `column=1` или левая при `column=2`) */
  content?: ReactNode;
  /**
   * Кастомная область действий у первой колонки (слот «info block» / макетные плейсхолдеры).
   * Если задано, рендерится вместо `rowActions`.
   */
  rowActionsSlot?: ReactNode;
  /** До двух кнопок `@ds/button` (tonal neutral, size m) у первой колонки; при `column="2"` в макете — одна (`first`). Игнорируется, если задан `rowActionsSlot` */
  rowActions?: RowActionsPair;
  /** Вторая колонка значений (только при `column="2"`, ось Figma) */
  secondaryContent?: ReactNode;
  /** Кастомные действия у второй колонки; если задано, вместо `secondaryRowActions` */
  secondaryRowActionsSlot?: ReactNode;
  /** Кнопки у второй колонки значений; в макете при `column="2"` — одна (`first`) */
  secondaryRowActions?: RowActionsPair;
  loading?: boolean;
  /** Ширина строки относительно контейнера */
  width?: 'fixed' | 'full';
  /** Ширина колонки метки */
  labelWidth?: 'fixed' | 'auto';
  /** Ось Figma `column`: одна или две колонки значений */
  column?: InfoRowColumn;
  /** Ось Figma `maxWidth` */
  maxWidth?: boolean;
};

export type InfoRowProps = WithSupportProps<InfoRowPropsBase>;

export type DataType = Record<string, unknown>;

type FieldWithAccessorKey<T extends DataType> = {
  accessorKey: keyof T;
  render?: never;
} & Omit<InfoRowPropsBase, 'content'>;

type FieldWithRender<T extends DataType> = {
  render: (data: T, noDataPlaceholder: string) => ReactNode;
  accessorKey?: never;
} & Omit<InfoRowPropsBase, 'content'>;

/** Элемент списка полей для `useGetContent` + несколько `<InfoRow />` (без отдельного компонента-группы) */
export type InfoRowFieldItem<T extends DataType> = FieldWithRender<T> | FieldWithAccessorKey<T>;
