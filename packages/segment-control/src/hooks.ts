import { KeyboardEventHandler, useCallback, useMemo, useState } from 'react';

import { IdType, Segment } from './types';

type UseFocusControlParams = {
  items: Segment[];
  selected?: IdType;
  onSelect: (value: IdType) => void;
};

function firstEnabled(items: Segment[]): IdType | undefined {
  return items.find(item => !item.disabled)?.value;
}

function lastEnabled(items: Segment[]): IdType | undefined {
  for (let i = items.length - 1; i >= 0; i--) {
    if (!items[i].disabled) {
      return items[i].value;
    }
  }
  return undefined;
}

export function useFocusControl({ selected, items, onSelect }: UseFocusControlParams) {
  // Roving tabindex: focusable segment = selected, либо fallback на первый non-disabled.
  const fallbackFocusable = useMemo(() => firstEnabled(items), [items]);
  const selectedExistsAndEnabled = useMemo(
    () => items.some(item => item.value === selected && !item.disabled),
    [items, selected],
  );
  const effectiveFocusable = selectedExistsAndEnabled ? selected : fallbackFocusable;

  const [focusableSegmentValue, setFocusableSegmentValue] = useState<IdType | undefined>(effectiveFocusable);
  const [, setNeedSetFocus] = useState(false);

  // Если selected меняется снаружи — синхронизируем focusable.
  const syncedFocusable = effectiveFocusable !== undefined ? effectiveFocusable : focusableSegmentValue;

  const moveTo = useCallback(
    (nextValue: IdType | undefined) => {
      if (nextValue === undefined) {
        return;
      }
      setNeedSetFocus(true);
      setFocusableSegmentValue(nextValue);
      onSelect(nextValue);
    },
    [onSelect],
  );

  const findNext = useCallback(
    (from: IdType | undefined): IdType | undefined => {
      const enabled = items.filter(i => !i.disabled);
      if (enabled.length === 0) return undefined;
      const idx = enabled.findIndex(i => i.value === from);
      if (idx === -1) return enabled[0].value;
      return enabled[(idx + 1) % enabled.length].value;
    },
    [items],
  );

  const findPrev = useCallback(
    (from: IdType | undefined): IdType | undefined => {
      const enabled = items.filter(i => !i.disabled);
      if (enabled.length === 0) return undefined;
      const idx = enabled.findIndex(i => i.value === from);
      if (idx === -1) return enabled[enabled.length - 1].value;
      return enabled[(idx - 1 + enabled.length) % enabled.length].value;
    },
    [items],
  );

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    e => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp': {
          e.preventDefault();
          moveTo(findPrev(syncedFocusable));
          return;
        }
        case 'ArrowRight':
        case 'ArrowDown': {
          e.preventDefault();
          moveTo(findNext(syncedFocusable));
          return;
        }
        case 'Home': {
          e.preventDefault();
          moveTo(firstEnabled(items));
          return;
        }
        case 'End': {
          e.preventDefault();
          moveTo(lastEnabled(items));
          return;
        }
        default: {
          return;
        }
      }
    },
    [findNext, findPrev, items, moveTo, syncedFocusable],
  );

  const onGetFocusable = useCallback((ref: HTMLButtonElement | null) => {
    setNeedSetFocus(needSetFocus => {
      if (needSetFocus) {
        ref?.focus();
      }
      return false;
    });
  }, []);

  return { onKeyDown, focusableSegmentValue: syncedFocusable, onGetFocusable };
}
