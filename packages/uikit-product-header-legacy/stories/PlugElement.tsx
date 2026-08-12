import { extractSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

type PlugProps = {
  label: ReactNode;
  height?: number;
  width?: number;
  'data-test-id'?: string;
};

export function Plug({ label, height, width, ...rest }: PlugProps) {
  return (
    <div className={styles.plug} style={{ height, width }} {...extractSupportProps(rest)}>
      {label}
    </div>
  );
}

export const DATA_TEST_ID = {
  headerLayout: 'header-layout',
  banners: 'banners',
  platformSelector: 'platform-selector',
  newNavigationBanner: 'new-navigation-banner',
  projectSelect: 'project-select',
  toolbar: 'toolbar',
  breadcrumbs: 'breadcrumbs',
  breadcrumbsMobile: 'breadcrumbs-mobile',
  logo: 'logo',
  menu: 'menu',
} as const;

/** Заглушка слота `leftTop` вместо `PlatformSelector`. */
export function PlatformSelector() {
  return <Plug label='Platform Selector' height={56} data-test-id={DATA_TEST_ID.platformSelector} />;
}

/** Заглушка слота `rightTop` вместо `MarketplaceBanner` + `ReferralBanner`. */
export function Banners() {
  return <Plug label='Banners' height={88} data-test-id={DATA_TEST_ID.banners} />;
}

/** Заглушка слота `sidebarBottomSlot` вместо `NewNavigationBanner`. */
export function NewNavigationBanner() {
  return <Plug label='New Navigation Banner' height={120} data-test-id={DATA_TEST_ID.newNavigationBanner} />;
}

/** Заглушка слота `select`. */
export function ProjectSelect() {
  return <Plug label='Project Select' height={32} width={150} data-test-id={DATA_TEST_ID.projectSelect} />;
}

/** Заглушка слота `breadcrumbs` в широком HeaderLayout. */
export function Breadcrumbs() {
  return <Plug label='Breadcrumbs' height={32} width={300} data-test-id={DATA_TEST_ID.breadcrumbs} />;
}

/** Заглушка слота `breadcrumbs` в узком HeaderLayout. */
export function BreadcrumbsMobile() {
  return <Plug label='Breadcrumbs' height={16} width={300} data-test-id={DATA_TEST_ID.breadcrumbsMobile} />;
}

/** Заглушка слота `logo`. */
export function Logo() {
  return <Plug label='L' height={32} width={32} data-test-id={DATA_TEST_ID.logo} />;
}

/** Заглушка слота `menu`. */
export function Menu() {
  return <Plug label='M' height={32} width={32} data-test-id={DATA_TEST_ID.menu} />;
}

/** Заглушка слота `toolbar`. */
export function Toolbar() {
  return <Plug label='Toolbar' height={32} width={160} data-test-id={DATA_TEST_ID.toolbar} />;
}
