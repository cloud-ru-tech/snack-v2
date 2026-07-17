import { TimePickerDropdown, TimeValue } from '@ds/calendar';
import { WatchSVG } from '@ds/icons/interface/system';
import { INPUT_MODE, InputPrivate, useButtonNavigation, useClearButton } from '@ds/input-private';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { FieldLayoutPresets, useAdaptiveAutoFocus } from '../../hooks';
import { buildSegments, useSegmentedMask } from '../../segments';
import { FieldDecorator, FieldDecoratorProps, SIZE, VALIDATION_STATE } from '../FieldDecorator';
import { copyTextToClipboard, getAcrylicProps, toInputSize, useCopyButton } from '../shared';
import fieldStyles from '../shared/styles.module.scss';
import { parseTimeMask, timeToMaskString } from './mask';
import styles from './styles.module.scss';

type FieldTimeDecoratorProps = Omit<FieldDecoratorProps, 'children'>;

type FieldTimeOwnProps = {
  /** CSS-класс корня `FieldDecorator` */
  className?: string;
  /** CSS-класс оболочки поля */
  fieldClassName?: string;
  /** Значение */
  value?: TimeValue;
  /** Дефолтное значение для uncontrolled-режима */
  defaultValue?: TimeValue;
  /** Колбек смены значения */
  onChange?(value: TimeValue | undefined): void;
  /** Плейсхолдер маски; по умолчанию `чч:мм:сс` или `чч:мм` в зависимости от `showSeconds`. */
  placeholder?: string;
  /** Открыт ли picker (controlled) */
  open?: boolean;
  /** Колбек смены состояния открытия */
  onOpenChange?(open: boolean): void;
  /**
   * Показывать секунды в picker и в маске input.
   * @default true
   */
  showSeconds?: boolean;
  /**
   * Закрыть picker после Apply.
   * @default true
   */
  closeOnApply?: boolean;
  /**
   * Показывать кнопку очистки (видна при value && !readonly && !disabled).
   * @default true
   */
  showClearButton?: boolean;
  /** Колбек после клика по кнопке очистки. */
  onClearButtonClick?(): void;
  /**
   * Показывать кнопку копирования (видна при readonly && value && !disabled).
   * @default true
   */
  showCopyButton?: boolean;
  /** Колбек после копирования значения. */
  onCopyButtonClick?(): void;
  /**
   * Фон поля (acrylic).
   * @default true
   */
  background?: boolean;
  /** Отключено */
  disabled?: boolean;
  /** Только для чтения */
  readonly?: boolean;
  /** Автофокус. На mobile выключается адаптивно (см. `layoutPresets`) */
  autoFocus?: boolean;
  /**
   * Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен
   * (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`.
   */
  layoutPresets?: FieldLayoutPresets;
  /** HTML id */
  id?: string;
  /** HTML name */
  name?: string;
  /** Колбек фокуса input */
  onFocus?(event: FocusEvent<HTMLInputElement>): void;
  /** Колбек блюра input */
  onBlur?(event: FocusEvent<HTMLInputElement>): void;
};

export type FieldTimeProps = FieldTimeDecoratorProps & FieldTimeOwnProps;

