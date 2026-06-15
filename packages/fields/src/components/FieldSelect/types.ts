import { DroplistProps, ItemId, ItemProps } from '@ds/list';
import { ValueOf } from '@ds/utils';
import { FocusEvent, KeyboardEvent, ReactNode } from 'react';

import { FieldDecoratorProps, ValidationState } from '../FieldDecorator';
import { SELECTION_MODE } from './constants';

/** Режим выбора FieldSelect: одно значение или несколько. */
export type Selection = ValueOf<typeof SELECTION_MODE>;

type FieldSelectDecoratorProps = Omit<FieldDecoratorProps, 'children' | 'validationState' | 'size'>;

type DroplistPassthrough = Pick<
  DroplistProps,
  | 'footer'
  | 'footerActiveElementsRefs'
  | 'loading'
  | 'noDataState'
  | 'noResultsState'
  | 'errorDataState'
  | 'virtualized'
  | 'scrollToSelectedItem'
  | 'limitedScrollHeight'
  | 'untouchableScrollbars'
  | 'closeOnPopstate'
> & {
  /**
   * Флаг «ошибка загрузки данных» — при `true` дроплист рендерит `errorDataState`
   * вместо списка (для асинхронной подгрузки с провалившимся запросом).
   */
  dataError?: DroplistProps['dataError'];
  /**
   * Флаг «список отфильтрован» — при `true` и пустом результате дроплист рендерит
   * `noResultsState`. По умолчанию выводится из строки поиска (`searchable` + ввод).
   */
  dataFiltered?: DroplistProps['dataFiltered'];
};

type CommonSelectProps = FieldSelectDecoratorProps &
  DroplistPassthrough & {
    /** Размер */
    size?: FieldDecoratorProps['size'];
    /** Состояние валидации */
    validationState?: ValidationState;
    /** CSS-класс корня `FieldDecorator` */
    className?: string;
    /** CSS-класс оболочки поля */
    fieldClassName?: string;
    /** Список айтемов дроплиста (формат `@ds/list`) */
    items: ItemProps[];
    /** Пресет-айтемы сверху (формат `@ds/list`) */
    pinTop?: ItemProps[];
    /** Пресет-айтемы снизу (формат `@ds/list`) */
    pinBottom?: ItemProps[];
    /** Placeholder в триггере, когда нет выбранного значения */
    placeholder?: string;
    /** Иконка перед текстом */
    iconBefore?: ReactNode;
    /** Префикс — текст или нода перед значением (Figma `prefix`) */
    prefix?: ReactNode;
    /** Постфикс — текст или нода после значения (Figma `postfix`) */
    postfix?: ReactNode;
    /** Деактивировано */
    disabled?: boolean;
    /** Read-only режим */
    readonly?: boolean;
    /**
     * Фон поля (acrylic)
     * @default true
     */
    background?: boolean;
    /** Управляемое открытие дроплиста */
    open?: DroplistProps['open'];
    /** Колбек смены открытия */
    onOpenChange?: DroplistProps['onOpenChange'];
    /** Placement дроплиста */
    placement?: DroplistProps['placement'];
    /**
     * Стратегия ширины дроплиста.
     * @default 'eq' — равна ширине триггера
     */
    widthStrategy?: DroplistProps['widthStrategy'];
    /**
     * Включить поиск/ввод в поле — пользователь печатает, список фильтруется по подстроке лейбла.
     * @default true
     */
    searchable?: boolean;
    /**
     * Управляемое/неуправляемое состояние строки поиска (текста в поле). Позволяет потребителю
     * читать и задавать запрос (например, для серверного поиска вместе с `autocomplete`).
     */
    search?: {
      /** Управляемое значение строки поиска */
      value?: string;
      /** Начальное значение строки поиска (uncontrolled) */
      defaultValue?: string;
      /** Колбек смены строки поиска */
      onChange?(value: string): void;
    };
    /**
     * Не фильтровать список на клиенте — фильтрацию обеспечивает потребитель (серверный поиск).
     * Введённый текст уходит в `search.onChange`, список берётся из `items` как есть.
     * @default false
     */
    autocomplete?: boolean;
    /**
     * Зафиксировать введённый текст как новый выбор по `Enter` (создание опции «на лету»).
     * @default false
     */
    addOptionByEnter?: boolean;
    /**
     * Сбрасывать строку поиска к выбранному значению после выбора. `false` нужен при асинхронной
     * подгрузке (оставить введённый запрос как значение, пока данные не пришли).
     * @default true
     */
    resetSearchOnOptionSelection?: boolean;
    /**
     * Показывать кнопку очистки значения (✕). Активна, когда есть выбранное значение
     * и поле не disabled/readonly.
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
    /** HTML-атрибут `id` для input (и `for` у label) */
    id?: string;
    /** HTML-атрибут `name` для input */
    name?: string;
    /** Автофокус input при монтировании */
    autoFocus?: boolean;
    /** Колбек фокуса input */
    onFocus?(event: FocusEvent<HTMLInputElement>): void;
    /** Колбек блюра input */
    onBlur?(event: FocusEvent<HTMLInputElement>): void;
    /** Колбек нажатия клавиши на input (вызывается после внутренней обработки навигации) */
    onKeyDown?(event: KeyboardEvent<HTMLInputElement>): void;
    /**
     * Включить нечёткий поиск: символы запроса должны встречаться в лейбле в том же порядке
     * (например, `lge` найдёт `Large`). Если `false` — простой substring-match.
     * @default true
     */
    enableFuzzySearch?: boolean;
    /**
     * Кастомный форматтер лейбла выбранного значения. Применяется к каждому выбранному
     * элементу (single — значение в поле, multiple — лейбл чипа или элемент в comma-joined).
     */
    selectedOptionFormatter?(selected: { id: ItemId; label: string }): string;
    /** Тестовый id корня */
    'data-test-id'?: string;
  };

export type FieldSelectSingleProps = CommonSelectProps & {
  /** Режим выбора. По умолчанию `'single'`. */
  selection?: typeof SELECTION_MODE.Single;
  /** Управляемое значение */
  value?: ItemId;
  /** Неуправляемое значение по умолчанию */
  defaultValue?: ItemId;
  /** Колбек смены значения */
  onChange?(value: ItemId | undefined): void;
  /**
   * Закрывать дроплист после клика на айтем.
   * @default true
   */
  closeDroplistOnItemClick?: boolean;
};

export type FieldSelectMultipleProps = CommonSelectProps & {
  /** Режим выбора */
  selection: typeof SELECTION_MODE.Multiple;
  /** Управляемые значения */
  value?: ItemId[];
  /** Неуправляемые значения по умолчанию */
  defaultValue?: ItemId[];
  /** Колбек смены значений */
  onChange?(value: ItemId[]): void;
  /**
   * Форматтер строки выбранных значений (используется, если `chips=false`).
   * @default — список лейблов через `, `
   */
  formatSelected?(selected: { id: ItemId; label: string }[]): string;
  /**
   * Отображать выбранные значения как чипы (`@ds/tag`) внутри поля. Если `false`,
   * показывает строку из `formatSelected` либо comma-joined.
   * @default true
   */
  chips?: boolean;
  /**
   * Удалять последний чип по `Backspace`, когда строка ввода пустая.
   * Работает только при `chips=true` и `searchable=true`.
   * @default true
   */
  removeByBackspace?: boolean;
  /**
   * Закрывать дроплист после клика на айтем.
   * @default false
   */
  closeDroplistOnItemClick?: boolean;
};

export type FieldSelectProps = FieldSelectSingleProps | FieldSelectMultipleProps;
