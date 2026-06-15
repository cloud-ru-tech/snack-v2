import { ColorPicker, ColorPickerProps, RawColor } from '@ds/color-picker';
import { Dropdown } from '@ds/dropdown';
import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons';
import { InputPrivate, InputPrivateProps, useButtonNavigation, useClearButton } from '@ds/input-private';
import { useValueControl } from '@ds/utils';
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
import { FieldDecorator, FieldDecoratorProps, SIZE, VALIDATION_STATE } from '../FieldDecorator';
import { copyTextToClipboard, getAcrylicProps, toInputSize, useCopyButton } from '../shared';
import fieldStyles from '../shared/styles.module.scss';
import styles from './styles.module.scss';
import { normalizeHexInput } from './utils';

type FieldColorDecoratorProps = Omit<FieldDecoratorProps, 'children'>;

type FieldColorOwnProps = {
  /** CSS-класс корня `FieldDecorator` */
  className?: string;
  /** CSS-класс оболочки поля */
  fieldClassName?: string;
  /** Текущее значение (hex/rgb/hsl-строка, controlled-режим). */
  value?: string;
  /** Начальное значение (uncontrolled-режим). */
  defaultValue?: string;
  /** Колбек смены значения. */
  onChange?(value: string): void;
  /** Открыт color-picker. */
  open?: boolean;
  /** Колбек смены состояния открытия. */
  onOpenChange?(open: boolean): void;
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
} & Pick<ColorPickerProps, 'withAlpha' | 'autoApply' | 'availableModes'>;

export type FieldColorProps = FieldColorDecoratorProps &
  Omit<InputPrivateProps, 'className' | 'value' | 'onChange'> &
  FieldColorOwnProps;

export const FieldColor = forwardRef<HTMLInputElement, FieldColorProps>(function FieldColor(
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
    defaultValue = '',
    onChange: onChangeProp,
    open: openProp,
    onOpenChange,
    showClearButton: showClearButtonProp = true,
    onClearButtonClick,
    showCopyButton: showCopyButtonProp = true,
    onCopyButtonClick,
    withAlpha,
    autoApply,
    availableModes,
    disabled,
    readonly: readOnly,
    placeholder,
    'data-test-id': dataTestId = TEST_IDS.fieldColor,
    ...inputProps
  },
  ref,
) {
  const {
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    onKeyDown: onKeyDownProp,
    tabIndex: tabIndexProp,
    autoFocus,
    ...restInputProps
  } = inputProps;
  const localRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const [focusVisible, setFocusVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [openLocal, setOpenLocal] = useState(false);
  const open = openProp ?? openLocal;

  const [value = '', onChange] = useValueControl<string>({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });
  const effectiveValidationState = useMemo(
    () => (error ? VALIDATION_STATE.Error : validationState),
    [error, validationState],
  );

  const showOpen = open && !disabled && !readOnly;
  const showClearUi = Boolean(showClearButtonProp && value && !readOnly && !disabled);
  const showCopyUi = Boolean(showCopyButtonProp && value && !disabled && readOnly);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (openProp === undefined) setOpenLocal(next);
      onOpenChange?.(next);
    },
    [openProp, onOpenChange],
  );

  // Фокус в поле при открытии пикера (паритет с легаси `@snack-uikit/fields`).
  useEffect(() => {
    if (open) {
      localRef.current?.focus();
    }
  }, [open]);

  const onClear = useCallback(() => {
    onChange?.('');
    onClearButtonClick?.();
    if (required) {
      localRef.current?.focus();
    }
  }, [onChange, onClearButtonClick, required]);

  const onCopy = useCallback(() => {
    const copied = copyTextToClipboard(value);
    if (copied) {
      onCopyButtonClick?.();
    }
    return copied;
  }, [onCopyButtonClick, value]);

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

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      onInputKeyDown(event);
      onKeyDownProp?.(event);
    },
    [onInputKeyDown, onKeyDownProp],
  );

  const handleInputChange = useCallback(
    (next: string) => {
      onChange?.(normalizeHexInput(next, withAlpha));
    },
    [onChange, withAlpha],
  );

  const handlePickerChange = useCallback(
    (raw: RawColor) => {
      onChange?.(raw.hex);
    },
    [onChange],
  );

  const handleMouseEnter = useCallback(() => {
    if (!readOnly && !disabled) {
      setHover(true);
    }
  }, [readOnly, disabled]);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

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

  const trigger = (
    <div
      className={cn(fieldStyles.fieldWrapper, styles.trigger, fieldClassName)}
      data-size={size}
      data-validation-state={effectiveValidationState}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-withbackground={background || undefined}
      data-focusvisible={focusVisible || showOpen || undefined}
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
            focusVisible: focusVisible || showOpen,
          })}
        >
          <div className={fieldStyles.acrylicBg} aria-hidden />
        </div>
        <div className={fieldStyles.borderStateLayer} data-state='regularBorder' />
        <div className={fieldStyles.focusLayer} />
      </div>
      <div className={fieldStyles.fieldContainer}>
        <div className={fieldStyles.contentWrapper}>
          <div className={fieldStyles.iconSlot}>
            <span
              className={styles.swatch}
              data-test-id={TEST_IDS.fieldColorSwatch}
              style={{ '--field-color-swatch-color': value || 'transparent' } as CSSProperties}
              aria-hidden
            />
          </div>
          <div className={fieldStyles.inputLine}>
            <div className={fieldStyles.inputArea}>
              <InputPrivate
                ref={mergeRefs(ref, localRef)}
                className={fieldStyles.fieldInput}
                value={value}
                onChange={handleInputChange}
                disabled={disabled}
                readonly={readOnly}
                placeholder={placeholder}
                autoFocus={autoFocus}
                tabIndex={tabIndexProp ?? inputTabIndex}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...restInputProps}
                data-test-id={TEST_IDS.fieldColorInput}
              />
              {postfixButtons && <span className={fieldStyles.postfixButtonsSlot}>{postfixButtons}</span>}
            </div>
          </div>
          {/* Chevron присутствует во всех состояниях, включая readonly — паритет с Figma
              readonly-варианты тоже показывают chevron-down рядом с copy). */}
          <div className={fieldStyles.iconSlot}>
            <span className={styles.chevron} data-test-id={TEST_IDS.fieldColorChevron} aria-hidden>
              {showOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}
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
      validationState={validationState}
      showHintIcon={showHintIcon}
      length={length}
      required={required}
      labelFor={inputProps.id}
      disabled={disabled}
      readonly={readOnly}
      size={size}
    >
      <Dropdown
        trigger='click'
        widthStrategy='auto'
        open={showOpen}
        onOpenChange={handleOpenChange}
        content={
          <ColorPicker
            value={value || undefined}
            size={size}
            withAlpha={withAlpha}
            autoApply={autoApply}
            availableModes={availableModes}
            onChange={handlePickerChange}
            data-test-id={TEST_IDS.fieldColorPicker}
          />
        }
      >
        {trigger}
      </Dropdown>
    </FieldDecorator>
  );
});
