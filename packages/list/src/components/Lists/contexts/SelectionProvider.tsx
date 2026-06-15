import { useValueControl } from '@ds/utils';
import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext } from 'react';

import { MODE } from '../../../constants';
import { ItemId } from '../../Items';

export type SelectionValue = ItemId | ItemId[];

export type OnChangeHandler<T = SelectionValue> = (value: T) => void;

export type SelectionSingleValueType = ItemId;

export type SelectionSingleState = {
  /** Начальное состояние */
  defaultValue?: ItemId;
  /** Controlled состояние */
  value?: ItemId;
  /** Controlled обработчик изменения состояния — получает выбранный `ItemId` */
  onChange?: OnChangeHandler<ItemId>;
  /** Режим выбора */
  mode: typeof MODE.Single;
};

export type SelectionSingleProps = {
  setValue?: Dispatch<SetStateAction<ItemId | undefined>>;
  /** Внутренний toggle-обработчик: выбирает/снимает один элемент по id */
  onChange?: OnChangeHandler<ItemId>;
  /** Режим выбора single */
  isSelectionSingle: true;
  /** Режим выбора multi */
  isSelectionMultiple: false;
} & Omit<SelectionSingleState, 'onChange'>;

export type SelectionMultipleState = {
  /** Начальное состояние */
  defaultValue?: ItemId[];
  /** Controlled состояние */
  value?: ItemId[];
  /** Controlled обработчик изменения состояния — получает массив выбранных `ItemId[]` */
  onChange?: OnChangeHandler<ItemId[]>;
  /** Режим выбора */
  mode: typeof MODE.Multiple;
};

export type SelectionMultipleProps = {
  setValue?: Dispatch<SetStateAction<ItemId[] | undefined>>;
  /** Внутренний toggle-обработчик: добавляет/убирает один элемент по id */
  onChange?: OnChangeHandler<ItemId>;
  /** Режим выбора single */
  isSelectionSingle: false;
  /** Режим выбора multi */
  isSelectionMultiple: true;
} & Omit<SelectionMultipleState, 'onChange'>;

type SelectionNoneProps = {
  mode?: typeof MODE.None;
  value?: undefined;
  onChange?: undefined;
  setValue?: undefined;
  defaultValue?: undefined;
  isSelectionSingle?: undefined;
  isSelectionMultiple?: undefined;
};

type SelectionContextType =
  | Omit<SelectionNoneProps, 'defaultValue'>
  | Omit<SelectionSingleProps, 'defaultValue'>
  | Omit<SelectionMultipleProps, 'defaultValue'>;

export type SelectionState = {
  /**
   * Настройки выбора элементов. `mode: 'single'` — один выбранный элемент (`value: ItemId`),
   * `mode: 'multiple'` — множественный выбор (`value: ItemId[]`). Без `selection` выбора нет —
   * клик вызывает только `onClick` элемента.
   */
  selection?: SelectionSingleState | SelectionMultipleState;
};

export const SelectionContext = createContext<SelectionContextType>({
  value: undefined,
  onChange: undefined,
  mode: undefined,
});

export function isSelectionMultipleProps(props: object): props is SelectionMultipleState {
  return 'mode' in props && props['mode'] === MODE.Multiple;
}
export function isSelectionSingleProps(props: object): props is SelectionSingleState {
  return 'mode' in props && props['mode'] === MODE.Single;
}

type Child = {
  children: ReactNode;
};

function SelectionNoneProvider({ children }: SelectionNoneProps & Child) {
  return (
    <SelectionContext.Provider
      value={{
        mode: MODE.None,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

function SelectionSingleProvider({
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  children,
}: SelectionSingleState & Child) {
  const [value, setValue] = useValueControl<ItemId | undefined>({
    value: valueProp,
    defaultValue,
    // На deselect внутреннее значение становится undefined; наружу передаём только реальный id.
    onChange: newValue => newValue !== undefined && onChangeProp?.(newValue),
  });

  const onChange = useCallback(
    (newValue: SelectionSingleValueType) =>
      setValue((oldValue: ItemId | undefined) => {
        if (newValue !== oldValue) {
          return newValue;
        }

        return undefined;
      }),
    [setValue],
  );

  return (
    <SelectionContext.Provider
      value={{
        value,
        onChange,
        mode: MODE.Single,
        isSelectionSingle: true,
        isSelectionMultiple: false,
        setValue,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

function SelectionMultipleProvider({
  value: valueProp,
  defaultValue,
  onChange: onChangeProp,
  children,
}: SelectionMultipleState & Child) {
  const [value, setValue] = useValueControl<ItemId[] | undefined>({
    value: valueProp,
    defaultValue,
    onChange: newValue => onChangeProp?.(newValue ?? []),
  });

  const onChange = useCallback(
    (newValue: SelectionSingleValueType) => {
      setValue((oldValues: ItemId[] | undefined) => {
        if (Array.isArray(oldValues)) {
          if (oldValues.includes(newValue)) {
            return oldValues.filter(oldValue => oldValue !== newValue);
          }

          return oldValues.concat(newValue);
        }

        if (oldValues === undefined) {
          return Array.isArray(newValue) ? newValue : [newValue];
        }

        return undefined;
      });
    },
    [setValue],
  );

  return (
    <SelectionContext.Provider
      value={{
        value,
        onChange,
        mode: MODE.Multiple,
        isSelectionSingle: false,
        isSelectionMultiple: true,
        setValue,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

type SelectionProviderProps = SelectionSingleState | SelectionMultipleState | { mode?: typeof MODE.None };

export function SelectionProvider({ children, ...props }: SelectionProviderProps & Child) {
  if (isSelectionSingleProps(props)) {
    return <SelectionSingleProvider {...props}>{children}</SelectionSingleProvider>;
  }

  if (isSelectionMultipleProps(props)) {
    return <SelectionMultipleProvider {...props}>{children}</SelectionMultipleProvider>;
  }

  return <SelectionNoneProvider>{children}</SelectionNoneProvider>;
}

export function useSelectionContext() {
  return useContext(SelectionContext);
}
