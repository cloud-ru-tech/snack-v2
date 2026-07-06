import { SIZE } from '@ds/fields';
import { FieldPhone, RUSSIA_COUNTRY_CODE } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const sizes = Object.values(SIZE);

const meta: Meta<typeof FieldPhone> = {
  title: 'Uikit Product/FieldsPredefined/FieldPhone',
  component: FieldPhone,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof FieldPhone>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='size — со списком стран'
        firstColumnHeader='size'
        columnHeaders={['']}
        rows={sizes.map(size => ({
          variantLabel: size,
          cells: [<FieldPhone key={`multi-${size}`} size={size} label='Телефон' />],
        }))}
      />

      <StoryTable
        sectionTitle='одна страна — без селектора'
        firstColumnHeader='size'
        columnHeaders={['']}
        rows={[
          {
            variantLabel: 'm',
            cells: [
              <FieldPhone
                key='single'
                size='m'
                label='Телефон'
                options={{ includedCountries: [RUSSIA_COUNTRY_CODE] }}
              />,
            ],
          },
        ]}
      />
    </div>
  ),
};
