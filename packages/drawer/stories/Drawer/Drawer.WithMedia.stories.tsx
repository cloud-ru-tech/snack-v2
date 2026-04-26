import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import styles from './styles.module.scss';
import { DRAWER_TEST_ID, DRAWER_TRIGGER_TEST_ID } from './testIds';

function WithMediaRender() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        data-test-id={DRAWER_TRIGGER_TEST_ID}
        label='Open onboarding drawer'
        appearance='primary'
        view='filled'
        onClick={() => setOpen(true)}
      />
      <Drawer
        data-test-id={DRAWER_TEST_ID}
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
  title: 'Components/Drawer/Drawer',
  component: Drawer,
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const WithMedia: Story = {
  tags: ['dev'],
  render: () => <WithMediaRender />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(DRAWER_TRIGGER_TEST_ID)).toBeVisible();
  },
};
