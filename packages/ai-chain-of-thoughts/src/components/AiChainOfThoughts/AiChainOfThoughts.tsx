import cn from 'classnames';
import { ReactElement, useId } from 'react';
import { useUncontrolledProp } from 'uncontrollable';

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
  opened: openedProp,
  defaultOpened = false,
  onToggle,
  children,
  className,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiChainOfThoughtsProps): ReactElement {
  const hasContent = isSlotFilled(children) && !broken;
  const [opened, setOpened] = useUncontrolledProp(openedProp, defaultOpened, onToggle);
  const contentId = useId();
  const showContent = Boolean(opened) && hasContent;

  return (
    <div
      {...rest}
      className={cn(styles.root, className)}
      data-opened={showContent || undefined}
      data-test-id={dataTestId}
    >
      <AiChainOfThoughtsHeadline
        inProgress={inProgress}
        broken={broken}
        duration={duration}
        label={label}
        brokenMessage={brokenMessage}
        collapsible={hasContent}
        opened={Boolean(opened)}
        onToggle={setOpened}
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
