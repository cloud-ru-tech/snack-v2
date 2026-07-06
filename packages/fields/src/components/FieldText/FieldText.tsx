import { Divider } from '@ds/divider';
import { InputPrivate, InputPrivateProps, useButtonNavigation, useClearButton } from '@ds/input-private';
import { useValueControl } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { FieldLayoutPresets, useAdaptiveAutoFocus } from '../../hooks';
import { FieldDecorator, FieldDecoratorProps, SIZE, VALIDATION_STATE } from '../FieldDecorator';
import {
  ButtonSize,
  copyTextToClipboard,
  FieldElementButton,
  FieldElementButtonList,
  FieldElementButtonProps,
  FieldElementDroplistProps,
  getAcrylicProps,
  isCursorAtEnd,
  isCursorAtStart,
  toInputSize,
  useCopyButton,
} from '../shared';
import fieldStyles from '../shared/styles.module.scss';

/**
 * Слот-кнопка поля (`elementBefore` / `elementAfter`). Помимо обычной кнопки-действия
 * может нести встроенный выпадающий список (`droplist`) на `@ds/list`.
 */
type FieldElementSlot = Omit<FieldElementButtonProps, 'variant' | 'open' | 'onKeyDown'> & {
  /** Встроенный выпадающий список (действия / выбор) на `@ds/list` `Droplist` */
  droplist?: FieldElementDroplistProps;
};

type FieldTextDecoratorProps = Omit<FieldDecoratorProps, 'children'>;

type FieldTextSlotProps = {
  /** CSS-класс корня `FieldDecorator` */
  className?: string;
  /** CSS-класс оболочки поля ввода */
  fieldClassName?: string;
  /**
   * Фон поля (acrylic)
   * @default true
   */
  background?: boolean;
  /**
   * Разделитель между основным полем и слотами `elementBefore` / `elementAfter`
   * @default true
   */
  outline?: boolean;
  /** Префикс (текст или нода) */
  prefix?: ReactNode;
  /** Постфикс (текст или нода) */
  postfix?: ReactNode;
  /** Иконка слева от строки ввода */
  iconBefore?: ReactNode;
  /** Иконка справа от строки ввода */
  iconAfter?: ReactNode;
  /**
   * Ведущая иконка.
   * @deprecated Используйте `iconBefore` — он приоритетнее, если заданы оба.
   */
  prefixIcon?: ReactNode;
  /** Слот слева (кнопка / селект с опциональным выпадающим списком) */
  elementBefore?: FieldElementSlot;
  /** Слот справа (кнопка / селект с опциональным выпадающим списком) */
  elementAfter?: FieldElementSlot;
  /**
   * Показывать кнопку очистки значения (как в Search)
   * @default true
   */
  showClearButton?: boolean;
  /** Колбек клика по кнопке очистки */
  onClearButtonClick?(): void;
  /**
   * Показывать кнопку копирования значения (только при `readonly = true` и непустом `value`)
   * @default true
   */
  showCopyButton?: boolean;
  /** Колбек после копирования значения в буфер */
  onCopyButtonClick?(): void;
  /**
   * Разрешить ввод свыше `maxLength` символов (счётчик продолжит расти).
   * @default false
   */
  allowMoreThanMaxLength?: boolean;
  /** Значение поля (controlled-режим) */
  value?: string;
  /** Начальное значение (uncontrolled-режим) */
  defaultValue?: string;
  /** Колбек смены значения */
  onChange?(value: string): void;
  /**
   * Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен
   * (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`.
   */
  layoutPresets?: FieldLayoutPresets;
};

export type FieldTextProps = FieldTextDecoratorProps &
  Omit<InputPrivateProps, 'className' | 'value' | 'onChange'> &
  FieldTextSlotProps;

