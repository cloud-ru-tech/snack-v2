import { Button, ButtonProps } from '@ds/button';
import { SettingsSVG } from '@ds/icons/interface/system';
import { DroplistProps } from '@ds/list';
import { TooltipProps, WithTooltip } from '@ds/tooltip';
import { ElementType } from 'react';

import { TEST_IDS, TOOLTIP_HOVER_DELAY_OPEN } from '../../../../constants';
import { Action } from '../../../../types';
import { NotificationPanelSettingsDroplist } from './NotificationPanelSettingsDroplist';

export type NotificationPanelSettingsProps = {
  /** Дополнительные действия панели */
  actions?: Action[];
  /** Кнопка дополнительного действия панели */
  button?: Omit<ButtonProps<ElementType>, 'label' | 'size' | 'view' | 'data-test-id'> & { tooltip?: TooltipProps };
  size?: 's' | 'm';
} & Pick<DroplistProps, 'itemRender' | 'groupItemRender'>;

/** Кнопка настроек панели уведомлений (с выпадающим списком действий, если переданы). */
export function NotificationPanelSettings({
  actions,
  button,
  size = 'm',
  itemRender,
  groupItemRender,
}: NotificationPanelSettingsProps) {
  const buttonProps: ButtonProps<ElementType> = {
    ...button,
    view: 'function',
    appearance: 'neutral',
    size,
    icon: button?.icon || <SettingsSVG />,
    'aria-label': button?.['aria-label'] ?? 'Настройки уведомлений',
    'data-test-id': TEST_IDS.panel.settings.droplistTrigger,
  };

  if (!actions?.length) {
    return (
      <WithTooltip
        tooltip={buttonProps.tooltip ? { hoverDelayOpen: TOOLTIP_HOVER_DELAY_OPEN, ...buttonProps.tooltip } : undefined}
      >
        <Button {...buttonProps} />
      </WithTooltip>
    );
  }

  return (
    <NotificationPanelSettingsDroplist
      actions={actions}
      button={buttonProps}
      itemRender={itemRender}
      groupItemRender={groupItemRender}
    />
  );
}
