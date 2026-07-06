import { SIZE } from '@ds/fields';
import { FieldMask, MASK, Mask } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const masks = Object.values(MASK);
const sizes = Object.values(SIZE);

// Заполненное значение на каждую маску — видно форматирование и кнопку очистки.
const filledValues: Record<Mask, string> = {
  [MASK.Uuid]: '123e4567-e89b-12d3-a456-426614174000',
  [MASK.Code]: '1234',
  [MASK.Passport]: '4509 123456',
  [MASK.Snils]: '123456-789 01',
  [MASK.IpV4Address]: '192.168.0.1',
  [MASK.IpV4AddressWithMask]: '192.168.0.1/24',
};

const meta: Meta<typeof FieldMask> = {
  title: 'Uikit Product/FieldsPredefined/FieldMask',
  component: FieldMask,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof FieldMask>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='mask × size'
        firstColumnHeader='mask'
        columnHeaders={sizes.map(size => size.toUpperCase())}
        rows={masks.map(mask => ({
          variantLabel: mask,
          cells: sizes.map(size => <FieldMask key={`${mask}-${size}`} mask={mask} size={size} label={mask} />),
        }))}
      />
      <StoryTable
        sectionTitle='mask × filled value'
        firstColumnHeader='mask'
        columnHeaders={['filled']}
        rows={masks.map(mask => ({
          variantLabel: mask,
          cells: [<FieldMask key={`${mask}-filled`} mask={mask} label={mask} value={filledValues[mask]} />],
        }))}
      />
    </div>
  ),
};
