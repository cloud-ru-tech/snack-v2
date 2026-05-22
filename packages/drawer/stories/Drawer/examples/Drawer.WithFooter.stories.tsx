import { APPEARANCE, Button, ButtonGroup, VIEW } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

function WithFooterScenario() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>WithFooter</DemoTitle>
        <DemoHint>
          Подтверждение деструктивного действия в Drawer. Футер: critical-primary + neutral-secondary action.
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.drawer.triggerOpen}
            label='Open confirm drawer'
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
        onClose={close}
        title='Удалить запись'
        subtitle='Действие необратимо. Связанные данные также будут удалены.'
        content='После подтверждения запись и все её ссылки исчезнут из списка.'
        footer={
          <ButtonGroup
            primaryAction={{ label: 'Удалить', appearance: 'critical', view: 'filled', onClick: close }}
            secondaryAction={{ label: 'Отмена', appearance: 'neutral', view: 'outline', onClick: close }}
          />
        }
      />
    </DemoPage>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer/Drawer/Examples/WithFooter',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const WithFooter: Story = {
  tags: ['dev', 'test'],
  render: () => <WithFooterScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.drawer.triggerOpen)).toBeVisible();
  },
};
