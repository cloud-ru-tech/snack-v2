import { Button } from '@ds/button';
import { ReorderableDroplist, ReorderableList, ReorderItem, SIZE } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { StoryTable } from '#storybook/components';

import styles from '../List/stories.module.scss';

const meta: Meta<typeof ReorderableDroplist> = {
  title: 'Components/List/ReorderableDroplist',
  component: ReorderableDroplist,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof ReorderableDroplist>;

const keySizes = Object.values(SIZE);

const items: ReorderItem[] = [
  { id: 'catalog', content: { label: 'Каталог' } },
  { id: 'orders', content: { label: 'Заказы' } },
  { id: 'trash', content: { label: 'Корзина' } },
];

function TriggerCell({ size }: { size?: (typeof keySizes)[number] }) {
  const [value, setValue] = useState(items);

  return (
    <ReorderableDroplist size={size} items={value} onItemsReorder={setValue}>
      <Button label={`Open (${String(size ?? 's').toUpperCase()})`} size='m' />
    </ReorderableDroplist>
  );
}

// Дроплист открывается в портале — статичную матрицу собрать нельзя. Та же поверхность строк
// показана через ReorderableList; открытое состояние поповера — в visual.spec.ts.
function SurfaceCell({ size }: { size?: (typeof keySizes)[number] }) {
  const [value, setValue] = useState(items);

  return (
    <div className={styles.cell}>
      <ReorderableList size={size} items={value} onItemsReorder={setValue} />
    </div>
  );
}

export const VisualMatrix: Story = {
  // no-a11y: статичная матрица без интерактивного фокуса; a11y проверяется на Playground.
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Trigger × Size (closed)'
        firstColumnHeader='Size'
        columnHeaders={['trigger']}
        rows={keySizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [<TriggerCell key={size} size={size} />],
        }))}
      />

      <StoryTable
        sectionTitle='Droplist surface — reorderable rows (rendered as ReorderableList)'
        firstColumnHeader='Size'
        columnHeaders={['surface']}
        rows={keySizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [<SurfaceCell key={size} size={size} />],
        }))}
      />
    </div>
  ),
};
