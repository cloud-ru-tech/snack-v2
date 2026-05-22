import { Checkbox, CheckboxProps, SIZE } from '@ds/toggles';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<CheckboxProps> = {
  title: 'Components/Toggles/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  args: {
    size: 'xs',
    checked: false,
    loading: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<CheckboxProps>;

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
          columnHeaders={['unchecked', 'checked', 'indeterminate']}
          rows={[
            {
              variantLabel: 'Regular',
              cells: [
                <Checkbox key='unchecked' size={size} />,
                <Checkbox key='checked' checked size={size} />,
                <Checkbox key='indeterminate' indeterminate size={size} />,
              ],
            },
            {
              variantLabel: 'Disabled',
              cells: [
                <Checkbox key='unchecked' disabled size={size} />,
                <Checkbox key='checked' checked disabled size={size} />,
                <Checkbox key='indeterminate' indeterminate disabled size={size} />,
              ],
            },
            {
              variantLabel: 'Load',
              cells: [<Checkbox key='unchecked' loading size={size} />],
            },
          ]}
        />
      ))}
    </div>
  ),
};
