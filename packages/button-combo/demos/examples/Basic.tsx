import { ButtonCombo, Item } from '@ds/button-combo';

const items: Item[] = [
  { id: 'save', label: 'Сохранить', onClick: () => console.info('Сохранить') },
  { id: 'save-copy', label: 'Сохранить копию', onClick: () => console.info('Сохранить копию') },
  { id: 'save-template', label: 'Сохранить как шаблон', onClick: () => console.info('Сохранить как шаблон') },
];

export function Basic() {
  return <ButtonCombo items={items} defaultValue='save' />;
}
