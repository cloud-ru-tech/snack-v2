import { Skeleton } from '@ds/skeleton';
import { memo, MouseEvent, ReactNode, useMemo } from 'react';

import { TEST_IDS } from '../../constants';
import { WidgetAction, WidgetLayoutType, WidgetState } from '../../types';
import { ButtonKebab } from '../ButtonKebab';
import { ActionView } from './ActionView';
import { actionToListItem, buildKebabItems, getPrimaryAction, hasVisibleActions } from './helpers';
import styles from './styles.module.scss';

type ActionsProps = {
  actions?: WidgetAction[];
  actionsChildren?: ReactNode;
  wide?: boolean;
  state?: WidgetState;
  layoutType?: WidgetLayoutType;
  fullWidthPrimaryAction?: boolean;
  showOverflowActions?: boolean;
};

function ActionsSkeleton({ wide }: Pick<ActionsProps, 'wide'>) {
  return (
    <div className={styles.actionsWrapper} data-wide={wide || undefined}>
      <div className={styles.skeletonActions}>
        {wide ? (
          <>
            <Skeleton loading width='96px' height='32px' borderRadius='8px' />
            <Skeleton loading width='32px' height='32px' borderRadius='8px' />
          </>
        ) : (
          <>
            <div className={styles.skeletonActionFull}>
              <Skeleton loading width='100%' height='32px' borderRadius='8px' />
            </div>
            <Skeleton loading width='32px' height='32px' borderRadius='8px' />
          </>
        )}
      </div>
    </div>
  );
}

function ActionsComponent({ actions = [], actionsChildren, wide, state, layoutType = 'desktop' }: ActionsProps) {
  const { action: primaryAction, index: primaryActionIndex } = useMemo(() => getPrimaryAction(actions), [actions]);

  const kebabItems = useMemo(() => {
    const items = buildKebabItems(actions, primaryActionIndex);
    if (!wide && primaryAction) {
      items.unshift(actionToListItem(primaryAction));
    }
    return items.map(item =>
      'type' in item
        ? item
        : {
            ...item,
            onClick: (event: MouseEvent<HTMLElement>) => item.onClick?.(event),
          },
    );
  }, [primaryAction, wide, actions, primaryActionIndex]);

  if (state === 'loading') {
    return <ActionsSkeleton wide={wide} />;
  }

  if (!hasVisibleActions(actions) && !actionsChildren) {
    return null;
  }

  return (
    <div className={styles.actionsWrapper} data-test-id={TEST_IDS.actions}>
      {actionsChildren}
      {primaryAction && wide && (
        <ActionView {...primaryAction} layoutType={layoutType} commonProps={{ size: 'm', fullWidth: true }} />
      )}
      {Boolean(kebabItems.length) && (
        <ButtonKebab
          layoutType={layoutType}
          list={{
            items: kebabItems,
            closeDroplistOnItemClick: true,
          }}
        />
      )}
    </div>
  );
}

export const Actions = memo<ActionsProps>(ActionsComponent);
