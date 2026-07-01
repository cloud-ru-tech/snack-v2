import { ButtonCombo, Item, VIEW } from '@ds/button-combo';

const items: Item[] = [
  { id: 'run', label: 'Запустить', onClick: () => console.info('Запустить') },
  { id: 'run-debug', label: 'Запустить с отладкой', onClick: () => console.info('Запустить с отладкой') },
];

export function Views() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <ButtonCombo view={VIEW.Filled} items={items} defaultValue='run' />
      <ButtonCombo view={VIEW.Tonal} items={items} defaultValue='run' />
      <ButtonCombo view={VIEW.Outline} items={items} defaultValue='run' />
      <ButtonCombo view={VIEW.Function} items={items} defaultValue='run' />
    </div>
  );
}
