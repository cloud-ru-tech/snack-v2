import type { Meta, StoryObj } from '@storybook/react';

import readme from '../../README.md?raw';
import { Button } from '../../src/Button';
import { APPEARANCE, SIZE, VIEW } from '../../src/Button/constants';
import { type PlaygroundArgs } from './helpers';

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Button/Button',
  component: Button,
  parameters: {
    readme: { content: readme },
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const AsLink: Story = {
  tags: ['dev'],
  args: {
    label: 'О нас',
    as: 'a',
    hrefLink: '/about',
    view: VIEW.Filled,
    appearance: APPEARANCE.Primary,
    size: SIZE.M,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Кнопка в виде ссылки (as="a"). Передаются href, при target="_blank" автоматически добавляется rel="noopener noreferrer". При disabled навигация блокируется через preventDefault.',
      },
    },
  },
  render: (args: PlaygroundArgs) => {
    const { hrefLink, ...rest } = args;
    return <Button {...rest} as='a' href={hrefLink} />;
  },
};
