import { Button } from '@ds/button';
import { Droplist, ItemProps as Item } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const items: Item[] = [
  { id: 'overview', content: { label: 'Overview' } },
  { id: 'analytics', content: { label: 'Analytics' } },
  { id: 'billing', content: { label: 'Billing' } },
];

const meta: Meta<typeof Droplist> = {
  title: 'Components/List/Droplist/Examples/Controlled',
  component: Droplist,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Droplist>;

// Controlled open: родитель владеет состоянием через `open` + `onOpenChange`.
// Внешняя кнопка открывает/закрывает дроплист, синхронно с кликом по триггеру.
function ControlledScenario() {
  const [open, setOpen] = useState(false);
  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Controlled open</DemoTitle>
        <DemoHint>Родитель владеет open; внешняя кнопка тоже открывает/закрывает дроплист.</DemoHint>
        <DemoActions align='center'>
          <Droplist items={items} size='m' placement='bottom-start' open={open} onOpenChange={setOpen}>
            <Button
              data-test-id={TEST_IDS.droplist.controlledTrigger}
              label='Trigger'
              view='outline'
              appearance='neutral'
              size='m'
            />
          </Droplist>
          <Button
            data-test-id={TEST_IDS.droplist.controlledClose}
            label={open ? 'Close externally' : 'Open externally'}
            view='outline'
            appearance='neutral'
            size='m'
            onClick={() => setOpen(value => !value)}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Controlled: Story = {
  tags: ['dev', 'test'],
  render: () => <ControlledScenario />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.droplist.controlledTrigger)).toBeVisible();
  },
};
