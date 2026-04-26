import { Timeline } from '@ds/timeline';

const items = [
  { content: 'Заявка создана', opposite: '10:00' },
  { content: 'Обработка', opposite: '10:15' },
  { content: 'Выполнено', opposite: '10:40', dotAppearance: 'green' as const },
];

export function WithOpposite() {
  return <Timeline items={items} />;
}
