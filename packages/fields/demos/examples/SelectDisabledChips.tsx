import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

const options: ItemProps[] = [
  { id: 'read', content: { option: 'Чтение' }, disabled: true },
  { id: 'write', content: { option: 'Запись' } },
  { id: 'delete', content: { option: 'Удаление' } },
  { id: 'admin', content: { option: 'Администрирование' } },
];

export function SelectDisabledChips() {
  // Право «Чтение» обязательно: его чип не получает кнопку удаления и не сбрасывается при очистке.
  const [value, setValue] = useState<ItemId[]>(['read', 'write']);
  return (
    <PortalContextProvider>
      <FieldSelect
        label='Права доступа'
        placeholder='Выберите права'
        selection='multiple'
        chips
        items={options}
        value={value}
        onChange={setValue}
      />
    </PortalContextProvider>
  );
}
