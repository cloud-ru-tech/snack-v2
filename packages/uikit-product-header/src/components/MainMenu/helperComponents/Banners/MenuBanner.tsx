import { Button } from '@ds/button';
import { CrossSVG } from '@ds/icons/interface/system';
import { PromoTag, PromoTagProps, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { useThemeClassnames } from '@ds/theme';
import { Typography } from '@ds/typography';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { AnchorHTMLAttributes, MouseEventHandler, ReactElement, ReactNode, useCallback } from 'react';

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
  target,
  'data-test-id': dataTestId,
  ...rest
}: MenuBannerProps): ReactElement {
  const { t } = headerLocale.useTranslations();
  const compactThemeClassname = useThemeClassnames({ density: 'compact' });

  const handleClose: MouseEventHandler<HTMLButtonElement> = useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      onClose?.(e);
    },
    [onClose],
  );

  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      className={cn(styles.root, className)}
      data-test-id={dataTestId ?? MENU_BANNER_TEST_IDS.root}
      {...rest}
    >
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
            as='span'
            role={ROLE_APPEARANCE.Decor}
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
          className={cn(styles.closeButton, compactThemeClassname)}
          view='elevated'
          appearance='neutral'
          size='s'
          icon={<CrossSVG size={16} />}
          onClick={handleClose}
          aria-label={t('close')}
          data-test-id={MENU_BANNER_TEST_IDS.close}
        />
      )}
    </a>
  );
}
