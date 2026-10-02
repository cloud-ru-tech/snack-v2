import { Button } from '@ds/button';
import { Card } from '@ds/card';
import { CrossSVG } from '@ds/icons/interface/system';
import { PromoTag, PromoTagProps, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { Typography } from '@ds/typography';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEventHandler, ReactElement, ReactNode, useCallback } from 'react';

import { useMobileLayout } from '../../../../hooks/useMobileLayout';
import { headerLocale } from '../../../../locale';
import { MENU_BANNER_TEST_IDS } from './constants';
import styles from './styles.module.scss';

export type MenuBannerProps = WithSupportProps<
  {
    /** Заголовок баннера */
    title: string;
    /** Текст промо-тега рядом с заголовком */
    promoTag?: Omit<PromoTagProps, 'data-test-id' | 'size' | 'role' | 'as'>;
    /** Слот справа от заголовка и промо-тега */
    afterTitle?: ReactNode;
    /** Колбэк закрытия. При наличии отображается кнопка «Закрыть» на hover */
    onClose?: MouseEventHandler<HTMLElement>;
    /** CSS-класс корневого элемента */
    className?: string;
  } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title' | 'children'>
>;

export function MenuBanner({
  title,
  promoTag,
  afterTitle,
  onClose,
  className,
  href = '#',
  'data-test-id': dataTestId,
  ...rest
}: MenuBannerProps): ReactElement {
  const { t } = headerLocale.useTranslations();
  const isMobile = useMobileLayout();

  const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      onClose?.(e);
    },
    [onClose],
  );

  return (
    <Card
      as='a'
      href={href}
      radius='l'
      view='simple'
      className={cn(styles.root, className)}
      data-mobile={isMobile || undefined}
      data-test-id={dataTestId ?? MENU_BANNER_TEST_IDS.root}
      {...rest}
    >
      <div className={styles.contentRow} data-closable={Boolean(onClose) || undefined}>
        <span className={styles.titleWrapper}>
          <Typography
            as='span'
            variant='body'
            size='m'
            className={styles.title}
            data-test-id={MENU_BANNER_TEST_IDS.title}
          >
            {title}
          </Typography>

          {promoTag && (
            <PromoTag
              {...promoTag}
              className={styles.promoTag}
              roleAppearance={ROLE_APPEARANCE.Decor}
              size={SIZE.Xs}
              data-test-id={MENU_BANNER_TEST_IDS.promoTag}
            />
          )}
        </span>

        {afterTitle && (
          <div className={styles.afterTitle} data-test-id={MENU_BANNER_TEST_IDS.afterTitle}>
            {afterTitle}
          </div>
        )}

        {onClose && (
          <Button
            className={styles.closeButton}
            view='elevated'
            appearance='neutral'
            size='s'
            icon={<CrossSVG />}
            onClick={handleClose}
            aria-label={t('close')}
            data-test-id={MENU_BANNER_TEST_IDS.close}
          />
        )}
      </div>
    </Card>
  );
}
