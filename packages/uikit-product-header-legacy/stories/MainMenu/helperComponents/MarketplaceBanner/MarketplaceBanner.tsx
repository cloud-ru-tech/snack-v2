import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Button } from '@ds/button';
import { Card, RADIUS } from '@ds/card';
import { CrossSVG } from '@ds/icons/interface/system';
import { GigaChatLogo, KuberLogo, NginxLogo, NodejsLogo, StrongSwanLogo, UbuntuLogo } from '@ds/icons/logos';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { useThemeClassnames } from '@ds/theme';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEventHandler, ReactElement, ReactNode, useCallback } from 'react';

import { headerLegacyLocale } from '../../../../src/locale';
import { ICON_SIZE, TEST_IDS } from './constants';
import styles from './styles.module.scss';

export type MarketplaceBannerProps = WithSupportProps<{
  /** Заголовок баннера (Figma title/s). */
  title: string;
  /** Описание (Figma body/m; legacy `text`). На mobile скрывается. */
  description?: string;
  /** URL — Card рендерится как `<a>`. */
  href?: string;
  /** Обработчик клика по карточке. */
  onClick?: MouseEventHandler<HTMLElement>;
  /**
   * Колбэк закрытия. При наличии отображается кнопка «Закрыть»:
   * на desktop — на hover/focus, на mobile — постоянно.
   */
  onClose?: MouseEventHandler<HTMLElement>;
  /** CSS-класс корневой карточки. */
  className?: string;
}>;

const DESKTOP_LOGOS = [StrongSwanLogo, KuberLogo, NodejsLogo, NginxLogo, UbuntuLogo, GigaChatLogo] as const;
/** Figma `marketplaceBannerMobile`: Node.js, Kubernetes, Nginx. */
const MOBILE_LOGOS = [NodejsLogo, KuberLogo, NginxLogo] as const;

function BannerContent({
  title,
  description,
  isMobile,
}: Pick<MarketplaceBannerProps, 'title' | 'description'> & { isMobile: boolean }): ReactNode {
  const logos = isMobile ? MOBILE_LOGOS : DESKTOP_LOGOS;

  return (
    <div className={styles.composition}>
      <p className={styles.title} data-test-id={TEST_IDS.title}>
        {title}
      </p>

      {isMobile ? (
        <div className={styles.icons} aria-hidden data-test-id={TEST_IDS.icons}>
          {logos.map((Logo, index) => (
            <Logo key={index} size={ICON_SIZE} />
          ))}
        </div>
      ) : (
        <div className={styles.row}>
          {description ? (
            <p className={styles.description} data-test-id={TEST_IDS.description}>
              {description}
            </p>
          ) : null}

          <div className={styles.icons} aria-hidden data-test-id={TEST_IDS.icons}>
            {logos.map((Logo, index) => (
              <Logo key={index} size={ICON_SIZE} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Баннер маркетплейса в меню (Figma: `marketplaceBanner` / `marketplaceBannerMobile`).
 *
 * Раскладку берёт из `AdaptiveProvider`: desktop — title + description + сетка логотипов 3×2;
 * mobile — горизонтальный ряд title + 3 логотипа (min-height 48).
 * При `onClose` — elevated close-кнопка (desktop: hover/focus; mobile: всегда).
 */
export function MarketplaceBanner({
  title,
  description,
  href,
  onClick,
  onClose,
  className,
  ...rest
}: MarketplaceBannerProps): ReactElement {
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);
  const { t } = headerLegacyLocale.useTranslations();
  const compactThemeClassname = useThemeClassnames({ density: 'compact' });
  const supportProps = extractSupportProps(rest);

  const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      onClose?.(e);
    },
    [onClose],
  );

  const content = (
    <>
      <BannerContent title={title} description={description} isMobile={isMobile} />
      {onClose ? (
        <Button
          className={cn(styles.closeButton, compactThemeClassname)}
          view='elevated'
          appearance='neutral'
          size='s'
          icon={<CrossSVG size={16} />}
          onClick={handleClose}
          aria-label={t('close')}
          data-test-id={TEST_IDS.close}
        />
      ) : null}
    </>
  );

  const rootClassName = cn(styles.root, className);

  if (href) {
    return (
      <Card
        as='a'
        href={href}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement> | undefined}
        radius={RADIUS.L}
        backgroundPredefined={BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level}
        className={rootClassName}
        data-mobile={isMobile || undefined}
        data-test-id={TEST_IDS.root}
        {...supportProps}
      >
        {content}
      </Card>
    );
  }

  return (
    <Card
      onClick={onClick as MouseEventHandler<HTMLDivElement> | undefined}
      radius={RADIUS.L}
      backgroundPredefined={BACKGROUND_PREDEFINED_FILL.NeutralBackground1Level}
      className={rootClassName}
      data-mobile={isMobile || undefined}
      data-test-id={TEST_IDS.root}
      {...supportProps}
    >
      {content}
    </Card>
  );
}
