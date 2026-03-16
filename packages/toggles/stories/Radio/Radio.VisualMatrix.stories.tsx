import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import togglesReadme from '../../README.md?raw';
import { Radio, RadioProps, SIZE } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<RadioProps> = {
  title: 'Components/Toggles/Radio',
  component: Radio,
  parameters: {
    readme: { content: togglesReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2815-30903&p=f&m=dev',
    },
  },
  args: {
    size: 'xs',
    checked: false,
    loading: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<RadioProps>;

const sizes = Object.values(SIZE);

export const VisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <div className={styles.wrapper}>
      {sizes.map(size => (
        <StoryTable
          key={size}
          sectionTitle={`States (Size ${size})`}
          firstColumnHeader=''
          columnHeaders={['unchecked', 'checked']}
          rows={[
            {
              variantLabel: 'Regular',
              cells: [<Radio key={'unchecked'} size={size} />, <Radio key={'checked'} checked size={size} />],
            },
            {
              variantLabel: 'Disabled',
              cells: [
                <Radio key={'unchecked'} disabled size={size} />,
                <Radio key={'checked'} checked disabled size={size} />,
              ],
            },
            {
              variantLabel: 'Load',
              cells: [<Radio key={'unchecked'} loading size={size} />],
            },
          ]}
        />
      ))}
    </div>
  ),
};
