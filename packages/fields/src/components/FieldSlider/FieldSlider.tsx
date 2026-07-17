import { Button } from '@ds/button';
import { CheckSVG, CopySVG } from '@ds/icons/interface/system';
import { INPUT_MODE, InputPrivate, TYPE } from '@ds/input-private';
import { Slider, SliderProps } from '@ds/slider';
import { extractSupportProps, useValueControl } from '@ds/utils';
import cn from 'classnames';
import mergeRefs from 'merge-refs';
import {
  FocusEvent,
  forwardRef,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { TEST_IDS } from '../../constants';
import { FieldLayoutPresets, useAdaptiveAutoFocus } from '../../hooks';
import { FieldDecorator, FieldDecoratorProps, SIZE, VALIDATION_STATE } from '../FieldDecorator';
import { copyTextToClipboard, getAcrylicProps } from '../shared';
import fieldStyles from '../shared/styles.module.scss';
import styles from './styles.module.scss';
import { SliderValue, TextInputFormatter } from './types';
import { generateAllowedValues, getClosestMark, getMarkLabel, getTextFieldValue } from './utils';

type SliderMarks = NonNullable<SliderProps['marks']>;

type FieldSliderDecoratorProps = Omit<FieldDecoratorProps, 'children'>;

type FieldSliderOwnProps = {
  /** CSS-класс корня `FieldDecorator` */
  className?: string;
  /** CSS-класс оболочки поля */
  fieldClassName?: string;
  /** Значение (число или диапазон при `range`; controlled-режим) */
  value?: SliderValue;
  /** Начальное значение (uncontrolled-режим). По умолчанию `min` (или `[min, max]` при `range`). */
  defaultValue?: SliderValue;
  /** Колбек смены значения */
  onChange?(value: SliderValue): void;
  /**
   * Диапазон с двумя ручками. Текстовое поле в этом режиме `readonly`
   * и показывает значение как `min – max`.
   * @default false
   */
  range?: boolean;
  /** Минимум */
  min: number;
  /** Максимум */
  max: number;
  /** Шаг приращения. `null` — снэп только к меткам. */
  step: number | null;
  /** Метки на шкале */
  marks?: SliderMarks;
  /**
   * Показывать линейку с метками
   * @default true
   */
  showScaleBar?: boolean;
  /**
   * Равномерно распределять метки по шкале при нелинейных значениях
   * (например `1 2 4 8 16 32` — равные промежутки вместо логарифмических).
   * @default false
   */
  marksEqualSpacing?: boolean;
  /** Форматирование значения в текстовом поле */
  textInputFormatter?: TextInputFormatter;
  /**
   * Если `true` — текстовое поле принимает любые числа в диапазоне `min..max`,
   * не снэпя к меткам.
   * @default false
   */
  unbindInputFromMarks?: boolean;
  /** Произвольный префикс */
  prefix?: ReactNode;
  /** Произвольный постфикс */
  postfix?: ReactNode;
  /** Иконка-постфикс справа от текстового поля */
  postfixIcon?: ReactElement;
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
  /** Колбек фокуса */
  onFocus?(event: FocusEvent<HTMLInputElement>): void;
  /** Колбек блюра */
  onBlur?(event: FocusEvent<HTMLInputElement>): void;
};

export type FieldSliderProps = FieldSliderDecoratorProps & FieldSliderOwnProps;

export const FieldSlider = forwardRef<HTMLInputElement, FieldSliderProps>(function FieldSlider(
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
    range = false,
    min,
    max,
    step,
    marks,
    showScaleBar = true,
    marksEqualSpacing,
    textInputFormatter,
    unbindInputFromMarks = false,
    prefix,
    postfix,
    postfixIcon,
    disabled,
    readonly: readOnly,
    id,
    name,
    autoFocus,
    layoutPresets,
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
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const resolvedAutoFocus = useAdaptiveAutoFocus(autoFocus, layoutPresets);

  useEffect(
    () => () => {
      if (copiedTimerRef.current) {
        clearTimeout(copiedTimerRef.current);
      }
    },
    [],
  );

  // error форсит validationState='error' поверх любого значения — паритет с сиблингами (FieldStepper и др.).
  const effectiveValidationState = useMemo(
    () => (error ? VALIDATION_STATE.Error : validationState),
    [error, validationState],
  );

  // controlled/uncontrolled: useValueControl держит значение при отсутствии `value`.
  const [value = range ? [min, max] : min, setValue] = useValueControl<SliderValue>({
    value: valueProp,
    defaultValue,
  });
  const [inputValue, setInputValue] = useState(() => getTextFieldValue(value, textInputFormatter));

  const allowedKeys = useMemo(() => (marks ? Object.keys(marks) : []), [marks]);
  const hasMarksEqualToValues = useMemo(() => {
    if (!marks) {
      return false;
    }
    return allowedKeys.every(key => key === String(getMarkLabel(marks[key as keyof SliderMarks])));
  }, [allowedKeys, marks]);

  // Актуальное значение для рантайм-ре-снапа шкалы (см. эффект ниже).
  const valueRef = useRef(value);
  valueRef.current = value;

  const commitValue = useCallback(
    (next: SliderValue) => {
      // blur/Enter — это явный commit: значение фиксируется и onChange вызывается всегда,
      // в том числе когда введённое снапнулось обратно к текущему (контракт «blur = commit»).
      setValue(next);
      onChange?.(next);
      setInputValue(getTextFieldValue(next, textInputFormatter));
    },
    [onChange, setValue, textInputFormatter],
  );

  const handleSliderChange = useCallback(
    (next: SliderValue) => {
      commitValue(next);
    },
    [commitValue],
  );

  const snapAndCommit = useCallback(
    (raw: string) => {
      if (range) {
        return;
      }
      const parsed = parseFloat(raw);
      if (Number.isNaN(parsed)) {
        commitValue(value);
        return;
      }

      if (parsed <= min) {
        commitValue(min);
        return;
      }
      if (parsed >= max) {
        commitValue(max);
        return;
      }

      const allowedFromMarks =
        !marks || hasMarksEqualToValues || unbindInputFromMarks
          ? []
          : allowedKeys
              .map(key => parseFloat(String(getMarkLabel(marks[key as keyof SliderMarks]))))
              .filter(mark => !Number.isNaN(mark));

      if (allowedFromMarks.length === 0) {
        // Снэп к допустимым значениям шага. step<=0/null → снэпа нет, принимаем число как есть.
        if (step === null || step <= 0) {
          commitValue(parsed);
          return;
        }
        const allowedValues = generateAllowedValues(min, max, step);
        if (allowedValues.includes(parsed)) {
          commitValue(parsed);
          return;
        }
        const closest = getClosestMark(parsed, allowedValues, m => m);
        commitValue(closest ? closest.mark : parsed);
        return;
      }

      const closest = getClosestMark(parsed, allowedFromMarks, m => m);
      commitValue(closest ? closest.mark : parsed);
    },
    [allowedKeys, commitValue, hasMarksEqualToValues, marks, max, min, range, step, unbindInputFromMarks, value],
  );

  const handleInputChange = useCallback(
    (raw: string) => {
      // В range-режиме поле readonly — правки игнорируем, не трогая идентичность колбека.
      if (range) {
        return;
      }
      // не пускаем нечисловой ввод в поле (паритет с легаси onTextFieldChange)
      const parsed = parseFloat(raw);
      if (raw && Number.isNaN(parsed)) {
        return;
      }
      setInputValue(raw);
    },
    [range],
  );

  const handleInputBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      snapAndCommit(inputValue);
      onBlur?.(event);
    },
    [inputValue, onBlur, snapAndCommit],
  );

  const handleInputFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setFocusVisible(event.target.matches(':focus-visible'));
      onFocus?.(event);
    },
    [onFocus],
  );

  const handleMouseEnter = useCallback(() => {
    if (!readOnly) {
      setHover(true);
    }
  }, [readOnly]);

  const handleMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  // Copy-кнопка видна только в readonly при !disabled — паритет с Figma readonly-вариантом
  // fieldSlider (слот buttonCopy). В range-режиме инпут тоже нередактируем, но copy там не
  // показываем: это не readonly-проп, а две ручки диапазона (в легаси copy у range не было).
  // Копируется отображаемый текст значения (`inputValue`, с учётом textInputFormatter).
  const showCopyUi = Boolean(showCopyButton && readOnly && !disabled);

  const handleCopy = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!copyTextToClipboard(inputValue)) {
        return;
      }
      onCopyButtonClick?.();
      setCopied(true);
      if (copiedTimerRef.current) {
        clearTimeout(copiedTimerRef.current);
      }
      copiedTimerRef.current = setTimeout(() => setCopied(false), 2000);
    },
    [inputValue, onCopyButtonClick],
  );

  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        snapAndCommit(inputValue);
      }
      // Клавиатурный путь к copy в readonly (кнопка с tabIndex −1 недостижима по Tab):
      // ArrowRight из инпута → copy, ArrowLeft с copy — назад (handleCopyButtonKeyDown).
      if (event.key === 'ArrowRight' && readOnly && showCopyUi && copyButtonRef.current) {
        event.preventDefault();
        copyButtonRef.current.focus();
      }
    },
    [inputValue, readOnly, showCopyUi, snapAndCommit],
  );

  const handleCopyButtonKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      localRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    setInputValue(getTextFieldValue(value, textInputFormatter));
  }, [textInputFormatter, value]);

  // Рефы на последнюю snap-функцию и значение: пере-привязка по смене шкалы (эффект ниже)
  // не зависит от их идентичности и не зацикливается на каждом onChange.
  const snapAndCommitRef = useRef(snapAndCommit);
  snapAndCommitRef.current = snapAndCommit;

  // Рантайм-смена шкалы (marks/min/max) пере-привязывает текущее значение к новому допустимому
  // набору (паритет с легаси re-snap effect): после, например, max 100→50 значение 75 уедет к 50.
  // Range управляется слайдером и здесь не трогается.
  useEffect(() => {
    if (range) {
      return;
    }
    snapAndCommitRef.current(String(valueRef.current));
  }, [marks, min, max, range]);

  const shell = (
    // data-size на корне нужен, чтобы `.sliderWrapper` (сосед `.fieldWrapper`, а не потомок)
    // подхватил size-зависимые токены отступов трека.
    <div className={styles.fieldSlider} data-size={size}>
      <div
        className={cn(fieldStyles.fieldWrapper, fieldClassName)}
        data-size={size}
        data-validation-state={effectiveValidationState}
        data-disabled={disabled || undefined}
        data-readonly={readOnly || undefined}
        data-withbackground={background || undefined}
        data-focusvisible={focusVisible || undefined}
        data-hover={!readOnly && hover ? true : undefined}
        data-test-id={TEST_IDS.fieldSliderField}
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
            <div className={fieldStyles.inputLine}>
              {prefix && <span className={fieldStyles.prefix}>{prefix}</span>}
              <div className={fieldStyles.inputArea}>
                <InputPrivate
                  ref={mergeRefs(ref, localRef)}
                  className={fieldStyles.fieldInput}
                  value={inputValue}
                  type={TYPE.Text}
                  inputMode={INPUT_MODE.Numeric}
                  disabled={disabled}
                  readonly={range || readOnly}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onFocus={handleInputFocus}
                  onKeyDown={handleInputKeyDown}
                  id={id}
                  name={name}
                  autoFocus={resolvedAutoFocus}
                  data-test-id={TEST_IDS.fieldSliderInput}
                  {...extractSupportProps(rest)}
                />
              </div>
              {showCopyUi && (
                <span className={styles.copyButton}>
                  <Button
                    innerRef={copyButtonRef}
                    type='button'
                    view='function'
                    appearance='neutral'
                    size={size}
                    icon={copied ? <CheckSVG /> : <CopySVG />}
                    onClick={handleCopy}
                    onKeyDown={handleCopyButtonKeyDown}
                    tabIndex={-1}
                    data-test-id={TEST_IDS.fieldSliderCopyButton}
                  />
                </span>
              )}
              {postfix && <span className={fieldStyles.postfix}>{postfix}</span>}
              {postfixIcon && <span className={styles.postfixIcon}>{postfixIcon}</span>}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sliderWrapper}>
        <div className={styles.slider}>
          <Slider
            range={range}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleSliderChange}
            marks={showScaleBar ? marks : undefined}
            marksEqualSpacing={marksEqualSpacing}
            disabled={readOnly || disabled}
            data-test-id={TEST_IDS.fieldSliderHandle}
          />
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
      data-test-id={dataTestId}
    >
      {shell}
    </FieldDecorator>
  );
});
