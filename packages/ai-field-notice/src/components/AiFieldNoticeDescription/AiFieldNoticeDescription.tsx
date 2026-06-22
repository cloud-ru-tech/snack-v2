import cn from 'classnames';
import { CSSProperties, ReactElement } from 'react';

import { TEST_IDS } from '../../constants';
import { AiFieldNoticeDescriptionProps } from '../../types';
import { resolveDescriptionIndex } from '../../utils';
import styles from './styles.module.scss';

export function AiFieldNoticeDescription({
  messages,
  state,
  size,
  restingIndex,
  hoverIndex,
  className,
}: AiFieldNoticeDescriptionProps): ReactElement {
  const activeIndex = resolveDescriptionIndex(state, messages.length, { restingIndex, hoverIndex });

  return (
    <div
      className={cn(styles.root, className)}
      data-size={size}
      data-state={state}
      data-test-id={TEST_IDS.description}
      style={{ '--active-index': activeIndex } as CSSProperties}
    >
      <div className={styles.track}>
        {messages.map((message, index) => (
          <span
            key={`${index}-${message}`}
            className={styles.message}
            data-test-id={`${TEST_IDS.descriptionMessage}-${index}`}
          >
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}
