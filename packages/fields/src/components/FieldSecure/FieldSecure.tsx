// Имя совпадает с мастер-нодой Figma (`fieldSecure`). Легаси-проп `prefixIcon` ниже
// сохраняет совместимость с `@snack-uikit/fields` (`FieldSecure.prefixIcon`).
import { Divider } from '@ds/divider';
import { EyeClosedSpriteSVG, EyeSpriteSVG } from '@ds/icons';
import { InputPrivate, InputPrivateProps, TYPE, useButtonNavigation } from '@ds/input-private';
import { Skeleton, WithSkeleton } from '@ds/skeleton';
import { useValueControl } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import { FocusEvent, forwardRef, KeyboardEvent, ReactNode, useCallback, useMemo, useRef, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { FieldDecorator, FieldDecoratorProps, SIZE, VALIDATION_STATE } from '../FieldDecorator';
import { copyTextToClipboard, FieldElementButton, getAcrylicProps, toInputSize, useCopyButton } from '../shared';
import fieldStyles from '../shared/styles.module.scss';

type FieldSecureDecoratorProps = Omit<FieldDecoratorProps, 'children'>;

type FieldSecureOwnProps = {
  /** CSS-класс корня `FieldDecorator` */
  className?: string;
  /** CSS-класс оболочки поля ввода */
  fieldClassName?: string;
  /**
   * Фон поля (acrylic)
   * @default true
   */
  background?: boolean;
  /** Значение (controlled-режим) */
  value?: string;
  /** Начальное значение (uncontrolled-режим) */
  defaultValue?: string;
  /** Колбек смены значения */
  onChange?(value: string): void;
  /**
   * Скрыто ли значение (controlled). Для uncontrolled-режима используйте `defaultHidden`.
   */
  hidden?: boolean;
  /**
   * Начальное состояние маскирования (uncontrolled-режим). Кнопка «глаз» переключает
   * маскирование сама; `hidden` для этого передавать не нужно.
   * @default true
   */
  defaultHidden?: boolean;
  /** Колбек смены маскирования */
  onHiddenChange?(hidden: boolean): void;
  /**
   * Показывать кнопку «глаз»
   * @default true
   */
  showHideButton?: boolean;
  /**
   * Показывать кнопку копирования (только при `readonly = true` и непустом `value`)
   * @default true
   */
  showCopyButton?: boolean;
  /** Колбек после копирования значения в буфер */
  onCopyButtonClick?(): void;
  /**
   * Разрешить ввод свыше `maxLength` символов.
   * @default false
   */
  allowMoreThanMaxLength?: boolean;
  /**
   * Async-загрузчик значения. Вызывается перед раскрытием/копированием значения,
   * результат передаётся через `onChange`. Во время запроса показывается Skeleton.
   * После успешного запроса значение считается полученным и больше не запрашивается.
   */
  asyncValueGetter?: () => Promise<string>;
  /**
   * Ведущая иконка.
   * @deprecated Используйте `iconBefore`.
   */
  prefixIcon?: ReactNode;
};

export type FieldSecureProps = FieldSecureDecoratorProps &
  Omit<InputPrivateProps, 'className' | 'type' | 'value' | 'onChange'> &
  FieldSecureOwnProps;

const isCursorAtEnd = (el: HTMLInputElement | null) =>
  Boolean(el && el.selectionStart === el.value.length && el.selectionEnd === el.value.length);

export const FieldSecure = forwardRef<HTMLInputElement, FieldSecureProps>(function FieldSecure(
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
    hidden: hiddenProp,
    defaultHidden,
    onHiddenChange,
    showHideButton: showHideButtonProp = true,
    showCopyButton: showCopyButtonProp = true,
    onCopyButtonClick,
    allowMoreThanMaxLength = false,
    asyncValueGetter,
    prefixIcon,
    disabled,
    readonly: readOnly,
    onChange,
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
    ...restInputProps
  } = inputProps;
  const localRef = useRef<HTMLInputElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const hideButtonRef = useRef<HTMLButtonElement>(null);
  const [focusVisible, setFocusVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [hiddenInner, setHiddenInner] = useState(defaultHidden ?? true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAsyncLoaded, setIsAsyncLoaded] = useState(false);

  const isHiddenControlled = hiddenProp !== undefined;
  const hidden = isHiddenControlled ? hiddenProp : hiddenInner;

  // controlled/uncontrolled: useValueControl держит значение при отсутствии `value`.
  const [value = '', setValue] = useValueControl<string>({ value: valueProp, defaultValue });
  const emitChange = useCallback(
    (next: string) => {
      setValue(next);
      onChange?.(next);
    },
    [onChange, setValue],
  );

  const ensureAsyncValue = useCallback(async (): Promise<boolean> => {
    if (!asyncValueGetter || isAsyncLoaded) {
      return true;
    }
    setIsLoading(true);
    try {
      const next = await asyncValueGetter();
      setIsAsyncLoaded(true);
      emitChange(next);
      return true;
    } catch {
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [asyncValueGetter, emitChange, isAsyncLoaded]);

  const toggleHidden = useCallback(() => {
    ensureAsyncValue().then(success => {
      if (!success) {
        return;
      }
      const next = !hidden;
      if (!isHiddenControlled) {
        setHiddenInner(next);
      }
      onHiddenChange?.(next);
      // Возврат фокуса в поле + каретка в конец после переключения (паритет с легаси FieldSecure).
      if (!readOnly) {
        setTimeout(() => {
          const input = localRef.current;
          if (input) {
            input.focus();
            const end = input.value.length;
            input.setSelectionRange(end, end);
          }
        }, 0);
      }
    });
  }, [ensureAsyncValue, hidden, isHiddenControlled, onHiddenChange, readOnly]);

  const effectiveValidationState = useMemo(
    () => (error ? VALIDATION_STATE.Error : validationState),
    [error, validationState],
  );

  const stringValue = String(value ?? '');
  const showCopyUi = Boolean(showCopyButtonProp && stringValue && !disabled && readOnly);
  const showHideUi = Boolean(showHideButtonProp && !(readOnly && !stringValue));

  const onCopy = useCallback(
    () =>
      ensureAsyncValue().then(success => {
        const copied = success && copyTextToClipboard(stringValue);
        if (copied) {
          onCopyButtonClick?.();
        }
        return copied;
      }),
    [ensureAsyncValue, onCopyButtonClick, stringValue],
  );

  const copyButtonSettings = useCopyButton({
    copyButtonRef,
    showCopyButton: showCopyUi,
    size: toInputSize(size),
    onCopy,
    disabled: Boolean(disabled),
  });

  // ArrowRight с copy-кнопки уводит фокус на «глаз» (buttonFieldAfter), продолжая roving-цепочку.
  const onPostfixKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowRight' && showHideUi && hideButtonRef.current) {
        event.preventDefault();
        hideButtonRef.current.focus();
      }
    },
    [showHideUi],
  );

  const { postfixButtons, inputTabIndex, onInputKeyDown } = useButtonNavigation({
    inputRef: localRef,
    postfixButtons: useMemo(() => [copyButtonSettings], [copyButtonSettings]),
    onButtonKeyDown: onPostfixKeyDown,
    readonly: Boolean(readOnly),
    submitKeys: ['Enter', 'Space', 'Tab'],
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDownProp?.(event);
      onInputKeyDown(event);

      // ArrowRight в конце поля уводит фокус на кнопку «глаз» (если рядом нет видимой copy).
      const atEnd = Boolean(readOnly) || isCursorAtEnd(localRef.current);
      if (showHideUi && event.key === 'ArrowRight' && atEnd && !showCopyUi && hideButtonRef.current) {
        event.preventDefault();
        hideButtonRef.current.focus();
      }
    },
    [onInputKeyDown, onKeyDownProp, readOnly, showCopyUi, showHideUi],
  );

  // ArrowLeft с «глаза» возвращает фокус на copy (если видима) или в поле.
  const onEyeKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        ((showCopyUi && copyButtonRef.current) || localRef.current)?.focus();
      }
    },
    [showCopyUi],
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
      onBlurProp?.(event);
    },
    [onBlurProp],
  );

  const handleMouseEnter = useCallback(() => {
    if (!readOnly && !disabled) {
      setHover(true);
    }
  }, [disabled, readOnly]);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const shell = (
    <div
      className={cn(fieldStyles.fieldWrapper, fieldClassName)}
      // Внутренняя оболочка несёт effectiveValidationState (error форсит 'error'); корень
      // (FieldDecorator с публичным data-test-id) хранит RAW `validationState`.
      data-test-id={TEST_IDS.fieldSecureShell}
      data-size={size}
      data-validation-state={effectiveValidationState}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-withbackground={background || undefined}
      data-focusvisible={focusVisible || undefined}
      data-hover={!readOnly && !disabled && hover ? true : undefined}
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
      <div className={fieldStyles.fieldContainer}>
        <div className={fieldStyles.contentWrapper}>
          {prefixIcon && <div className={fieldStyles.iconSlot}>{prefixIcon}</div>}
          <div className={fieldStyles.inputLine}>
            <div className={fieldStyles.inputArea}>
              <WithSkeleton
                skeleton={<Skeleton width='100%' borderRadius={2} data-test-id={TEST_IDS.fieldSecureSkeleton} />}
                loading={isLoading}
              >
                <InputPrivate
                  ref={mergeRefs(ref, localRef)}
                  className={fieldStyles.fieldInput}
                  value={value}
                  disabled={disabled}
                  readonly={readOnly}
                  onChange={emitChange}
                  placeholder={placeholder}
                  tabIndex={tabIndexProp ?? inputTabIndex}
                  onKeyDown={handleKeyDown}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  type={hidden ? TYPE.Password : TYPE.Text}
                  maxLength={allowMoreThanMaxLength ? undefined : maxLength}
                  {...restInputProps}
                  data-test-id={TEST_IDS.fieldSecureInput}
                />
              </WithSkeleton>
              {postfixButtons && <span className={fieldStyles.postfixButtonsSlot}>{postfixButtons}</span>}
            </div>
          </div>
        </div>
      </div>
      {showHideUi && (
        <div className={fieldStyles.elementWrapperAfter}>
          <div className={fieldStyles.lineWrapper} data-outline={true}>
            <Divider orientation='vertical' variant='regular' />
          </div>
          <FieldElementButton
            ref={hideButtonRef}
            variant='after'
            size={size}
            action={hidden ? <EyeSpriteSVG /> : <EyeClosedSpriteSVG />}
            onClick={toggleHidden}
            onKeyDown={onEyeKeyDown}
            disabled={disabled}
            // Roving-композит (легаси: обе кнопки в postfixButtons useButtonNavigation):
            // Tab уходит из поля целиком, по кнопкам (copy → глаз) ходят стрелки.
            tabIndex={-1}
            data-test-id={TEST_IDS.fieldSecureHideButton}
          />
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
      length={length ?? (maxLength ? { current: stringValue.length, max: maxLength } : undefined)}
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
