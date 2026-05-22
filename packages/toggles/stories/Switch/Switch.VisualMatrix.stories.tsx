import { SIZE, Switch, SwitchProps } from '@ds/toggles';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<SwitchProps> = {
  title: 'Components/Toggles/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  args: {
    size: 'xs',
    checked: false,
    loading: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<SwitchProps>;

const sizes = Object.values(SIZE);

export const VisualMatrix: Story = {
  tags: ['dev', 'test'],
  parameters: { controls: { disable: true } },
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
              cells: [<Switch key={'unchecked'} size={size} />, <Switch key={'checked'} checked size={size} />],
            },
            {
              variantLabel: 'Disabled',
              cells: [
                <Switch key={'unchecked'} disabled size={size} />,
                <Switch key={'checked'} checked disabled size={size} />,
              ],
            },
            {
              variantLabel: 'Load',
              cells: [
                <Switch key={'unchecked'} loading size={size} />,
                <Switch key={'checked'} loading checked size={size} />,
              ],
            },
          ]}
        />
      ))}
    </div>
  ),
};
