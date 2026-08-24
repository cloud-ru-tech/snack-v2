import { PathBreadcrumbs } from '@ds/uikit-product-header';

const items = [
  { id: '1', label: 'Главная', href: '#' },
  { id: '2', label: 'Организация', href: '#' },
  { id: '3', label: 'Проект', href: '#' },
  { id: '4', label: 'Раздел', href: '#' },
  { id: '5', label: 'Текущая страница' },
];

export function LongTrail() {
  return <PathBreadcrumbs items={items} />;
}
