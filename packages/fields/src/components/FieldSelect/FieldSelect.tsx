import { ChevronDownSVG } from '@ds/icons/interface/system';
import { InputPrivate, useButtonNavigation, useClearButton } from '@ds/input-private';
import { Droplist, ItemId } from '@ds/list';
import { Tag } from '@ds/tag';
import { useLayoutEffect } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  CSSProperties,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

// Минимальная ширина поискового input'а в режиме чипов: при пустом вводе input «схлопывается»
// к этому значению и прижимается к последнему чипу (паритет с легаси BASE_MIN_WIDTH).
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
import styles from './styles.module.scss';
import { FieldSelectProps } from './types';
import {
  extractAppearance,
  extractLabel,
  filterItems,
  findItem,
  flatten,
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
    addOptionByEnter = false,
    resetSearchOnOptionSelection = true,
    showClearButton = true,
    showCopyButton = true,
    onCopyButtonClick,
    id,
    name,
    autoFocus,
    layoutPresets,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    enableFuzzySearch = true,
    selectedOptionFormatter,
    footer,
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

  const resolvedAutoFocus = useAdaptiveAutoFocus(autoFocus, layoutPresets);

  const inputRef = useRef<HTMLInputElement>(null);
  // Реальный <input>: `inputRef` уходит в Droplist как `triggerElemRef`, а `PopoverPrivate`
  // перезаписывает его `.current` своей span-обёрткой (см. MR!101). Отдельный ref на сам input
  // нужен для `useButtonNavigation` (курсор/фокус) и возврата фокуса после очистки.
  const inputElementRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  // Контейнер чипов+input (замер доступной ширины) и скрытый плаг (замер ширины введённого текста)
  // для расчёта minWidth поискового input'а в режиме чипов — см. searchInput ниже.
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
    // Array.isArray-страховка: при multiple defaultValue обязан быть массивом по типам,
    // но «расхлябанный» вызов (например, Storybook-spread, где single-default остаётся
    // строкой при переключении selection) не должен ронять компонент на `.map` строки.
    multiple && Array.isArray(props.defaultValue) ? (props.defaultValue as ItemId[]) : [],
  );
  const singleValue = useMemo<ItemId | undefined>(
    () => (!multiple ? ((props.value as ItemId | undefined) ?? singleLocal) : undefined),
    [multiple, props.value, singleLocal],
  );
  const multipleValue = useMemo<ItemId[]>(() => {
    if (!multiple) {
      return [];
    }
    return Array.isArray(props.value) ? (props.value as ItemId[]) : multipleLocal;
  }, [multiple, props.value, multipleLocal]);

  const effectiveValidationState = useMemo(
    () => (error ? VALIDATION_STATE.Error : validationState),
    [error, validationState],
  );

  const allItems = useMemo(() => [...(pinTop ?? []), ...items, ...(pinBottom ?? [])], [items, pinTop, pinBottom]);

  // Выбранное значение переживает смену `items` (серверный поиск, ленивая подгрузка).
  const seenItems = useRef(new Map<ItemId, WithIdContent>());

  const resolveItem = useMemo(() => {
    for (const item of flatten(allItems)) {
      if (item.id !== undefined) {
        seenItems.current.set(item.id, item);
      }
    }

    return (id: ItemId) => findItem(allItems, id) ?? seenItems.current.get(id);
  }, [allItems]);

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

    if ('formatSelected' in props && props.formatSelected) {
      return props.formatSelected(selectedPairs);
    }

    return selectedPairs.map(formatPair).join(', ');
  }, [multiple, singleValue, selectedPairs, chips, props, formatPair, resolveItem]);

  // Строка поиска: controlled через `search.value`, иначе локальный state. Auto-sync к выбранному
  // значению делаем через СТАБИЛЬНЫЙ setLocalInput, а не через setInputValue в deps эффекта —
  // иначе нестабильная ссылка сеттера зацикливает эффект (сбрасывала бы значение постоянно).
  const [localInput, setLocalInput] = useState(search?.defaultValue ?? selectedLabel);
  const inputValue = search?.value !== undefined ? search.value : localInput;
  const [typing, setTyping] = useState(false);

  const setInputValue = useCallback(
    (next: string) => {
      if (search?.value === undefined) {
        setLocalInput(next);
      }
      search?.onChange?.(next);
    },
    [search],
  );

  useEffect(() => {
    if (!typing && resetSearchOnOptionSelection && search?.value === undefined) {
      setLocalInput(selectedLabel);
    }
  }, [selectedLabel, typing, resetSearchOnOptionSelection, search]);

  // autocomplete — клиентскую фильтрацию не делаем, список берётся из items как есть (серверный поиск).
  const filteredItems = useMemo(() => {
    if (!searchable || autocomplete || !typing) {
      return items;
    }

    return filterItems(items, inputValue, enableFuzzySearch);
  }, [searchable, autocomplete, typing, items, inputValue, enableFuzzySearch]);

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

  const handleOpenChange = useCallback(
    (next: boolean) => {
      // Дроплист открывается кликом по полю (Droplist дёргает onOpenChange(true)).
      // readonly/disabled поле открывать нельзя — блокируем открытие, закрытие разрешаем.
      if (next && (disabled || readOnly)) return;
      if (openProp === undefined) {
        setOpenLocal(next);
      }

      onOpenChange?.(next);

      if (!next) {
        setTyping(false);

        if (resetSearchOnOptionSelection) {
          setInputValue(selectedLabel);
        }
      }
    },
    [openProp, onOpenChange, disabled, readOnly, resetSearchOnOptionSelection, setInputValue, selectedLabel],
  );

  const handleSingleChange = (next: ItemId | undefined) => {
    if (multiple) {
      return;
    }

    if (props.value === undefined) {
      setSingleLocal(next);
    }

    props.onChange?.(next);
    setTyping(false);
  };

  const handleMultipleChange = (next: ItemId[]) => {
    if (!multiple) {
      return;
    }

    if (props.value === undefined) {
      setMultipleLocal(next);
    }

    props.onChange?.(next);

    if (searchable) {
      setTyping(false);

      if (resetSearchOnOptionSelection) {
        setInputValue('');
      }
    }
  };

  const handleInputChange = (next: string) => {
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

      if (props.value === undefined) {
        setMultipleLocal(keepDisabled);
      }

      props.onChange?.(keepDisabled);
    } else {
      if (props.value === undefined) {
        setSingleLocal(undefined);
      }

      props.onChange?.(undefined);
    }

    setInputValue('');
    setTyping(false);
    inputElementRef.current?.focus();

    // required → переоткрыть дроплист после очистки (паритет с легаси onClear).
    if (required && !open) {
      handleOpenChange(true);
    }
  }, [multiple, props, selectedPairs, setInputValue, required, open, handleOpenChange]);

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

      if (props.value === undefined) {
        setMultipleLocal(next);
      }

      props.onChange?.(next);
    },
    [multiple, multipleValue, props, selectedPairs],
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

  // Clear/Copy как roving-postfix: ArrowRight из input (курсор в конце или readonly) уводит на
  // кнопку, ArrowLeft — обратно в поле. Паритет с FieldCombo. `inputElementRef` — реальный input,
  // т.к. `inputRef` клобберится popover'ом.
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
    submitKeys: ['Enter', 'Space', 'Tab'],
  });

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Пробрасываем consumer onKeyDown до внутренней обработки (паритет с легаси useHandleOnKeyDown).
    onKeyDownProp?.(event);

    // Roving-навигация по clear/copy (ArrowRight/ArrowLeft). ArrowDown/Enter ниже не перехватываются.
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
      handleOpenChange(false);
    }

    if (addOptionByEnter && event.key === 'Enter' && inputValue !== '') {
      // Зафиксировать введённый текст как новый выбор (создание опции «на лету»).
      event.preventDefault();

      if (multiple) {
        if (!multipleValue.includes(inputValue)) {
          handleMultipleChange([...multipleValue, inputValue]);
        }
      } else {
        handleSingleChange(inputValue);
      }

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

  const handleInputBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocusVisible(false);
      onBlurProp?.(event);
    },
    [onBlurProp],
  );

  const droplistSelection = multiple
    ? { mode: 'multiple' as const, value: multipleValue, onChange: handleMultipleChange }
    : { mode: 'single' as const, value: singleValue, onChange: handleSingleChange };

  const hasChips = chips && selectedPairs.length > 0;

  // minWidth поискового input'а в режиме чипов: ширина введённого текста (скрытый `.inputPlug`),
  // но не больше ширины строки чипов (`contentRef`). Замер в layout-эффекте (до paint, без мигания):
  // пустой ввод → ~4px (input прижат к последнему чипу), длинный ввод → перенос на новую строку
  // через flex-wrap. Без чипов minWidth не задаётся (input занимает всю строку как single-select).
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
      placeholder={selectedLabel ? '' : placeholder}
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

  // В режиме чипов input заворачивается в `.inputWrapper` с динамической minWidth (флоу за чипами);
  // без чипов — обычный `inputArea` на всю строку.
  const searchInput = hasChips ? (
    <div className={styles.inputWrapper} style={{ minWidth: chipInputMinWidth } as CSSProperties}>
      {searchInputField}
    </div>
  ) : (
    <div className={fieldStyles.inputArea}>{searchInputField}</div>
  );

  const trigger = (
    // Семантика: combobox-обёртка с InputPrivate внутри (input = focusable element).
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
            {/* Чипы и поисковый input живут в одном wrap-контейнере (паритет с легаси
                FieldSelect .contentWrapper): input течёт сразу за последним чипом и
                переносится на новую строку только когда не влезает. */}
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
                {/* Скрытый плаг: рендерит введённый текст той же типографикой, замеряем его ширину
                    для minWidth поискового input'а (см. layout-эффект выше). aria-hidden — вне дерева. */}
                <span ref={inputPlugRef} className={styles.inputPlug} aria-hidden>
                  {inputValue}
                </span>
              </div>
            ) : (
              searchInput
            )}
            {/* Clear/Copy — roving-postfix через useButtonNavigation (ArrowRight/ArrowLeft).
                Слот-обёртка гасит всплытие mousedown/click к Droplist-триггеру; test-id и onClick
                живут на <Button> внутри (адресуемый = интерактивный). */}
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
        size={size}
        open={open}
        onOpenChange={handleOpenChange}
        selection={droplistSelection}
        closeDroplistOnItemClick={closeDroplistOnItemClick}
        footer={footer}
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
      >
        {trigger}
      </Droplist>
    </FieldDecorator>
  );
});
