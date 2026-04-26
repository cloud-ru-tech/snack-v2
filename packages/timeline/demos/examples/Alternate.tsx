import { Timeline } from '@ds/timeline';

const items = [
  { content: 'Создано', opposite: '10:00' },
  { content: 'Назначено', opposite: '10:10' },
  { content: 'Завершено', opposite: '10:30', dotAppearance: 'green' as const },
];

export function Alternate() {
  return <Timeline items={items} alternate fullWidth />;
}
