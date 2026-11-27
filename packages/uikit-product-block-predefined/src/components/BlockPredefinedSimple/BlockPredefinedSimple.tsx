import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Block } from '@ds/block';
import { Typography } from '@ds/typography';
import { Actions, hasVisibleActions } from '@ds/uikit-product-actions';
import cn from 'classnames';

import styles from './styles.module.scss';
import { BlockPredefinedSimpleProps } from './types';

/** Блок с адаптивной шапкой и произвольным содержимым. */
export function BlockPredefinedSimple({
  title,
  children,
  actions = [],
  maxVisibleActionsItems = 1,
  className,
  ...blockProps
}: BlockPredefinedSimpleProps) {
  const { layoutType } = useAdaptiveLayout();
  const mobile = isMobileLayout(layoutType);
  const hasActions = hasVisibleActions(actions);

  return (
    <Block
      {...blockProps}
      view='simple'
      backgroundPredefined='neutralBackground1Level'
      size='l'
      className={cn(styles.block, className)}
      contentClassName={styles.content}
    >
      {(title || hasActions) && (
        <div className={styles.header} data-mobile={mobile || undefined} data-with-title={Boolean(title) || undefined}>
          {title && (
            <Typography variant='title' size='l' className={styles.title}>
              {title}
            </Typography>
          )}
          {hasActions && (
            <Actions
              groupDividers={false}
              className={styles.actions}
              items={actions}
              maxVisibleItems={mobile ? maxVisibleActionsItems : undefined}
            />
          )}
        </div>
      )}
      {children != null && <div className={styles.body}>{children}</div>}
    </Block>
  );
}
