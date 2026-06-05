import { Button } from '@ds/button';
import { UpdateSVG } from '@ds/icons';
import { Children, Fragment, isValidElement, MouseEvent, ReactElement, ReactNode } from 'react';

import { MoreActionsProps } from '../../../helperComponents/MoreActions';
import { TEST_IDS } from '../../../testIds';
import { TOOLBAR_AFTER_OVERFLOW_ATTR } from './toolbarAfterOverflow';

type MoreAction = MoreActionsProps['moreActions'][number];

type BuildMobileOverflowActionsParams = {
  onRefresh?: () => void;
  after?: ReactNode;
  moreActions?: MoreActionsProps['moreActions'];
  refreshLabel: string;
};

function collectElements(node: ReactNode): ReactElement[] {
  if (node == null || typeof node === 'boolean') {
    return [];
  }

  return Children.toArray(node).flatMap(child => {
    if (!isValidElement(child)) {
      return [];
    }

    if (child.type === Fragment) {
      return collectElements(child.props.children);
    }

    return [child];
  });
}

function hasOverflowMarker(element: ReactElement): boolean {
  return TOOLBAR_AFTER_OVERFLOW_ATTR in (element.props as Record<string, unknown>);
}

function isSlotButton(element: ReactElement): boolean {
  if (hasOverflowMarker(element)) {
    return true;
  }

  if (element.type === Button) {
    return true;
  }

  const {
    onClick,
    label,
    icon,
    'aria-label': ariaLabel,
  } = element.props as {
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    label?: string;
    icon?: ReactNode;
    'aria-label'?: string;
  };

  return typeof onClick === 'function' && Boolean(label || icon || ariaLabel);
}

function resolveAfterActionElement(element: ReactElement): ReactElement | null {
  if (isSlotButton(element)) {
    return element;
  }

  const childElements = collectElements((element.props as { children?: ReactNode }).children);

  if (childElements.length === 1) {
    return resolveAfterActionElement(childElements[0]);
  }

  return null;
}

function mapSlotButtonToAction(element: ReactElement): MoreAction | null {
  const {
    label,
    icon,
    onClick,
    disabled,
    'aria-label': ariaLabel,
  } = element.props as {
    label?: string;
    icon?: ReactNode;
    onClick?: (event: MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
    'aria-label'?: string;
  };

  const optionLabel = label ?? ariaLabel;

  if (!optionLabel && !icon) {
    return null;
  }

  return {
    content: optionLabel ? { option: optionLabel } : { option: '' },
    icon,
    onClick,
    disabled,
  };
}

export function buildMobileOverflowActions({
  onRefresh,
  after,
  moreActions = [],
  refreshLabel,
}: BuildMobileOverflowActionsParams): MoreActionsProps['moreActions'] {
  const actions: MoreAction[] = [];

  if (onRefresh) {
    actions.push({
      content: { option: refreshLabel },
      icon: <UpdateSVG />,
      onClick: onRefresh,
      'data-test-id': TEST_IDS.refreshOption,
    });
  }

  collectElements(after).forEach((element, index) => {
    const actionElement = resolveAfterActionElement(element);

    if (!actionElement) {
      return;
    }

    const action = mapSlotButtonToAction(actionElement);

    if (action) {
      actions.push({
        ...action,
        'data-test-id': `${TEST_IDS.afterOption}__${index}`,
      });
    }
  });

  return [...actions, ...moreActions];
}
