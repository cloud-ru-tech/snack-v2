import { SIZE } from '@ds/fields';
import { FieldName } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const sizes = Object.values(SIZE);

const meta: Meta<typeof FieldName> = {
  title: 'Uikit Product/FieldsPredefined/FieldName',
  component: FieldName,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof FieldName>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='size × state'
        firstColumnHeader='size'
        columnHeaders={['default', 'error', 'disabled']}
        rows={sizes.map(size => ({
          variantLabel: size,
          cells: [
            <FieldName key={`${size}-default`} size={size} value='my-service' />,
            <FieldName key={`${size}-error`} size={size} value='wrong name!' error='Недопустимые символы' />,
            <FieldName key={`${size}-disabled`} size={size} value='my-service' disabled />,
          ],
        }))}
      />
    </div>
  ),
};
