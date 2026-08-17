import { useUncontrolledProp } from '@ds/utils';
import cn from 'classnames';
import { ReactElement, useId } from 'react';

import { TEST_IDS } from '../../constants';
import { AiChainOfThoughtsProps } from '../../types';
import { isSlotFilled } from '../../utils/slots';
import { AiChainOfThoughtsHeadline } from '../AiChainOfThoughtsHeadline';
import styles from './styles.module.scss';

export function AiChainOfThoughts({
  inProgress = true,
  broken = false,
  duration,
  label,
  brokenMessage,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiChainOfThoughtsProps): ReactElement {
  const hasContent = isSlotFilled(children) && !broken;
  const [open, setOpen] = useUncontrolledProp(openProp, defaultOpen, onOpenChange);
  const contentId = useId();
  const showContent = Boolean(open) && hasContent;

  return (
    <div
      {...rest}
      className={cn(styles.root, className)}
      data-open={showContent || undefined}
      data-test-id={dataTestId}
    >
      <AiChainOfThoughtsHeadline
        inProgress={inProgress}
        broken={broken}
        duration={duration}
        label={label}
        brokenMessage={brokenMessage}
        collapsible={hasContent}
        open={Boolean(open)}
        onOpenChange={setOpen}
        aria-controls={showContent ? contentId : undefined}
        data-test-id={TEST_IDS.headline}
      />
      {showContent && (
        <div className={styles.content} id={contentId} data-test-id={TEST_IDS.content}>
          {children}
        </div>
      )}
    </div>
  );
}
