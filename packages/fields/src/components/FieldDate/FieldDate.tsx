import { CalendarDropdown, CalendarDropdownProps } from '@ds/calendar';
import { CalendarSVG } from '@ds/icons';
import { InputPrivate, useButtonNavigation, useClearButton } from '@ds/input-private';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  CSSProperties,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { TEST_IDS } from '../../constants';
import { useAdaptiveAutoFocus } from '../../hooks';
import { buildSegments, SegmentsMode, useSegmentedMask } from '../../segments';
import { FieldDecorator, SIZE, VALIDATION_STATE } from '../FieldDecorator';
import {
  copyTextToClipboard,
  getAcrylicProps,
  preventSlotMouseDown,
  stopSlotClickPropagation,
  toInputSize,
  useCopyButton,
} from '../shared';
import fieldStyles from '../shared/styles.module.scss';
import { DATE_MODE, DATE_RANGE_LABELS } from './constants';
import { dateToMaskString, formatMask, MaskMode, parseMask } from './mask';
import styles from './styles.module.scss';
import { DateRangeValue, DateValue, FieldDateProps } from './types';
import { isRange } from './utils';

export const FieldDate = forwardRef<HTMLInputElement, FieldDateProps>(function FieldDate(props, ref) {
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
    placeholder,
    labelFrom = DATE_RANGE_LABELS.from,
    labelTo = DATE_RANGE_LABELS.to,
    iconBefore,
    disabled,
    readonly: readOnly,
    background = true,
    open: openProp,
    onOpenChange,
    placement,
    today,
    showHolidays,
    buildCellProps,
    locale,
    presets,
    closeOnApply = true,
    closeOnPopstate,
    showClearButton = true,
    showCopyButton = true,
    onCopyButtonClick,
    showSeconds = true,
    id,
    name,
    autoFocus,
    layoutPresets,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    'data-test-id': dataTestId = TEST_IDS.fieldDate,
  } = props;

  const range = isRange(props);
  const maskMode: MaskMode = props.mode === DATE_MODE.DateTime ? DATE_MODE.DateTime : DATE_MODE.Date;
  const segMode: SegmentsMode = maskMode === DATE_MODE.DateTime ? DATE_MODE.DateTime : DATE_MODE.Date;
  const { mask: segMask, slots: segSlots } = useMemo(() => buildSegments(segMode, showSeconds), [segMode, showSeconds]);
  const placeholderMask = placeholder ?? segMask;

  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const navigationStartRef = useRef<{ focus(): void }>(null);
  const [hover, setHover] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const [openLocal, setOpenLocal] = useState(false);
  const open = openProp ?? openLocal;

  const resolvedAutoFocus = useAdaptiveAutoFocus(autoFocus, layoutPresets);

  const [singleLocal, setSingleLocal] = useState<DateValue>(!range ? (props.defaultValue as DateValue) : undefined);
  const [rangeLocal, setRangeLocal] = useState<DateRangeValue>(
    range ? ((props.defaultValue as DateRangeValue | undefined) ?? [undefined, undefined]) : [undefined, undefined],
  );

  const singleValue = useMemo<DateValue>(
    () => (!range ? ((props.value as DateValue) ?? singleLocal) : undefined),
    [range, props.value, singleLocal],
  );
  const rangeValue = useMemo<DateRangeValue>(
    () => (range ? ((props.value as DateRangeValue | undefined) ?? rangeLocal) : [undefined, undefined]),
    [range, props.value, rangeLocal],
  );

  const effectiveValidationState = useMemo(
    () => (error ? VALIDATION_STATE.Error : validationState),
    [error, validationState],
  );

  // Локальное состояние input'а(ов) — синхронизируется при внешних изменениях value, но не блокирует ввод.
  const [singleInputValue, setSingleInputValue] = useState(() =>
    !range && singleValue ? dateToMaskString(singleValue, maskMode, showSeconds) : '',
  );
  const [rangeInputValue, setRangeInputValue] = useState<[string, string]>(() => [
    range && rangeValue[0] ? dateToMaskString(rangeValue[0], maskMode, showSeconds) : '',
    range && rangeValue[1] ? dateToMaskString(rangeValue[1], maskMode, showSeconds) : '',
  ]);
  // Зеркало `rangeInputValue` — чтобы handleRangeInput читал актуальное состояние без side-effect в updater'е.
  const rangeInputValueRef = useRef(rangeInputValue);
  rangeInputValueRef.current = rangeInputValue;

  useEffect(() => {
    if (range) return;
    const next = singleValue ? dateToMaskString(singleValue, maskMode, showSeconds) : '';
    if (fromInputRef.current && document.activeElement === fromInputRef.current) return;
    setSingleInputValue(next);
  }, [singleValue, range, maskMode, showSeconds]);

  useEffect(() => {
    if (!range) return;
    const next: [string, string] = [
      rangeValue[0] ? dateToMaskString(rangeValue[0], maskMode, showSeconds) : '',
      rangeValue[1] ? dateToMaskString(rangeValue[1], maskMode, showSeconds) : '',
    ];
    // Чтение фокуса — до updater'а (updater остаётся чистым, без side-effect/DOM-доступа).
    const fromFocused = fromInputRef.current && document.activeElement === fromInputRef.current;
    const toFocused = toInputRef.current && document.activeElement === toInputRef.current;
    setRangeInputValue(prev => [fromFocused ? prev[0] : next[0], toFocused ? prev[1] : next[1]]);
  }, [rangeValue, range, maskMode, showSeconds]);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      // Календарь открывается кликом по полю (CalendarDropdown дёргает onOpenChange(true)).
      // readonly/disabled поле открывать нельзя — блокируем открытие, закрытие разрешаем.
      if (next && (disabled || readOnly)) return;
      if (openProp === undefined) setOpenLocal(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange, disabled, readOnly],
  );

  const commitSingle = useCallback(
    (next: DateValue) => {
      if (range) return;
      if (props.value === undefined) setSingleLocal(next);
      props.onChange?.(next);
    },
    [range, props],
  );

  const commitRange = useCallback(
    (next: DateRangeValue) => {
      if (!range) return;
      if (props.value === undefined) setRangeLocal(next);
      props.onChange?.(next);
    },
    [range, props],
  );

  // Сегментный ввод одиночной даты/даты-времени (range остаётся type-through ниже).
  const singleSeg = useSegmentedMask({
    inputRef: fromInputRef,
    mask: segMask,
    slots: segSlots,
    readonly: readOnly,
    disabled,
    setValue: setSingleInputValue,
    onMaskedChange: masked => {
      if (masked === '') {
        commitSingle(undefined);
        return;
      }
      const parsed = parseMask(masked, maskMode, showSeconds);
      if (parsed) commitSingle(parsed);
    },
    onArrowDown: () => {
      if (readOnly || disabled) return;
      handleOpenChange(true);
      // Клавиатурный handoff: фокус уходит в сетку календаря (паритет с легаси checkForLeavingFocus).
      setTimeout(() => navigationStartRef.current?.focus(), 0);
    },
    // ArrowUp в поле закрывает открытый календарь (фокус остаётся в input на текущем сегменте).
    onArrowUp: () => {
      if (readOnly || disabled) return;
      handleOpenChange(false);
    },
    onEscape: () => handleOpenChange(false),
    onEdit: () => handleOpenChange(false),
  });

  const handleRangeInput = useCallback(
    (idx: 0 | 1) => (input: string) => {
      const formatted = formatMask(input, maskMode, showSeconds);
      // Считаем следующее состояние из текущего rangeInputValue (ref), без side-effect в updater'е.
      const prev = rangeInputValueRef.current;
      const next: [string, string] = idx === 0 ? [formatted, prev[1]] : [prev[0], formatted];
      setRangeInputValue(next);

      const parsedFrom = next[0] ? parseMask(next[0], maskMode, showSeconds) : undefined;
      const parsedTo = next[1] ? parseMask(next[1], maskMode, showSeconds) : undefined;
      // Эмитим только когда обе даты валидны либо обе пусты — иначе ждём.
      const bothValid = (parsedFrom !== undefined || next[0] === '') && (parsedTo !== undefined || next[1] === '');
      if (bothValid) commitRange([parsedFrom, parsedTo]);
    },
    [maskMode, showSeconds, commitRange],
  );

  const handleClear = useCallback(() => {
    if (range) {
      setRangeInputValue(['', '']);
      commitRange([undefined, undefined]);
    } else {
      setSingleInputValue('');
      commitSingle(undefined);
    }
    fromInputRef.current?.focus();
  }, [range, commitRange, commitSingle]);

  const handleCalendarSingleChange = useCallback(
    (next: DateValue) => {
      if (range || disabled || readOnly) return;
      commitSingle(next);
      // Sync-эффект пропускает обновление сфокусированного input'а — обновляем строку сами.
      const nextStr = next ? dateToMaskString(next, maskMode, showSeconds) : '';
      setSingleInputValue(nextStr);
      // Императивно кладём строку в DOM ДО focus(): клик по дате блюрит input → handleBlur движка
      // сбрасывает `input.value` (был === mask) в ''. Возврат фокуса синхронно вызывает
      // `ensureMask`, который на пустом DOM пишет mask обратно и перетирает только что выбранную
      // дату (setSingleInputValue ещё не применён React'ом). Синхронизируем DOM сами — ensureMask
      // видит непустое значение и no-op'ает (баг: маска «залипала» в value-цвете после выбора).
      if (fromInputRef.current) {
        fromInputRef.current.value = nextStr;
      }
      // Выбор даты возвращает фокус в input и закрывает календарь (легаси handleSelectDate).
      // В date-time onChangeValue эмитится только по Apply (клик по дате копит internal state
      // календаря), поэтому выбор времени закрытием не обрывается — паритет с легаси.
      fromInputRef.current?.focus();
      handleOpenChange(false);
    },
    [range, disabled, readOnly, commitSingle, maskMode, showSeconds, handleOpenChange],
  );

  const handleCalendarRangeChange = useCallback(
    (next: DateRangeValue) => {
      if (!range || disabled || readOnly) return;
      commitRange(next);
      // Закрываем только когда выбраны оба конца периода (календарь эмитит полный Range).
      if (next[0] && next[1]) {
        setRangeInputValue([
          dateToMaskString(next[0], maskMode, showSeconds),
          dateToMaskString(next[1], maskMode, showSeconds),
        ]);
        fromInputRef.current?.focus();
        handleOpenChange(false);
      }
    },
    [range, disabled, readOnly, commitRange, maskMode, showSeconds, handleOpenChange],
  );

  // Общие input-обработчики range-инпутов (`inputCommon` ниже). Открытие календаря — за
  // click-триггером Dropdown и ArrowDown (легаси-паритет); open-on-focus конфликтовал с
  // click-toggle (первый клик открывал и тут же закрывал календарь).
  const handleInputFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocusVisible(event.target.matches(':focus-visible'));
      onFocusProp?.(event);
    },
    [onFocusProp],
  );

  const handleInputBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocusVisible(false);
      onBlurProp?.(event);
    },
    [onBlurProp],
  );

  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;
      if (event.key === 'Escape' && open) {
        event.preventDefault();
        handleOpenChange(false);
        return;
      }
      // ArrowDown открывает календарь и передаёт фокус в сетку — тот же клавиатурный handoff,
      // что у singleSeg.onArrowDown (легаси checkForLeavingFocus).
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        handleOpenChange(true);
        setTimeout(() => navigationStartRef.current?.focus(), 0);
      }
      // ArrowUp закрывает открытый календарь (фокус остаётся в range-input).
      if (event.key === 'ArrowUp' && open) {
        event.preventDefault();
        handleOpenChange(false);
      }
    },
    [disabled, readOnly, open, handleOpenChange],
  );

  // Single-input делегирует фокус/блюр сегментному движку, поэтому отдельные обработчики.
  const handleSingleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocusVisible(event.target.matches(':focus-visible'));
      singleSeg.handleFocus();
      onFocusProp?.(event);
    },
    [singleSeg, onFocusProp],
  );

  const handleSingleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocusVisible(false);
      singleSeg.handleBlur();
      onBlurProp?.(event);
    },
    [singleSeg, onBlurProp],
  );

  const handleCalendarFocusLeave = useCallback(() => {
    fromInputRef.current?.focus();
    handleOpenChange(false);
  }, [handleOpenChange]);

  const handleMouseEnter = useCallback(() => {
    if (!readOnly && !disabled) {
      setHover(true);
    }
  }, [readOnly, disabled]);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const valueToCopy = range ? [rangeInputValue[0], rangeInputValue[1]].filter(Boolean).join(' – ') : singleInputValue;

  // Галочку «скопировано» рисует useCopyButton по `true`-результату (паритет с FieldText/FieldTime).
  const handleCopy = useCallback(() => {
    const copied = Boolean(valueToCopy) && copyTextToClipboard(valueToCopy);
    if (copied) {
      onCopyButtonClick?.();
    }
    return copied;
  }, [onCopyButtonClick, valueToCopy]);

  const hasValue = range ? Boolean(rangeValue[0] || rangeValue[1]) : singleValue !== undefined;
  const showClear = Boolean(showClearButton && hasValue && !disabled && !readOnly);
  const showCopy = Boolean(showCopyButton && hasValue && readOnly && !disabled);

  const clearButtonSettings = useClearButton({
    clearButtonRef,
    showClearButton: showClear,
    size: toInputSize(size),
    onClear: handleClear,
    disabled: Boolean(disabled || readOnly),
    dataTestId: TEST_IDS.fieldDateClear,
  });

  const copyButtonSettings = useCopyButton({
    copyButtonRef,
    showCopyButton: showCopy,
    size: toInputSize(size),
    onCopy: handleCopy,
    disabled: Boolean(disabled),
    dataTestId: TEST_IDS.fieldDateCopy,
  });

  // ArrowDown с postfix-кнопки открывает календарь и передаёт фокус в сетку
  // (легаси checkForLeavingFocus на onButtonKeyDown).
  const handlePostfixButtonKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowDown' && !disabled && !readOnly) {
        handleOpenChange(true);
        setTimeout(() => navigationStartRef.current?.focus(), 0);
      }
    },
    [disabled, readOnly, handleOpenChange],
  );

  // Возврат фокуса с кнопок (ArrowLeft): handleFocus движка выбирает первый сегмент, а возврат
  // идёт «справа» — перевыбираем последний (легаси setInputFocusFromButtons: Year/Seconds).
  const setInputFocusFromButtons = useCallback(() => {
    if (range) {
      toInputRef.current?.focus();
      return;
    }
    fromInputRef.current?.focus();
    singleSeg.selectSlot(singleSeg.lastSlot);
  }, [range, singleSeg]);

  const { postfixButtons, inputTabIndex, onInputKeyDown } = useButtonNavigation({
    // Roving-композит живёт на «последнем» инпуте перед кнопками: single или range «to».
    inputRef: range ? toInputRef : fromInputRef,
    setInputFocus: setInputFocusFromButtons,
    postfixButtons: useMemo(() => [clearButtonSettings, copyButtonSettings], [clearButtonSettings, copyButtonSettings]),
    onButtonKeyDown: handlePostfixButtonKeyDown,
    readonly: Boolean(readOnly),
    submitKeys: ['Enter', 'Space', 'Tab'],
  });

  // Нав-цепочка бежит безусловно ПОСЛЕ движка (легаси useHandlers): движок ставит каретку в конец
  // на ArrowRight с последнего сегмента, nav читает её в том же keydown и забирает фокус на кнопку.
  const handleSingleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      singleSeg.handleKeyDown(event);
      onInputKeyDown(event);
    },
    [singleSeg, onInputKeyDown],
  );

  const handleToInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      handleInputKeyDown(event);
      onInputKeyDown(event);
    },
    [handleInputKeyDown, onInputKeyDown],
  );

  const inputCommon = {
    disabled,
    readonly: readOnly,
    inputMode: 'numeric' as const,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    onKeyDown: handleInputKeyDown,
  };

  const trigger = (
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        <div className={fieldStyles.borderStateLayer} data-state='regularBorder' />
        <div className={fieldStyles.focusLayer} />
      </div>
      <div className={fieldStyles.fieldContainer}>
        <div className={fieldStyles.contentWrapper}>
          {iconBefore && <div className={fieldStyles.iconSlot}>{iconBefore}</div>}
          <div className={fieldStyles.inputLine}>
            <div className={fieldStyles.inputArea}>
              {range ? (
                // --field-date-mask-ch — длина маски для ширины from-инпута (.rangeInputFrom, ширина в ch):
                // «дата – дата» слитно слева, остаток поля забирает to-инпут.
                <span
                  className={styles.rangeInputs}
                  style={{ '--field-date-mask-ch': placeholderMask.length } as CSSProperties}
                >
                  <InputPrivate
                    {...inputCommon}
                    ref={mergeRefs(ref, fromInputRef)}
                    className={cn(fieldStyles.fieldInput, styles.rangeInputFrom)}
                    value={rangeInputValue[0]}
                    placeholder={placeholderMask}
                    onChange={handleRangeInput(0)}
                    id={id}
                    name={name}
                    autoFocus={resolvedAutoFocus}
                    aria-label={labelFrom}
                    data-test-id={TEST_IDS.fieldDateInputFrom}
                  />
                  <span className={styles.rangeSeparator} aria-hidden>
                    –
                  </span>
                  <InputPrivate
                    {...inputCommon}
                    ref={toInputRef}
                    className={fieldStyles.fieldInput}
                    value={rangeInputValue[1]}
                    placeholder={placeholderMask}
                    onChange={handleRangeInput(1)}
                    // «to» — последний инпут перед кнопками: на нём живёт roving-композит
                    // (ArrowRight в конце → clear/copy), keydown-цепочка с nav-handler'ом.
                    onKeyDown={handleToInputKeyDown}
                    tabIndex={inputTabIndex}
                    aria-label={labelTo}
                    data-test-id={TEST_IDS.fieldDateInputTo}
                  />
                </span>
              ) : (
                <InputPrivate
                  ref={mergeRefs(ref, fromInputRef)}
                  className={fieldStyles.fieldInput}
                  value={singleInputValue}
                  placeholder={placeholderMask}
                  // Single/date-time ведёт сегментный движок (keydown, useSegmentedMask), нативный
                  // onChange игнорируется. Range — обычный ввод-по-маске (formatMask в handleRangeInput).
                  onChange={() => {}}
                  onKeyDown={handleSingleKeyDown}
                  onClick={singleSeg.handleClick}
                  onPaste={singleSeg.handlePaste}
                  onFocus={handleSingleFocus}
                  onBlur={handleSingleBlur}
                  disabled={disabled}
                  readonly={readOnly}
                  inputMode='numeric'
                  tabIndex={inputTabIndex}
                  id={id}
                  name={name}
                  autoFocus={resolvedAutoFocus}
                  aria-haspopup='dialog'
                  aria-expanded={open}
                  data-test-id={TEST_IDS.fieldDateInput}
                />
              )}
            </div>
            {/* Clear/Copy — roving-композит useButtonNavigation (Figma `buttonClear`): Tab уходит
                из поля целиком, по кнопкам ходят стрелки. test-id кнопок — TEST_IDS.fieldDateClear/
                fieldDateCopy (адресуемый = интерактивный узел). preventSlotMouseDown держит фокус
                в инпуте, stopSlotClickPropagation не даёт клику тогглить dropdown. */}
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
          </div>
          {/* Иконка календаря — декоративная; дроплист открывается кликом по полю. */}
          <div className={fieldStyles.iconSlot} data-test-id={TEST_IDS.fieldDateCalendar} aria-hidden>
            <CalendarSVG />
          </div>
        </div>
      </div>
    </div>
  );

  // Дискриминированный union по `mode` — каждый вариант несёт корректно типизированные `value`/`onChangeValue`.
  type CalendarModeProps =
    | {
        mode: typeof DATE_MODE.DateRange;
        // undefined — частично заполненный/пустой период: в сетку календаря не передаём (см. ниже).
        value: DateRangeValue | undefined;
        onChangeValue(next: DateRangeValue): void;
      }
    | {
        mode: typeof DATE_MODE.DateTime;
        value: DateValue;
        onChangeValue(next: DateValue): void;
        showSeconds: boolean;
      }
    | { mode: typeof DATE_MODE.Date; value: DateValue; onChangeValue(next: DateValue): void };

  let calendarProps: CalendarModeProps;
  if (range) {
    // @ds/calendar ожидает `Range = [Date, Date]` (оба края обязательны) и в date-range падает на
    // `[undefined, …]` (getInRangePosition → .getFullYear() на undefined). FieldDate допускает частично
    // заполненный период, поэтому передаём в сетку value только когда обе даты реальны — иначе undefined
    // (нет выделения), а ввод периода продолжает работать через инпуты.
    const bothEndsFilled = rangeValue[0] !== undefined && rangeValue[1] !== undefined;
    calendarProps = {
      mode: DATE_MODE.DateRange,
      value: bothEndsFilled ? rangeValue : undefined,
      onChangeValue: handleCalendarRangeChange,
    };
  } else if (maskMode === DATE_MODE.DateTime) {
    calendarProps = {
      mode: DATE_MODE.DateTime,
      value: singleValue,
      onChangeValue: handleCalendarSingleChange,
      showSeconds,
    };
  } else {
    calendarProps = {
      mode: DATE_MODE.Date,
      value: singleValue,
      onChangeValue: handleCalendarSingleChange,
    };
  }

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
      <CalendarDropdown
        // CalendarDropdown ожидает `Range = [Date, Date]` в режиме date-range, а FieldDate хранит
        // `[Date | undefined, Date | undefined]` (период может быть заполнен частично). Локализованный
        // cast в `mode`-union календаря — единственная точка, где сходятся эти представления периода.
        {...(calendarProps as Extract<CalendarDropdownProps, { mode: CalendarModeProps['mode'] }>)}
        // CalendarDropdown тегирует контент открытого календаря как `content-<id>`. Без id портальный
        // контент остаётся неадресуемым (e2e/visual не находят открытый календарь).
        data-test-id={TEST_IDS.fieldDateCalendarDropdown}
        size={size}
        open={open}
        onOpenChange={handleOpenChange}
        placement={placement ?? 'bottom-start'}
        today={today}
        showHolidays={showHolidays}
        buildCellProps={buildCellProps}
        locale={locale}
        presets={presets}
        closeOnApply={closeOnApply}
        closeOnPopstate={closeOnPopstate}
        navigationStartRef={navigationStartRef}
        onFocusLeave={handleCalendarFocusLeave}
      >
        {trigger}
      </CalendarDropdown>
    </FieldDecorator>
  );
});
