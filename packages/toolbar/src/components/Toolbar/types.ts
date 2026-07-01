import { ChipChoiceRowProps, FiltersState } from '@ds/chips';
import { WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { RequestPayloadParams } from '@cloud-ru/ft-request-payload-transform';

import { BulkActionsProps, DataViewProps, DataViewValue, MoreActionsProps, SearchProps } from '../../helperComponents';
import { NeverOrUndefined, RequireAtLeastOne } from './typesUtils';

export type ToolbarDataViewValue = DataViewValue;

export type ToolbarDataViewProps = DataViewProps & {
  /** Показать переключатель вида. Если `dataView` не передан — равносильно `show: false` */
  show?: boolean;
};

type OptionalProps = {
  /** Колбек обновления */
  onRefresh?(): void;
  /** Дополнительный слот между поиском и переключателем вида (+ slotExtraButton в Figma). <br>
   *  На mobile-раскладке (из `AdaptiveProvider`) не рендерится в строке — кнопки переносятся в меню «⋯»
   *  (`Button` с `onClick` и `label` / `icon` / `aria-label`, одна обёртка вокруг кнопки
   *  или элемент с `data-toolbar-after-overflow`). Иначе — в `moreActions`. */
  after?: ReactNode;
  /** Переключатель вида данных — SegmentControl (showDataView в Figma) */
  dataView?: ToolbarDataViewProps;
  /** Элементы выпадающего списка кнопки с действиями */
  moreActions?: MoreActionsProps['moreActions'];
};

export type CommonToolbarProps = {
  /** Параметры отвечают за строку поиска <br>
   * <strong>value</strong>: Значение строки поиска <br>
   * <strong>onChange</strong>: Колбэк смены значения <br>
   * <strong>onSubmit</strong>: Колбэк на подтверждение поиска по строке
   * <strong>placeholder</strong>: Плейсхолдер <br>
   * <strong>loading</strong>: Состояние загрузки <br>
   *  */
  search?: SearchProps;
  /** Класснейм */
  className?: string;
  /** Внешний бордер */
  outline?: boolean;
};

export type ToolbarBulkActionProps = Omit<BulkActionsProps, 'actions'> & {
  /** Список массовых действий */
  bulkActions?: BulkActionsProps['actions'];
};

export type CheckedToolbarProps = CommonToolbarProps & ToolbarBulkActionProps & OptionalProps;

export type DefaultToolbarProps = CommonToolbarProps &
  NeverOrUndefined<ToolbarBulkActionProps> &
  RequireAtLeastOne<OptionalProps>;

export type FilterRow<TState extends FiltersState = Record<string, unknown>> = Omit<
  ChipChoiceRowProps<TState>,
  'size' | 'data-test-id'
> & {
  open?: boolean;
  /** Начальное состояние filter-row (mobile) */
  initialOpen?: boolean;
  onOpenChange?(isOpen: boolean): void;
};

export type PersistedFilterState<T extends FiltersState> = {
  pagination?: RequestPayloadParams['pagination'];
  ordering?: RequestPayloadParams['ordering'];
  search?: string;
  filter?: T;
};

export type ToolbarPersistConfig<T extends FiltersState> = {
  /** Уникальный id для текущего инстанса компонента */
  id?: string;
  /** Ключ для queryParams */
  filterQueryKey?: string;
  /** Валидатор сохраненных */
  validateData?(value: unknown): value is PersistedFilterState<T>;
  /** Custom-сериализация состояния перед сохранением в queryParams */
  serializer?(value: PersistedFilterState<T>): string;
  /** Custom-парсер queryParams для преобразования в данные состояния */
  parser?(value: string): PersistedFilterState<T>;
  /** Состояние для сохранения */
  state?: PersistedFilterState<T>;
  /** Колбэк при первом рендере для получения сохраненных данных и установки их в стейт */
  onLoad?(state: PersistedFilterState<T>): void;
};

export type ToolbarProps<TState extends FiltersState = Record<string, unknown>> = WithSupportProps<
  DefaultToolbarProps | CheckedToolbarProps
> & {
  filterRow?: FilterRow<TState>;
  /** Конфиг для сохранения состояния в localStorage и queryParams. <br>
   *  Поле id должно быть уникальным для каждого инстанса компонента. <br>
   *  */
  persist?: ToolbarPersistConfig<TState>;
};
