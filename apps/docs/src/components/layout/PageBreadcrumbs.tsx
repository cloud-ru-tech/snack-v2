import { Breadcrumbs } from '@ds/breadcrumbs';

export type PageBreadcrumbsProps = {
  items: Array<{ id: string; label: string; href?: string }>;
};

export function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
  return <Breadcrumbs items={items} size='s' inactiveLastItem />;
}
