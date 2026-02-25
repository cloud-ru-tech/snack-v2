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

export const AsLinkExternal: Story = {
  tags: ['dev', 'autodocs'],
  args: {
    label: 'Внешняя ссылка',
    as: 'a',
    hrefLink: 'https://example.com',
    view: VIEW.Outline,
    appearance: APPEARANCE.Primary,
    size: SIZE.M,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ссылка с target="_blank" (открытие в новой вкладке). rel="noopener noreferrer" проставляется автоматически.',
      },
    },
  },
  render: (args: PlaygroundArgs) => renderButtonPlayground(args, { target: '_blank' }),
};
