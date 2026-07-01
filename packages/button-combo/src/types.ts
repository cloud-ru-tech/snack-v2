import { Appearance, Size, View } from '@ds/button';
import { BaseItemProps, ItemId } from '@ds/list';
import { WithSupportProps } from '@ds/utils';

export type Item = Omit<BaseItemProps, 'onClick' | 'onMouseDown' | 'onKeyDown' | 'onFocus' | 'onBlur'> &
  Required<Pick<BaseItemProps, 'onClick'>> & {
    /** Название действия: текст пункта списка и label основной кнопки при выборе */
    label?: string;
  };

export type ButtonComboProps = WithSupportProps<{
  /** Основные элементы списка (действия) */
  items: Item[];
  /** Вариант оформления обеих кнопок */
  view?: View;
  /** Цветовое назначение обеих кнопок */
  appearance?: Appearance;
  /** Размер */
  size?: Size;
  /** Отключена */
  disabled?: boolean;
  /** Состояние загрузки */
  loading?: boolean;
  /** Растянуть на всю ширину родителя */
  fullWidth?: boolean;
  /** HTML-атрибут tab-index корневого контейнера */
  tabIndex?: number;
  /** CSS-класс корневого контейнера */
  className?: string;
  /** CSS-класс основной (option) кнопки */
  optionClassName?: string;
  /** CSS-класс кнопки-триггера выпадающего списка */
  dropdownTriggerClassName?: string;
  /** CSS-класс выпадающего списка */
  dropdownClassName?: string;
  /** Controlled: выбранный элемент */
  value?: ItemId;
  /** Controlled: обработчик смены выбранного элемента */
  onChange?(value: ItemId): void;
  /** Начальный выбранный элемент (uncontrolled) */
  defaultValue?: ItemId;
  /** Начальный label основной кнопки, пока ничего не выбрано */
  defaultLabel?: string;
  /** Управляет видимостью выпадающего списка */
  open?: boolean;
  /** Обработчик изменения видимости выпадающего списка */
  onOpenChange?(open: boolean): void;
}>;
