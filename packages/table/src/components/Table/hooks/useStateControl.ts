import { useUncontrolledProp } from '@ds/utils';
import { OnChangeFn } from '@tanstack/react-table';

type StateControl<TState> = {
  initialState?: TState;
  state?: TState;
  onChange?(state: TState): void;
};

export function useStateControl<TState extends object | string | number | boolean | undefined>(
  control: StateControl<TState> | undefined,
  defaultState: TState,
): readonly [TState, OnChangeFn<TState>] {
  const [state, setState] = useUncontrolledProp(
    control?.state,
    control?.state ?? control?.initialState ?? defaultState,
    control?.onChange,
  );

  const onChangeFunction: OnChangeFn<TState> = updater => {
    if (typeof updater === 'function') {
      setState(updater(state));
    } else {
      setState(updater);
    }
  };

  return [state, onChangeFunction];
}
