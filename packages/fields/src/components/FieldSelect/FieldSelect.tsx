import { ChevronDownSVG } from '@ds/icons/interface/system';
import { InputPrivate, useButtonNavigation, useClearButton } from '@ds/input-private';
import { Droplist, ItemId } from '@ds/list';
import { Tag } from '@ds/tag';
import { isBrowser, useLayoutEffect } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  CSSProperties,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

// Минимальная ширина поискового input'а в режиме чипов (паритет с легаси BASE_MIN_WIDTH).
const SEARCH_INPUT_PLUG_MIN_WIDTH = 4;

import { FieldDecorator, SIZE, VALIDATION_STATE } from '@ds/field-decorator';

import { TEST_IDS } from '../../constants';
import { useAdaptiveAutoFocus } from '../../hooks';
import {
  copyTextToClipboard,
  getAcrylicProps,
  preventSlotMouseDown,
  stopSlotClickPropagation,
  toInputSize,
  useCopyButton,
} from '../shared';
import fieldStyles from '../shared/styles.module.scss';
import { useCustomOption } from './hooks';
import styles from './styles.module.scss';
import { FieldSelectMultipleProps, FieldSelectProps, FieldSelectSingleProps } from './types';
import {
  extractAppearance,
  extractLabel,
  filterItems,
  findItem,
  flatten,
  getMissingSelectedItems,
  getSelectedIds,
  isMultiple,
  TAG_SIZE_MAP,
  WithIdContent,
} from './utils';

