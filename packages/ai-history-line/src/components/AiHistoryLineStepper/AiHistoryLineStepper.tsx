import { withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { CSSProperties, ReactElement, ReactNode, Ref } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type AiHistoryLineStepperProps = WithSupportProps<{
  /**
   * Высота верхнего коннектора.
   * Число — пиксели, строка — CSS-длина.
   * Нет значения и `0` — коннектор не рендерится.
   */
  offset?: CSSProperties['height'];
  /** Показать верхний коннектор. `false` — слот остаётся и держит `offset`, линия скрыта. */
  showLeadingConnector?: boolean;
  /** Показать нижний коннектор. */
  showClosingConnector?: boolean;
  /** Индикатор между коннекторами. */
  children?: ReactNode;
  /** Дополнительный класс корня. */
  className?: string;
  /** Ref на корневой элемент. */
  innerRef?: Ref<HTMLDivElement>;
}>;

export function AiHistoryLineStepper({
  offset,
  children,
  className,
  innerRef,
  showLeadingConnector,
  showClosingConnector,
  'data-test-id': dataTestId = TEST_IDS.stepper,
}: AiHistoryLineStepperProps): ReactElement {
  return (
    <div ref={innerRef} className={cn(styles.root, className)} data-test-id={dataTestId}>
      {offset && (
        <span
          className={cn(styles.connector, styles.leadingConnector, {
            [styles.hideLeadingConnector]: !showLeadingConnector,
          })}
          style={{ '--ds-ai-history-line-offset': offset }}
          data-test-id={TEST_IDS.leadingConnector}
        />
      )}
      {children}
      {showClosingConnector && (
        <span className={cn(styles.connector, styles.closingConnector)} data-test-id={TEST_IDS.connector} />
      )}
    </div>
  );
}

withInnerRefSupport(AiHistoryLineStepper);
