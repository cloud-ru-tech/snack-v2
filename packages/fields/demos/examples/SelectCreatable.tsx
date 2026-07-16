import { FieldSelect } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { useState } from 'react';

const PRESET_TAGS: ItemProps[] = [
  { id: 'frontend', content: { label: 'frontend' } },
  { id: 'backend', content: { label: 'backend' } },
  { id: 'infra', content: { label: 'infra' } },
];

export function SelectCreatable() {
  const [value, setValue] = useState<ItemId[]>(['frontend']);

  return (
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
  );
}
