import { Typography } from '@ds/typography';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { forwardRef, MouseEvent, ReactNode, Ref } from 'react';

import { APPEARANCE, MAP_SIZE_TO_TYPOGRAPHY_SIZE, ROLE_APPEARANCE, SIZE } from './constants';
import styles from './styles.module.scss';
import { Appearance, RoleAppearance, Size } from './types';

export type PromoTagProps = WithSupportProps<{
  /** Текст компонента */
  text?: string;
  /** Внешний вид */
  appearance?: Appearance;
  /** Роль промо-тега */
  role?: RoleAppearance;
  /** CSS-класс */
  className?: string;
  /** Колбэк для обработки клика на тег */
  onClick?(e: MouseEvent<HTMLButtonElement>): void;
  /** Контент перед текстом */
  beforeContent?: ReactNode;
  /** Контент после текста */
  afterContent?: ReactNode;
  /** Размер */
  size?: Size;
}>;

/**
 * Компонент Promo Tag
 */
export const PromoTag = forwardRef<HTMLButtonElement | HTMLDivElement, PromoTagProps>(function PromoTag(
  {
    appearance = APPEARANCE.Primary,
    size = SIZE.Xs,
    role = ROLE_APPEARANCE.Accent,
    className,
    text,
    beforeContent = null,
    afterContent = null,
    onClick,
    ...props
  }: PromoTagProps,
  ref,
) {
  const commonProps = {
    className: cn(styles.container, className),
    ...extractSupportProps(props),
    'data-appearance': appearance,
    'data-role': role,
    'data-size': size,
    children: (
      <>
        {beforeContent}
        {Boolean(text) && (
          <Typography className={styles.textWrapper} as='div' variant='label' size={MAP_SIZE_TO_TYPOGRAPHY_SIZE[size]}>
            {text}
          </Typography>
        )}
        {afterContent}
      </>
    ),
  };

  return onClick ? (
    <button type='button' {...commonProps} data-clickable onClick={onClick} ref={ref as Ref<HTMLButtonElement>}>
      <span className={styles.stateLayer} aria-hidden data-state='regularBackground' />
      {commonProps.children}
    </button>
  ) : (
    <div {...commonProps} ref={ref as Ref<HTMLDivElement>} />
  );
});
