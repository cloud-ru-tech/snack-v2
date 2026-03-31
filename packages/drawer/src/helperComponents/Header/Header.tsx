import { Button } from '@design-system/button';
import { ArrowLeftSVG } from '@design-system/icons';
import { Typography } from '@design-system/typography';
import { extractSupportProps, WithSupportProps } from '@design-system/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type DrawerHeaderProps = WithSupportProps<{
  /** Заголовок */
  title?: ReactNode;
  /** Слот после заголовка */
  slotAfterHeadline?: ReactNode;
  /** Подзаголовок */
  subtitle?: ReactNode;
  /** CSS-класс */
  className?: string;
  /** Действие при клике по кнопке "назад". Отсутствие скрывает кнопку */
  onBackButtonClick?(): void;
}>;

/** Вспомогательный компонент для добавления "шапки" в DrawerCustom */
export function DrawerHeader({
  title,
  subtitle,
  className,
  onBackButtonClick,
  slotAfterHeadline,
  ...rest
}: DrawerHeaderProps) {
  const withBackButton = Boolean(onBackButtonClick);

  return (
    <div className={cn(styles.root, className)} {...extractSupportProps(rest)}>
      <div className={styles.headline} data-withbackbutton={withBackButton || undefined}>
        {onBackButtonClick && (
          <Button view='function' appearance='neutral' icon={<ArrowLeftSVG />} onClick={onBackButtonClick} />
        )}

        <div className={styles.headlineWrapper} data-withbackbutton={withBackButton || undefined}>
          <Typography variant='headline' size='s' className={styles.title} data-test-id={TEST_IDS.title}>
            {title}
          </Typography>

          {slotAfterHeadline}
        </div>
      </div>
      {subtitle && (
        <div className={styles.subtitleWrapper}>
          <Typography variant='body' size='m' className={styles.subtitle} data-test-id={TEST_IDS.subtitle}>
            {subtitle}
          </Typography>
        </div>
      )}
    </div>
  );
}
