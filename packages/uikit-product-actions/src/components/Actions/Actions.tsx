import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';

import { OverflowActions } from '../../helperComponents/OverflowActions';
import { StaticActions } from '../../helperComponents/StaticActions';
import { ActionsProps } from '../../types';
import { hasVisibleActions } from '../../utils';

/** Панель действий с адаптивным меню переполнения. */
export function Actions({ collapse = true, ...props }: ActionsProps) {
  const { layoutType } = useAdaptiveLayout();

  if (!hasVisibleActions(props.items)) {
    return null;
  }

  if (!collapse && !isMobileLayout(layoutType)) {
    return <StaticActions {...props} />;
  }

  return <OverflowActions {...props} />;
}
