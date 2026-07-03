import { APPEARANCE, Button, ButtonProps, SIZE, VIEW } from '@ds/button';
import { Size, useCardContext } from '@ds/card';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import { Dimension, DimensionProps } from './Dimension';
import styles from './styles.module.scss';

export type FooterPromoProps = WithSupportProps<{
  /** Параметры для блока значений */
  volume?: DimensionProps;
  /** Параметры для основной кнопки */
  button?: Pick<ButtonProps, 'label' | 'onClick' | 'loading' | 'icon'>;
  /** CSS-класс для элемента с контентом */
  className?: string;
  /** Размер */
  size?: Size;
}>;

export function FooterPromo({ volume, button, className, size, ...rest }: FooterPromoProps) {
  const { disabled, radius } = useCardContext();
  const footerSize = size ?? radius;

  return (
    <div className={cn(styles.promo, className)} data-size={footerSize} {...extractSupportProps(rest)}>
      {button && (
        <Button {...button} view={VIEW.Filled} appearance={APPEARANCE.Primary} size={SIZE.M} disabled={disabled} />
      )}
      {volume && <Dimension {...volume} size={size} />}
    </div>
  );
}

FooterPromo.displayName = 'CardCustom.Footer.Promo';
