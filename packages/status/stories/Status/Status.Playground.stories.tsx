import { APPEARANCE, Status, STATUS_SIZE, StatusProps } from '@ds/status';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

type StoryType = StatusProps & {
  showProgress: boolean;
};

const meta: Meta<StoryType> = {
  title: 'Components/Status/Status',
  component: Status,
  parameters: { layout: 'fullscreen' },
  render: ({ showProgress, progress, ...args }) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Индикатор статуса: точка с подписью, опциональный прогресс и состояние загрузки.</DemoHint>
        <DemoActions align='center'>
          <Status {...args} progress={showProgress ? progress : undefined} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    label: 'Label text',
    size: STATUS_SIZE.S,
    appearance: APPEARANCE.Neutral,
    hasBackground: false,
    loading: false,
    showProgress: false,
    progress: 50,
    'data-test-id': TEST_IDS.status.root,
  },
  argTypes: {
    showProgress: {
      if: { arg: 'loading', truthy: false },
      control: 'boolean',
    },
    progress: {
      if: { arg: 'showProgress', truthy: true },
      control: {
        type: 'range',
        min: 0,
        max: 100,
        step: 1,
      },
    },
    label: {
      control: 'text',
      description: 'Подпись к индикатору (точка с текстом). Если не передано — только точка',
    },
    size: {
      control: 'select',
      options: Object.values(STATUS_SIZE),
      description: 'Размер индикатора и подписи',
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Внешний вид (цветовая схема)',
    },
    className: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryType>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.status.root)).toBeVisible();
  },
};
