import { LAYOUT_TYPE, withLayoutType } from '@ds/adaptive';
import { Actions, ActionsProps } from '@ds/uikit-product-actions';

function DesktopActionsBase(props: Pick<ActionsProps, 'items' | 'className'>) {
  return <Actions {...props} collapse={false} />;
}

export const DesktopActions = withLayoutType(DesktopActionsBase, LAYOUT_TYPE.Desktop);