export const FieldSelect = forwardRef<HTMLInputElement, FieldSelectProps>(function FieldSelect(props, ref) {
  const {
    label = '',
    labelTooltip,
    caption,
    hint,
    error,
    validationState = VALIDATION_STATE.Default,
    showHintIcon,
    length,
    required,
    size = SIZE.M,
    className,
    fieldClassName,
    items,
    pinTop,
    pinBottom,
    placeholder = '',
    iconBefore,
    prefix,
    postfix,
    disabled,
    readonly: readOnly,
    background = true,
    open: openProp,
    onOpenChange,
    placement,
    widthStrategy = 'eq',
    searchable = true,
    search,
    autocomplete = false,
    resetSearchOnOptionSelection = true,
    showClearButton = true,
    showCopyButton = true,
    onCopyButtonClick,
    id,
    name,
    autoFocus,
    layoutPresets,
    value,
    onChange,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    enableFuzzySearch = true,
    selectedOptionFormatter,
    footer,
    footerDivider,
    footerActiveElementsRefs,
    loading,
    noDataState,
    noResultsState,
    errorDataState,
    dataError,
    dataFiltered,
    virtualized,
    scrollToSelectedItem,
    limitedScrollHeight,
    untouchableScrollbars,
    closeOnPopstate,
    onKeyDown: onKeyDownProp,
    'data-test-id': dataTestId = TEST_IDS.fieldSelect,
  } = props;
  const multiple = isMultiple(props);
  const chips = multiple ? (props.chips ?? true) : false;
  const removeByBackspace = multiple ? (props.removeByBackspace ?? true) : false;
  const closeDroplistOnItemClick = props.closeDroplistOnItemClick ?? !multiple;
  const allowCustomOption = props.allowCustomOption === true;
  const addCustomOptionTriggers = allowCustomOption ? props.addCustomOptionTriggers : undefined;

  const onSingleChange = onChange as FieldSelectSingleProps['onChange'];
  const onMultipleChange = onChange as FieldSelectMultipleProps['onChange'];

  const resolvedAutoFocus = useAdaptiveAutoFocus(autoFocus, layoutPresets);

  const inputRef = useRef<HTMLInputElement>(null);
  // Отдельный ref на реальный <input>: `inputRef.current` перезаписывается span-обёрткой PopoverPrivate.
  const inputElementRef = useRef<HTMLInputElement>(null);
  const restoreInputFocusRef = useRef(false);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputPlugRef = useRef<HTMLSpanElement>(null);
  const [chipInputMinWidth, setChipInputMinWidth] = useState<number | undefined>(undefined);
  const [hover, setHover] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const [openLocal, setOpenLocal] = useState(false);
  const open = openProp ?? openLocal;

  const [singleLocal, setSingleLocal] = useState<ItemId | undefined>(
    !multiple ? (props.defaultValue as ItemId | undefined) : undefined,
  );
  const [multipleLocal, setMultipleLocal] = useState<ItemId[]>(
    // Страховка от вызова без типов (Storybook-spread): при multiple defaultValue может прийти строкой.
    multiple && Array.isArray(props.defaultValue) ? (props.defaultValue as ItemId[]) : [],
  );

  // Controlled-режим «залипает»: иначе очистка через `value: undefined` откатится на локальный стейт.
  const singleControlled = useRef(false);
  const multipleControlled = useRef(false);

  if (!multiple && value !== undefined) {
    singleControlled.current = true;
  }

  if (multiple && Array.isArray(value)) {
    multipleControlled.current = true;
  }

  const singleValue = useMemo<ItemId | undefined>(() => {
    if (multiple) {
      return undefined;
    }

    const raw = singleControlled.current ? (value as ItemId | undefined) : singleLocal;

    // `''` = «значение не выбрано»: формы отдают пустое значение строкой.
    return raw === '' ? undefined : raw;
  }, [multiple, value, singleLocal]);

  const multipleValue = useMemo<ItemId[]>(() => {
    if (!multiple) {
      return [];
    }

    if (multipleControlled.current) {
      return Array.isArray(value) ? (value as ItemId[]) : [];
    }

    return multipleLocal;
  }, [multiple, value, multipleLocal]);

  const effectiveValidationState = useMemo(
    () => (error ? VALIDATION_STATE.Error : validationState),
    [error, validationState],
  );

  const allItems = useMemo(() => [...(pinTop ?? []), ...items, ...(pinBottom ?? [])], [items, pinTop, pinBottom]);

  const selectedIds = useMemo(
    () => getSelectedIds({ multiple, multipleValue, singleValue }),
    [multiple, multipleValue, singleValue],
  );

  // Выбранное, которого нет в `items` (кастом по allowCustomOption, ленивая подгрузка) — в список, не только в чип.
  const missingSelectedItems = useMemo(() => getMissingSelectedItems(selectedIds, allItems), [selectedIds, allItems]);

  const itemsWithPlaceholders = useMemo(
    () => (missingSelectedItems.length > 0 ? [...missingSelectedItems, ...items] : items),
    [missingSelectedItems, items],
  );

  // Выбранное значение переживает смену `items` (серверный поиск, ленивая подгрузка).
  const seenItems = useRef(new Map<ItemId, WithIdContent>());

  const resolveItem = useMemo(() => {
    for (const item of flatten([...missingSelectedItems, ...allItems])) {
      if (item.id !== undefined) {
        seenItems.current.set(item.id, item);
      }
    }

    return (id: ItemId) => findItem(allItems, id) ?? findItem(missingSelectedItems, id) ?? seenItems.current.get(id);
  }, [allItems, missingSelectedItems]);

  const selectedPairs = useMemo(() => {
    if (!multiple || multipleValue.length === 0) {
      return [];
    }

    // Неизвестное значение (ещё не загружены опции) показываем по его id, не теряем (паритет с легаси).
    return multipleValue.map(id => {
      const item = resolveItem(id);

      return {
        id,
        label: item ? extractLabel(item) : String(id),
        disabled: Boolean(item?.disabled),
        appearance: extractAppearance(item),
      };
    });
  }, [multiple, multipleValue, resolveItem]);

  const formatPair = useCallback(
    (pair: { id: ItemId; label: string }) => (selectedOptionFormatter ? selectedOptionFormatter(pair) : pair.label),
    [selectedOptionFormatter],
  );

  const formatSelected = 'formatSelected' in props && props.formatSelected;

  const selectedLabel = useMemo(() => {
    if (!multiple) {
      if (singleValue === undefined) {
        return '';
      }

      const item = resolveItem(singleValue);
      const label = item ? extractLabel(item) : String(singleValue);

      return formatPair({ id: singleValue, label });
    }

    if (chips) {
      return '';
    }

    if (formatSelected) {
      return formatSelected(selectedPairs);
    }

    return selectedPairs.map(formatPair).join(', ');
  }, [multiple, singleValue, selectedPairs, chips, formatSelected, formatPair, resolveItem]);

  const [localInput, setLocalInput] = useState(search?.defaultValue ?? selectedLabel);
  const inputValue = search?.value !== undefined ? search.value : localInput;
  const [typing, setTyping] = useState(false);

  // `search` — объектный литерал с новой идентичностью каждый рендер; ref делает `setInputValue` стабильным.
  const searchRef = useRef(search);
  searchRef.current = search;

  const setInputValue = useCallback((next: string) => {
    const currentSearch = searchRef.current;

    if (currentSearch?.value === undefined) {
      setLocalInput(next);
    }

    currentSearch?.onChange?.(next);
  }, []);

  const syncedLabelRef = useRef(selectedLabel);

  useLayoutEffect(() => {
    if (typing || !resetSearchOnOptionSelection || syncedLabelRef.current === selectedLabel) {
      return;
    }

    syncedLabelRef.current = selectedLabel;
    setInputValue(selectedLabel);
  }, [selectedLabel, typing, resetSearchOnOptionSelection, setInputValue]);

  // При autocomplete фильтрует сервер — items берутся как есть, плюс выбранное вне списка.
  const filteredItems = useMemo(() => {
    if (!searchable || autocomplete || !typing) {
      return itemsWithPlaceholders;
    }

    return filterItems(itemsWithPlaceholders, inputValue, enableFuzzySearch);
  }, [searchable, autocomplete, typing, itemsWithPlaceholders, inputValue, enableFuzzySearch]);

  const filteredPinTop = useMemo(() => {
    if (!searchable || autocomplete || !typing || !pinTop) {
      return pinTop;
    }

    return filterItems(pinTop, inputValue, enableFuzzySearch);
  }, [searchable, autocomplete, typing, pinTop, inputValue, enableFuzzySearch]);

  const filteredPinBottom = useMemo(() => {
    if (!searchable || autocomplete || !typing || !pinBottom) {
      return pinBottom;
    }

    return filterItems(pinBottom, inputValue, enableFuzzySearch);
  }, [searchable, autocomplete, typing, pinBottom, inputValue, enableFuzzySearch]);

  const handleSingleChange = useCallback(
    (next: ItemId | undefined) => {
      if (multiple) {
        return;
      }

      if (value === undefined) {
        setSingleLocal(next);
      }

      onSingleChange?.(next);
      setTyping(false);
    },
    [multiple, value, onSingleChange],
  );

  const restoreInputFocus = useCallback(() => {
    restoreInputFocusRef.current = isBrowser() && inputElementRef.current === document.activeElement;
  }, []);

  const handleMultipleChange = useCallback(
    (next: ItemId[]) => {
      if (!multiple) {
        return;
      }

      restoreInputFocus();

      if (value === undefined) {
        setMultipleLocal(next);
      }

      onMultipleChange?.(next);

      if (searchable) {
        setTyping(false);

        if (resetSearchOnOptionSelection) {
          setInputValue('');
        }
      }
    },
    [multiple, onMultipleChange, value, searchable, resetSearchOnOptionSelection, setInputValue, restoreInputFocus],
  );

  const resetCustomOptionSearch = useCallback(() => {
    setTyping(false);

    if (resetSearchOnOptionSelection) {
      setInputValue(multiple ? '' : selectedLabel);
    }
  }, [resetSearchOnOptionSelection, setInputValue, multiple, selectedLabel]);

  const {
    listRef,
    suppressCloseCommit,
    enableCloseCommit,
    tryCommitOnClose,
    tryCommitOnBlur,
    tryCommitFromKeyboard,
    handleListSingleChange,
    handleListMultipleChange,
  } = useCustomOption({
    allowCustomOption,
    addCustomOptionTriggers,
    multiple,
    inputValue,
    typing,
    multipleValue,
    commitSingle: handleSingleChange,
    commitMultiple: handleMultipleChange,
    resetSearch: resetCustomOptionSearch,
    inputElementRef,
    clearButtonRef,
    copyButtonRef,
    footerActiveElementsRefs,
  });

  const handleOpenChange = useCallback(
    (next: boolean) => {
      // readonly/disabled поле открывать нельзя, закрывать — можно.
      if (next && (disabled || readOnly)) return;
      if (openProp === undefined) {
        setOpenLocal(next);
      }

      onOpenChange?.(next);

      if (!next) {
        setTyping(false);
        const committed = tryCommitOnClose();

        // Кастомная опция не зафиксирована — вернуть лейбл выбранного значения.
        if (resetSearchOnOptionSelection && !committed) {
          setInputValue(selectedLabel);
        }
      }
    },
    [
      openProp,
      onOpenChange,
      disabled,
      readOnly,
      resetSearchOnOptionSelection,
      setInputValue,
      selectedLabel,
      tryCommitOnClose,
    ],
  );

  const handleInputChange = (next: string) => {
    enableCloseCommit();
    setInputValue(next);
    setTyping(true);

    if (!open) {
      handleOpenChange(true);
    }
  };

  const handleClear = useCallback(() => {
    if (multiple) {
      // Отключённые выбранные значения остаются при очистке (паритет с легаси).
      const keepDisabled = selectedPairs.filter(pair => pair.disabled).map(pair => pair.id);

      if (value === undefined) {
        setMultipleLocal(keepDisabled);
      }

      onMultipleChange?.(keepDisabled);
    } else {
      if (value === undefined) {
        setSingleLocal(undefined);
      }

      onSingleChange?.(undefined);
    }

    setInputValue('');
    setTyping(false);
    inputElementRef.current?.focus();

    // required → переоткрыть дроплист после очистки (паритет с легаси onClear).
    if (required && !open) {
      handleOpenChange(true);
    }
  }, [
    multiple,
    selectedPairs,
    setInputValue,
    required,
    open,
    handleOpenChange,
    value,
    onSingleChange,
    onMultipleChange,
  ]);

  const removeChip = useCallback(
    (id: ItemId) => {
      if (!multiple) {
        return;
      }

      // Нельзя удалить отключённый чип (паритет с легаси).
      if (selectedPairs.find(pair => pair.id === id)?.disabled) {
        return;
      }

      const next = multipleValue.filter(v => v !== id);

      if (value === undefined) {
        setMultipleLocal(next);
      }

      onMultipleChange?.(next);
    },
    [multiple, multipleValue, selectedPairs, value, onMultipleChange],
  );

  const handleRemoveChip = useCallback(
    (id: ItemId) => (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      removeChip(id);
    },
    [removeChip],
  );

  const hasValue = multiple ? multipleValue.length > 0 : singleValue !== undefined;
  const showClear = Boolean(showClearButton && hasValue && !disabled && !readOnly);
  const showCopy = Boolean(showCopyButton && hasValue && readOnly && !disabled);
  const valueToCopy = multiple ? selectedPairs.map(formatPair).join(', ') : selectedLabel;

  const onCopy = useCallback(async () => {
    const copied = await copyTextToClipboard(valueToCopy);
    if (copied) {
      onCopyButtonClick?.();
    }
    return copied;
  }, [onCopyButtonClick, valueToCopy]);

  // Clear/Copy — roving-postfix (ArrowRight/ArrowLeft), паритет с FieldCombo.
  const clearButtonSettings = useClearButton({
    clearButtonRef,
    showClearButton: showClear,
    size: toInputSize(size),
    onClear: handleClear,
    onDown: preventSlotMouseDown,
    disabled: Boolean(disabled || readOnly),
    dataTestId: TEST_IDS.fieldSelectClear,
  });

  const copyButtonSettings = useCopyButton({
    copyButtonRef,
    showCopyButton: showCopy,
    size: toInputSize(size),
    onCopy,
    disabled: Boolean(disabled),
    dataTestId: TEST_IDS.fieldSelectCopy,
  });

  const { postfixButtons, inputTabIndex, onInputKeyDown } = useButtonNavigation({
    inputRef: inputElementRef,
    postfixButtons: useMemo(() => [clearButtonSettings, copyButtonSettings], [clearButtonSettings, copyButtonSettings]),
    readonly: !searchable || Boolean(readOnly),
    submitKeys: ['Enter', ' ', 'Tab'],
  });

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (searchable && event.key === ' ') {
      event.stopPropagation();
    }
    // Consumer-обработчик идёт до внутренней обработки (паритет с легаси useHandleOnKeyDown).
    onKeyDownProp?.(event);

    onInputKeyDown(event);

    if (disabled || readOnly) {
      return;
    }

    if (event.key === 'ArrowDown' && !open) {
      event.preventDefault();
      handleOpenChange(true);
    }

    if (event.key === 'Escape' && open) {
      event.preventDefault();
      suppressCloseCommit();
      handleOpenChange(false);
    }

    if (tryCommitFromKeyboard(event)) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    if (event.key === 'Enter' && !open) {
      event.preventDefault();
      handleOpenChange(true);
    }

    if (event.key === 'Backspace' && removeByBackspace && multiple && inputValue === '' && multipleValue.length > 0) {
      event.preventDefault();
      const last = multipleValue[multipleValue.length - 1];
      removeChip(last);
      restoreInputFocus();
    }
  };

  const handleTriggerKeyDownCapture = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Escape') {
      suppressCloseCommit();
    }
  };

  const handleTriggerMouseEnter = useCallback(() => {
    if (!readOnly && !disabled) {
      setHover(true);
    }
  }, [readOnly, disabled]);

  const handleTriggerMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleTriggerClick = useCallback(() => {
    if (disabled || readOnly) {
      return;
    }

    if (!open) {
      handleOpenChange(true);
    }

    inputElementRef.current?.focus();
  }, [disabled, readOnly, open, handleOpenChange]);

  const handleInputFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocusVisible(event.target.matches(':focus-visible'));

      if (searchable) {
        event.target.select();
      }

      onFocusProp?.(event);
    },
    [searchable, onFocusProp],
  );

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    setFocusVisible(false);
    const blurResult = tryCommitOnBlur(event);

    // Закрытый список не получит onOpenChange — вернуть лейбл выбранного значения.
    // Клик по айтему открытого списка даёт relatedTarget === null, восстановление делает закрытие.
    if (resetSearchOnOptionSelection && blurResult === 'skipped' && (!open || event.relatedTarget !== null)) {
      setTyping(false);
      setInputValue(selectedLabel);
    }

    onBlurProp?.(event);
  };

  const droplistSelection = multiple
    ? { mode: 'multiple' as const, value: multipleValue, onChange: handleListMultipleChange }
    : { mode: 'single' as const, value: singleValue, onChange: handleListSingleChange };

  const hasChips = chips && selectedPairs.length > 0;

  useLayoutEffect(() => {
    if (!restoreInputFocusRef.current) {
      return;
    }

    restoreInputFocusRef.current = false;
    inputElementRef.current?.focus();
  }, [multipleValue.length]);

  // minWidth поискового input'а = ширина введённого текста (`.inputPlug`), но не больше строки чипов.
  // Замер до paint, иначе input мигает при вводе.
  useLayoutEffect(() => {
    if (!hasChips) {
      setChipInputMinWidth(undefined);
      return;
    }
    const content = contentRef.current?.clientWidth ?? SEARCH_INPUT_PLUG_MIN_WIDTH;
    const plug = inputPlugRef.current?.clientWidth ?? SEARCH_INPUT_PLUG_MIN_WIDTH;
    setChipInputMinWidth(Math.min(content, Math.max(plug, SEARCH_INPUT_PLUG_MIN_WIDTH)));
  }, [hasChips, inputValue, selectedPairs.length]);

  const searchInputField = (
    <InputPrivate
      ref={mergeRefs(ref, inputRef, inputElementRef)}
      className={cn(fieldStyles.fieldInput, !searchable && styles.readonlyCursor)}
      value={inputValue}
      onChange={searchable ? handleInputChange : undefined}
      placeholder={selectedLabel || hasChips ? '' : placeholder}
      disabled={disabled}
      readonly={!searchable || readOnly}
      id={id}
      name={name}
      autoFocus={resolvedAutoFocus}
      tabIndex={inputTabIndex}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      onKeyDown={handleTriggerKeyDown}
      data-test-id={TEST_IDS.fieldSelectInput}
    />
  );

  const searchInput = hasChips ? (
    <div key='search-input' className={styles.inputWrapper} style={{ minWidth: chipInputMinWidth } as CSSProperties}>
      {searchInputField}
    </div>
  ) : (
    <div className={fieldStyles.inputArea}>{searchInputField}</div>
  );

  const trigger = (
    // Focusable-элемент — InputPrivate внутри, обёртка только собирает combobox.
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cn(fieldStyles.fieldWrapper, styles.trigger, fieldClassName)}
      data-size={size}
      data-validation-state={effectiveValidationState}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-withbackground={background || undefined}
      data-focusvisible={focusVisible || open || undefined}
      data-hover={!readOnly && !disabled && hover ? true : undefined}
      data-test-id={dataTestId}
      onMouseEnter={handleTriggerMouseEnter}
      onMouseLeave={handleTriggerMouseLeave}
      onKeyDownCapture={handleTriggerKeyDownCapture}
      onClick={handleTriggerClick}
    >
      <div className={fieldStyles.backgroundWrapper}>
        <div
          className={fieldStyles.materialLayer}
          {...getAcrylicProps({
            validationState: effectiveValidationState,
            disabled,
            readonly: readOnly,
            hover,
            focusVisible: focusVisible || open,
          })}
        >
          <div className={fieldStyles.acrylicBg} aria-hidden />
        </div>
        <div className={fieldStyles.borderStateLayer} data-state='borderOnBackground' />
        <div className={fieldStyles.focusLayer} />
      </div>
      <div className={fieldStyles.fieldContainer}>
        <div className={fieldStyles.contentWrapper}>
          {iconBefore && <div className={fieldStyles.iconSlot}>{iconBefore}</div>}
          <div className={fieldStyles.inputLine}>
            {prefix && <span className={fieldStyles.prefix}>{prefix}</span>}
            {/* Чипы и input в одном wrap-контейнере: input течёт за последним чипом. */}
            {hasChips ? (
              <div className={styles.chipsRow} ref={contentRef} data-test-id={TEST_IDS.fieldSelectChips}>
                {selectedPairs.map(pair => (
                  <Tag
                    key={String(pair.id)}
                    label={formatPair(pair)}
                    size={TAG_SIZE_MAP[size]}
                    appearance={pair.appearance ?? 'neutral'}
                    onDelete={disabled || readOnly || pair.disabled ? undefined : handleRemoveChip(pair.id)}
                  />
                ))}
                {searchInput}
                {/* Скрытая копия введённого текста — по её ширине считается minWidth input'а. */}
                <span ref={inputPlugRef} className={styles.inputPlug} aria-hidden>
                  {inputValue}
                </span>
              </div>
            ) : (
              searchInput
            )}
            {/* Обёртка гасит всплытие mousedown/click к Droplist-триггеру. */}
            {postfixButtons && (
              // eslint-disable-next-line jsx-a11y/no-static-element-interactions
              <span
                className={fieldStyles.postfixButtonsSlot}
                onMouseDown={preventSlotMouseDown}
                onClick={stopSlotClickPropagation}
              >
                {postfixButtons}
              </span>
            )}
            {postfix && <span className={fieldStyles.postfix}>{postfix}</span>}
          </div>
          <div className={fieldStyles.iconSlot}>
            <span className={styles.chevron} data-open={open || undefined} aria-hidden>
              <ChevronDownSVG />
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <FieldDecorator
      className={className}
      label={label}
      labelTooltip={labelTooltip}
      caption={caption}
      hint={hint}
      error={error}
      size={size}
      validationState={validationState}
      showHintIcon={showHintIcon}
      length={length}
      required={required}
      labelFor={id}
      disabled={disabled}
      readonly={readOnly}
    >
      <Droplist
        items={filteredItems}
        label={label}
        pinTop={filteredPinTop}
        pinBottom={filteredPinBottom}
        trigger='click'
        placement={placement}
        widthStrategy={widthStrategy}
        triggerElemRef={inputRef}
        listRef={listRef}
        size={size}
        open={open}
        onOpenChange={handleOpenChange}
        selection={droplistSelection}
        closeDroplistOnItemClick={closeDroplistOnItemClick}
        footer={footer}
        footerDivider={footerDivider}
        footerActiveElementsRefs={footerActiveElementsRefs}
        loading={loading}
        noDataState={noDataState}
        noResultsState={noResultsState}
        errorDataState={errorDataState}
        dataError={dataError}
        dataFiltered={dataFiltered ?? (searchable && typing && inputValue !== '')}
        virtualized={virtualized}
        scroll
        scrollToSelectedItem={scrollToSelectedItem}
        limitedScrollHeight={limitedScrollHeight}
        untouchableScrollbars={untouchableScrollbars}
        closeOnPopstate={closeOnPopstate}
        data-test-id={TEST_IDS.fieldSelectList}
      >
        {trigger}
      </Droplist>
    </FieldDecorator>
  );
});
