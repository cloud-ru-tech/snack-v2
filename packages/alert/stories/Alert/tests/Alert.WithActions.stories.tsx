import { Alert } from '@ds/alert';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert/Alert/Tests/WithActions',
  component: Alert,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>WithActions</DemoTitle>
        <DemoHint>
          {'Alert с primary/secondary action и close-кнопкой — конфигурация с интерактивными слотами.'}
        </DemoHint>
        <DemoActions block>
          <Alert {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
export default meta;

type Story = StoryObj<typeof Alert>;

// Alert с onClose + primary/secondary action — единственная конфигурация, на которой
// есть интерактивные элементы (close-button, action-buttons), и hover/focus/pressed
// дают визуальный сигнал. Используется в visual.spec для interaction-states.
export const WithActions: Story = {
  tags: ['test', 'dev'],
  args: {
    title: 'Alert title',
    description: 'Alert description text',
    'data-test-id': TEST_IDS.alert.root,
    onClose: fn(),
    actions: {
      primary: { label: 'Primary', onClick: fn() },
      secondary: { label: 'Secondary', onClick: fn() },
    },
  },
};
