import { Button, ButtonProps } from '@ds/button';
import { SettingsSVG } from '@ds/icons';
import { ElementType } from 'react';

import { TEST_IDS } from '../../../../constants';
import { Action } from '../../../../types';
import { NotificationPanelSettingsDroplist } from './NotificationPanelSettingsDroplist';

export type NotificationPanelSettingsProps = {
  /** Дополнительные действия панели */
  actions?: Action[];
  /** Кнопка дополнительного действия панели */
  button?: Omit<ButtonProps<ElementType>, 'label' | 'size' | 'view' | 'data-test-id'>;
  size?: 's' | 'm';
};

/** Кнопка настроек панели уведомлений (с выпадающим списком действий, если переданы). */
export function NotificationPanelSettings({ actions, button, size = 'm' }: NotificationPanelSettingsProps) {
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
    return <Button {...buttonProps} />;
  }

  return <NotificationPanelSettingsDroplist actions={actions} button={buttonProps} />;
}
