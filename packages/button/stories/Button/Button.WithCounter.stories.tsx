import type { Meta, StoryObj } from '@storybook/react';

import readme from '../../README.md?raw';
import { Button } from '../../src/Button';
import { APPEARANCE, SIZE, VIEW } from '../../src/Button/constants';
import { type PlaygroundArgs, renderButtonPlayground } from './helpers';

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    readme: { content: readme },
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const WithCounter: Story = {
  tags: ['dev', 'autodocs'],
  args: {
    label: 'Уведомления',
    counterEnabled: true,
    counterValue: 5,
    view: VIEW.Filled,
    appearance: APPEARANCE.Primary,
    size: SIZE.M,
  },
  parameters: {
    docs: {
      description: {
        story: 'Кнопка с инлайн-счётчиком (без иконки или iconPosition=before). Счётчик отображается после текста.',
      },
    },
  },
  render: (args: PlaygroundArgs) => renderButtonPlayground(args),
};
