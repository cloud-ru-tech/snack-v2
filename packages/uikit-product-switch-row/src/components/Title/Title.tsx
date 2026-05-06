import { QuestionTooltip } from '@ds/tooltip';
import { TruncateString } from '@ds/truncate-string';
import { MouseEvent, ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

const stopPropagation = (e: MouseEvent) => e.stopPropagation();

export type TitleProps = {
  title: string;
  tip?: ReactNode;
  disableTitleTruncate?: boolean;
};

export function Title({ title, tip, disableTitleTruncate }: TitleProps) {
  if (disableTitleTruncate) {
    return (
      <span>
        {title}
        {tip && (
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <span className={styles.tipWrapperInline} onClick={stopPropagation} data-test-id={TEST_IDS.titleTooltip}>
            <QuestionTooltip tip={tip} tabIndex={-1} />
          </span>
        )}
      </span>
    );
  }

  return (
    <>
      <TruncateString text={title} />
      {tip && (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <span className={styles.tipWrapper} onClick={stopPropagation} data-test-id={TEST_IDS.titleTooltip}>
          <QuestionTooltip tip={tip} tabIndex={-1} />
        </span>
      )}
    </>
  );
}
