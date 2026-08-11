import { Button } from '@ds/button';
import { Divider } from '@ds/divider';
import { FieldDecorator, FieldDecoratorProps, SIZE, VALIDATION_STATE } from '@ds/field-decorator';
import { CheckSVG, CopySVG, MinusSVG, PlusSVG } from '@ds/icons/interface/system';
import { BUTTON_SIZE_MAP, InputPrivate, TYPE } from '@ds/input-private';
import { Tooltip, TooltipProps } from '@ds/tooltip';
import { extractSupportProps, useValueControl } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  ChangeEvent,
  CSSProperties,
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { TEST_IDS } from '../../constants';
import { FieldLayoutPresets, useAdaptiveAutoFocus } from '../../hooks';
import { copyTextToClipboard, FieldElementButton, getAcrylicProps, VARIANT } from '../shared';
import fieldStyles from '../shared/styles.module.scss';
import styles from './styles.module.scss';
import { applyStep, clamp, defaultClampMaxText, defaultClampMinText, getDefaultValue } from './utils';

type FieldStepperDecoratorProps = Omit<FieldDecoratorProps, 'children'>;

type FieldStepperOwnProps = {
  /** CSS-класс корня `FieldDecorator` */
  className?: string;
  /** CSS-класс оболочки поля */
  fieldClassName?: string;
  /** Значение (controlled-режим) */
  value?: number;
  /** Начальное значение (uncontrolled-режим). По умолчанию выводится из `min`/`max`. */
  defaultValue?: number;
  /** Колбек смены значения. Второй аргумент — событие, если изменение пришло из ручного ввода. */
  onChange?(value: number, event?: ChangeEvent<HTMLInputElement>): void;
  /** Минимум */
  min?: number;
  /** Максимум */
  max?: number;
  /**
   * Шаг приращения
   * @default 1
   */
  step?: number;
  /**
   * Разрешить ввод значений вне `min`/`max`. Если `false`, на blur значение клампится.
   * @default true
   */
  allowMoreThanLimits?: boolean;
  /** Поле выключено */
  disabled?: boolean;
  /** Только для чтения */
  readonly?: boolean;
  /** HTML id */
  id?: string;
  /** HTML name */
  name?: string;
  /** Автофокус. На mobile выключается адаптивно (см. `layoutPresets`) */
  autoFocus?: boolean;
  /**
   * Переопределение адаптивных дефолтов по раскладке. Участвует `autoFocus`: на mobile он выключен
   * (открывает клавиатуру без действия). Вернуть на mobile — `layoutPresets={{ mobile: { autoFocus: true } }}`.
   */
  layoutPresets?: FieldLayoutPresets;
  /**
   * Фон поля (acrylic)
   * @default true
   */
  background?: boolean;
  /**
   * Показывать кнопку копирования значения (видна в readonly, при `!disabled`).
   * @default true
   */
  showCopyButton?: boolean;
  /** Колбек после успешного копирования значения. */
  onCopyButtonClick?(): void;
  /** Префикс — текст или иконка слева от значения */
  prefix?: ReactNode;
  /** Постфикс — текст или иконка справа от значения (например, единица измерения) */
  postfix?: ReactNode;
  /** Тултип над кнопкой `+` */
  plusButtonTooltip?: TooltipProps;
  /** Тултип над кнопкой `−` */
  minusButtonTooltip?: TooltipProps;
  /**
   * Тексты тултипа клампа (показывается на 2с после blur с выходом за `min`/`max`).
   * @default { min: 'Значение должно быть больше либо равно {value}', max: 'Значение должно быть меньше либо равно {value}' }
   */
  clampTooltipText?: {
    min?: (value: number) => string;
    max?: (value: number) => string;
  };
  /** Колбек фокуса */
  onFocus?(event: FocusEvent<HTMLInputElement>): void;
  /** Колбек блюра */
  onBlur?(event: FocusEvent<HTMLInputElement>): void;
};

export type FieldStepperProps = FieldStepperDecoratorProps & FieldStepperOwnProps;

