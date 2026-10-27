import { AiCodeDiff } from '@ds/ai-code-diff';
import { TruncateString } from '@ds/truncate-string';
import { PolymorphicRef, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';
import { ElementType, ReactElement } from 'react';

import { TEST_IDS } from '../../constants';
import { PolymorphicProps } from '../../types';
import styles from './styles.module.scss';

export type AiHistoryLineCheckpointProps<T extends ElementType = 'div'> = PolymorphicProps<
  T,
  {
    /** Короткий идентификатор коммита. */
    hash: string;
    /** Текст коммита. */
    title: string;
    /** Количество добавленных строк. Целое неотрицательное число, знак `+` ставит `AiCodeDiff`. */
    added: number;
    /** Количество удалённых строк. Целое неотрицательное число, знак `-` ставит `AiCodeDiff`. */
    removed: number;
    /** Дополнительный класс корня. */
    className?: string;
    /** Полиморфный тег корня. По умолчанию `div`. */
    as?: T;
    /** Ref на корневой элемент. */
    innerRef?: PolymorphicRef<T>;
  }
>;

export function AiHistoryLineCheckpoint<T extends ElementType = 'div'>({
  as,
  innerRef,
  className,
  hash,
  title,
  added,
  removed,
  'data-test-id': dataTestId = TEST_IDS.checkpoint,
  ...rest
}: AiHistoryLineCheckpointProps<T>): ReactElement {
  const Component = (as || 'div') as ElementType;

  return (
    <Component {...rest} ref={innerRef} className={cn(styles.root, className)} data-test-id={dataTestId}>
      <div className={styles.details}>
        <span className={styles.hash} data-test-id={TEST_IDS.checkpointHash}>
          {hash}
        </span>
        <TruncateString className={styles.title} text={title} data-test-id={TEST_IDS.checkpointTitle} />
      </div>
      <AiCodeDiff added={added} removed={removed} />
    </Component>
  );
}

withInnerRefSupport(AiHistoryLineCheckpoint);
