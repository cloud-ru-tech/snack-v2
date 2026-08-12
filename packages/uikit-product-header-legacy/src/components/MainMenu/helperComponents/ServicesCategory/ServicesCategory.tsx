import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { TitleClickable, TitleClickableProps } from '@ds/uikit-product-title-clickable';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEventHandler, ReactElement, ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

const SERVICES_CATEGORY_TEST_IDS = TEST_IDS.servicesCategory;

export type ServicesCategoryProps = WithSupportProps<{
  /** Заголовок категории (Figma title/m). */
  title: string;
  /**
   * URL заголовка. При наличии рендерится `TitleClickable` (`showArrow={false}`).
   * Без `href`/`onTitleClick` — статичный title.
   */
  href?: string;
  /** Клик по заголовку (legacy `label.onClick`). */
  onTitleClick?: MouseEventHandler<HTMLElement>;
  /** Визуальное выделение категории (Figma `highlight`). */
  highlight?: boolean;
  /** Карточки сервисов — обычно `@ds/uikit-product-card-predefined` `CardServiceLight`. */
  children: ReactNode;
  /** CSS-класс корневого контейнера. */
  className?: string;
}> &
  Pick<TitleClickableProps, 'fullWidth' | 'showArrow'>;

function CategoryTitle({
  title,
  href,
  onTitleClick,
  showArrow,
  fullWidth,
}: Pick<ServicesCategoryProps, 'title' | 'href' | 'onTitleClick' | 'showArrow' | 'fullWidth'>): ReactNode {
  if (href) {
    return (
      <TitleClickable
        title={title}
        href={href}
        showArrow={showArrow}
        fullWidth={fullWidth}
        onClick={onTitleClick as MouseEventHandler<HTMLAnchorElement> | undefined}
        data-test-id={SERVICES_CATEGORY_TEST_IDS.title}
      />
    );
  }

  if (onTitleClick) {
    return (
      <TitleClickable
        as='button'
        type='button'
        title={title}
        showArrow={showArrow}
        fullWidth={fullWidth}
        onClick={onTitleClick as MouseEventHandler<HTMLButtonElement>}
        data-test-id={SERVICES_CATEGORY_TEST_IDS.title}
      />
    );
  }

  return (
    <p className={styles.title} data-test-id={SERVICES_CATEGORY_TEST_IDS.title}>
      {title}
    </p>
  );
}

/**
 * Категория сервисов MainMenu (Figma: `servicesCategory`).
 *
 * Сетка карточек: desktop — 3 колонки → 2 при сжатии родителя (container query ≤728px);
 * mobile — всегда 1 колонка.
 */
export function ServicesCategory({
  title,
  href,
  onTitleClick,
  highlight = false,
  children,
  className,
  showArrow,
  fullWidth,
  ...rest
}: ServicesCategoryProps): ReactElement {
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);

  return (
    <section
      className={cn(styles.root, className)}
      data-test-id={SERVICES_CATEGORY_TEST_IDS.root}
      data-highlight={highlight || undefined}
      {...extractSupportProps(rest)}
    >
      <CategoryTitle
        title={title}
        href={href}
        onTitleClick={onTitleClick}
        showArrow={showArrow}
        fullWidth={fullWidth}
      />

      <div
        className={styles.services}
        data-mobile={isMobile || undefined}
        data-test-id={SERVICES_CATEGORY_TEST_IDS.services}
      >
        {children}
      </div>
    </section>
  );
}