export const FieldStepper = forwardRef<HTMLInputElement, FieldStepperProps>(function FieldStepper(
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
    showCopyButton = true,
    onCopyButtonClick,
    value: valueProp,
    defaultValue,
    onChange,
    min,
    max,
    step = 1,
    allowMoreThanLimits = true,
    disabled,
    readonly: readOnly,
    id,
    name,
    autoFocus,
    layoutPresets,
    prefix,
    postfix,
    plusButtonTooltip,
    minusButtonTooltip,
    clampTooltipText,
    onFocus,
    onBlur,
    'data-test-id': dataTestId,
    ...rest
  },
  ref,
) {
  const localRef = useRef<HTMLInputElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const [focusVisible, setFocusVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [clampTooltip, setClampTooltip] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const clampTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const resolvedAutoFocus = useAdaptiveAutoFocus(autoFocus, layoutPresets);

  useEffect(
    () => () => {
      if (clampTimerRef.current) {
        clearTimeout(clampTimerRef.current);
      }
      if (copiedTimerRef.current) {
        clearTimeout(copiedTimerRef.current);
      }
    },
    [],
  );

  // controlled/uncontrolled: внутреннее состояние при отсутствии `value`; событие в `onChange`
  // (ручной ввод) пробрасываем сами, useValueControl передаёт только значение.
  const [value = getDefaultValue(min, max), setValue] = useValueControl<number>({ value: valueProp, defaultValue });

  const effectiveValidationState = useMemo(
    () => (error ? VALIDATION_STATE.Error : validationState),
    [error, validationState],
  );

  const isMinusDisabled = (typeof min === 'number' && value <= min) || disabled || readOnly;
  const isPlusDisabled = (typeof max === 'number' && value >= max) || disabled || readOnly;

  // Кнопки −/+ и ручной ввод приводятся к единой модели относительно `allowMoreThanLimits`:
  // при `false` значение клампится сразу, при `true` остаётся как есть (кламп откладывается до blur).
  const emitValue = useCallback(
    (next: number, event?: ChangeEvent<HTMLInputElement>) => {
      const resolved = allowMoreThanLimits ? next : clamp(next, min, max);
      setValue(resolved);
      onChange?.(resolved, event);
    },
    [allowMoreThanLimits, max, min, onChange, setValue],
  );

  const handleMinus = useCallback(() => {
    emitValue(applyStep(value, -step));
  }, [emitValue, step, value]);

  const handlePlus = useCallback(() => {
    emitValue(applyStep(value, step));
  }, [emitValue, step, value]);

  const handleInputChange = useCallback(
    (raw: string, event?: ChangeEvent<HTMLInputElement>) => {
      if (raw === '' || raw === '-') {
        return;
      }
      const parsed = Number(raw);
      if (Number.isNaN(parsed)) {
        return;
      }
      // Во время набора значение не клампим даже при allowMoreThanLimits=false —
      // кламп откладывается до blur (паритет с легаси), там же показывается clampTooltip.
      setValue(parsed);
      onChange?.(parsed, event);
    },
    [onChange, setValue],
  );

  const showClampTooltip = useCallback((message: string) => {
    setClampTooltip(message);
    if (clampTimerRef.current) {
      clearTimeout(clampTimerRef.current);
    }
    clampTimerRef.current = setTimeout(() => setClampTooltip(null), 2000);
  }, []);

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      if (!allowMoreThanLimits) {
        if (typeof max === 'number' && value > max) {
          setValue(max);
          onChange?.(max);
          showClampTooltip((clampTooltipText?.max ?? defaultClampMaxText)(max));
        } else if (typeof min === 'number' && value < min) {
          setValue(min);
          onChange?.(min);
          showClampTooltip((clampTooltipText?.min ?? defaultClampMinText)(min));
        }
      }
      onBlur?.(event);
    },
    [allowMoreThanLimits, clampTooltipText, max, min, onBlur, onChange, setValue, showClampTooltip, value],
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocusVisible(event.target.matches(':focus-visible'));
      if (clampTimerRef.current) {
        clearTimeout(clampTimerRef.current);
      }
      setClampTooltip(null);
      onFocus?.(event);
    },
    [onFocus],
  );

  // Ширина инпута по числу символов значения (минимум 2ch), задаётся через `ch`-юниты в CSS-переменной —
  // без px-хардкода и подгонки под ширину глифа.
  const inputWidthCh = Math.max(2, String(value).length);

  // Кнопки −/+ — buttonField-слоты по краям поля, отделённые от значения вертикальными
  // разделителями (структура совпадает с elementBefore/elementAfter в FieldCombo, по Figma).
  const handleMouseEnter = useCallback(() => {
    if (!readOnly) {
      setHover(true);
    }
  }, [readOnly]);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  // Кнопка копирования — видна только в readonly при !disabled (паритет с Figma readonly-вариантами
  // fieldStepper, где значение сопровождается copy-кнопкой между value и `+`).
  const showCopyUi = Boolean(showCopyButton && readOnly && !disabled);

  const handleCopy = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      copyTextToClipboard(String(value)).then(copied => {
        if (!copied) {
          return;
        }
        onCopyButtonClick?.();
        setCopied(true);
        if (copiedTimerRef.current) {
          clearTimeout(copiedTimerRef.current);
        }
        copiedTimerRef.current = setTimeout(() => setCopied(false), 2000);
      });
    },
    [onCopyButtonClick, value],
  );

  // Клавиатурный путь к copy в readonly (кнопка с tabIndex −1 недостижима по Tab): ArrowRight из
  // инпута → copy, ArrowLeft с copy → назад. input type=number не даёт selection API — гейт только
  // по readonly. Кнопки −/+ остаются вне пути (tabIndex −1, паритет с легаси ButtonFunction).
  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowRight' && readOnly && showCopyUi && copyButtonRef.current) {
        event.preventDefault();
        copyButtonRef.current.focus();
      }
    },
    [readOnly, showCopyUi],
  );

  const handleCopyButtonKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      localRef.current?.focus();
    }
  }, []);

  const renderStepButton = (variant: 'minus' | 'plus') => {
    const isMinus = variant === 'minus';
    const tooltip = isMinus ? minusButtonTooltip : plusButtonTooltip;
    const button = (
      <FieldElementButton
        variant={isMinus ? VARIANT.Before : VARIANT.After}
        size={size}
        action={isMinus ? <MinusSVG /> : <PlusSVG />}
        onClick={isMinus ? handleMinus : handlePlus}
        disabled={isMinus ? isMinusDisabled : isPlusDisabled}
        tabIndex={-1}
        data-test-id={isMinus ? TEST_IDS.fieldStepperMinus : TEST_IDS.fieldStepperPlus}
      />
    );

    return tooltip ? (
      <Tooltip {...tooltip} triggerClassName={styles.stepButtonTrigger}>
        {button}
      </Tooltip>
    ) : (
      button
    );
  };

  const shell = (
    <div
      className={cn(fieldStyles.fieldWrapper, fieldClassName)}
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
        <div className={fieldStyles.borderStateLayer} data-state='borderOnBackground' />
        <div className={fieldStyles.focusLayer} />
      </div>
      <div className={fieldStyles.elementWrapperBefore}>
        {renderStepButton('minus')}
        <div className={fieldStyles.lineWrapper} data-outline={background || undefined}>
          <Divider orientation='vertical' variant='regular' />
        </div>
      </div>
      <div className={fieldStyles.fieldContainer}>
        <div className={fieldStyles.contentWrapper}>
          <div className={styles.valueArea}>
            {prefix && <span className={styles.affix}>{prefix}</span>}
            <div className={styles.inputWrapper} style={{ '--field-stepper-input-ch': inputWidthCh } as CSSProperties}>
              <InputPrivate
                ref={mergeRefs(ref, localRef)}
                className={cn(fieldStyles.fieldInput, styles.input)}
                value={String(value)}
                type={TYPE.Number}
                disabled={disabled}
                readonly={readOnly}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleInputKeyDown}
                id={id}
                name={name}
                min={min}
                max={max}
                step={step}
                autoFocus={resolvedAutoFocus}
                data-test-id={TEST_IDS.fieldStepperInput}
                {...extractSupportProps(rest)}
              />
            </div>
            {postfix && <span className={styles.affix}>{postfix}</span>}
          </div>
        </div>
      </div>
      <div className={fieldStyles.elementWrapperAfter}>
        {showCopyUi && (
          <span className={styles.copyButton}>
            <Button
              innerRef={copyButtonRef}
              type='button'
              view='function'
              appearance='neutral'
              // Inline copy/clear buttons cap at size m (32px) even when the field is l (40px) — Figma parity,
              // same mapping the shared useCopyButton uses for all other fields.
              size={BUTTON_SIZE_MAP[size]}
              icon={copied ? <CheckSVG /> : <CopySVG />}
              onClick={handleCopy}
              onKeyDown={handleCopyButtonKeyDown}
              tabIndex={-1}
              data-test-id={TEST_IDS.fieldStepperCopyButton}
            />
          </span>
        )}
        <div className={fieldStyles.lineWrapper} data-outline={background || undefined}>
          <Divider orientation='vertical' variant='regular' />
        </div>
        {renderStepButton('plus')}
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
      validationState={effectiveValidationState}
      showHintIcon={showHintIcon}
      length={length}
      required={required}
      labelFor={id}
      disabled={disabled}
      readonly={readOnly}
      size={size}
      data-test-id={dataTestId}
    >
      {clampTooltip ? (
        <Tooltip tip={clampTooltip} open data-test-id={TEST_IDS.fieldStepperLimitTooltip}>
          {shell}
        </Tooltip>
      ) : (
        shell
      )}
    </FieldDecorator>
  );
});
