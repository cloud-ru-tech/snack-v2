import { MouseEvent } from 'react';

import { BUTTON_TYPE } from '../../constants';
import { WidgetAction, WidgetActionListEntry } from '../../types';

export function isVisibleAction(action: WidgetAction) {
  return !action.hidden;
}

export function hasVisibleActions(actions: WidgetAction[]) {
  return actions.some(isVisibleAction);
}

export function actionToListItem(action: WidgetAction, close?: () => void) {
  const {
    label = '',
    icon,
    onClick,
    disabled,
    tooltip,
  } = action as Extract<
    WidgetAction,
    {
      variant?:
        | typeof BUTTON_TYPE.Filled
        | typeof BUTTON_TYPE.Outline
        | typeof BUTTON_TYPE.Tonal
        | typeof BUTTON_TYPE.Function
        | typeof BUTTON_TYPE.Simple;
    }
  >;

  return {
    content: { label: label },
    beforeContent: icon,
    tooltip,
    disabled,
    onClick: (event: MouseEvent<HTMLButtonElement>) => {
      close?.();
      onClick?.(event);
    },
  };
}

export function getPrimaryAction(items: WidgetAction[]) {
  const index = items.findIndex(
    action =>
      isVisibleAction(action) &&
      action.variant !== BUTTON_TYPE.Function &&
      action.variant !== BUTTON_TYPE.Droplist &&
      action.variant !== BUTTON_TYPE.Kebab,
  );

  return index >= 0 ? { action: items[index], index } : { index: -1 };
}

export function buildKebabItems(items: WidgetAction[], primaryActionIndex: number): WidgetActionListEntry[] {
  return items.reduce<WidgetActionListEntry[]>((acc, action, index) => {
    if (!isVisibleAction(action)) {
      return acc;
    }

    if (action.variant === BUTTON_TYPE.Function) {
      return acc;
    }

    if (action.variant === BUTTON_TYPE.Droplist || action.variant === BUTTON_TYPE.Kebab) {
      acc.push({
        type: 'group',
        label: action.variant === BUTTON_TYPE.Droplist ? action.button.label : undefined,
        items: action.list.items.flatMap(item => ('type' in item ? item.items : [item])),
        divider: acc.length > 0,
      });

      return acc;
    }

    if (index !== primaryActionIndex) {
      acc.push(actionToListItem(action, () => undefined));
    }

    return acc;
  }, []);
}
