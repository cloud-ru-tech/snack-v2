import { Button } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DRAWER_TEST_ID, DRAWER_TRIGGER_TEST_ID } from './testIds';

type Screen = 'list' | 'details';

function BackButtonRender() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>('list');

  const close = () => {
    setOpen(false);
    setScreen('list');
  };

  return (
    <>
      <Button
        data-test-id={DRAWER_TRIGGER_TEST_ID}
        label='Open multi-step drawer'
        appearance='primary'
        view='filled'
        onClick={() => setOpen(true)}
      />
      <Drawer
        data-test-id={DRAWER_TEST_ID}
        open={open}
        position='right'
        width='m'
        onClose={close}
        title={screen === 'list' ? 'Список' : 'Детали'}
        subtitle={screen === 'list' ? 'Выберите элемент' : 'Кнопка «назад» возвращает к списку'}
        onBackButtonClick={screen === 'details' ? () => setScreen('list') : undefined}
        content={
          screen === 'list' ? (
            <Button label='Открыть детали' appearance='primary' view='outline' onClick={() => setScreen('details')} />
          ) : (
            'Содержимое детального экрана.'
          )
        }
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

export const BackButton: Story = {
  tags: ['dev'],
  render: () => <BackButtonRender />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(DRAWER_TRIGGER_TEST_ID)).toBeVisible();
  },
};
