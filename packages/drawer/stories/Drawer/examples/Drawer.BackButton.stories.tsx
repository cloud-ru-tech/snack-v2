import { APPEARANCE, Button, VIEW } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

type Screen = 'list' | 'details';

function BackButtonScenario() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>('list');

  const close = () => {
    setOpen(false);
    setScreen('list');
  };

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>BackButton</DemoTitle>
        <DemoHint>
          Multi-step drawer: на «деталях» появляется стрелка «назад», возвращающая к списку. Закрытие — из футера.
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.drawer.triggerOpen}
            label='Open multi-step drawer'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>
      <Drawer
        data-test-id={TEST_IDS.drawer.root}
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
        approveButton={{ label: 'Закрыть', appearance: 'neutral', onClick: close }}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer/Drawer/Examples/BackButton',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const BackButton: Story = {
  tags: ['dev', 'test'],
  render: () => <BackButtonScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.drawer.triggerOpen)).toBeVisible();
  },
};
