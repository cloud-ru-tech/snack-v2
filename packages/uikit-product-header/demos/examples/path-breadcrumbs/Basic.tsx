import { PathBreadcrumbs } from '@ds/uikit-product-header';

const items = [
  { id: '1', label: 'Главная', href: '#' },
  { id: '2', label: 'Проект', href: '#' },
  { id: '3', label: 'Сервис' },
];

export function Basic() {
  return <PathBreadcrumbs items={items} />;
}
