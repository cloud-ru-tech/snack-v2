import { useButtonNavigation, useClearButton } from '@ds/input-private';
import { BAR_HIDE_STRATEGY, RESIZE, Scroll, SIZE as SCROLL_SIZE } from '@ds/scroll';
import { extractSupportProps, useValueControl } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  forwardRef,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { TEST_IDS } from '../../constants';
import { FieldDecorator, FieldDecoratorProps, SIZE, VALIDATION_STATE } from '../FieldDecorator';
import { copyTextToClipboard, FieldShell, toInputSize, useCopyButton } from '../shared';
import fieldStyles from '../shared/styles.module.scss';
import styles from './styles.module.scss';

type FieldTextAreaDecoratorProps = Omit<FieldDecoratorProps, 'children'>;

type FieldTextAreaOwnProps = {
  /** CSS-класс корня `FieldDecorator` */
  className?: string;
  /** CSS-класс оболочки поля */
  fieldClassName?: string;
  /** Значение (controlled-режим) */
  value?: string;
  /** Начальное значение (uncontrolled-режим) */
  defaultValue?: string;
  /** Колбек смены значения */
  onChange?(value: string, event?: ChangeEvent<HTMLTextAreaElement>): void;
  /** Плейсхолдер */
  placeholder?: string;
  /** HTML id */
  id?: string;
  /** HTML name */
  name?: string;
  /** Максимальное количество символов */
  maxLength?: number;
  /** Поле выключено */
  disabled?: boolean;
  /** Только для чтения */
  readonly?: boolean;
  /** Автофокус */
  autoFocus?: boolean;
  /** Режим виртуальной клавиатуры (`inputmode` нативного `<textarea>`) */
  inputMode?: HTMLAttributes<HTMLTextAreaElement>['inputMode'];
  /** Проверка орфографии */
  spellCheck?: boolean;
  /**
   * Минимальное количество строк
   * @default 3
   */
  minRows?: number;
  /**
   * Максимальное количество строк (после — появляется скролл)
   * @default 1000
   */
  maxRows?: number;
  /**
   * Разрешить ввод свыше `maxLength` символов (счётчик продолжит расти).
   * @default true
   */
  allowMoreThanMaxLength?: boolean;
  /**
   * Нода над textarea — ряд элементов до контента (Figma `elementWrapperBefore` /
   * `slotBeforeContent`): тулбар с кнопками, чипами и т.п.
   */
  header?: ReactNode;
  /**
   * Нода под textarea — ряд элементов после контента (Figma `elementWrapperAfter` /
   * `slotAfterContent`): действия, счётчик-плагин и т.п.
   */
  footer?: ReactNode;
  /**
   * Можно ли менять высоту мышкой за нижний угол. Игнорируется при `disabled` или `readonly`.
   * @default false
   */
  resizable?: boolean;
  /**
   * Фон поля (acrylic)
   * @default true
   */
  background?: boolean;
  /**
   * Кнопка очистки (видна при value && !readonly)
   * @default true
   */
  showClearButton?: boolean;
  /**
   * Кнопка копирования (видна при value && !disabled, независимо от readonly)
   * @default true
   */
  showCopyButton?: boolean;
  /** Колбек после копирования */
  onCopyButtonClick?(): void;
  /** Колбек фокуса */
  onFocus?(event: FocusEvent<HTMLTextAreaElement>): void;
  /** Колбек блюра */
  onBlur?(event: FocusEvent<HTMLTextAreaElement>): void;
  /** Колбек нажатия клавиши */
  onKeyDown?(event: KeyboardEvent<HTMLTextAreaElement>): void;
};

export type FieldTextAreaProps = FieldTextAreaDecoratorProps & FieldTextAreaOwnProps;

