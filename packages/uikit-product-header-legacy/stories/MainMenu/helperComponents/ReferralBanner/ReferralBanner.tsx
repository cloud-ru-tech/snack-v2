import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Button } from '@ds/button';
import { Card, RADIUS } from '@ds/card';
import { CrossSVG } from '@ds/icons/interface/system';
import { BACKGROUND_PREDEFINED_FILL } from '@ds/materials';
import { APPEARANCE, PromoTag, SIZE } from '@ds/promo-tag';
import { useThemeClassnames } from '@ds/theme';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEventHandler, ReactElement, ReactNode, useCallback } from 'react';

import { headerLegacyLocale } from '../../../../src/locale';
import { TEST_IDS } from './constants';
import styles from './styles.module.scss';

export type ReferralBannerProps = WithSupportProps<{
  /** Заголовок баннера (Figma title/s). */
  title: string;
  /** Описание (Figma body/m; legacy `text`). На mobile скрывается. */
  description?: string;
  /** Текст PromoTag (xs / primary), например «20%». */
  promoBadge: string;
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

function BannerContent({
  title,
  description,
  promoBadge,
  isMobile,
}: Pick<ReferralBannerProps, 'title' | 'description' | 'promoBadge'> & { isMobile: boolean }): ReactNode {
  return (
    <div className={styles.composition}>
      {isMobile ? (
        <>
          <p className={styles.title} data-test-id={TEST_IDS.title}>
            {title}
          </p>
          <PromoTag
            label={promoBadge}
            size={SIZE.Xs}
            appearance={APPEARANCE.Primary}
            className={styles.promoTag}
            data-test-id={TEST_IDS.promoBadge}
          />
        </>
      ) : (
        <>
          <p className={styles.title} data-test-id={TEST_IDS.title}>
            {title}
          </p>

          {description ? (
            <p className={styles.description} data-test-id={TEST_IDS.description}>
              {description}
            </p>
          ) : null}

          <PromoTag
            label={promoBadge}
            size={SIZE.Xs}
            appearance={APPEARANCE.Primary}
            className={styles.promoTag}
            data-test-id={TEST_IDS.promoBadge}
          />
        </>
      )}
    </div>
  );
}

/**
 * Реферальный баннер меню (Figma: `refferalBanner` / `referalBannerMobile`).
 *
 * Раскладку берёт из `AdaptiveProvider`: desktop — title + description + PromoTag absolute;
 * mobile — горизонтальный ряд title + PromoTag (min-height 48).
 * При `onClose` — elevated close-кнопка (desktop: hover/focus; mobile: всегда).
 */
export function ReferralBanner({
  title,
  description,
  promoBadge,
  href,
  onClick,
  onClose,
  className,
  ...rest
}: ReferralBannerProps): ReactElement {
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
      <BannerContent title={title} description={description} promoBadge={promoBadge} isMobile={isMobile} />
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
