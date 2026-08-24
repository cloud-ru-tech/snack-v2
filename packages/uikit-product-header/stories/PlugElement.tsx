import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

type PlugProps = {
  label: ReactNode;
  className?: string;
  'data-test-id'?: string;
};

function Plug({ label, className, ...rest }: PlugProps) {
  return (
    <div className={cn(styles.plug, className)} {...extractSupportProps(rest)}>
      {label}
    </div>
  );
}

export const DATA_TEST_ID = {
  headerLayout: 'headerLayout',
  banners: 'banners',
  productSelect: 'product-select',
  projectSelect: 'projectSelect',
  projectSelectMobile: 'projectSelectMobile',
  toolbar: 'toolbar',
  breadcrumbs: 'breadcrumbs',
  breadcrumbsMobile: 'breadcrumbs-mobile',
  logo: 'logo',
  menu: 'menu',
};

export function Banners() {
  return <Plug label='Banners' className={styles.plugBanners} data-test-id={DATA_TEST_ID.banners} />;
}

export function ProductSelect() {
  return <Plug label='Product Select' className={styles.plugProductSelect} data-test-id={DATA_TEST_ID.productSelect} />;
}

export function ProjectSelect() {
  return <Plug label='Project Select' className={styles.plugProjectSelect} data-test-id={DATA_TEST_ID.projectSelect} />;
}

export function ProjectSelectMobile() {
  return (
    <Plug
      label='Project Select'
      className={styles.plugProjectSelectMobile}
      data-test-id={DATA_TEST_ID.projectSelectMobile}
    />
  );
}

export function Breadcrumbs() {
  return <Plug label='Breadcrumbs' className={styles.plugBreadcrumbs} data-test-id={DATA_TEST_ID.breadcrumbs} />;
}

export function BreadcrumbsMobile() {
  return (
    <Plug label='Breadcrumbs' className={styles.plugBreadcrumbsMobile} data-test-id={DATA_TEST_ID.breadcrumbsMobile} />
  );
}

export function Logo() {
  return <Plug label='Logo' className={styles.plugLogo} data-test-id={DATA_TEST_ID.logo} />;
}

export function Menu() {
  return <Plug label='Menu' className={styles.plugMenu} data-test-id={DATA_TEST_ID.menu} />;
}

export function Toolbar() {
  return <Plug label='Toolbar' className={styles.plugToolbar} data-test-id={DATA_TEST_ID.toolbar} />;
}
