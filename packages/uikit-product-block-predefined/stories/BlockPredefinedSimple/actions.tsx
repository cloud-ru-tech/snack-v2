import { Button } from '@ds/button';
import { Action } from '@ds/uikit-product-actions';
import { fn } from 'storybook/test';

const exportMembers = fn();

export const actions: Action[] = [
  { label: 'Пригласить', onClick: fn() },
  {
    variant: 'custom',
    render: () => ({
      default: <Button view='outline' appearance='neutral' label='Экспортировать' onClick={exportMembers} />,
      asListItem: { content: { label: 'Экспортировать' }, onClick: exportMembers },
    }),
  },
  {
    variant: 'kebab',
    button: { 'aria-label': 'Другие действия' },
    list: { items: [{ content: { label: 'История изменений' }, onClick: fn() }] },
  },
];
