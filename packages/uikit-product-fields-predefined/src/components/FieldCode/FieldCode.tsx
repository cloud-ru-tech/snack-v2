import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { FieldDecorator, FieldDecoratorProps } from '@ds/field-decorator';
import cn from 'classnames';
import { forwardRef, useImperativeHandle } from 'react';

import { Cell, ResendCode, ResendCodeProps } from './components';
import { useCodeInput, UseCodeInputParams, useFieldCodeOverflow, useFieldHelpers, useFocusCell } from './hooks';
import styles from './styles.module.scss';
import { getCellValidationState } from './utils';

export type FieldCodeRef = {
  /** Перенести фокус на ячейку с индексом `index` */
  moveFocus(index: number): void;
  /** Убрать фокус со всех ячеек кода */
  blurFields(): void;
  /** Сбросить значение кода */
  resetCode(): void;
};

/** Собственные пропсы `FieldCode` */
export type FieldCodeOwnProps = {
  /** CSS-класс компонента */
  className?: string;
  /** CSS-класс ячейки кода */
  cellClassName?: string;
  /** Позиции, после которых нужно вставить пробел (индексы символов, после которых будет разрыв) */
  spacing?: number[];
  /** Подсветить пустые символы кода */
  showEmptyChars?: boolean;
  /** Компонент отправки нового кода */
  resendCode?: ResendCodeProps;
  /** Сообщение при неверном коде, если не передан свой `error` */
  invalidCode?: string;
  /** Растягивать ячейки на всю доступную ширину; иначе фиксированная ширина по `size` */
  stretchCells?: boolean;
};

export type FieldCodeProps = FieldCodeOwnProps &
  Omit<UseCodeInputParams, 'moveFocus'> &
  Pick<FieldDecoratorProps, 'size' | 'disabled' | 'label' | 'error' | 'data-test-id'>;

export const FieldCode = forwardRef<FieldCodeRef, FieldCodeProps>(function FieldCode(props, ref) {
  const {
    codeLength,
    className,
    cellClassName,
    value,
    onChange,
    spacing,
    onComplete,
    size = 'm',
    disabled,
    label,
    error,
    invalidCode,
    showEmptyChars,
    resendCode,
    stretchCells = false,
    'data-test-id': dataTestId,
  } = props;

  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);

  const { inputsRef, moveFocus, blurFields } = useFocusCell(codeLength);
  const { code, cellHandlers, onChangeCode } = useCodeInput({ value, onChange, codeLength, moveFocus, onComplete });
  const { resetCode } = useFieldHelpers({
    onChangeCode,
    isMobile,
    moveFocus,
    showEmptyChars,
    code,
    codeLength,
  });

  const { rootRef, codeContainerRef, hasOverflow } = useFieldCodeOverflow();

  useImperativeHandle(
    ref,
    () => ({
      moveFocus,
      blurFields,
      resetCode,
    }),
    [moveFocus, blurFields, resetCode],
  );

  const resolvedError = error ?? invalidCode;

  return (
    <div
      ref={rootRef}
      className={cn(styles.fieldCode, hasOverflow && styles.fieldCodeScrollable, className)}
      data-size={size}
      data-disabled={disabled || undefined}
      data-stretch-cells={stretchCells || undefined}
      {...(dataTestId ? { 'data-test-id': dataTestId } : undefined)}
    >
      <FieldDecorator
        className={cn(!hasOverflow && styles.fieldDecorator)}
        label={label}
        disabled={disabled}
        size={size}
        error={resolvedError}
      >
        <div
          ref={codeContainerRef}
          className={styles.codeContainer}
          data-size={size}
          data-stretch-cells={stretchCells || undefined}
        >
          {code.map((char, index) => (
            <Cell
              ref={inputRef => {
                if (inputRef) {
                  inputsRef.current[index] = inputRef;
                }
              }}
              key={index}
              className={cn(spacing?.includes(index) && styles.cellSpacing, cellClassName)}
              stretchCells={stretchCells}
              size={size}
              value={char}
              disabled={disabled}
              autoComplete={index === 0 ? 'one-time-code' : undefined}
              onKeyDown={e => cellHandlers.onKeyDown(e, index)}
              onPaste={cellHandlers.onPaste}
              onChange={inputValue => cellHandlers.onChange(inputValue, index)}
              validationState={getCellValidationState(char, showEmptyChars, Boolean(resolvedError))}
            />
          ))}
        </div>
      </FieldDecorator>

      {resendCode ? <ResendCode {...resendCode} size={resendCode.size ?? size} /> : null}
    </div>
  );
});
