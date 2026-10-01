import { Breadcrumbs, BreadcrumbsProps } from '@ds/breadcrumbs';

import { TEST_IDS } from '../../constants';

type PathBreadcrumbsProps = {
  /** Пункты хлебных крошек. */
  items: BreadcrumbsProps['items'];
};

export function PathBreadcrumbs({ items }: PathBreadcrumbsProps) {
  return (
    <Breadcrumbs
      items={items}
      inactiveLastItem={items.length > 1}
      separator='/'
      size='xs'
      data-test-id={TEST_IDS.breadcrumbs.root}
    />
  );
}
