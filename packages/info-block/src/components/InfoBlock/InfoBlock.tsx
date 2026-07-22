import { IconPredefined, IconPredefinedProps } from '@ds/icon-predefined';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { ALIGN, SIZE, SIZE_TO_ICON_SIZE, TEST_IDS } from '../../constants';
import { Align, Size } from '../../types';
import styles from './styles.module.scss';

export type InfoBlockProps = WithSupportProps<{
  /** Заголовок */
  title?: string;
  /** Подзаголовок */
  content?: ReactNode;
  /** Иконка */
  icon?: IconPredefinedProps;
  /** Размер */
  size?: Size;
  /** Расположение элементов */
  align?: Align;
  /** Вложенный контент (например ButtonGroup) */
  footer?: ReactNode;
  /** Дополнительный класс */
  className?: string;
}>;

export function InfoBlock({
  title,
  content,
  icon,
  size = SIZE.M,
  footer,
  align = ALIGN.Vertical,
  className,
  ...rest
}: InfoBlockProps) {
  const iconSize = SIZE_TO_ICON_SIZE[size];

  return (
    <div className={cn(styles.infoBlock, className)} data-size={size} data-align={align} {...extractSupportProps(rest)}>
      {icon && (
        <IconPredefined
          icon={icon.icon}
          appearance={icon.appearance ?? 'primary'}
          background={icon.background ?? true}
          size={iconSize}
          data-test-id={TEST_IDS.icon}
        />
      )}

      <div className={styles.contentLayout}>
        <div className={styles.textWrap}>
          {title && (
            <div className={styles.title} data-test-id={TEST_IDS.title}>
              {title}
            </div>
          )}

          {content && (
            <div className={styles.description} data-test-id={TEST_IDS.content}>
              {content}
            </div>
          )}
        </div>

        {footer && (
          <div className={styles.footer} data-test-id={TEST_IDS.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
