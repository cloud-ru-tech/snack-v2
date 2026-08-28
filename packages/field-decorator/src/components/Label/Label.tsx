import { QuestionTooltip } from '@ds/tooltip';
import { extractSupportProps, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';

import { SIZE, TEST_IDS } from '../../constants';
import { LabelProps } from '../../types';
import styles from './styles.module.scss';

export function Label({
  className,
  innerRef,
  label,
  labelTooltip,
  caption,
  required,
  labelFor,
  disabled,
  size = SIZE.M,
  ...rest
}: LabelProps) {
  return (
    <div
      {...extractSupportProps(rest)}
      ref={innerRef}
      className={cn(styles.labelWrapper, className)}
      data-size={size}
      data-disabled={disabled || undefined}
    >
      {label && (
        <div className={styles.labelContent}>
          <label className={styles.label} htmlFor={labelFor} data-test-id={TEST_IDS.label}>
            {label}
          </label>
          {required && (
            <div className={styles.required} data-test-id={TEST_IDS.required}>
              *
            </div>
          )}
          {labelTooltip && (
            <div className={styles.labelTooltip} data-test-id={TEST_IDS.labelTooltip}>
              <QuestionTooltip {...labelTooltip} />
            </div>
          )}
        </div>
      )}

      {caption && (
        <div className={styles.caption} data-test-id={TEST_IDS.caption}>
          {caption}
        </div>
      )}
    </div>
  );
}

withInnerRefSupport(Label);
