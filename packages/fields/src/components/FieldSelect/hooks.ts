import { ItemId } from '@ds/list';
import { isBrowser } from '@ds/utils';
import { FocusEvent, KeyboardEvent, RefObject, useCallback, useMemo, useRef } from 'react';

import { ADD_CUSTOM_OPTION_TRIGGER } from './constants';
import { FieldSelectAddCustomOptionTrigger } from './types';
import {
  getCustomOptionTriggerByKey,
  isCustomOptionBlurInsideField,
  resolveAddCustomOptionTriggers,
  shouldCommitCustomOptionOnClose,
  shouldHandleCustomOptionTrigger,
} from './utils';

/** Результат blur: фокус остался внутри поля, ввод зафиксирован, или коммитить было нечего. */
type CustomOptionBlurResult = 'inside' | 'committed' | 'skipped';

type UseCustomOptionParams = {
  allowCustomOption: boolean;
  addCustomOptionTriggers: readonly FieldSelectAddCustomOptionTrigger[] | undefined;
  multiple: boolean;
  inputValue: string;
  typing: boolean;
  multipleValue: ItemId[];
  commitSingle(value: ItemId | undefined): void;
  commitMultiple(value: ItemId[]): void;
  resetSearch(): void;
  inputElementRef: RefObject<HTMLInputElement | null>;
  clearButtonRef: RefObject<HTMLButtonElement | null>;
  copyButtonRef: RefObject<HTMLButtonElement | null>;
  footerActiveElementsRefs?: RefObject<HTMLElement>[];
};

/** Фиксация произвольного ввода как выбранной опции: триггеры, blur, закрытие списка. */
export function useCustomOption({
  allowCustomOption,
  addCustomOptionTriggers,
  multiple,
  inputValue,
  typing,
  multipleValue,
  commitSingle,
  commitMultiple,
  resetSearch,
  inputElementRef,
  clearButtonRef,
  copyButtonRef,
  footerActiveElementsRefs,
}: UseCustomOptionParams) {
  const listRef = useRef<HTMLElement>(null);
  const skipCloseCommitRef = useRef(false);
  const skipBlurCommitRef = useRef(false);

  const resolvedTriggers = useMemo(
    () =>
      resolveAddCustomOptionTriggers({
        allowCustomOption,
        addCustomOptionTriggers,
        multiple,
      }),
    [allowCustomOption, addCustomOptionTriggers, multiple],
  );

  const tryCommit = useCallback(
    (trigger: FieldSelectAddCustomOptionTrigger) => {
      if (!typing || !shouldHandleCustomOptionTrigger(trigger, resolvedTriggers) || inputValue === '') {
        return false;
      }

      if (multiple) {
        if (multipleValue.includes(inputValue)) {
          resetSearch();
        } else {
          commitMultiple([...multipleValue, inputValue]);
        }
      } else {
        commitSingle(inputValue);
      }

      return true;
    },
    [typing, resolvedTriggers, inputValue, multiple, multipleValue, commitMultiple, commitSingle, resetSearch],
  );

  const suppressCloseCommit = useCallback(() => {
    skipCloseCommitRef.current = true;
    skipBlurCommitRef.current = true;
  }, []);

  const enableCloseCommit = useCallback(() => {
    skipCloseCommitRef.current = false;
    skipBlurCommitRef.current = false;
  }, []);

  const tryCommitOnClose = useCallback(() => {
    const skipped = skipCloseCommitRef.current;
    const shouldCommit = shouldCommitCustomOptionOnClose({
      skip: skipped,
      inputElement: inputElementRef.current,
      activeElement: isBrowser() ? document.activeElement : null,
    });

    if (skipped) {
      queueMicrotask(() => {
        skipCloseCommitRef.current = false;
      });
    }

    return shouldCommit && tryCommit(ADD_CUSTOM_OPTION_TRIGGER.Blur);
  }, [inputElementRef, tryCommit]);

  const tryCommitOnBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>): CustomOptionBlurResult => {
      if (skipBlurCommitRef.current) {
        skipBlurCommitRef.current = false;
        return 'skipped';
      }

      if (
        isCustomOptionBlurInsideField(event.relatedTarget, [
          listRef.current,
          clearButtonRef.current,
          copyButtonRef.current,
          ...(footerActiveElementsRefs?.map(ref => ref.current) ?? []),
        ])
      ) {
        return 'inside';
      }

      return tryCommit(ADD_CUSTOM_OPTION_TRIGGER.Blur) ? 'committed' : 'skipped';
    },
    [clearButtonRef, copyButtonRef, footerActiveElementsRefs, tryCommit],
  );

  const tryCommitFromKeyboard = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const trigger = getCustomOptionTriggerByKey(event.key);

      return trigger !== undefined && tryCommit(trigger);
    },
    [tryCommit],
  );

  const handleListSingleChange = useCallback(
    (next: ItemId | undefined) => {
      skipCloseCommitRef.current = true;
      commitSingle(next);
    },
    [commitSingle],
  );

  const handleListMultipleChange = useCallback(
    (next: ItemId[]) => {
      skipCloseCommitRef.current = true;
      commitMultiple(next);
    },
    [commitMultiple],
  );

  return {
    listRef,
    suppressCloseCommit,
    enableCloseCommit,
    tryCommitOnClose,
    tryCommitOnBlur,
    tryCommitFromKeyboard,
    handleListSingleChange,
    handleListMultipleChange,
  };
}
