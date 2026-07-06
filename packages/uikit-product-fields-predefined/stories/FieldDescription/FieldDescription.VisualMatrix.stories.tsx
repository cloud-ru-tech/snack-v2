import { SIZE } from '@ds/fields';
import { FieldDescription } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const sizes = Object.values(SIZE);

const meta: Meta<typeof FieldDescription> = {
  title: 'Uikit Product/FieldsPredefined/FieldDescription',
  component: FieldDescription,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof FieldDescription>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='size × state'
        firstColumnHeader='size'
        columnHeaders={['default', 'filled', 'error', 'disabled']}
        rows={sizes.map(size => ({
          variantLabel: size,
          cells: [
            <FieldDescription key={`${size}-default`} size={size} />,
            <FieldDescription key={`${size}-filled`} size={size} value='Кластер для стейджинга' />,
            <FieldDescription key={`${size}-error`} size={size} error='Превышена длина' />,
            <FieldDescription key={`${size}-disabled`} size={size} disabled />,
          ],
        }))}
      />
    </div>
  ),
};
