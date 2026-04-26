import { Breadcrumbs } from '@ds/breadcrumbs';

const items = [
  { id: '1', label: 'Литература', href: '#' },
  { id: '2', label: 'Стихи', href: '#' },
  { id: '3', label: 'Золотой век русской поэзии', shortLabel: 'Золотой век', href: '#' },
  { id: '4', label: 'Михаил Лермонтов', shortLabel: 'Лермонтов', href: '#' },
  { id: '5', label: 'Тема "Одиночество"', shortLabel: 'Одиночество', href: '#' },
  { id: '6', label: 'Парус' },
];

export function LongTrail() {
  return <Breadcrumbs items={items} />;
}
