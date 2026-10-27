import { PolymorphicRef, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { ElementType, ReactElement, ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import { PolymorphicProps } from '../../types';
import styles from './styles.module.scss';

export type AiHistoryLineRequestProps<T extends ElementType = 'div'> = PolymorphicProps<
  T,
  {
    /** Текст запроса. Переносится по ширине, лимита строк нет. */
    children?: ReactNode;
    /** Уже отформатированные дата и время. */
    timestamp?: string;
    /** Уже отформатированная длительность. Нет значения — скрыты и длительность, и разделитель. */
    duration?: string;
    /** Дополнительный класс корня. */
    className?: string;
    /** Полиморфный тег корня. По умолчанию `div`. */
    as?: T;
    /** Ref на корневой элемент. */
    innerRef?: PolymorphicRef<T>;
  }
>;

export function AiHistoryLineRequest<T extends ElementType = 'div'>({
  as,
  innerRef,
  className,
  children,
  timestamp,
  duration,
  'data-test-id': dataTestId = TEST_IDS.request,
  ...rest
}: AiHistoryLineRequestProps<T>): ReactElement {
  const Component = (as || 'div') as ElementType;
  const showMetadata = Boolean(timestamp) || Boolean(duration);

  return (
    <Component {...rest} ref={innerRef} className={cn(styles.root, className)} data-test-id={dataTestId}>
      <div className={styles.message}>{children}</div>
      {showMetadata && (
        <div className={styles.metadata} data-test-id={TEST_IDS.requestMetadata}>
          {timestamp ? <span>{timestamp}</span> : null}
          {timestamp && duration ? <span>·</span> : null}
          {duration ? <span>{duration}</span> : null}
        </div>
      )}
    </Component>
  );
}

withInnerRefSupport(AiHistoryLineRequest);