export const FieldText = forwardRef<HTMLInputElement, FieldTextProps>(function FieldText(
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
    outline = true,
    prefix,
    postfix,
    iconBefore: iconBeforeProp,
    iconAfter,
    prefixIcon,
    elementBefore,
    elementAfter,
    showClearButton: showClearButtonProp = true,
    onClearButtonClick,
    showCopyButton: showCopyButtonProp = true,
    onCopyButtonClick,
    allowMoreThanMaxLength = false,
    disabled,
    readonly: readOnly,
    value: valueProp,
    defaultValue = '',
    onChange: onChangeProp,
    placeholder,
    'data-test-id': dataTestId,
    ...inputProps
  },
  ref,
) {
  const {
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    onKeyDown: onKeyDownProp,
    tabIndex: tabIndexProp,
    maxLength,
    autoFocus,
    layoutPresets,
    ...restInputProps
  } = inputProps;

  const resolvedAutoFocus = useAdaptiveAutoFocus(autoFocus, layoutPresets);

  // `prefixIcon` — легаси-псевдоним ведущей иконки; `iconBefore` приоритетнее.
  const iconBefore = iconBeforeProp ?? prefixIcon;

  const [value = '', onChange] = useValueControl<string>({
    value: valueProp,
    defaultValue,
    onChange: onChangeProp,
  });

  const localRef = useRef<HTMLInputElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const elementBeforeRef = useRef<HTMLButtonElement>(null);
  const elementAfterRef = useRef<HTMLButtonElement>(null);
  const [focusVisible, setFocusVisible] = useState(false);
  const [hover, setHover] = useState(false);

  const effectiveValidationState = useMemo(
    () => (error ? VALIDATION_STATE.Error : validationState),
    [error, validationState],
  );

  const slotSize = (s: typeof size | undefined): ButtonSize => (s ?? size ?? SIZE.M) as ButtonSize;

  const showClearUi = Boolean(showClearButtonProp && value && !readOnly && !disabled);
  const showCopyUi = Boolean(showCopyButtonProp && value && !disabled && readOnly);

  const stringValue = String(value ?? '');
  const textToCopy = useMemo(
    () => `${typeof prefix === 'string' ? prefix : ''}${stringValue}${typeof postfix === 'string' ? postfix : ''}`,
    [postfix, prefix, stringValue],
  );

  const effectiveMaxLength = allowMoreThanMaxLength ? undefined : maxLength;
  const effectiveLength = useMemo(
    () => length ?? (maxLength ? { current: stringValue.length, max: maxLength } : undefined),
    [length, maxLength, stringValue.length],
  );

  const onClear = useCallback(() => {
    onChange?.('');
    // Возврат фокуса в поле после очистки: clear-кнопка исчезает (значение пусто),
    // фокус не должен «упасть» на body — паритет с легаси (focusedRef) и FieldTextArea.
    localRef.current?.focus();
    onClearButtonClick?.();
  }, [onChange, onClearButtonClick]);

  const onCopy = useCallback(() => {
    const copied = copyTextToClipboard(textToCopy);
    if (copied) {
      onCopyButtonClick?.();
    }
    return copied;
  }, [onCopyButtonClick, textToCopy]);

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

  // ArrowRight с последней postfix-кнопки (clear/copy — взаимоисключающие) уводит фокус
  // на правый слот-элемент, продолжая roving-цепочку input → clear/copy → elementAfter.
  const onPostfixButtonKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowRight' && elementAfterRef.current) {
      event.preventDefault();
      elementAfterRef.current.focus();
    }
  }, []);

  const { postfixButtons, inputTabIndex, onInputKeyDown, setInitialTabIndices } = useButtonNavigation({
    inputRef: localRef,
    postfixButtons: useMemo(() => [clearButtonSettings, copyButtonSettings], [clearButtonSettings, copyButtonSettings]),
    onButtonKeyDown: onPostfixButtonKeyDown,
    readonly: Boolean(readOnly),
    submitKeys: ['Enter', 'Space', 'Tab'],
  });

  const focusInput = useCallback(() => {
    setInitialTabIndices();
    localRef.current?.focus();
  }, [setInitialTabIndices]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      onInputKeyDown(event);

      const atStart = Boolean(readOnly) || isCursorAtStart(localRef.current);
      const atEnd = Boolean(readOnly) || isCursorAtEnd(localRef.current);

      // ← к левому слоту; → к правому слоту (если справа нет видимой clear/copy — иначе
      // их обрабатывает useButtonNavigation, а цепочку дальше ведёт onPostfixButtonKeyDown).
      if (elementBefore && event.key === 'ArrowLeft' && atStart && elementBeforeRef.current) {
        event.preventDefault();
        elementBeforeRef.current.focus();
      }

      if (
        elementAfter &&
        event.key === 'ArrowRight' &&
        atEnd &&
        !showClearUi &&
        !showCopyUi &&
        elementAfterRef.current
      ) {
        event.preventDefault();
        elementAfterRef.current.focus();
      }

      onKeyDownProp?.(event);
    },
    [elementAfter, elementBefore, onInputKeyDown, onKeyDownProp, readOnly, showClearUi, showCopyUi],
  );

  const onElementKeyDown = useCallback(
    (variant: 'before' | 'after') => (event: KeyboardEvent<HTMLButtonElement>) => {
      // Возврат в поле: ArrowRight с левого слота, ArrowLeft с правого.
      if (variant === 'before' && event.key === 'ArrowRight') {
        event.preventDefault();
        focusInput();
      }

      if (variant === 'after' && event.key === 'ArrowLeft') {
        event.preventDefault();
        const visiblePostfixButton = (showCopyUi && copyButtonRef.current) || (showClearUi && clearButtonRef.current);
        (visiblePostfixButton || localRef.current)?.focus();
      }
    },
    [focusInput, showClearUi, showCopyUi],
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocusVisible(event.target.matches(':focus-visible'));
      onFocusProp?.(event);
    },
    [onFocusProp],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocusVisible(false);
      // Не пробрасываем consumer onBlur, если фокус ушёл на собственную кнопку поля (clear/copy/слот).
      // `next != null` обязателен: при blur «в никуда» relatedTarget и нерендеренные кнопки-рефы оба null,
      // без него null === null ложно срабатывает и глотает onBlur.
      const next = event.relatedTarget;
      const movedToOwnButton =
        next != null &&
        (next === clearButtonRef.current ||
          next === copyButtonRef.current ||
          next === elementBeforeRef.current ||
          next === elementAfterRef.current);
      if (!movedToOwnButton) {
        onBlurProp?.(event);
      }
    },
    [onBlurProp],
  );

  const handleMouseEnter = useCallback(() => {
    if (!readOnly) {
      setHover(true);
    }
  }, [readOnly]);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const renderElement = (slot: FieldElementSlot, variant: 'before' | 'after') => {
    const commonProps = {
      variant,
      size: slotSize(slot.size),
      loading: slot.loading,
      disabled: disabled || slot.disabled || Boolean(readOnly),
      onClick: slot.onClick,
      action: slot.action,
      onKeyDown: onElementKeyDown(variant),
      ref: variant === 'before' ? elementBeforeRef : elementAfterRef,
      'data-test-id': slot['data-test-id'],
    };

    if (!slot.droplist) {
      return <FieldElementButton {...commonProps} withDropdownList={slot.withDropdownList} />;
    }

    // Возврат фокуса в поле после выбора пункта (паритет с легаси `@snack-uikit/fields`).
    const { selection } = slot.droplist;
    const returnFocus = () => setTimeout(() => localRef.current?.focus(), 0);

    // selection — дискриминированный union по `mode`; оборачиваем onChange в каждой ветке
    // отдельно, чтобы значение сохраняло свой точный тип (ItemId vs ItemId[]).
    const wrapSelection = (sel: NonNullable<typeof selection>) => {
      if (sel.mode === 'multiple') {
        return {
          ...sel,
          onChange: (value: Parameters<NonNullable<typeof sel.onChange>>[0]) => {
            sel.onChange?.(value);
            returnFocus();
          },
        };
      }
      return {
        ...sel,
        onChange: (value: Parameters<NonNullable<typeof sel.onChange>>[0]) => {
          sel.onChange?.(value);
          returnFocus();
        },
      };
    };

    const droplist = selection ? { ...slot.droplist, selection: wrapSelection(selection) } : slot.droplist;

    return <FieldElementButtonList {...commonProps} droplist={droplist} />;
  };

  const shell = (
    <div
      className={cn(fieldStyles.fieldWrapper, fieldClassName)}
      data-test-id={TEST_IDS.fieldTextShell}
      data-size={size}
      data-validation-state={effectiveValidationState}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-withbackground={background || undefined}
      data-focusvisible={focusVisible || undefined}
      data-hover={!readOnly && hover ? true : undefined}
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
            focusVisible,
          })}
        >
          <div className={fieldStyles.acrylicBg} aria-hidden />
        </div>
        <div className={fieldStyles.borderStateLayer} data-state='regularBorder' />
        <div className={fieldStyles.focusLayer} />
      </div>
      {elementBefore && (
        <div className={fieldStyles.elementWrapperBefore}>
          {renderElement(elementBefore, 'before')}
          <div className={fieldStyles.lineWrapper} data-outline={outline}>
            <Divider orientation='vertical' variant='regular' />
          </div>
        </div>
      )}
      <div className={fieldStyles.fieldContainer}>
        <div className={fieldStyles.contentWrapper}>
          {iconBefore && <div className={fieldStyles.iconSlot}>{iconBefore}</div>}
          <div className={fieldStyles.inputLine}>
            {prefix && <span className={fieldStyles.prefix}>{prefix}</span>}
            <div className={fieldStyles.inputArea}>
              <InputPrivate
                ref={mergeRefs(ref, localRef)}
                className={fieldStyles.fieldInput}
                value={value}
                disabled={disabled}
                readonly={readOnly}
                onChange={onChange}
                placeholder={placeholder}
                tabIndex={tabIndexProp ?? inputTabIndex}
                onKeyDown={handleKeyDown}
                maxLength={effectiveMaxLength}
                onFocus={handleFocus}
                onBlur={handleBlur}
                {...restInputProps}
                autoFocus={resolvedAutoFocus}
                data-test-id={TEST_IDS.fieldTextInput}
              />
              {postfixButtons && <span className={fieldStyles.postfixButtonsSlot}>{postfixButtons}</span>}
            </div>
            {postfix && <span className={fieldStyles.postfix}>{postfix}</span>}
          </div>
          {iconAfter && <div className={fieldStyles.iconSlot}>{iconAfter}</div>}
        </div>
      </div>
      {elementAfter && (
        <div className={fieldStyles.elementWrapperAfter}>
          <div className={fieldStyles.lineWrapper} data-outline={outline}>
            <Divider orientation='vertical' variant='regular' />
          </div>
          {renderElement(elementAfter, 'after')}
        </div>
      )}
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
      length={effectiveLength}
      required={required}
      labelFor={inputProps.id}
      disabled={disabled}
      readonly={readOnly}
      size={size}
      data-test-id={dataTestId}
    >
      {shell}
    </FieldDecorator>
  );
});
