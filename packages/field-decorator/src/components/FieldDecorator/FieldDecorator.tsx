import { extractSupportProps, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';

import { SIZE, VALIDATION_STATE } from '../../constants';
import { FieldDecoratorProps } from '../../types';
import { Hint } from '../Hint';
import { Label } from '../Label';
import styles from './styles.module.scss';

export function FieldDecorator({
  className,
  innerRef,
  children,
  label,
  labelTooltip,
  caption,
  required,
  labelFor,
  hint,
  error,
  validationState: validationStateProp = VALIDATION_STATE.Default,
  showHintIcon = true,
  length,
  size = SIZE.M,
  disabled,
  readonly: readOnly,
  ...rest
}: FieldDecoratorProps) {
  const showHeader = label || caption;
  const hintText = error || hint;
  const isFieldActive = !disabled && !readOnly;
  const showLength = isFieldActive && Boolean(length);
  const showFooter = hintText || showLength;
  const validationState = error ? VALIDATION_STATE.Error : validationStateProp;

  return (
    <div
      {...extractSupportProps(rest)}
      ref={innerRef}
      className={cn(styles.fieldDecorator, className)}
      data-size={size}
      data-validation-state={validationState}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
    >
      {showHeader && (
        <Label
          label={label}
          labelTooltip={labelTooltip}
          caption={caption}
          required={required}
          labelFor={labelFor}
          size={size}
          disabled={disabled}
        />
      )}

      <div className={styles.content}>{children}</div>

      {showFooter && (
        <Hint
          hint={hint}
          error={error}
          validationState={validationStateProp}
          showHintIcon={showHintIcon}
          length={length}
          size={size}
          disabled={disabled}
          readonly={readOnly}
        />
      )}
    </div>
  );
}

withInnerRefSupport(FieldDecorator);
