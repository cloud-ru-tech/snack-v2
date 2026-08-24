import { Breadcrumbs, BreadcrumbsProps } from '@ds/breadcrumbs';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

type PathBreadcrumbsProps = {
  items: BreadcrumbsProps['items'];
  isMobile?: boolean;
};

export function PathBreadcrumbs({ isMobile, items }: PathBreadcrumbsProps) {
  return (
    <Breadcrumbs
      items={items}
      className={styles.breadcrumbs}
      inactiveLastItem={items.length > 1}
      separator='/'
      size={isMobile ? 'xs' : 's'}
      data-test-id={TEST_IDS.breadcrumbs.root}
    />
  );
}
