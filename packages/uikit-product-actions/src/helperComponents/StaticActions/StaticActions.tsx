import cn from 'classnames';

import styles from '../../shared/styles.module.scss';
import { ActionsProps } from '../../types';
import { getActionKey, hasVisibleActions } from '../../utils';
import { ActionView } from '../ActionView';

export function StaticActions({
  items,
  className,
  'data-test-id': testId,
}: Pick<ActionsProps, 'items' | 'className' | 'data-test-id'>) {
  if (!hasVisibleActions(items)) {
    return null;
  }

  return (
    <div data-test-id={testId} className={cn(styles.desktopActionsWrapper, className)}>
      {items.map((action, index) => (
        <ActionView
          {...action}
          key={getActionKey(action, index)}
          commonProps={{
            className: styles.button,
          }}
        />
      ))}
    </div>
  );
}
