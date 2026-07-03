import { APPEARANCE, Button, ButtonProps, SIZE, VIEW } from '@ds/button';
import { useCardContext } from '@ds/card';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';

import styles from './styles.module.scss';

export type FooterActionProps = WithSupportProps<{
  /** Параметры для основной кнопки */
  button: Pick<ButtonProps, 'label' | 'onClick' | 'loading' | 'icon'>;
  /** Параметры для вторичной кнопки */
  secondaryButton?: Pick<ButtonProps, 'label' | 'onClick' | 'loading' | 'icon'>;
  /** CSS-класс для элемента с контентом */
  className?: string;
}>;

export function FooterAction({ button, secondaryButton, className, ...rest }: FooterActionProps) {
  const { disabled, radius } = useCardContext();

  return (
    <div className={cn(styles.action, className)} data-size={radius} {...extractSupportProps(rest)}>
      <Button {...button} view={VIEW.Filled} appearance={APPEARANCE.Primary} size={SIZE.M} disabled={disabled} />
      {secondaryButton && (
        <Button
          {...secondaryButton}
          view={VIEW.Tonal}
          appearance={APPEARANCE.Neutral}
          size={SIZE.M}
          disabled={disabled}
        />
      )}
    </div>
  );
}

FooterAction.displayName = 'CardCustom.Footer.Action';
