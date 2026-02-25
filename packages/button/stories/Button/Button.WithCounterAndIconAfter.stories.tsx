import type { Meta, StoryObj } from '@storybook/react';

import readme from '../../README.md?raw';
import { Button } from '../../src/Button';
import { APPEARANCE, ICON_POSITION, SIZE, VIEW } from '../../src/Button/constants';
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

export const WithCounterAndIconAfter: Story = {
  tags: ['dev', 'autodocs'],
  args: {
    label: 'Уведомления',
    iconKey: 'placeholder',
    iconPosition: ICON_POSITION.After,
    counterEnabled: true,
    counterValue: 9,
    view: VIEW.Filled,
    appearance: APPEARANCE.Primary,
    size: SIZE.M,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Кнопка с icon и iconPosition=after и счётчиком. Счётчик отображается как бейдж абсолютно относительно иконки.',
      },
    },
  },
  render: (args: PlaygroundArgs) => renderButtonPlayground(args),
};
