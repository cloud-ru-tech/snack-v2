import { DotSmallSVG } from '@ds/icons/interface/product';
import cn from 'classnames';
import { ReactElement } from 'react';

import { TEST_IDS } from './constants';
import styles from './styles.module.scss';
import { AiReasoningProps } from './types';

export function AiReasoning({
  content,
  children,
  stepperLine = true,
  connector,
  className,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiReasoningProps): ReactElement {
  const showConnector = connector ?? stepperLine;

  return (
    <div
      {...rest}
      className={cn(styles.root, className)}
      data-test-id={dataTestId}
      data-stepper-line={stepperLine || undefined}
    >
      <div className={styles.stepper} data-test-id={TEST_IDS.stepper}>
        <span className={styles.icon} data-test-id={TEST_IDS.icon} aria-hidden>
          <DotSmallSVG size={16} />
        </span>

        {stepperLine && <span className={styles.divider} data-test-id={TEST_IDS.divider} aria-hidden />}

        {showConnector && <span className={styles.connector} data-test-id={TEST_IDS.connector} aria-hidden />}
      </div>

      <div className={styles.container}>
        {content && (
          <p className={styles.description} data-test-id={TEST_IDS.content}>
            {content}
          </p>
        )}

        {children && <div className={styles.children}>{children}</div>}
      </div>
    </div>
  );
}