export const FieldTime = forwardRef<HTMLInputElement, FieldTimeProps>(function FieldTime(
  {
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
    background = true,
    value: valueProp,
    defaultValue,
    onChange,
    open: openProp,
    onOpenChange,
    showSeconds = true,
    closeOnApply = true,
    showClearButton: showClearButtonProp = true,
    onClearButtonClick,
    showCopyButton: showCopyButtonProp = true,
    onCopyButtonClick,
    disabled,
    readonly: readOnly,
    autoFocus,
    layoutPresets,
    id,
    name,
    placeholder,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    'data-test-id': dataTestId = TEST_IDS.fieldTime,
    ...rest
  },
  ref,
) {
  const localRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const navigationStartRef = useRef<{ focus(): void }>(null);
  const [hover, setHover] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const [openLocal, setOpenLocal] = useState(false);
  const open = openProp ?? openLocal;

  const [valueLocal, setValueLocal] = useState<TimeValue | undefined>(defaultValue);
  const value = valueProp ?? valueLocal;

  const resolvedAutoFocus = useAdaptiveAutoFocus(autoFocus, layoutPresets);

  const { mask: segMask, slots: segSlots } = useMemo(() => buildSegments('time', showSeconds), [showSeconds]);
  const placeholderMask = placeholder ?? segMask;
  const effectiveValidationState = useMemo(
    () => (error ? VALIDATION_STATE.Error : validationState),
    [error, validationState],
  );

  const [inputValue, setInputValue] = useState<string>(value ? timeToMaskString(value, showSeconds) : '');

  useEffect(() => {
    // Пока поле в фокусе — значением владеет сегментный движок (keydown), внешний sync пропускаем,
    // иначе setInputValue из эффекта дерётся с движком и зацикливает рендер.
    if (localRef.current && document.activeElement === localRef.current) return;
    setInputValue(value ? timeToMaskString(value, showSeconds) : '');
  }, [value, showSeconds]);

  const emitChange = useCallback(
    (next: TimeValue | undefined) => {
      if (valueProp === undefined) setValueLocal(next);
      onChange?.(next);
    },
    [onChange, valueProp],
  );

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpenLocal(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  const timeSeg = useSegmentedMask({
    inputRef: localRef,
    mask: segMask,
    slots: segSlots,
    readonly: readOnly,
    disabled,
    setValue: setInputValue,
    onMaskedChange: masked => {
      if (masked === '') {
        emitChange(undefined);
        return;
      }
      const parsed = parseTimeMask(masked, showSeconds);
      if (parsed) emitChange(parsed);
    },
    onArrowDown: () => {
      handleOpenChange(true);
      // Клавиатурный handoff в picker (барабаны времени), паритет с легаси.
      setTimeout(() => navigationStartRef.current?.focus(), 0);
    },
    // ArrowUp в поле закрывает открытый picker (фокус остаётся в input на текущем сегменте).
    onArrowUp: () => handleOpenChange(false),
    onEscape: () => handleOpenChange(false),
    onEdit: () => handleOpenChange(false),
  });

  const onClear = useCallback(() => {
    setInputValue('');
    emitChange(undefined);
    onClearButtonClick?.();
    if (required) {
      localRef.current?.focus();
      handleOpenChange(true);
    } else {
      localRef.current?.blur();
      handleOpenChange(false);
    }
  }, [emitChange, handleOpenChange, onClearButtonClick, required]);

  const onCopy = useCallback(() => {
    const copied = Boolean(inputValue) && copyTextToClipboard(inputValue);
    if (copied) {
      onCopyButtonClick?.();
    }
    return copied;
  }, [inputValue, onCopyButtonClick]);

  const showClearUi = Boolean(showClearButtonProp && inputValue && !disabled && !readOnly);
  const showCopyUi = Boolean(showCopyButtonProp && inputValue && !disabled && readOnly);

  const clearButtonSettings = useClearButton({
    clearButtonRef,
    showClearButton: showClearUi,
    size: toInputSize(size),
    onClear,
    disabled: Boolean(disabled || readOnly),
  });

  const copyButtonSettings = useCopyButton({
    copyButtonRef,
    showCopyButton: showCopyUi,
    size: toInputSize(size),
    onCopy,
    disabled: Boolean(disabled),
  });

  const { postfixButtons, inputTabIndex, onInputKeyDown } = useButtonNavigation({
    inputRef: localRef,
    postfixButtons: useMemo(() => [clearButtonSettings, copyButtonSettings], [clearButtonSettings, copyButtonSettings]),
    readonly: Boolean(readOnly),
    submitKeys: ['Enter', 'Space', 'Tab'],
  });

  const handleMouseEnter = useCallback(() => {
    if (!readOnly && !disabled) {
      setHover(true);
    }
  }, [readOnly, disabled]);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      timeSeg.handleKeyDown(event);
      // Нав-цепочка бежит безусловно ПОСЛЕ движка (легаси-порядок useHandlers): движок мутирует
      // selection синхронно (ArrowRight на последнем сегменте ставит каретку в конец), nav читает
      // её в том же keydown и забирает фокус на postfix-кнопки. Гейт по defaultPrevented оставлял
      // clear/copy недостижимыми со стрелок — движок всегда делает preventDefault на ArrowRight.
      onInputKeyDown(event);
    },
    [onInputKeyDown, timeSeg],
  );

  // value ведёт сегментный движок (keydown); нативный onChange input'а игнорируем.
  const handleInputChange = useCallback(() => undefined, []);

  const handleInputFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocusVisible(event.target.matches(':focus-visible'));
      timeSeg.handleFocus();
      onFocusProp?.(event);
    },
    [onFocusProp, timeSeg],
  );

  const handleInputBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocusVisible(false);
      timeSeg.handleBlur();
      onBlurProp?.(event);
    },
    [onBlurProp, timeSeg],
  );

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
          <div className={fieldStyles.inputLine}>
            <div className={fieldStyles.inputArea}>
              <InputPrivate
                ref={mergeRefs(ref, localRef)}
                className={fieldStyles.fieldInput}
                value={inputValue}
                onChange={handleInputChange}
                disabled={disabled}
                readonly={readOnly}
                placeholder={placeholderMask}
                inputMode={INPUT_MODE.Numeric}
                tabIndex={inputTabIndex}
                onClick={timeSeg.handleClick}
                onPaste={timeSeg.handlePaste}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyDown={handleInputKeyDown}
                id={id}
                name={name}
                autoFocus={resolvedAutoFocus}
                aria-haspopup='dialog'
                aria-expanded={open}
                {...extractSupportProps(rest)}
                data-test-id={TEST_IDS.fieldTimeInput}
              />
              {postfixButtons && <span className={fieldStyles.postfixButtonsSlot}>{postfixButtons}</span>}
            </div>
          </div>
          {/* Иконка часов — декоративная; дроплист открывается кликом по полю. */}
          <div className={fieldStyles.iconSlot} data-test-id={TEST_IDS.fieldTimeIcon} aria-hidden>
            <WatchSVG />
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
      validationState={validationState}
      showHintIcon={showHintIcon}
      length={length}
      required={required}
      labelFor={id}
      disabled={disabled}
      readonly={readOnly}
      size={size}
    >
      <TimePickerDropdown
        // Явный data-test-id на дропдауне → детерминированный id портального контента:
        // `getTestIdBuilder` строит `content-${id}`, так контент адресуем для open-picker-снимка
        // (без него контент рисуется без data-test-id, а в @ds/fields::TEST_IDS такого слота нет).
        data-test-id={`${dataTestId}__picker`}
        size={size}
        value={value}
        onChangeValue={emitChange}
        showSeconds={showSeconds}
        closeOnApply={closeOnApply}
        open={open && !disabled && !readOnly}
        onOpenChange={handleOpenChange}
        trigger='click'
        placement='bottom-start'
        navigationStartRef={navigationStartRef}
        onFocusLeave={() => {
          localRef.current?.focus();
          handleOpenChange(false);
        }}
      >
        {trigger}
      </TimePickerDropdown>
    </FieldDecorator>
  );
});