export const FieldTextArea = forwardRef<HTMLTextAreaElement, FieldTextAreaProps>(function FieldTextArea(
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
    onChange,
    placeholder,
    id,
    name,
    maxLength,
    disabled,
    readonly: readOnly,
    autoFocus,
    inputMode,
    spellCheck,
    minRows = 3,
    maxRows = 1000,
    resizable = false,
    allowMoreThanMaxLength = true,
    header,
    footer,
    showClearButton: showClearButtonProp = true,
    showCopyButton: showCopyButtonProp = true,
    onCopyButtonClick,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    onKeyDown: onKeyDownProp,
    'data-test-id': dataTestId,
    ...rest
  },
  ref,
) {
  const localRef = useRef<HTMLTextAreaElement>(null);
  const clearButtonRef = useRef<HTMLButtonElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const [focusVisible, setFocusVisible] = useState(false);
  const [hover, setHover] = useState(false);

  // controlled/uncontrolled: useValueControl держит внутреннее состояние при отсутствии `value`,
  // событие в `onChange` пробрасываем сами (useValueControl передаёт только значение).
  const [value = '', setValue] = useValueControl<string>({ value: valueProp, defaultValue });

  const effectiveValidationState = useMemo(
    () => (error ? VALIDATION_STATE.Error : validationState),
    [error, validationState],
  );

  const stringValue = String(value ?? '');
  const isResizable = resizable && !disabled && !readOnly;
  const showClearUi = Boolean(showClearButtonProp && stringValue && !readOnly && !disabled);
  // Copy не завязан на readonly (паритет с snack-uikit master): виден при любом непустом значении.
  // В editable-режиме показываются обе кнопки (clear + copy), в readonly — только copy.
  const showCopyUi = Boolean(showCopyButtonProp && stringValue && !disabled);

  const onClear = useCallback(() => {
    setValue('');
    onChange?.('');
    localRef.current?.focus();
  }, [onChange, setValue]);

  const onCopy = useCallback(() => {
    const copied = copyTextToClipboard(stringValue);
    if (copied) {
      onCopyButtonClick?.();
    }
    return copied;
  }, [onCopyButtonClick, stringValue]);

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

  const { postfixButtons, inputTabIndex, onInputKeyDown } = useButtonNavigation<HTMLTextAreaElement>({
    inputRef: localRef,
    postfixButtons: useMemo(() => [clearButtonSettings, copyButtonSettings], [clearButtonSettings, copyButtonSettings]),
    readonly: Boolean(readOnly),
    submitKeys: ['Tab'],
  });

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      onKeyDownProp?.(event);
      onInputKeyDown(event);
    },
    [onInputKeyDown, onKeyDownProp],
  );

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    onChange?.(event.target.value, event);
  };

  // Клик в «пустую» зону поля (под textarea при minRows-резерве, в правый резерв под кнопки)
  // фокусит textarea и ставит курсор в конец — паритет со снеком, где попадание в любую область
  // поля работает как клик по textarea. Намеренно `onClick`, а не `onMouseDown`+preventDefault:
  // resize-ручка scroll-контейнера тоже работает через mousedown-drag, и preventDefault убивал бы
  // нативный CSS-resize. Click после resize-drag не возникает, а клики по textarea, кнопкам
  // clear/copy и DS-скроллбару отсеиваем по target.
  const handleContentClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      if (disabled || target === localRef.current || target.closest('button, [class*="os-scrollbar"]')) {
        return;
      }
      const textarea = localRef.current;
      if (textarea) {
        textarea.focus();
        const end = textarea.value.length;
        textarea.setSelectionRange(end, end);
      }
    },
    [disabled],
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLTextAreaElement>) => {
      setFocusVisible(event.target.matches(':focus-visible'));
      onFocusProp?.(event);
    },
    [onFocusProp],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLTextAreaElement>) => {
      setFocusVisible(false);
      onBlurProp?.(event);
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

  const shell = (
    <FieldShell
      data-test-id={TEST_IDS.fieldTextAreaShell}
      className={fieldClassName}
      size={size}
      validationState={effectiveValidationState}
      disabled={disabled}
      readonly={readOnly}
      background={background}
      focusVisible={focusVisible}
      hover={hover}
      header={header}
      footer={footer}
      style={{ '--field-textarea-min-rows': minRows, '--field-textarea-max-rows': maxRows } as CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* onClick лишь форвардит фокус в textarea (реальный фокусируемый/клавиатурный элемент
          рядом) при клике в пустую зону поля — это не самостоятельный контрол, клавиатурный
          доступ обеспечивает сама textarea, поэтому role/tabIndex здесь не нужны. */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div className={cn(fieldStyles.contentWrapper, styles.contentArea)} onClick={handleContentClick}>
        {/* Скролл при превышении maxRows — кастомный из @ds/scroll (по Figma), не нативный
            скроллбар textarea. maxRows задаёт max-height контейнера через CSS-переменные,
            autosize-textarea растёт внутри, Scroll рисует DS-скроллбар. Resize-handle —
            на scroll-контейнере (CSS resize), не на самой textarea. */}
        <Scroll
          className={cn(styles.scrollContainer, { [styles.scrollContainerResizable]: isResizable })}
          size={SCROLL_SIZE.S}
          barHideStrategy={BAR_HIDE_STRATEGY.Never}
          resize={isResizable ? RESIZE.Vertical : RESIZE.None}
          overflow={{ x: 'hidden' }}
          data-test-id={TEST_IDS.fieldTextAreaScrollArea}
        >
          <TextareaAutosize
            ref={mergeRefs(ref, localRef)}
            className={styles.textarea}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            id={id}
            name={name}
            maxLength={allowMoreThanMaxLength ? undefined : maxLength}
            autoFocus={autoFocus}
            inputMode={inputMode}
            spellCheck={spellCheck}
            minRows={minRows}
            tabIndex={inputTabIndex}
            data-test-id={TEST_IDS.fieldTextAreaInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            {...extractSupportProps(rest)}
          />
        </Scroll>
        {postfixButtons && <span className={styles.postfixColumn}>{postfixButtons}</span>}
      </div>
    </FieldShell>
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
      labelFor={id}
      disabled={disabled}
      readonly={readOnly}
      size={size}
      data-test-id={dataTestId}
    >
      {shell}
    </FieldDecorator>
  );
});
