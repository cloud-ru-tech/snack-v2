import { Breadcrumbs, BreadcrumbsProps } from '@ds/breadcrumbs';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

type PathBreadcrumbsProps = {
  items: BreadcrumbsProps['items'];
};

export function PathBreadcrumbs({ items }: PathBreadcrumbsProps) {
  return (
    <Breadcrumbs
      items={items}
      className={styles.breadcrumbs}
      inactiveLastItem={items.length > 1}
      separator='/'
      size='xs'
      data-test-id={TEST_IDS.breadcrumbs.root}
    />
  );
}
