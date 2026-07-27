import {
  NotifierCriticalFilledSVG,
  NotifierSuccessFilledSVG,
  NotifierWarningFilledSVG,
} from '@ds/icons/interface/system';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { SIZE, TEST_IDS, VALIDATION_STATE } from '../../constants';
import { HintProps, ValidationState } from '../../types';
import styles from './styles.module.scss';

function getHintIcon(validationState: ValidationState) {
  switch (validationState) {
    case VALIDATION_STATE.Error:
      return <NotifierCriticalFilledSVG />;
    case VALIDATION_STATE.Warning:
      return <NotifierWarningFilledSVG />;
    case VALIDATION_STATE.Success:
      return <NotifierSuccessFilledSVG />;
    case VALIDATION_STATE.Valid:
    default:
      return null;
  }
}

export function Hint({
  className,
  innerRef,
  hint,
  error,
  validationState: validationStateProp = VALIDATION_STATE.Default,
  showHintIcon = true,
  length,
  maxLines,
  size = SIZE.M,
  disabled,
  readonly: readOnly,
  ...rest
}: HintProps) {
  const hintText = error || hint;
  // На неактивном поле (disabled/readonly) счётчик скрыт, а подсказка показывается нейтрально,
  // без иконки валидации — паритет с легаси FieldDecorator (isFieldActive).
  const isFieldActive = !disabled && !readOnly;
  const showLength = isFieldActive && Boolean(length);
  const limitExceeded = Boolean(length && length.max != null && length.current > length.max);
  const validationState = error ? VALIDATION_STATE.Error : validationStateProp;
  const hintIcon = isFieldActive ? getHintIcon(validationState) : null;

  return (
    <div
      {...extractSupportProps(rest)}
      ref={innerRef}
      className={cn(styles.hintWrapper, className)}
      data-size={size}
      data-validation-state={validationState}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
    >
      <div className={styles.hintContent}>
        {showHintIcon && hintText && hintIcon && <div className={styles.hintIcon}>{hintIcon}</div>}
        {hintText && (
          <div className={styles.hintText} data-test-id={TEST_IDS.hint} data-clamp={maxLines ? '' : undefined}>
            {maxLines ? <TruncateString text={hintText} maxLines={maxLines} /> : hintText}
          </div>
        )}
      </div>

      {showLength && length && (
        <div className={styles.length} data-test-id={TEST_IDS.counter} data-limit-exceeded={limitExceeded || undefined}>
          <span className={styles.lengthCurrent}>{length.current}</span>
          {length.max != null && `/${length.max}`}
        </div>
      )}
    </div>
  );
}
