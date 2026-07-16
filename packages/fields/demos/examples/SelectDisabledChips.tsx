import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { useState } from 'react';

const options: ItemProps[] = [
  { id: 'read', content: { label: 'Чтение' }, disabled: true },
  { id: 'write', content: { label: 'Запись' } },
  { id: 'delete', content: { label: 'Удаление' } },
  { id: 'admin', content: { label: 'Администрирование' } },
];

export function SelectDisabledChips() {
  // Право «Чтение» обязательно: его чип не получает кнопку удаления и не сбрасывается при очистке.
  const [value, setValue] = useState<ItemId[]>(['read', 'write']);
  return (
    <FieldSelect
      label='Права доступа'
      placeholder='Выберите права'
      selection='multiple'
      chips
      items={options}
      value={value}
      onChange={setValue}
    />
  );
}
