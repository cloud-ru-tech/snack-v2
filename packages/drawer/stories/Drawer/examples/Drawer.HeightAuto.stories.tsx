import { APPEARANCE, Button, VIEW } from '@ds/button';
import { Drawer } from '@ds/drawer';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

function HeightAutoScenario() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>HeightAuto</DemoTitle>
        <DemoHint>
          {'Bottom sheet: при '}
          <code>position=&quot;bottom&quot;</code>
          {' / '}
          <code>&quot;top&quot;</code>
          {' и '}
          <code>heightAuto</code>
          {' панель'}
          сворачивается по контенту — для компактных подтверждений и коротких действий на мобильных.
        </DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.drawer.triggerOpen}
            label='Open bottom sheet'
            view={VIEW.Outline}
            appearance={APPEARANCE.Neutral}
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>
      <Drawer
        data-test-id={TEST_IDS.drawer.root}
        open={open}
        position='bottom'
        heightAuto
        onClose={close}
        title='Bottom sheet'
        subtitle='Высота панели рассчитывается по контенту.'
        content='Подходит для компактных подтверждений и коротких действий на мобильных устройствах.'
        approveButton={{ label: 'Закрыть', appearance: 'neutral', onClick: close }}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer/Drawer/Examples/HeightAuto',
  component: Drawer,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof Drawer>;

export const HeightAuto: Story = {
  tags: ['dev', 'test'],
  render: () => <HeightAutoScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.drawer.triggerOpen)).toBeVisible();
  },
};
