import { SIZE, Size } from '@ds/fields';
import { FieldSelectCreate } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const sizes = Object.values(SIZE);

const ITEMS = [
  { id: '1', content: { label: 'Production' } },
  { id: '2', content: { label: 'Staging' } },
  { id: '3', content: { label: 'Development' } },
];

const entityName = { single: 'Окружение', plural: 'Окружения' };
const noopSubmit = () => Promise.resolve();

function makeField(size: Size, extra?: { defaultValue?: string; disabled?: boolean }) {
  return (
    <FieldSelectCreate
      entityName={entityName}
      selectProps={{ label: 'Окружение', items: ITEMS, size, ...extra }}
      submitHandler={noopSubmit}
      createLayoutProps={{ title: 'Создание окружения', content: 'Форма' }}
    />
  );
}

const meta: Meta<typeof FieldSelectCreate> = {
  title: 'Uikit Product/FieldsPredefined/FieldSelectCreate',
  component: FieldSelectCreate,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof FieldSelectCreate>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='size × state'
        firstColumnHeader='size'
        columnHeaders={['default', 'value', 'disabled']}
        rows={sizes.map(size => ({
          variantLabel: size,
          cells: [
            <div key={`${size}-default`}>{makeField(size)}</div>,
            <div key={`${size}-value`}>{makeField(size, { defaultValue: '1' })}</div>,
            <div key={`${size}-disabled`}>{makeField(size, { disabled: true })}</div>,
          ],
        }))}
      />
    </div>
  ),
};
