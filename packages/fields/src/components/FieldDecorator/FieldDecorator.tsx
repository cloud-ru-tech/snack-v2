import {
  NotifierCriticalFilledSpriteSVG,
  NotifierSuccessFilledSpriteSVG,
  NotifierWarningFilledSpriteSVG,
} from '@ds/icons';
import { QuestionTooltip, QuestionTooltipProps } from '@ds/tooltip';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode, Ref } from 'react';

import { TEST_IDS } from '../../constants';
import { SIZE, VALIDATION_STATE } from './constants';
import styles from './styles.module.scss';
import { Size, ValidationState } from './types';

function getHintIcon(validationState: ValidationState) {
  switch (validationState) {
    case VALIDATION_STATE.Error:
      return <NotifierCriticalFilledSpriteSVG />;
    case VALIDATION_STATE.Warning:
      return <NotifierWarningFilledSpriteSVG />;
    case VALIDATION_STATE.Success:
      return <NotifierSuccessFilledSpriteSVG />;
    case VALIDATION_STATE.Valid:
    default:
      return null;
  }
}

export type FieldDecoratorProps = WithSupportProps<{
  /** CSS-класс */
  className?: string;
  /** Ref на корневой DOM-элемент */
  innerRef?: Ref<HTMLDivElement>;
  /** Содержимое */
  children: ReactNode;
  /** Заголовок */
  label?: string;
  /** Подсказка для заголовка */
  labelTooltip?: QuestionTooltipProps;
  /** Подпись */
  caption?: string;
  /** Подсказка */
  hint?: string;
  /** Ошибка */
  error?: string;
  /** Размер */
  size?: Size;
  /** Состояние валидации */
  validationState?: ValidationState;
  /** Отображение иконки у подсказки */
  showHintIcon?: boolean;
  /** Допустимая длина текста */
  length?: {
    /** Текущая */
    current: number;
    /** Максимальная */
    max?: number;
  };
  /** Обязательное поле */
  required?: boolean;
  /** HTML-атрибут `for` для `<label>` */
  labelFor?: string;
  /** Поле выключено */
  disabled?: boolean;
  /** Только для чтения */
  readonly?: boolean;
}>;

export function FieldDecorator({
  className,
  innerRef,
  children,
  label,
  labelTooltip,
  caption,
  showHintIcon,
  hint,
  error,
  validationState: validationStateProp = VALIDATION_STATE.Default,
  required,
  labelFor,
  disabled,
  readonly: readOnly,
  length,
  size = SIZE.M,
  'data-test-id': dataTestId,
  ...rest
}: FieldDecoratorProps) {
  const showLabelContent = label || required || labelTooltip;
  const showHeader = showLabelContent || caption;
  const hintText = error || hint;
  // На неактивном поле (disabled/readonly) счётчик скрыт, а подсказка показывается нейтрально,
  // без иконки валидации — паритет с легаси FieldDecorator (isFieldActive).
  const isFieldActive = !disabled && !readOnly;
  const showLength = isFieldActive && Boolean(length);
  const limitExceeded = Boolean(length && length.max != null && length.current > length.max);
  const showFooter = hintText || showLength;
  const validationState = error ? VALIDATION_STATE.Error : validationStateProp;

  const hintIcon = isFieldActive ? getHintIcon(validationState) : null;

  return (
    <div
      {...extractSupportProps(rest)}
      ref={innerRef}
      className={cn(styles.fieldDecorator, className)}
      data-size={size}
      data-validation-state={validationState}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
      data-test-id={dataTestId}
    >
      {showHeader && (
        <div className={styles.labelWrapper}>
          {showLabelContent && (
            <div className={styles.labelContent}>
              <label className={styles.label} htmlFor={labelFor} data-test-id={TEST_IDS.fieldDecoratorLabel}>
                {label}
              </label>
              {required && (
                <div className={styles.required} data-test-id={TEST_IDS.fieldDecoratorRequired}>
                  *
                </div>
              )}
              {labelTooltip && (
                <div className={styles.labelTooltip} data-test-id={TEST_IDS.fieldDecoratorLabelTooltip}>
                  <QuestionTooltip {...labelTooltip} />
                </div>
              )}
            </div>
          )}

          {caption && (
            <div className={styles.caption} data-test-id={TEST_IDS.fieldDecoratorCaption}>
              {caption}
            </div>
          )}
        </div>
      )}

      <div className={styles.content}>{children}</div>

      {showFooter && (
        <div className={styles.hintWrapper}>
          <div className={styles.hintContent}>
            {showHintIcon && hintText && hintIcon && <div className={styles.hintIcon}>{hintIcon}</div>}
            {hintText && (
              <div className={styles.hintText} data-test-id={TEST_IDS.fieldDecoratorHint}>
                {hintText}
              </div>
            )}
          </div>

          {showLength && length && (
            <div
              className={styles.length}
              data-test-id={TEST_IDS.fieldDecoratorCounter}
              data-limit-exceeded={limitExceeded || undefined}
            >
              <span className={styles.lengthCurrent}>{length.current}</span>
              {length.max != null && `/${length.max}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
