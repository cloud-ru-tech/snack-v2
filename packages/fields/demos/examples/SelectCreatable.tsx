import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { PortalContextProvider } from '@ds/portal-context';
import { useState } from 'react';

const PRESET_TAGS: ItemProps[] = [
  { id: 'frontend', content: { option: 'frontend' } },
  { id: 'backend', content: { option: 'backend' } },
  { id: 'infra', content: { option: 'infra' } },
];

export function SelectCreatable() {
  const [value, setValue] = useState<ItemId[]>(['frontend']);

  return (
    <PortalContextProvider>
      <FieldSelect
        label='Теги'
        placeholder='Введите тег и нажмите Enter'
        hint='addOptionByEnter: введённый текст по Enter становится новым выбранным значением (чипом)'
        selection='multiple'
        addOptionByEnter
        items={PRESET_TAGS}
        value={value}
        onChange={setValue}
      />
    </PortalContextProvider>
  );
}
