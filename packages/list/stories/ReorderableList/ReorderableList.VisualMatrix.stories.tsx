import { ReorderableList, ReorderItem, SIZE } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { StoryTable } from '#storybook/components';

import styles from '../List/stories.module.scss';

const meta: Meta<typeof ReorderableList> = {
  title: 'Components/List/ReorderableList',
  component: ReorderableList,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof ReorderableList>;

const keySizes = Object.values(SIZE);

const flatItems: ReorderItem[] = [
  { id: 'inbox', content: { option: 'Входящие', caption: '12' } },
  { id: 'sent', content: { option: 'Отправленные' } },
  { id: 'trash', content: { option: 'Корзина', description: 'Удаляется через 30 дней' } },
];

const groupedItems: ReorderItem[] = [
  { id: 'catalog', content: { option: 'Каталог' } },
  {
    type: 'group',
    id: 'group-1',
    label: 'Группа',
    divider: true,
    items: [
      { id: 'orders', content: { option: 'Заказы' } },
      { id: 'settings', content: { option: 'Настройки' }, disabled: true },
    ],
  },
];

// Ячейка держит свой state: `onItemsReorder` обязателен, а no-op-колбек сделал бы матрицу
// «мёртвой» — строки не переставлялись бы при ручной проверке в Storybook.
function MatrixCell({ size, items }: { size?: (typeof keySizes)[number]; items: ReorderItem[] }) {
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
        sectionTitle='Size × Structure'
        firstColumnHeader='Size'
        columnHeaders={['flat', 'grouped (+ disabled row)']}
        rows={keySizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [
            <MatrixCell key={`flat-${size}`} size={size} items={flatItems} />,
            <MatrixCell key={`grouped-${size}`} size={size} items={groupedItems} />,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Truncate (size m)'
        firstColumnHeader='Size'
        columnHeaders={['narrow container']}
        rows={[
          {
            variantLabel: 'M',
            cells: [
              <div className={styles.cellNarrow} key='narrow'>
                <MatrixCell
                  size='m'
                  items={[
                    { id: 'long', content: { option: 'Очень длинное название строки, которое не влезает' } },
                    { id: 'short', content: { option: 'Коротко' } },
                  ]}
                />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
