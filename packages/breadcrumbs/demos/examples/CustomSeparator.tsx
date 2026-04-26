import { Breadcrumbs } from '@ds/breadcrumbs';

const items = [
  { id: '1', label: 'Dashboard', href: '#' },
  { id: '2', label: 'Projects', href: '#' },
  { id: '3', label: 'Astro' },
];

export function CustomSeparator() {
  return <Breadcrumbs items={items} separator='/' />;
}
