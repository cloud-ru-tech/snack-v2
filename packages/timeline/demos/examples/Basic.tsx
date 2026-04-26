import { Timeline } from '@ds/timeline';

const items = [
  { content: 'Заявка создана' },
  { content: 'Передана в работу' },
  { content: 'В обработке' },
  { content: 'Выполнено' },
];

export function Basic() {
  return <Timeline items={items} />;
}
