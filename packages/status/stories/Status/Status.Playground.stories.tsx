import { Meta, StoryObj } from '@storybook/react';

import { APPEARANCE, Status, STATUS_SIZE, StatusProps } from '../../src';

type StoryType = StatusProps & {
  showProgress: boolean;
};

const meta: Meta<StoryType> = {
  title: 'Components/Status/Status',
  component: Status,
  parameters: { layout: 'centered' },
  args: {
    label: 'Label text',
    size: STATUS_SIZE.S,
    appearance: APPEARANCE.Neutral,
    hasBackground: false,
    loading: false,
    showProgress: false,
    progress: 50,
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
    className: {
      control: 'text',
      description: 'CSS-класс',
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;
type Story = StoryObj<StoryType>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
};
