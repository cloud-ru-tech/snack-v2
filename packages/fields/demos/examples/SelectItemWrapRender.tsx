import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { useState } from 'react';

// itemWrapRender оборачивает отрендеренный айтем в произвольный узел — типичный кейс:
// проксирование в навигационную ссылку (<a> / Link роутера).
const options: ItemProps[] = [
  {
    id: 'docs',
    content: { label: 'Документация' },
    itemWrapRender: node => <a href='/docs'>{node}</a>,
  },
  {
    id: 'api',
    content: { label: 'API Reference' },
    itemWrapRender: node => (
      <a href='https://example.com/api' target='_blank' rel='noopener noreferrer'>
        {node}
      </a>
    ),
  },
];

export function SelectItemWrapRender() {
  const [value, setValue] = useState<ItemId | undefined>(undefined);
  return (
    <FieldSelect
      label='Раздел'
      placeholder='Выберите раздел'
      hint='Каждый айтем обёрнут в навигационную ссылку через itemWrapRender'
      selection='single'
      items={options}
      value={value}
      onChange={setValue}
    />
  );
}
