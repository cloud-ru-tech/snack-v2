import { Breadcrumbs } from '@ds/breadcrumbs';

const items = [
  { id: '1', label: 'Главная', href: '#' },
  { id: '2', label: 'Документы', href: '#' },
  { id: '3', label: 'Текущая страница' },
];

export function BasicTrail() {
  return <Breadcrumbs items={items} />;
}
