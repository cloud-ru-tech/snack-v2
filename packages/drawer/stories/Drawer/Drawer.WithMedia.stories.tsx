import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';

function WithMediaRender() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label='Open onboarding drawer' appearance='primary' view='filled' onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        position='right'
        width='m'
        onClose={() => setOpen(false)}
        media={<div className={styles.mediaImage}>Media slot — место под иллюстрацию</div>}
        title='Добро пожаловать'
        subtitle='Кратко о том, что изменилось в этой версии.'
        content='Список ключевых улучшений и ссылки на подробности могут размещаться в теле.'
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

export const WithMedia: Story = {
  tags: ['dev'],
  render: () => <WithMediaRender />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Open onboarding drawer' })).toBeVisible();
  },
};
