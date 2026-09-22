import { Breadcrumbs } from '@ds/breadcrumbs';

import { withDocsChrome } from './DocsChromeScope';

export type PageBreadcrumbsProps = {
  items: Array<{ id: string; label: string; href?: string }>;
};

function PageBreadcrumbsContent({ items }: PageBreadcrumbsProps) {
  return <Breadcrumbs items={items} size='s' inactiveLastItem />;
}

export const PageBreadcrumbs = withDocsChrome(PageBreadcrumbsContent);
