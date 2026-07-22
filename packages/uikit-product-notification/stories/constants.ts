import { NotificationCardProps, NotificationPanelContentProps } from '@ds/uikit-product-notification';
import { fn } from 'storybook/test';

export const BASE_PROPS: Pick<NotificationCardProps, 'id' | 'title' | 'description' | 'date' | 'link' | 'label'> = {
  label: ['Category', 'Subcategory'].join('・'),
  id: 'card',
  title: 'Title truncate two line',
  description: `Demo content.

For replacement, use Property: ◆ProdContent. Replace this element with your local component with the original content.`,
  link: {
    label: 'Link to detailed information',
    href: '#',
  },
  date: 'DD.MM.YYYY HH:MM',
};

export const BUTTONS_PROPS: Pick<NotificationCardProps, 'primaryButton' | 'secondaryButton'> = {
  primaryButton: { label: 'Primary Button', onClick: fn() },
  secondaryButton: { label: 'Secondary Button', onClick: fn() },
};

export const ACTIONS: NotificationCardProps['actions'] = [
  { content: { option: 'action 1' }, onClick: fn() },
  { content: { option: 'action 2' }, onClick: fn() },
];

export const NOTIFICATION_PANEL_PROPS_MOCK: NotificationPanelContentProps = {
  title: 'Уведомления',
  loading: false,
  readAllButton: { onClick: fn() },
  settings: { button: { as: 'a', href: '#' } },
};
