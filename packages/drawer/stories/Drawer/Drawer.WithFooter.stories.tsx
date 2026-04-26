import { Button, ButtonGroup } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

function WithFooterRender() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open confirm drawer' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        position='right'
        onClose={() => setOpen(false)}
        title='Удалить запись'
        subtitle='Действие необратимо. Связанные данные также будут удалены.'
        content='После подтверждения запись и все её ссылки исчезнут из списка.'
        footer={
          <ButtonGroup
            className={styles.footerGroup}
            primaryAction={{
              label: 'Удалить',
              appearance: 'critical',
              view: 'filled',
              onClick: () => setOpen(false),
            }}
            secondaryAction={{
              label: 'Отмена',
              appearance: 'neutral',
              view: 'outline',
              onClick: () => setOpen(false),
            }}
          />
        }
      />
    </>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const WithFooter: Story = {
  tags: ['dev'],
  render: () => <WithFooterRender />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Open confirm drawer' })).toBeVisible();
  },
};
