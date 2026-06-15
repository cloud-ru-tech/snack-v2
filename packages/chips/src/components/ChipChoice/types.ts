import { DropdownProps } from '@ds/dropdown';
import {
  BaseItemProps,
  DroplistProps,
  GroupItemProps,
  GroupSelectItemProps,
  ItemContentProps,
  ItemId,
  NextListItemProps,
  SelectionMultipleState,
  SelectionSingleState,
} from '@ds/list';
import { TruncateStringProps } from '@ds/truncate-string';
import { WithSupportProps } from '@ds/utils';
import { MouseEventHandler, ReactNode } from 'react';

import { BaseChipProps, Size } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

/** Пропсы, которые прокидываются в кастомный рендер контента опции */
export type ContentRenderProps = Omit<ItemContentProps, 'option' | 'disabled'>;

export type Range = [Date, Date];

/** Опция списка ChipChoice */
export type FilterOption<T extends ContentRenderProps = ContentRenderProps> =
  | BaseOption<T>
  | AccordionOption<T>
  | GroupOption<T>
  | GroupSelectOption<T>
  | NestListOption<T>;

export type BaseOption<T extends ContentRenderProps = ContentRenderProps> = Omit<BaseItemProps, 'content' | 'id'> & {
  value: ItemId;
  label: ItemId;
  contentRenderProps?: T;
};

export type AccordionOption<T extends ContentRenderProps = ContentRenderProps> = Omit<
  BaseOption<T>,
  'switch' | 'inactive' | 'value'
> & {
  id?: ItemId;
  type: 'collapse';
  options: FilterOption<T>[];
};

export type GroupOption<T extends ContentRenderProps = ContentRenderProps> = Omit<GroupItemProps, 'items'> & {
  options: FilterOption<T>[];
};

export type GroupSelectOption<T extends ContentRenderProps = ContentRenderProps> = Omit<
  GroupSelectItemProps,
  'items'
> & {
  options: FilterOption<T>[];
};

export type NestListOption<T extends ContentRenderProps = ContentRenderProps> = Omit<
  NextListItemProps,
  'items' | 'content'
> & {
  label: ItemId;
  contentRenderProps?: T;
  options: FilterOption<T>[];
};

export type ChipChoiceCommonProps = WithSupportProps<
  Partial<BaseChipProps> & {
    /** Размер */
    size?: Size;
    /** Колбек обработки клика */
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    /** Колбек для клика по кнопке очистки */
    onClearButtonClick?: MouseEventHandler<HTMLButtonElement>;
    /** Расположение выпадающего меню */
    placement?: DropdownProps['placement'];
    /**
     * Стратегия управления шириной контейнера поповера
     * @default gte
     */
    widthStrategy?: DropdownProps['widthStrategy'];
    dropDownClassName?: string;
    /** Управляет состоянием показан/не показан */
    open?: boolean;
    /** Колбек отображения компонента */
    onOpenChange?: (isOpen: boolean) => void;
    /** Вариант обрезания значения */
    truncateVariant?: TruncateStringProps['variant'];
  }
>;

export type ChipChoiceSelectCommonProps<T extends ContentRenderProps = ContentRenderProps> = ChipChoiceCommonProps & {
  /** Массив опций */
  options: FilterOption<T>[];
  /**
   * Отключает Fuzzy Search
   * @default false
   */
  disableFuzzySearch?: boolean;

  /** Кастомный рендер контента опции */
  contentRender?(option: { label: ItemId; value?: ItemId; contentRenderProps?: T }): ReactNode;
  /** Функция фильтрации опций */
  filterFn?(option: { label: ItemId; value?: ItemId; contentRenderProps?: T }): boolean;

  /** Показывать строку поиска в дроплисте */
  searchable?: boolean;

  /** Флаг, отвечающий за применение выбранного значения по умолчанию */
  autoApply?: boolean;
  /** Колбек основной кнопки */
  onApprove?: () => void;
  /** Колбек кнопки отмены */
  onCancel?: () => void;
} & Pick<
    DroplistProps,
    | 'selection'
    | 'scrollRef'
    | 'scrollContainerRef'
    | 'noDataState'
    | 'footer'
    | 'footerActiveElementsRefs'
    | 'dataError'
    | 'errorDataState'
    | 'dataFiltered'
    | 'noResultsState'
    | 'loading'
    | 'scrollToSelectedItem'
    | 'virtualized'
  >;

export type ChipChoiceSingleProps<T extends ContentRenderProps = ContentRenderProps> = ChipChoiceSelectCommonProps<T> &
  Omit<SelectionSingleState, 'mode'> & {
    /** Массив опций */
    options: FilterOption<T>[];
    /** Колбек формирующий отображение выбранного значения */
    valueRender?(option?: BaseOption<T>): ReactNode;
  };

export type ChipChoiceMultipleProps<T extends ContentRenderProps = ContentRenderProps> =
  ChipChoiceSelectCommonProps<T> &
    Omit<SelectionMultipleState, 'mode'> & {
      /** Массив опций */
      options: FilterOption<T>[];
      /** Колбек формирующий отображение выбранного значения */
      valueRender?(option?: BaseOption<T>[]): ReactNode;
    };
