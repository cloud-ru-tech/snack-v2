import { withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactElement, ReactNode, Ref } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type AiHistoryLineAgentContentProps = WithSupportProps<{
  /** Блоки ответа. Расстояние задаётся между соседними блоками. */
  children?: ReactNode;
  /** Дополнительный класс корня. */
  className?: string;
  /** Ref на корневой элемент. */
  innerRef?: Ref<HTMLDivElement>;
}>;

export function AiHistoryLineAgentContent({
  children,
  className,
  innerRef,
  'data-test-id': dataTestId = TEST_IDS.agentContent,
}: AiHistoryLineAgentContentProps): ReactElement {
  return (
    <div ref={innerRef} className={cn(styles.root, className)} data-test-id={dataTestId}>
      {children}
    </div>
  );
}

withInnerRefSupport(AiHistoryLineAgentContent);
