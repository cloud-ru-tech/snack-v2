import { ButtonCombo, Item } from '@ds/button-combo';
import { ItemId } from '@ds/list';
import { useState } from 'react';

const items: Item[] = [
  { id: 'publish', label: 'Опубликовать', onClick: () => console.info('Опубликовать') },
  { id: 'draft', label: 'Сохранить черновик', onClick: () => console.info('Сохранить черновик') },
  { id: 'schedule', label: 'Запланировать', onClick: () => console.info('Запланировать') },
];

export function Controlled() {
  const [value, setValue] = useState<ItemId>('publish');
  const [open, setOpen] = useState(false);

  return <ButtonCombo items={items} value={value} onChange={setValue} open={open} onOpenChange={setOpen} />;
}
